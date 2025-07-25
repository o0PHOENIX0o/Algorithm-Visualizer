import { GraphBase } from './GraphBase.js';
import { DrawArray, PointerArrow, Square, clearCanvas, height, width } from '../../canvas.js';



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
        this.textArray = [];
        this.edgeBoxes = [];
    }

    reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};
        this.textArray = [];
        this.edgeBoxes = [];

        this.isAnimating = false;
        this.isPause = false;
        clearCanvas();
        DrawArray(null);
    }

    async moveSquare({ element, xc, yc, otherElements, speedFactor = 4 } = {}) {
        let offset = 5 + this.objNodeArray[0].obj.dia / 2;
        let targetX1 = xc - offset;
        let targetY1 = yc + offset;
        let targetX2 = xc + offset;
        let targetY2 = yc - offset;

        if (!this.isAnimating) return;
        return new Promise(resolve => {
            if (!this.isAnimating) return;

            let startX1 = element.xPos1;
            let startY1 = element.yPos1;
            let startX2 = element.xPos2;
            let startY2 = element.yPos2;
            let t = 0;
            const animate = async () => {
                if (!this.isAnimating) return;

                t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
                element.xPos1 = lerp(startX1, targetX1, t);
                element.yPos1 = lerp(startY1, targetY1, t);
                element.xPos2 = lerp(startX2, targetX2, t);
                element.yPos2 = lerp(startY2, targetY2, t);
                this.drawAll([...otherElements, element]);

                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    }

    async move({ element, x, y, otherElements, speedFactor = 4 } = {}) {
        if (!this.isAnimating) return;
        return new Promise(resolve => {
            if (!this.isAnimating) return;

            const startX = element.xPos, startY = element.yPos;
            let t = 0;
            const animate = async () => {
                if (!this.isAnimating) return;

                t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
                element.xPos = lerp(startX, x, t);
                element.yPos = lerp(startY, y, t);
                this.drawAll([element, ...otherElements, ...this.edgeBoxes.map(box => box.obj)]);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    }


    async setBoxes(edges, Nodes) {
        this.edgeBoxes = [];

        let boxYMax = 10;
        let boxWidth = 70;
        let boxHeight = 30;
        let BoxSpace = 5;

        let totalBoxWidth = edges.length * (boxWidth + BoxSpace);

        let startX = (width - totalBoxWidth + boxWidth) / 2;


        edges.forEach(({ u, v, weight, line }, i) => {
            console.log(u, v, Nodes[u], Nodes[v]);
            let label = `${Nodes[u].obj.label} - ${Nodes[v].obj.label} : ${weight}`;

            let boxX1 = startX + (i * (boxWidth + BoxSpace));
            let boxY1 = boxYMax + boxHeight;
            let boxX2 = boxX1 + boxWidth;
            let boxY2 = boxYMax;

            this.edgeBoxes.push(
                {
                    position: { xPos: (boxX2 + boxX1) / 2, yPos: (boxY1 + boxY2) / 2 },
                    obj: new Square({xPos1: boxX1, yPos1: boxY1, xPos2: boxX2, yPos2: boxY2, col: "#000000", strokeW: 2, text: label})
                }
            )
        })

        this.drawAll(this.edgeBoxes.map(box => box.obj));
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();


    }


    async kruskalAlgo(Nodes, adjM, vi) {
        this.disjointSet = new DisjointSet(Nodes.length);
        console.log("boxes: ", this.edgeBoxes);

        let edges = [];
        for (let i = 0; i < Nodes.length; i++) {
            for (let j = i + 1; j < Nodes.length; j++) {
                if (this.directedEdges[i][j] && this.directedEdges[i][j] !== null) {
                    edges.push(
                        {
                            u: i,
                            v: j,
                            weight: Number(adjM[i][j]),
                            line: this.directedEdges[i][j]?.line,
                        }
                    );
                }
            }
        }

        edges.sort((a, b) => a.weight - b.weight);

        await this.setBoxes(edges, Nodes);
        let pointer = new PointerArrow({xPos: this.edgeBoxes[0].position.xPos, yPos: this.edgeBoxes[0].position.yPos + 25, col: this.HighlightCol2, length: 10, label: "min Edge"});
        let pointerBox = [
            this.BoxAround(0, Nodes, "u"),
            this.BoxAround(1, Nodes, "v"),

        ]

        let MST = [];
        let totalWeight = 0;
        for (let [i, { u, v, weight, line }] of edges.entries()) {
            this.move({ element: pointer, x: this.edgeBoxes[i].position.xPos, y: this.edgeBoxes[i].position.yPos + 25, otherElements: [...pointerBox] });

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

        console.log(MST, totalWeight);

        this.directedEdges.forEach((row, i) => {
            row.forEach((edge, j) => {
                if (edge !== null && edge.line.col == this.unsortedCol) this.directedEdges[i][j] = null;
            })
        })

        this.drawAll();
        await this.delay(this.TimeoutDelay);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        if (!this.isGraphConnected()) {
            this.reset();
            return;
        }

        await this.kruskalAlgo(this.objNodeArray, this.adjMatrix, 0);

        this.isAnimating = false;
    }
};

export const kruskal = new KruskalClass();