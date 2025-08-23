import { GraphBase, PriorityQueue } from './GraphBase.js';
import { DrawArray, Text, clearCanvas, height, width } from '../../canvas.js';
import {Logger} from "../../logger.js";

class DijkstraClass extends GraphBase {
    constructor() {
        super("DijkstraClass", 10, 40, 150, width / 2, height / 3);
        this.textArray = [];
        this.logger = new Logger();
    }

    reset() {
        this.logger.show({
            message: { title: "Reset", text: "Dijkstra has been reset. All nodes, edges, and logs are cleared." },
            type: "warning",
            isEvent: true
        });
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};
        this.textArray = [];

        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
    }


    drawDist(Nodes) {
        if (Nodes.length < 1) return;

        let label = '∞';
        let size = 30 * this.scaleFactor;
        for (let i = 0; i < Nodes.length; i++) {
            let t = new Text({xPos: 0, yPos: 0, label: label, text_size: size, textCol: this.unsortedCol});
            this.textArray.push(t);
        }

        let centerX = width / 2;
        let centerY = height / 2;
        let offset = this.dia * this.scaleFactor;
        for (let i = 0; i < Nodes.length; i++) {
            let node = Nodes[i].obj;
            let dx = node.xPos - centerX;
            let dy = node.yPos - centerY;
            let angle = atan2(dy, dx);

            let x = node.xPos + (offset * cos(angle));
            let y = node.yPos + (offset * sin(angle));
            this.textArray[i].xPos = x;
            this.textArray[i].yPos = y;
        }

        this.drawAll(this.textArray);
    }

    async DijkstraAlgo(Nodes, adjM, vi) {
        const TEXT_SIZE = 25 * this.scaleFactor;
        this.Pqueue = new PriorityQueue();
        this.Pqueue.initialize(Nodes);
        this.Pqueue.decreaseKey(vi, 0)
    
        this.logger.show({
            message: { 
                title: "Initialization", 
                text: `Set distance of <b>source node</b> (${Nodes[vi].obj.label}) to 0 and insert it into the priority queue.<br>
                       All other nodes are initialized with distance <b>∞</b>.`
            },
            type: "info"
        });

        let dist = Array(Nodes.length).fill(Infinity);
        let src = Array(Nodes.length).fill(-1);
        this.drawDist(Nodes);

        await this.delay(this.TimeoutDelay);

        Nodes[vi].obj.col = this.sortedCol;
        this.textArray[vi].label = 0;
        this.textArray[vi].text_size = TEXT_SIZE;
        dist[vi] = 0;
        this.drawAll(this.textArray);

        let box = this.BoxAround(vi, Nodes, "min");

        while (!this.Pqueue.isEmpty()) {
            let u = this.Pqueue.deQueue();
            if (u.priority === Infinity) break;

            let uIndex = u.item.index;
            Nodes[uIndex].obj.col = this.HighlightCol2;
            Nodes[uIndex].obj.strokeCol = this.sortedCol;
            this.textArray[uIndex].textCol = this.sortedCol;
            if (src[uIndex] !== -1) {
                let { line, arrow } = { ...this.directedEdges[src[uIndex]][uIndex] };
                line.col = arrow.col = this.sortedCol;
                line.strokeW = 3;
            }

            this.logger.show({
                message: { 
                    title: `Extract-Min: ${Nodes[uIndex].obj.label}`, 
                    text: `Node <b>${Nodes[uIndex].obj.label}</b> is removed from the priority queue.<br>
                           Its current shortest distance is <b>${dist[uIndex]}</b>.`
                },
                type: "info"
            });

            await this.moveSquare({element: box, xc: Nodes[uIndex].obj.xPos, yc: Nodes[uIndex].obj.yPos, otherElements: this.textArray});
            this.drawAll([...this.textArray, box]);
            await this.delay(2 * this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            for (let v = 0; v < Nodes.length; v++) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
                if (this.Pqueue.getElementAt(v) && adjM[uIndex][v]) {
                    let weight = adjM[uIndex][v];

                    this.logger.show({
                        message: { 
                            title: "Relax Edge", 
                            text: `Checking edge <b>${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}</b> with weight <b>${weight}</b>.`
                        },
                        type: "info"
                    });

                    if (this.Pqueue.getPriorityOf(v) > u.priority + weight) {
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;

                        this.Pqueue.decreaseKey(v, u.priority + weight);
                        src[v] = uIndex;
                        dist[v] = u.priority + weight;

                        let { line, arrow } = { ...this.directedEdges[uIndex][v] };
                        line.col = arrow.col = this.HighlightCol2;
                        line.strokeW = 3;


                        this.drawAll([...this.textArray, box]);
                        await this.delay(1.5 * this.TimeoutDelay);
                        await this.waitWhilePaused();

                        this.logger.show({
                            message: { 
                                title: "Distance Updated", 
                                text: `A shorter path was found from node <b> ${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}</b>.<br>
                                       New distance = <b>${u.priority + weight}</b>.`
                            },
                            type: "success"
                        });


                        this.textArray[v].label = u.priority + weight;
                        this.textArray[v].text_size = TEXT_SIZE;
                        this.drawAll([...this.textArray, box]);
                        await this.delay(1.5 * this.TimeoutDelay);
                    } else {
                        this.logger.show({
                            message: { 
                                title: "No Update", 
                                text: `Existing distance to <b>${Nodes[v].obj.label}</b> is shorter. No update performed.`
                            },
                            type: "warning"
                        });
                    }
                }
            }

            this.logger.show({
                message: { 
                    title: "Node Finalized", 
                    text: `Node <b>${Nodes[uIndex].obj.label}</b> is now marked as visited.<br>
                           Its shortest distance is finalized and will not change further.`
                },
                type: "success"
            });
            Nodes[uIndex].obj.col = this.sortedCol;
            this.drawAll([...this.textArray, box]);

            await this.delay(1.5 * this.TimeoutDelay);
        }

        for (let i = 0; i < Nodes.length; i++) {
            for (let j = 0; j < Nodes.length; j++) {
                if (src[j] !== i && this.directedEdges[i][j] !== null) {
                    this.directedEdges[i][j] = null;
                }
            }
        }

        this.logger.show({
            message: { 
                title: "Algorithm Completed", 
                text: "All nodes have been processed. Final shortest path distances are now displayed beside each node." 
            },
            type: "success"
        });

        this.drawAll(this.textArray);
        await this.delay(this.TimeoutDelay);
    }

    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        this.logger.show({
            message: { title: "Dijkstra's Algorithm", text: "Starting Dijkstra's Algorithm from the selected source node." },
            type: "info",
            isEvent: true
        });

        if (this.key === -1) this.key = 0;
        await this.DijkstraAlgo(this.objNodeArray, this.adjMatrix, this.key);

        this.logger.show({
            message: { title: "Completed", text: "Dijkstra's Algorithm has finished execution." },
            type: "success",
            isEvent: true
        });

        this.isAnimating = false;
    }
};

export const Dijkstra = new DijkstraClass();
