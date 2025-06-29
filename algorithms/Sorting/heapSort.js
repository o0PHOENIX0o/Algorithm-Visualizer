import { BaseSort, compare } from "./Base.js"
import { DrawArray, Sqare, Line, clearCanvas, width } from '../../canvas.js';

class heapSortClass extends BaseSort {
    constructor() {
        super("Heap Sort", 8, 30);
        this.triangleArray = [];
        this.lineArray = [];
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
        this.isAnimating = false;
        this.isPause = false;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }



    async move(element, x, y, speedFactor = 4) {
        // console.log("move ", element);
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
                DrawArray(this.lineArray);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });

    }

    moveDiagonal(elements, angle, dir, depth, offsetY = 50) {
        if (!this.isAnimating) return;
        let i;
        i = (dir > 0) ? 1 : elements.length;
        return Promise.all(
            elements.map((element) => {
                if (!this.isAnimating) return;
                const y = element.obj.yPos + offsetY;
                const offsetX = Math.floor(y / Math.tan(angle));
                const x = element.obj.xPos + ((i * dir * offsetX) / depth);
                (dir > 0) ? i += 0.1 : i -= 0.1;
                return this.move(element.obj, x, y, 4);
            })
        );
    };

    async drawTriangle(array) {
        if (!this.isAnimating) return;
        let r = array[0].obj.dia / 2;
        let x1 = array[0].obj.xPos - (r + 5);
        let y1 = array[0].obj.yPos + (r + 10);

        let x2 = array[array.length - 1].obj.xPos + (r + 5);
        let y2 = array[array.length - 1].obj.yPos - (r + 10);

        this.triangleArray.push(new Sqare(x1, y1, x2, y2, "#f44336"));

        DrawArray(this.triangleArray);
        await this.delay(this.TimeoutDelay);
    }

    async addLeftElement(element) {

    }
    async addRightElement(element) {

    }

//     async buildTree(Array, i) {
//     let element = Array[i];

//     // Calculate the depth (level) of the node
//     let depth = Math.floor(Math.log2(i + 1));
//     let indexInLevel = i - Math.pow(2, depth) + 1;
//     let nodesInLevel = Math.pow(2, depth);

//     // Set spacing values
//     const verticalSpacing = element.obj.dia + this.spacing + 10;
//     const horizontalSpacing = thiswidth / (nodesInLevel + 1);

//     // Calculate final X and Y
//     let targetX = horizontalSpacing * (indexInLevel + 1);
//     let targetY = (depth + 1) * verticalSpacing;

//     // Animate the move
//     await this.move(element.obj, targetX, targetY, 4);
// }


    async buildTree(Array, i, offsetX, dir, depth){ // dir -ve: for odd index, +ve for even 
        let element = Array[i];
        console.log("--> ",i)
        if( i == 0) {
            let targetX = width/2;
            let targetY = depth * (element.obj.dia + this.spacing + 50);
            console.log(element, depth);
            this.move(element.obj, targetX, targetY, 4);
            return
        }
        let parent = Array[Math.floor((i - 1) / 2)];
        let curX = parent.obj.xPos;
        let curY = parent.obj.yPos
        console.log(element, parent, depth);
        let targetX = parent.obj.xPos + (dir * offsetX) - (dir * depth);
        let targetY =(parent.obj.yPos + element.obj.dia + this.spacing + 10);
        await this.move(element.obj, targetX, targetY, 4);
        this.lineArray.push(new Line(curX, curY, targetX, targetY, 0));
        DrawArray(this.lineArray);
        this.delay(this.TimeoutDelay);
    }   

    async Heapify(Array, n, i) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        let max = i;

        if (left < n && compare(Array[left], Array[max])) {
            max = left;
        }
        if (right < n && compare(Array[right], Array[max])) {
            max = right;
        }

        if (max != i) {
            [Array[max], Array[i]] = [Array[i], Array[max]];
            await this.Heapify(Array, n, max);
        }

    }


    async buildHeap(Array) {
        for (let i = Array.length / 2 - 1; i >= 0; i--) {
            await this.Heapify(Array, Array.length, i);
        }
    }

    async heapSort(Array) {
        await this.buildHeap(Array);
        for (let i = Array.length - 1; i >= 0; i--) {
            [Array[0], Array[i]] = [Array[i], Array[0]];
            await this.Heapify(Array, i, 0);
        }
    }

    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2)));

        let dia = this.objNodeArray[0].obj.dia;
        let d = 1;
        for(let i = 0; i<this.objNodeArray.length; i++){
            let dir = (i%2) ? -1:1;
            if ((i+1) > Math.pow(2,d)-1) d++;
            await this.buildTree(this.objNodeArray, i, (this.spacing + dia + 250)/( Math.pow(2, d-1)), dir, d);
            console.log(this.lineArray)
            await this.delay(this.TimeoutDelay);
        }


        // await this.buildTree(this.objNodeArray, 0, (this.spacing + dia + 70)/1, 1, 1);
        // await this.delay(2 * this.TimeoutDelay);
        // await this.buildTree(this.objNodeArray, 1, (this.spacing + dia + 70)/2, -1, 2);
        // await this.buildTree(this.objNodeArray, 2, (this.spacing + dia + 70)/2, 1, 2);
        // await this.delay(2 * this.TimeoutDelay);
        // await this.buildTree(this.objNodeArray, 3, (this.spacing + dia + 70)/3, -1, 3);
        // await this.buildTree(this.objNodeArray, 4, (this.spacing + dia + 70)/3, 1, 3);
        // await this.delay(2 * this.TimeoutDelay);

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        // await this.heapSort(this.objNodeArray);
        console.log(this.objNodeArray);
        await this.waitWhilePaused();
    }

    async run() {
        this.isAnimating = true;

        await this.algoExecutor();

        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;
        DrawArray(this.lineArray);

        this.isAnimating = false;
    }


};

export const heapSort = new heapSortClass();