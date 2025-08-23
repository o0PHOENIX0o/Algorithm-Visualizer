import { GraphBase } from './GraphBase.js';
import { DrawArray, PointerArrow, Square, clearCanvas, height, width } from '../../canvas.js';
import { Logger } from "../../logger.js";


class DisjointSet {
    constructor(size) {
        this.parent = Array(size).fill(0).map((_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(u) {
        if (this.parent[u] != u) this.parent[u] = this.find(this.parent[u]);
        return this.parent[u];
    }

    union(u, v) {
        let rootU = this.find(u);
        let rootV = this.find(v);

        if (rootU === rootV) return;

        if (this.rank[rootU] < this.rank[rootV]) {
            this.parent[rootU] = rootV;
        } else if (this.rank[rootU] > this.rank[rootV]) {
            this.parent[rootV] = rootU;
        } else {
            this.parent[rootV] = rootU;
            this.rank[rootU]++;
        }

    }

}



class KruskalClass extends GraphBase {
    constructor() {
        super("kruskal", 10, 40);
        this.edgeBoxes = [];
        this.boxSF = 1;
        this.logger = new Logger("DisjointSet");
    }

    reset() {
        this.logger.show({
            message: { title: "Reset", text: "Kruskal's state and visuals have been reset." },
            type: "warning",
            isEvent: true
        });
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};
        this.edgeBoxes = [];

        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs()
        clearCanvas();
        DrawArray(null);
    }


    async setBoxes(edges, Nodes) {
        this.edgeBoxes = [];
        let boxYMax = 10;
        let boxWidth = 70;
        let boxHeight = 30;
        let BoxSpace = 5;

        let availableWidth = width * 0.95;
        let totalBoxWidth = edges.length * (boxWidth + BoxSpace);;
        this.boxSF = Math.min(1, availableWidth / totalBoxWidth);

        console.log("scaleFactor: ", this.scaleFactor, this.boxSF, availableWidth, totalBoxWidth);
        boxWidth *= this.boxSF;
        BoxSpace *= this.boxSF;
        const TEXT_SIZE = 16 * this.boxSF;

        totalBoxWidth = edges.length * (boxWidth + BoxSpace);
        let startX = (width / 2) - (totalBoxWidth / 2) + BoxSpace / 2

        edges.forEach(({ u, v, weight, line }, i) => {
            console.log(u, v, Nodes[u], Nodes[v]);
            let label = `${Nodes[u].obj.label} - ${Nodes[v].obj.label} : ${weight}`;

            let boxX1 = startX + (i * (boxWidth + BoxSpace));
            let boxY1 = boxYMax + boxHeight;
            let boxX2 = boxX1 + boxWidth;
            let boxY2 = boxYMax;

            this.edgeBoxes.push({
                position: { xPos: (boxX2 + boxX1) / 2, yPos: (boxY1 + boxY2) / 2 },
                obj: new Square({ xPos1: boxX1, yPos1: boxY1, xPos2: boxX2, yPos2: boxY2, col: "#000000", strokeW: 2 * this.boxSF, text: label, textSize: TEXT_SIZE })
            })
        })

        this.drawAll(this.edgeBoxes.map(box => box.obj));
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();
    }


    async kruskalAlgo(Nodes, adjM, vi) {
        this.disjointSet = new DisjointSet(Nodes.length);


        let edges = [];
        for (let i = 0; i < Nodes.length; i++) {
            for (let j = i + 1; j < Nodes.length; j++) {
                if (this.directedEdges[i][j] && this.directedEdges[i][j] !== null) {
                    edges.push({
                        u: i,
                        v: j,
                        weight: Number(adjM[i][j]),
                        line: this.directedEdges[i][j]?.line,
                    });
                }
            }
        }

        edges.sort((a, b) => a.weight - b.weight);

        this.logger.show({
            message: { title: "Step 1: Sort Edges", text: "All edges have been sorted in ascending order of their weights. Processing begins from the lightest edge." },
            type: "info",
        });

        await this.setBoxes(edges, Nodes);
        let pointer = new PointerArrow({ xPos: this.edgeBoxes[0].position.xPos, yPos: this.edgeBoxes[0].position.yPos + 25, col: this.HighlightCol2, length: 10, label: "min edge", textS: 16 * this.boxSF, textY: 10 });
        let pointerBox = [
            this.BoxAround(0, Nodes, "u"),
            this.BoxAround(1, Nodes, "v"),
        ]


        let MST = [];
        let totalWeight = 0;
        for (let [i, { u, v, weight, line }] of edges.entries()) {
            this.logger.show({
                message: { title: `Step ${i + 2}: Examine Edge: (${Nodes[u].obj.label} → ${Nodes[v].obj.label}) `, text: `Currently examining edge (${Nodes[u].obj.label} → ${Nodes[v].obj.label}) with weight ${weight}.` },
                type: "info",
            });

            await this.move({ element: pointer, x: this.edgeBoxes[i].position.xPos, y: this.edgeBoxes[i].position.yPos + 25, otherElements: [...pointerBox, ...this.edgeBoxes.map(box => box.obj)] });

            await Promise.all([
                this.moveSquare({ element: pointerBox[0], xc: Nodes[u].obj.xPos, yc: Nodes[u].obj.yPos, otherElements: [pointer, pointerBox[1], ...this.edgeBoxes.map(box => box.obj)] }),
                this.moveSquare({ element: pointerBox[1], xc: Nodes[v].obj.xPos, yc: Nodes[v].obj.yPos, otherElements: [pointer, pointerBox[0], ...this.edgeBoxes.map(box => box.obj)] })
            ]);

            await this.waitWhilePaused();

            this.edgeBoxes[i].obj.col = this.HighlightCol2;

            if (Nodes[u].obj.col !== this.sortedCol || Nodes[v].obj.col !== this.sortedCol) Nodes[u].obj.col = Nodes[v].obj.col = this.HighlightCol2;

            line.col = this.HighlightCol2;
            line.strokeW = 3;
            this.drawAll([pointer, ...pointerBox, ...this.edgeBoxes.map(box => box.obj)]);
            await this.delay(2 * this.TimeoutDelay);
            await this.waitWhilePaused();


            if (this.disjointSet.find(u) != this.disjointSet.find(v)) {
                
                this.disjointSet.union(u, v);
                totalWeight += weight

                this.logger.show({
                    message: { title: "Edge Accepted", text: `Edge (${Nodes[u].obj.label} → ${Nodes[v].obj.label}) with weight ${weight} is added to the MST (no cycle created). <br> current total weight = ${totalWeight}` },
                    type: "success",
                });


                this.edgeBoxes[i].obj.col = this.sortedCol;
                this.edgeBoxes[i].obj.strokeW = 3;

                Nodes[u].obj.col = Nodes[v].obj.col = this.sortedCol;
                Nodes[u].obj.strokeCol = Nodes[v].obj.strokeCol = this.sortedCol;
                line.col = this.sortedCol;
                line.strokeW = 3;
                this.drawAll([pointer, ...pointerBox, ...this.edgeBoxes.map(box => box.obj)]);


                await this.delay(2 * this.TimeoutDelay);
                await this.waitWhilePaused();

                MST.push({ u, v, weight, line });
            } else {
                this.logger.show({
                    message: { title: "Edge Rejected", text: `Edge (${Nodes[u].obj.label} → ${Nodes[v].obj.label}) with weight ${weight} forms a cycle, so it is discarded.` },
                    type: "warning",
                });

                this.edgeBoxes[i].obj.col = this.unsortedCol;

                Nodes[u].obj.col = Nodes[v].obj.col = this.sortedCol;
                line.col = this.unsortedCol;
                line.strokeW = 2;

                this.drawAll([pointer, ...pointerBox, ...this.edgeBoxes.map(box => box.obj)]);

                await this.delay(2 * this.TimeoutDelay);
                await this.waitWhilePaused();

            }
        }

        await this.waitWhilePaused();

        this.directedEdges.forEach((row, i) => {
            row.forEach((edge, j) => {
                if (edge !== null && edge.line.col == this.unsortedCol) this.directedEdges[i][j] = null;
            })
        })

        this.logger.show({
            message: { title: "Kruskal Completed", text: `All edges processed. Minimum Spanning Tree constructed successfully. Total MST weight = ${totalWeight}.` },
            type: "success",
        })

        this.drawAll();
        await this.delay(this.TimeoutDelay);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        let { connected, vertex } = this.isGraphConnected(this.inputArray, this.adjMatrix);
        if (!connected) {
            this.logger.show({
                message: { title: "Graph Not Connected", text: `Vertex ${vertex} is disconnected. Kruskal's algorithm requires a fully connected graph.` },
                type: "error",
                isEvent: true
            })
            this.reset();
            return;
        }

        this.logger.show({
            message: { title: "Kruskal's Algorithm", text: "Starting Kruskal's algorithm." },
            type: "info",
            isEvent: true
        });

        await this.kruskalAlgo(this.objNodeArray, this.adjMatrix, 0);

        this.logger.show({
            message: { title: "Kruskal's Algorithm", text: "Kruskal's algorithm completed successfully." },
            type: "success",
            isEvent: true
        });

        this.isAnimating = false;
    }
};



export const kruskal = new KruskalClass();