import { DrawArray, Line, Circle, PointerTriangles, clearCanvas } from '../../canvas.js';
import { GraphBase } from './GraphBase.js';


class DFSClass extends GraphBase {
    constructor() {
        super("DFS", 10, 40);
    }


    async DFS(Nodes, adjM, u) {
        let DFSOrder = [];
        let isSeen = Array(Nodes.length).fill(false);

        const DFSvisit = async (array, u, highlightColor) => {
            console.log(highlightColor)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            array[u].obj.col = this.BaseCol;
            this.drawAll();
            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            isSeen[u] = true;
            DFSOrder.push(u);

            for (let v = 0; v < array.length; v++) {
                if (adjM[u][v]) {
                    array[v].obj.strokeCol = this.unsortedCol;
                    array[v].obj.strokeW = 4;
                    this.drawAll();

                    await this.delay(2 * this.TimeoutDelay);
                    await this.waitWhilePaused();
                    if (!this.isAnimating) return;

                    if (!isSeen[v]) {
                        let { line, arrow } = { ...this.directedEdges[u][v] };
                        line.col = arrow.col = highlightColor;
                        line.strokeW = 3;
                        this.drawAll();

                        await this.delay(this.TimeoutDelay);
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;
                        await DFSvisit(array, v, highlightColor);
                    } else {
                        array[v].obj.strokeCol = highlightColor;
                    }
                }
            }
            array[u].obj.col = highlightColor;
            array[u].obj.strokeCol = highlightColor;
            this.drawAll();

            await this.delay(1.5 * this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
        }

        console.log(u);
        if (u === -1) {
            const highlightColors = ['#FFD54F', '#4FC3F7', '#81C784', '#FF8A65', '#BA68C8', '#F06292', '#A1887F', '#9575CD', '#64B5F6', '#E57373'];
            for (let u = 0; u < Nodes.length; u++)
                if (!isSeen[u]) await DFSvisit(Nodes, u, highlightColors[u % highlightColors.length]);
            
        } else await DFSvisit(Nodes, u);

        this.directedEdges.forEach((row, i) => {
            row.forEach((edge, j) => {
                if (edge !== null && edge.line.col == 0) this.directedEdges[i][j] = null;
            })
        })
        console.log("Final directed edges: ", this.directedEdges);
        this.drawAll();
        await this.delay(this.TimeoutDelay);

        console.log(DFSOrder);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.DFS(this.objNodeArray, this.adjMatrix, this.key);

        this.isAnimating = false;
    }
};

export const DFS = new DFSClass();