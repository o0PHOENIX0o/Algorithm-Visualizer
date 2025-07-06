// let vertices = ['A',  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', "J"];
// let edges = [
//   ['A', 'B'],
//   ['A', 'C'],
//   ['B', 'D'],
//   ['B', 'E'],
//   ['C', 'F'],
//   ['E', 'G'],
//   ['F', 'H'],
//   ['F', 'I'],
//   ['H', 'J']
// ];

import { Base, compare } from "../Base.js"
import { DrawArray, Line, Circle, PointerTriangles, clearCanvas } from '../../canvas.js';


class DFSClass extends Base {
    constructor() {
        super("DFS", 10, 40);
        this.Edges = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.pointerTriangles = [];
        this.indexMap = {};
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
        this.Edges = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.pointerTriangles = [];
        this.indexMap = {};


        this.isAnimating = false;
        this.isPause = false;
        clearCanvas();
        DrawArray(null);
    }

    drawArrow(posA, posB) {
        let dx = posB.xPos - posA.xPos;
        let dy = posB.yPos - posA.yPos;
        let angle = atan2(dy, dx); // slope

        let offset = this.dia / 2;
        let startX = posA.xPos + offset * cos(angle);
        let startY = posA.yPos + offset * sin(angle);
        let endX = posB.xPos - offset * cos(angle);
        let endY = posB.yPos - offset * sin(angle);

        let line = new Line(startX, startY, endX, endY, 0);
        let pointerTriangle = new PointerTriangles(0, 0, -8, -5, -8, 5, 0, angle, endX, endY);
        this.directedEdges.push( {line: line, arrow: pointerTriangle} );
    }

    generate(input, edges, adjMatrix) {
        if (input.length < 1) return;
        this.inputArray = [...input];
        this.Edges = edges.map(rows => rows.slice());
        this.adjMatrix = adjMatrix.map(rows => rows.slice());
        console.log(this.adjMatrix);
        clearCanvas();

        input.forEach((v, i) => this.indexMap[v] = i);

        this.objNodeArray = [];

        input.forEach(element => {
            const circle = new Circle(0, 0, this.dia, element, this.BaseCol);
            this.objNodeArray.push({ index: this.indexMap[element], obj: circle });
        });
        

        let centerX = width / 2;
        let centerY = height / 2;

        for (let i = 0; i < input.length; i++) {
            let angle = map(i, 0, input.length, 0, TWO_PI);
            let x = centerX + this.radius * cos(angle);
            let y = centerY + this.radius * sin(angle);
            this.objNodeArray[i].obj.xPos = x;
            this.objNodeArray[i].obj.yPos = y;
        }

        for (let [from, to] of edges) {
            let posA = { xPos: this.objNodeArray[this.indexMap[from]].obj.xPos, yPos: this.objNodeArray[this.indexMap[from]].obj.yPos };
            let posB = { xPos: this.objNodeArray[this.indexMap[to]].obj.xPos, yPos: this.objNodeArray[this.indexMap[to]].obj.yPos }
            this.drawArrow(posA, posB);
        }

        console.log("call draw arry", this.directedEdges.flatMap(edge => [edge.line, edge.arrow]));
        DrawArray(this.directedEdges.flatMap(edge => [edge.line, edge.arrow]));
        // await this.delay(4*this.TimeoutDelay);
    }

    async DFS(array, key) {

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