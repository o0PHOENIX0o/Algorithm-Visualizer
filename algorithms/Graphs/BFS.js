import { Base, compare } from "../Base.js"
import { DrawArray, Line, Circle, PointerTriangles, clearCanvas } from '../../canvas.js';


class DFSClass extends Base {
    constructor() {
        super("BFS", 10, 40);
        this.edgeList = []; //raw edge input
        // this.inputArray = []; --> in base class, stores raw vertices input

        this.adjMatrix = [];
        this.directedEdges = []; //2d array of objects
        this.indexMap = {}; // A-> 0, B-> 1,..
        this.radius = 150;

    }

    Play() {
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
            this.isPause = false;
            this.run();
        }
    }

    reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};


        this.isAnimating = false;
        this.isPause = false;
        clearCanvas();
        DrawArray(null);
    }

    createArrow(posA, posB, w) {
        let dx = posB.xPos - posA.xPos;
        let dy = posB.yPos - posA.yPos;
        let angle = atan2(dy, dx); // slope

        // avoid line inside the circle 
        let offset = this.dia / 2;
        let startX = posA.xPos + offset * cos(angle);
        let startY = posA.yPos + offset * sin(angle);
        let endX = posB.xPos - offset * cos(angle);
        let endY = posB.yPos - offset * sin(angle);

        let line = new Line(startX, startY, endX, endY, 0, 1, (w) ? w : "", this.unsortedCol);
        let pointerTriangle = new PointerTriangles(0, 0, -8, -5, -8, 5, 0, angle, endX, endY);
        let arrow = { line: line, arrow: pointerTriangle };
        return arrow;
    }

    generate(input, edges, startVertex, adjMatrix) {
        if (input.length < 1) return;
        this.inputArray = [...input];
        this.key = startVertex; // index of start vertex
        this.edgeList = structuredClone(edges);
        this.adjMatrix = structuredClone(adjMatrix);
        console.log(this.adjMatrix);
        clearCanvas();

        input.forEach((v, i) => this.indexMap[v] = i);

        this.objNodeArray = [];

        input.forEach(element => {
            const circle = new Circle(0, 0, this.dia, element, "#ffffff", "#000000", "#000000");
            this.objNodeArray.push({ index: this.indexMap[element], obj: circle });
        });


        let centerX = width / 2;
        let centerY = height / 2;

        for (let i = 0; i < input.length; i++) {
            let angle = map(i, 0, input.length, 0, TWO_PI);
            let x = centerX + this.radius * 1.5 * cos(angle);
            let y = centerY + this.radius * sin(angle);
            this.objNodeArray[i].obj.xPos = x;
            this.objNodeArray[i].obj.yPos = y;
        }

        this.directedEdges = Array.from({ length: input.length }, () => Array(input.length).fill(null));
        for (let [from, to, w] of edges) {
            let posA = { xPos: this.objNodeArray[this.indexMap[from]].obj.xPos, yPos: this.objNodeArray[this.indexMap[from]].obj.yPos };
            let posB = { xPos: this.objNodeArray[this.indexMap[to]].obj.xPos, yPos: this.objNodeArray[this.indexMap[to]].obj.yPos }
            let arrow = this.createArrow(posA, posB, w, from, to);
            this.directedEdges[this.indexMap[from]][this.indexMap[to]] = arrow;
        }


        let objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
        console.log("call draw arry", objects);
        DrawArray(objects);
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
            let objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
            DrawArray(objects);
            await this.delay(1.5 * this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;


            while (Queue.length > 0){
                console.log(" Queue: ", Queue);
                let v = Queue.shift();
                console.log("BFS visit --> ", v);
                // await this.delay(1.5 * this.TimeoutDelay)
                // await this.waitWhilePaused();
                if (!this.isAnimating) return;
                for (let w = 0; w < array.length; w++) {
                    if (this.adjMatrix[v][w] && !isSeen[w]){
                        isSeen[w] = true;
                        dist[w] = dist[v] + 1;
                        array[w].obj.col = this.BaseCol;
                        array[w].obj.strokeCol = this.unsortedCol;

                        let { line, arrow } = { ...this.directedEdges[v][w] };
                        line.col = arrow.col = this.sortedCol;
                        line.label = dist[w];

                        objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
                        DrawArray(objects);
                        await this.delay(1.5 * this.TimeoutDelay)
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;

                        Queue.push(w);
                    }
                }
                array[v].obj.col = this.sortedCol;
                array[v].obj.strokeCol = this.sortedCol;
                BFSOrder.push(v);
                objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
                DrawArray(objects);
                await this.delay(1.5 * this.TimeoutDelay);
            }

            this.directedEdges.forEach((row,i)=>{
                row.forEach((edge,j)=>{
                    if(edge !== null && edge.line.label === "") this.directedEdges[i][j] = null;
                  })
            })
            console.log("Final directed edges: ", this.directedEdges);
            objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
            DrawArray(objects);

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