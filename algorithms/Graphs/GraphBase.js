import { Base } from '../Base.js';
import { DrawArray, Line, Circle, PointerTriangles, clearCanvas, height, width } from '../../canvas.js';


export class GraphBase extends Base {
    constructor(name, spacing, diameter, radius = 150) {
        super(name, spacing, diameter);
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};
        this.radius = radius;
        this.highlightColors = ['#FFD54F', '#4FC3F7', '#6858f8ff', '#FF8A65', '#BA68C8', '#F06292', '#e6ad98ff', '#9575CD', '#64B5F6', '#E57373'];

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


    isGraphConnected() {
        const visited = new Array(this.inputArray.length).fill(false);
        const queue = [0];

        while (queue.length) {
            const node = queue.shift();
            if (visited[node]) continue;
            visited[node] = true;

            for (let neighbor = 0; neighbor < this.inputArray.length; neighbor++) {
                if (this.directedEdges[node][neighbor] || this.directedEdges[neighbor][node]) {
                    if (!visited[neighbor]) queue.push(neighbor);
                }
            }
        }

        for (let i = 0; i < visited.length; i++) {
            if (!visited[i]) {
                console.warn(`Vertex ${this.inputArray[i]} is not connected to the graph.`);
                alert(`Vertex ${this.inputArray[i]} is not connected to the graph.\n"Prim's algorithm requires a connected graph."`);
                return false;
            }
        }

        return true;
    }


    drawAll(otherObjects = []) {
        let objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow? edge.arrow : null]);
        if (otherObjects.length > 0) DrawArray([...objects, ...otherObjects]);
        else DrawArray(objects);
    }

    createArrow(posA, posB, w) {
        let dx = posB.xPos - posA.xPos;
        let dy = posB.yPos - posA.yPos;
        let angle = atan2(dy, dx);
 
        let offset = this.dia / 2;
        let startX = posA.xPos + offset * cos(angle);
        let startY = posA.yPos + offset * sin(angle);
        let endX = posB.xPos - offset * cos(angle);
        let endY = posB.yPos - offset * sin(angle);

        let line = new Line(startX, startY, endX, endY, 0, 1, w ?? "", this.unsortedCol);
        let pointerTriangle = new PointerTriangles(0, 0, -8, -5, -8, 5, 0, angle, endX, endY);
        let arrow = { line: line, arrow: pointerTriangle };
        return arrow;
    }

    generate(input, edges, startVertex, adjMatrix) {
        if (input.length < 1) return;
        this.inputArray = [...input];
        this.key = startVertex; 
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

            if(this.name === "prim" || this.name === "kruskal") {
                let line = {line: new Line(posA.xPos, posA.yPos, posB.xPos,posB.yPos, 0, 1, w ?? "", this.unsortedCol), arrow: null}
                this.directedEdges[this.indexMap[from]][this.indexMap[to]] = line;
                this.directedEdges[this.indexMap[to]][this.indexMap[from]] = line;
            }else{
                let arrow = this.createArrow(posA, posB, w, from, to);
                this.directedEdges[this.indexMap[from]][this.indexMap[to]] = arrow;
            }
        }

        let objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow]);
        DrawArray(objects);
    }

    getRandomColor() { return this.highlightColors[Math.floor(Math.random() * this.highlightColors.length)]; }

}


export class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    initialize(array, priority = Infinity) {
        this.elements = array.map(item => ({ item, priority }))
    }


    enqueue(item, priority) {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority)
    }

    deQueue() {
        if (this.isEmpty()) return null;
        return this.elements.shift();
    }

    decreaseKey(index, newPriority) {
        for (let element of this.elements) {
            if (element.item.index === index) {
                element.priority = newPriority;
                break;
            }
        }
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    getElementAt(index) {
        return this.elements.find(element => element.item.index === index);
    }

    getPriorityOf(index) {
        return this.elements.find(element => element.item.index === index).priority;
    }

    isEmpty() { return this.elements.length === 0; }

    size() { return this.elements.length; }

    getElements() {
        return this.elements;
    }

}