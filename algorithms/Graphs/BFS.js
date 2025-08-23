import { GraphBase } from "./GraphBase.js";
import { DrawArray, clearCanvas } from '../../canvas.js';
import { Logger } from "../../logger.js";


class BFSClass extends GraphBase {
    constructor() {
        super("BFS", 10, 40);
        this.logger = new Logger();
    }

    reset() {
        this.logger.show({
            message: { title: "Reset", text: "BFS state and visuals have been reset." },
            type: "warning",
            isEvent: true
        });
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};

        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
    }


    async BFS(Nodes, u) {
        let BFSOrder = [];
        let Queue = [];
        let dist = Array(Nodes.length).fill(Infinity);
        let isSeen = Array(Nodes.length).fill(false);

        const BFSvisit = async (array, u) => {
            console.log(array, array[0].obj.label);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let box = this.BoxAround(u, array, `Visiting`);
            box.col = this.HighlightCol;
            box.textCol = this.HighlightCol;

            Queue.push(u);
            isSeen[u] = true;
            dist[u] = 0;
            array[u].obj.col = this.sortedCol;
            array[u].obj.strokeCol = this.sortedCol;
            this.drawAll([box]);


            this.logger.show({
                message: {
                    title: `Start at Node ${array[u].obj.label}`,
                    text: `Node <b>${array[u].obj.label}</b> is the starting point. It is discovered <b>0 edges away from itself</b> and added to the queue.<br>
                           Current queue → [${Queue.map(index => array[index].obj.label)}]`
                },
                type: "info"
            });

            await this.delay(this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            

            while (Queue.length > 0) {
                console.log(" Queue: ", Queue);
                let v = Queue.shift();

                box.text = "Visiting";
                box.col = this.HighlightCol;
                box.textCol = this.HighlightCol;
                console.log("Box: ", box);

                await this.moveSquare({element: box, xc: array[v].obj.xPos, yc: array[v].obj.yPos});

                this.logger.show({
                    message: {
                        title: `Dequeue Node ${array[v].obj.label}`,
                        text: `Processing node <b>${array[v].obj.label}</b>, which is <b>${dist[v]} edges away from ${array[u].obj.label}</b>.<br>
                               Current queue → [${Queue.map(index => array[index].obj.label).join(', ')}]`
                    },
                    type: "info"
                });

                await this.delay(this.TimeoutDelay)
                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                let col = this.highlightColors[(dist[v]) % this.highlightColors.length];

                let adjNodeBox = []
                for (let w = 0; w < array.length; w++) {
                    if (this.adjMatrix[v][w] && !isSeen[w]) {

                        adjNodeBox.push(this.BoxAround(w, array, `Adj of ${array[v].obj.label}`));

                        isSeen[w] = true;
                        dist[w] = dist[v] + 1;
                        array[w].obj.col = this.HighlightCol2;
                        array[w].obj.strokeCol = this.HighlightCol2;

                        let { line, arrow } = { ...this.directedEdges[v][w] };
                        line.col = arrow.col = array[w].obj.col;
                        line.strokeW = 3;
                        line.label = dist[w];

                        this.drawAll([...adjNodeBox, box]);

                        Queue.push(w);

                        this.logger.show({
                            message: {
                                title: `Discovered Node ${array[w].obj.label}`,
                                text: `Node <b>${array[w].obj.label}</b> is discovered from <b>${array[v].obj.label}</b>, which is <b>${dist[w]} edges away from ${array[u].obj.label}</b>. It has been added to the queue.<br>
                                       Current queue → [${Queue.map(index => array[index].obj.label)}]`
                            },
                            type: "info"
                        });

                        await this.delay(1.5 * this.TimeoutDelay)
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;
                    }
                }
                BFSOrder.push(v);
                this.logger.show({
                    message: {
                        title: `Visited Node ${array[v].obj.label}`,
                        text: `Node <b>${array[v].obj.label}</b> has been fully processed and marked as visited.`
                    },
                    type: "info"
                });
                array[v].obj.col = col;
                array[v].obj.strokeCol = col;

                box.col= this.sortedCol;
                box.textCol = this.sortedCol;
                box.text = 'Visited'

                this.drawAll([...adjNodeBox, box]);

                await this.delay(1.5 * this.TimeoutDelay)
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
            }

            this.directedEdges.forEach((row, i) => {
                row.forEach((edge, j) => {
                    if (edge !== null && edge.line.col == 0) this.directedEdges[i][j] = null;
                })
            })
            this.drawAll();
            await this.delay(this.TimeoutDelay);

            this.logger.show({
                message: { title: "Final BFS Order", text: `Traversal order: ${BFSOrder.map(index => Nodes[index].obj.label).join(' → ')}.` },
                type: "success",
            });

        }

        if (u === -1) await BFSvisit(Nodes, 0);
        else await BFSvisit(Nodes, u);

        console.log(BFSOrder);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        this.logger.show({
            message: { title: "BFS", text: "Starting Breadth-First Search (BFS)." },
            type: "info",
            isEvent: true
        });

        await this.BFS(this.objNodeArray, this.key);

        this.logger.show({
            message: { title: "BFS Completed", text: "BFS traversal completed." },
            type: "success",
            isEvent: true
        });

        this.isAnimating = false;
    }
};

export const BFS = new BFSClass();