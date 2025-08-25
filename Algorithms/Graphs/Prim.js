import { GraphBase, PriorityQueue } from './GraphBase.js';
import { DrawArray, Text, clearCanvas, height, width, drawWelcomeScreen } from '../../Core/canvas.js';
import { Logger } from "../../Core/logger.js";

class PrimClass extends GraphBase {
    constructor() {
        super("prim", 10, 40);
        this.textArray = [];
        this.logger = new Logger();
    }

    reset() {
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
        // drawWelcomeScreen
    }

    drawDist(Nodes) {
        if (Nodes.length < 1) return;

        for (let i = 0; i < Nodes.length; i++) {
            let label = '∞';
            let size = 30 * this.scaleFactor;
            let t = new Text({ xPos: 0, yPos: 0, label: label, text_size: size, textCol: this.unsortedCol });
            this.textArray.push(t);
        }


        let centerX = width / 2;
        let centerY = height / 2;
        let sclaedRadius = this.radius * this.scaleFactor;

        let offset = 10 + (Nodes[0].obj.dia * this.scaleFactor) / 1.8;
        for (let i = 0; i < Nodes.length; i++) {
            let angle = map(i, 0, Nodes.length, 0, TWO_PI);
            let x = centerX + (sclaedRadius + offset) * 1.5 * cos(angle);
            let y = centerY + (sclaedRadius + offset) * sin(angle);
            this.textArray[i].xPos = x;
            this.textArray[i].yPos = y;
        }

        this.drawAll(this.textArray);
    }



    async PrimAlgo(Nodes, adjM, vi) {
        const TEXT_SIZE = 25 * this.scaleFactor;

        this.Pqueue = new PriorityQueue();
        this.Pqueue.initialize(Nodes);
        this.Pqueue.decreaseKey(vi, 0);

        this.logger.show({
            message: { title: "Initialization", text: `Starting from <b>source node</b> (${Nodes[vi].obj.label}).<br> Distance set to <b>0</b>. All others set to <b>∞</b>.` },
            type: "info"
        });

        let dist = Array(Nodes.length).fill(Infinity);
        let src = Array(Nodes.length).fill(-1);
        this.drawDist(Nodes);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        Nodes[vi].obj.col = this.sortedCol;
        this.textArray[vi].label = 0;
        this.textArray[vi].text_size = TEXT_SIZE;
        dist[vi] = 0;
        this.drawAll(this.textArray);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        let box = this.BoxAround(vi, Nodes, "min");

        let MST = [];
        let totalWeight = 0;
        while (!this.Pqueue.isEmpty()) {
            let u = this.Pqueue.deQueue();
            if (u.priority === Infinity) break;

            let uIndex = u.item.index;

            this.logger.show({
                message: { title: `Extract-Min: ${Nodes[uIndex].obj.label}`, text: `Node <b>${Nodes[uIndex].obj.label}</b> chosen with edge weight <b>${dist[uIndex]}</b>.` },
                type: "info"
            });

            let adjBox = this.BoxAround(uIndex, Nodes);
            adjBox.col = this.HighlightCol;


            Nodes[uIndex].obj.col = this.HighlightCol2;
            Nodes[uIndex].obj.strokeCol = this.sortedCol;
            this.textArray[uIndex].textCol = this.sortedCol;

            if (src[uIndex] !== -1) {
                let { line, _ } = { ...this.directedEdges[src[uIndex]][uIndex] };
                line.col = this.sortedCol;
                line.strokeW = 3;
            }
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            await this.moveSquare({ element: box, xc: Nodes[uIndex].obj.xPos, yc: Nodes[uIndex].obj.yPos, otherElements: this.textArray });
            this.drawAll([...this.textArray, box, adjBox]);
            await this.delay(2 * this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;



            for (let v = 0; v < Nodes.length; v++) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
                if (this.Pqueue.getElementAt(v) && adjM[uIndex][v]) {
                    let weight = adjM[uIndex][v];
                    totalWeight += weight;

                    this.logger.show({
                        message: { title: `Check Edge: ${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}`, text: `Considering edge <b>${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}</b> with weight <b>${weight}</b>.` },
                        type: "info"
                    });

                    await this.delay(this.TimeoutDelay);

                    if (this.Pqueue.getPriorityOf(v) > weight) {
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;

                        adjBox.text = "relax";
                        await this.moveSquare({ element: adjBox, xc: Nodes[v].obj.xPos, yc: Nodes[v].obj.yPos, otherElements: [...this.textArray, box] });

                        this.logger.show({
                            message: { title: `Edge Chosen: ${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}`, text: `Edge <b>${Nodes[uIndex].obj.label} → ${Nodes[v].obj.label}</b> improves MST.<br>  <br> <b>current total weight = ${totalWeight}</b>.` },
                            type: "success"
                        });

                        this.Pqueue.decreaseKey(v, weight);
                        src[v] = uIndex;
                        dist[v] = weight;

                        let { line, _ } = { ...this.directedEdges[uIndex][v] };
                        line.col = this.HighlightCol2;
                        line.strokeW = 3;


                        this.drawAll([...this.textArray, box, adjBox]);
                        await this.delay(1.5 * this.TimeoutDelay);
                        await this.waitWhilePaused();

                        this.textArray[v].label = weight;
                        this.textArray[v].text_size = TEXT_SIZE;

                        MST.push({ u, v, weight, line });
                        this.drawAll([...this.textArray, box, adjBox]);
                        await this.delay(1.5 * this.TimeoutDelay);
                    }
                    await this.delay(this.TimeoutDelay);
                }
            }

            this.logger.show({
                message: { title: "Node Added to MST", text: `Node <b>${Nodes[uIndex].obj.label}</b> is finalized in the MST.` },
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
            message: { title: "Prim Completed", text: `All nodes processed. Minimum Spanning Tree constructed successfully. Total MST weight = ${totalWeight}.` },
            type: "success",
        });


        this.drawAll(this.textArray);
        await this.delay(this.TimeoutDelay);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        let { connected, vertex } = this.isGraphConnected(this.inputArray, this.adjMatrix);
        if (!connected) {
            this.logger.show({
                message: { title: "Disconnected Graph", text: `Vertex ${vertex} is not connected to the graph. Prim's algorithm requires a connected graph.` },
                type: "error",
                isEvent: true
            });
            this.reset();
            return;
        }

        this.logger.show({
            message: { title: "Prim's Algorithm", text: "Starting Prim's Algorithm to construct the Minimum Spanning Tree (MST)." },
            type: "info",
            isEvent: true
        });

        await this.PrimAlgo(this.objNodeArray, this.adjMatrix, 0);

        this.logger.show({
            message: { title: "Completed", text: "Prim's Algorithm has finished execution." },
            type: "success",
            isEvent: true
        });

        this.isAnimating = false;
        let btn = document.getElementById("togglePlayBtn");
        btn.classList.add('play-btn');
        btn.classList.remove('pause-btn');
        btn.innerHTML = '<span class="btn-icon"><ion-icon name="play-outline"></ion-icon></span> Play';
    }
};

export const prim = new PrimClass();