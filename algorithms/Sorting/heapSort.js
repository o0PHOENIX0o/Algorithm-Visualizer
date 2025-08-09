import { Base, compare } from "../Base.js"
import { DrawArray, Line, Triangle, clearCanvas, width, PointerArrow, height } from '../../canvas.js';

class heapSortClass extends Base {
    constructor() {
        super("Heap Sort", 10, 30);
        this.triangleArray = [];
        this.lineArray = [];
        this.arrows = [];
        this.objPositions = [];
    }

    Play() {
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
            this.isAnimating = true;
            this.isPause = false;
            this.run();
        }
    }

    async reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.triangleArray = [];
        this.lineArray = [];
        this.arrows = [];
        this.isAnimating = false;
        this.isPause = false;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }



    async move(element, x, y, speedFactor = 4) {
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
                DrawArray([...this.triangleArray, ...this.lineArray]);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    }

    async drawTriangle(parent, left, leftChild, rightChild) {
        if (!this.isAnimating) return;
        let d = Math.floor(Math.log2(left + 1) + 1);
        let dist = (parent.dia + 100) / d;
        let offY = 10 + parent.dia / 2;
        let offX = Math.sqrt((dist ** 2) - (offY ** 2)) + d + 15;

        let x1, y1, x2, y2, x3, y3, x4, y4;
        if (leftChild && rightChild) {
            x1 = parent.xPos;
            y1 = parent.yPos - dist;

            x2 = leftChild.xPos - offX;
            y2 = leftChild.yPos + offY;

            x3 = rightChild.xPos + offX;
            y3 = rightChild.yPos + offY;

            x4 = x1;
            y4 = y1;
        } else if (leftChild) {
            x1 = parent.xPos - offX;
            y1 = parent.yPos - offY;

            x2 = parent.xPos + offX;
            y2 = y1;

            x3 = leftChild.xPos + offX;
            y3 = leftChild.yPos + offY;

            x4 = leftChild.xPos - offX;
            y4 = y3;
        } else if (rightChild) {
            x1 = parent.xPos - offX;
            y1 = parent.yPos - offY;

            x2 = parent.xPos + offX;
            y2 = y1;

            x3 = rightChild.xPos + offX;
            y3 = rightChild.yPos + offY;

            x4 = rightChild.xPos - offX;
            y4 = y3;
        }

        this.triangleArray = [new Triangle({x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4, col: this.unsortedCol})];
        DrawArray([...this.triangleArray, ...this.lineArray, ...this.arrows]);
        await this.delay(this.TimeoutDelay);
    }



    async buildBTree(Array) { 
        const buildBranch = async (Array, i, offsetX, dir, depth) => { // dir -ve: for odd index -> left node, +ve for even -> right node 
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let element = Array[i];
            if (i == 0) {
                let targetX = width / 2;
                let targetY = depth * (element.obj.dia + this.spacing + 70);
                console.log(element, depth);
                this.move(element.obj, targetX, targetY, 4);
                await this.waitWhilePaused();
                return
            }
            let parent = Array[Math.floor((i - 1) / 2)];
            let curX = parent.obj.xPos;
            let curY = parent.obj.yPos
            let targetX = parent.obj.xPos + (dir * offsetX) - (dir * depth);
            let targetY = (parent.obj.yPos + element.obj.dia + this.spacing + 10);
            await this.move(element.obj, targetX, targetY, 4);
            await this.waitWhilePaused();

            this.lineArray.push(new Line({x1: curX, y1: curY, x2: targetX, y2: targetY, col: 0}));
            DrawArray([...this.triangleArray, ...this.lineArray]);
            await this.waitWhilePaused();

            this.delay(this.TimeoutDelay);
        }


        let dia = Array[0].obj.dia;
        let d = 1;
        let maxD= 4;
        let totalwidth = 0;
        for(let i = 0; i<maxD; i++){
            totalwidth += 36* Math.pow(2, i);
        }
        console.log('total width', totalwidth)
        console.log('available width', width * 0.9);

        let scalingFactor = Math.min(1, (width * 0.9) / totalwidth);
        let Gap = 36 * scalingFactor;

        for (let i = 0; i < Array.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let dir = (i % 2) ? -1 : 1;
            if ((i + 1) > Math.pow(2, d) - 1) d++;
            await buildBranch(Array, i,  (Gap * (Math.pow(2, maxD - d))), dir, d);
            await this.delay(this.TimeoutDelay);
        }
    }

    


    async Heapify(Array, n, i) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;


        let parent = Array[i].obj, leftChild = (left < n && Array[left]) ? Array[left].obj : null, rightChild = (right < n && Array[right]) ? Array[right].obj : null;

        if (!leftChild && !rightChild) {
            this.triangleArray = [];
            this.arrows = [];
            DrawArray(this.lineArray);
            return;
        };


        parent.col = this.HighlightCol2;
        this.arrows = [
            new PointerArrow({xPos: parent.xPos, yPos: parent.yPos + 25, col: this.HighlightCol, length: 10, label: "i", textCol: 12, textS: 12}),
            new PointerArrow({xPos: parent.xPos, yPos: parent.yPos + 45, col: this.HighlightCol, length: 10, label: "max", textCol: 12, textS: 12})
        ]

        await this.drawTriangle(parent, left, leftChild, rightChild);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;



        let max = i;
        if (left < n && compare(Array[left], Array[max])) {
            max = left;
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            this.arrows[1] = new PointerArrow({xPos: leftChild.xPos, yPos: leftChild.yPos + 25, col: this.HighlightCol, length: 10, label: "max", textCol: 12, textS: 12});
            leftChild.col = this.HighlightCol;

            DrawArray([...this.triangleArray, ...this.lineArray, ...this.arrows]);

            await this.delay(this.TimeoutDelay)
            await this.waitWhilePaused();

        }
        if (right < n && compare(Array[right], Array[max])) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            max = right;
            leftChild.col = this.BaseCol;
            rightChild.col = this.HighlightCol;

            this.arrows[1] = new PointerArrow({xPos: rightChild.xPos, yPos: rightChild.yPos + 25, col: this.HighlightCol, length: 10, label: "max", textCol: 12, textS: 12});

            DrawArray([...this.triangleArray, ...this.lineArray, ...this.arrows]);
            await this.delay(this.TimeoutDelay)
            await this.waitWhilePaused();

        }

        if (max != i) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            await this.SwapNodes(Array[max].obj, Array[i].obj, [...this.triangleArray, ...this.lineArray], 3);
            [Array[max], Array[i]] = [Array[i], Array[max]];
            await this.delay(2 * this.TimeoutDelay);
            await this.waitWhilePaused();

            this.arrows = [];
            parent.col = this.BaseCol;
            if (leftChild) leftChild.col = this.BaseCol;
            if (rightChild) rightChild.col = this.BaseCol;
            if (!this.isAnimating) return;

            await this.Heapify(Array, n, max);
        } else {
            this.triangleArray = [];
            this.arrows = [];
            parent.col = this.BaseCol;
            DrawArray(this.lineArray);
            return;
        }

    }


    async buildHeap(Array) {
        for (let i = Math.floor(Array.length / 2 - 1); i >= 0; i--) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            await this.Heapify(Array, Array.length, i);
            await this.waitWhilePaused();
        }
    }

    async heapSort(Array) {
        await this.buildHeap(Array);
        for (let i = Array.length - 1; i >= 0; i--) {
            if (!this.isAnimating) return;

            Array[0].obj.col = this.sortedCol;
            await this.SwapNodes(Array[0].obj, Array[i].obj, [...this.triangleArray, ...this.lineArray]);
            [Array[0], Array[i]] = [Array[i], Array[0]];
            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();

            await this.move(Array[i].obj, this.objPositions[i].x, this.objPositions[i].y);
            await this.waitWhilePaused();

            this.lineArray.pop();
            await this.delay(this.TimeoutDelay);
            if (!this.isAnimating) return;

            await this.Heapify(Array, i, 0);
            DrawArray(this.lineArray);
        }
    }

    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        
        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2))); //animateY -> move all nodes to the top of the canvas (in base class)
        await this.waitWhilePaused();
        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;

        this.objNodeArray.forEach((element => this.objPositions.push({ x: element.obj.xPos, y: element.obj.yPos })))

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        await this.buildBTree(this.objNodeArray);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        await this.heapSort(this.objNodeArray);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, (height / 2 - 30), 2)));

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.waitWhilePaused();
    }

    async run() {
        this.isAnimating = true;

        await this.algoExecutor();

        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;
        DrawArray([...this.triangleArray, ...this.lineArray]);

        this.isAnimating = false;
    }


};

export const heapSort = new heapSortClass();