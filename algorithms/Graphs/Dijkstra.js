import { GraphBase, PriorityQueue } from './GraphBase.js';
import { DrawArray, Text, Square, clearCanvas, height, width } from '../../canvas.js';


class DijkstraClass extends GraphBase {
    constructor() {
        super("DijkstraClass", 10, 40);
        this.textArray = [];
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
        clearCanvas();
        DrawArray(null);
    }


    drawDist(Nodes) {
        if (Nodes.length < 1) return;

        for (let i = 0; i < Nodes.length; i++) {
            let label = '∞';
            let size = 30;
            let t = new Text({xPos: 0, yPos: 0, label: label, textSize: size, textCol: this.unsortedCol});
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

    async DijkstraAlgo(Nodes, adjM, vi) {

        this.Pqueue = new PriorityQueue();
        this.Pqueue.initialize(Nodes);
        this.Pqueue.decreaseKey(vi, 0)

        let dist = Array(Nodes.length).fill(Infinity);
        let src = Array(Nodes.length).fill(-1);
        this.drawDist(Nodes);

        await this.delay(this.TimeoutDelay);

        Nodes[vi].obj.col = this.sortedCol;
        this.textArray[vi].label = 0;
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

            await this.moveSquare({element: box, xc: Nodes[uIndex].obj.xPos, yc: Nodes[uIndex].obj.yPos, otherObjects: this.textArray});
            this.drawAll([...this.textArray, box]);
            await this.delay(2 * this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;



            for (let v = 0; v < Nodes.length; v++) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
                if (this.Pqueue.getElementAt(v) && adjM[uIndex][v]) {
                    let weight = adjM[uIndex][v];

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

                        this.textArray[v].label = u.priority + weight;
                        this.drawAll([...this.textArray, box]);
                        await this.delay(1.5 * this.TimeoutDelay);
                    }
                }
            }
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

        this.drawAll(this.textArray);
        await this.delay(this.TimeoutDelay);


    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        if (this.key === -1) this.key = 0;
        await this.DijkstraAlgo(this.objNodeArray, this.adjMatrix, this.key);

        this.isAnimating = false;
    }
};

export const Dijkstra = new DijkstraClass();