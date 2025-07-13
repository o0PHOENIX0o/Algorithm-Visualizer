import { DrawArray, Line, Circle, PointerTriangles, clearCanvas } from '../../canvas.js';
import { GraphBase } from './GraphBase.js';


class DFSClass extends GraphBase {
    constructor() {
        super("DFS", 10, 40);
    }


    async DFS(Nodes, u) {
        let DFSOrder = [];
        let isSeen = Array(Nodes.length).fill(false);

        const DFSvisit = async (array, u) => {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            this.objNodeArray[u].obj.col = this.BaseCol;
            this.drawAll();
            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            isSeen[u] = true;
            DFSOrder.push(u);

            for (let v = 0; v < this.adjMatrix[u].length; v++) {
                if (this.adjMatrix[u][v]) {
                    console.log("adj of ", u, " -> ", v)
                    this.objNodeArray[v].obj.strokeCol = this.unsortedCol;
                    this.objNodeArray[v].obj.strokeW = 4;
                    this.drawAll();

                    await this.delay(2 * this.TimeoutDelay);
                    await this.waitWhilePaused();
                    if (!this.isAnimating) return;

                    if (!isSeen[v]) {
                        let { line, arrow } = { ...this.directedEdges[u][v] };
                        line.col = arrow.col = this.sortedCol;
                        line.strokeW = 3;
                        this.drawAll();

                        await this.delay(this.TimeoutDelay);
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;
                        await DFSvisit(array, v);
                    } else {
                        this.objNodeArray[v].obj.strokeCol = this.sortedCol;
                    }
                }
            }
            this.objNodeArray[u].obj.col = this.sortedCol;
            this.objNodeArray[u].obj.strokeCol = this.sortedCol;
            this.drawAll();

            await this.delay(1.5 * this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
        }

        console.log(u);
        if (u === -1) {
            for (let u = 0; u < Nodes.length; u++)
                if (!isSeen[u]) await DFSvisit(Nodes, u);
        } else await DFSvisit(Nodes, u);

        console.log(DFSOrder);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.DFS(this.objNodeArray, this.key);


        this.isAnimating = false;
    }
};

export const DFS = new DFSClass();