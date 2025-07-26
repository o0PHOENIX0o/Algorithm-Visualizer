import { Base } from '../Base.js';
import { DrawArray, Line, Circle, PointerTriangles, clearCanvas, height, width, Square } from '../../canvas.js';


export class GraphBase extends Base {
    constructor(name, spacing, diameter, radius = 150) {
        super(name, spacing, diameter);
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};
        this.radius = radius;
        this.highlightColors = ['#FFD54F', '#4FC3F7', '#6858f8ff', '#FF8A65', '#BA68C8', '#F06292', '#e6ad98ff', '#9575CD', '#64B5F6', '#E57373'];
        this.scaleFactor = 1;
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
        let objects = this.directedEdges.flat().filter(element => element != null).flatMap(edge => [edge.line, edge.arrow ? edge.arrow : null]);
        if (otherObjects.length > 0) DrawArray([...objects, ...otherObjects]);
        else DrawArray(objects);
    }

    createArrow(posA, posB, w, sf=1) {
        let dx = posB.xPos - posA.xPos;
        let dy = posB.yPos - posA.yPos;
        let angle = atan2(dy, dx);

        let offset = (this.dia * this.scaleFactor) / 2;
        let startX = posA.xPos + offset * cos(angle);
        let startY = posA.yPos + offset * sin(angle);
        let endX = posB.xPos - offset * cos(angle);
        let endY = posB.yPos - offset * sin(angle);

        let weight;
        if (this.name == 'BFS' || this.name == 'DFS') weight = "";
        else weight = w ?? "";

        
        let line = new Line({x1: startX, y1: startY, x2: endX, y2: endY, col: 0, strokeW: 1, label: weight, textCol: this.unsortedCol});
        
        let pointerTriangle = new PointerTriangles({x1: 0, y1: 0, x2: -8, y2: -5, x3: -8, y3: 5, col: 0, angle: angle, tx: endX, ty: endY});

        let arrow = { line: line, arrow: pointerTriangle };
        return arrow;
    }

    BoxAround(index, Nodes, Boxtext) {
        let offset = 5 + (Nodes[index].obj.dia * this.scaleFactor) / 2;

        let BoxX1 = Nodes[index].obj.xPos - offset;
        let BoxY1 = Nodes[index].obj.yPos + offset;

        let BoxX2 = Nodes[index].obj.xPos + offset;
        let BoxY2 = Nodes[index].obj.yPos - offset;

        let BoxH = Math.abs(BoxY2 - BoxY1);

        let box = new Square({xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.HighlightCol2, strokeW: 2, text: Boxtext, textCol: 0, textYOffset: -(10 + BoxH / 2)});

        return box;
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

        let centerX = width / 2;
        let centerY = height / 2;

        let availableWidth = width * 0.9; 
        let totalLength = 2 * (this.radius + this.dia * 2);
        this.scaleFactor = Math.min(1, availableWidth/ totalLength);

        let sclaedRadius = this.radius * this.scaleFactor
        let scaledDia = this.dia * this.scaleFactor;

        this.objNodeArray = [];

        input.forEach(element => {
            const circle = new Circle({ xPos: 0, yPos: 0, dia: scaledDia, label: element, col: "#ffffff", textCol: "#000000", strokeCol: "#000000" });
            this.objNodeArray.push({ index: this.indexMap[element], obj: circle });
        });


        

        for (let i = 0; i < input.length; i++) {
            let angle = map(i, 0, input.length, 0, TWO_PI);
            let x = centerX + sclaedRadius * 1.5 * cos(angle);
            let y = centerY + sclaedRadius * sin(angle);
            this.objNodeArray[i].obj.xPos = x;
            this.objNodeArray[i].obj.yPos = y;
        }

        this.directedEdges = Array.from({ length: input.length }, () => Array(input.length).fill(null));
        for (let [from, to, w] of edges) {
            let posA = { xPos: this.objNodeArray[this.indexMap[from]].obj.xPos, yPos: this.objNodeArray[this.indexMap[from]].obj.yPos };
            let posB = { xPos: this.objNodeArray[this.indexMap[to]].obj.xPos, yPos: this.objNodeArray[this.indexMap[to]].obj.yPos }

            if (this.name === "prim" || this.name === "kruskal") {
                let line = { 
                    line: new Line({x1: posA.xPos, y1: posA.yPos, x2: posB.xPos, y2: posB.yPos, col: 0, strokeW: 1, label: w ?? "", textCol:  this.unsortedCol}) , 
                    arrow: null 
                }

                this.directedEdges[this.indexMap[from]][this.indexMap[to]] = line;
                this.directedEdges[this.indexMap[to]][this.indexMap[from]] = line;
            } else {
                let arrow = this.createArrow(posA, posB, w);
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