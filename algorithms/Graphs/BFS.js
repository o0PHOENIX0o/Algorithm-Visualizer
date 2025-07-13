import { Base, compare } from "../Base.js"
import { DrawArray, Line, Circle, PointerTriangles, clearCanvas } from '../../canvas.js';


class DFSClass extends Base {
    constructor() {
        super("BFS", 10, 40);
    }

    async BFS(Nodes, u) {
        let BFSOrder = [];
        let Queue = [];
        let dist = Array(Nodes.length).fill(Infinity);
        let isSeen = Array(Nodes.length).fill(false);

        const BFSvisit = async (array, u) => {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            Queue.push(u);
            isSeen[u] = true;
            dist[u] = 0;
            array[u].obj.col = this.BaseCol;
            array[u].obj.strokeCol = this.BaseCol;
            this.drawAll();

            await this.delay(1.5 * this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;


            while (Queue.length > 0) {
                console.log(" Queue: ", Queue);
                let v = Queue.shift();
                console.log("BFS visit --> ", v);
                // await this.delay(1.5 * this.TimeoutDelay)
                // await this.waitWhilePaused();
                if (!this.isAnimating) return;
                for (let w = 0; w < array.length; w++) {
                    if (this.adjMatrix[v][w] && !isSeen[w]) {
                        isSeen[w] = true;
                        dist[w] = dist[v] + 1;
                        array[w].obj.col = this.BaseCol;
                        array[w].obj.strokeCol = this.unsortedCol;

                        let { line, arrow } = { ...this.directedEdges[v][w] };
                        line.col = arrow.col = this.sortedCol;
                        line.strokeW = 3;
                        line.label = dist[w];

                        this.drawAll();

                        await this.delay(1.5 * this.TimeoutDelay)
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;

                        Queue.push(w);
                    }
                }
                array[v].obj.col = this.sortedCol;
                array[v].obj.strokeCol = this.sortedCol;
                BFSOrder.push(v);
                this.drawAll();

                await this.delay(1.5 * this.TimeoutDelay);
            }

            this.directedEdges.forEach((row, i) => {
                row.forEach((edge, j) => {
                    if (edge !== null && edge.line.label === "") this.directedEdges[i][j] = null;
                })
            })
            console.log("Final directed edges: ", this.directedEdges);
            this.drawAll();
            await this.delay(this.TimeoutDelay);

            console.log("BFS Order: ", BFSOrder);

        }

        console.log(u);
        if (u === -1) await BFSvisit(Nodes, 0);
        else await BFSvisit(Nodes, u);

        console.log(BFSOrder);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.BFS(this.objNodeArray, this.key);


        this.isAnimating = false;
    }
};

export const BFS = new DFSClass();