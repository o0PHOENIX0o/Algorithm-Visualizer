import { Base, compare } from "../Base.js"
import { DrawArray, Square, clearCanvas } from '../../canvas.js';

class mergeSortClass extends Base {
    constructor() {
        super("Merge Sort", 8, 30);
        this.squareArray = [];
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
        this.squareArray = [];
        this.isAnimating = false;
        this.isPause = false;
        this.i = null;
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
                DrawArray(this.squareArray);
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

    async drawSquare(array) {
        if (!this.isAnimating) return;
        let r = array[0].obj.dia / 2;
        let x1 = array[0].obj.xPos - (r + 5);
        let y1 = array[0].obj.yPos + (r + 10);

        let x2 = array[array.length - 1].obj.xPos + (r + 5);
        let y2 = array[array.length - 1].obj.yPos - (r + 10);

        this.squareArray.push(new Square(x1, y1, x2, y2, this.unsortedCol));

        DrawArray(this.squareArray);

        await this.delay(this.TimeoutDelay);
    }

    async merge(left, right) {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        let r = left[0].obj.dia / 2;
        let i = 0, j = 0, k = 0;
        let combined = [];

        let boxL = this.squareArray[this.squareArray.length - 2];
        let boxR = this.squareArray[this.squareArray.length - 1];

        let startX = boxL.xPos1 + r + 5;
        let targetY = left[0].obj.yPos - 70;

        let space = this.spacing + 2 * r + 4.5;
        if (this.squareArray.length == 2) space = this.spacing + left[0].obj.dia;


        while (i < left.length && j < right.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let element;
            if (compare(right[j], left[i])) element = left[i++];
            else element = right[j++];

            let targetX = startX + k * space;
            await this.move(element.obj, targetX, targetY, 4, this.squareArray);
            combined.push(element);
            k++;
        }

        while (i < left.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;


            let targetX = startX + k * space;
            await this.move(left[i].obj, targetX, targetY, 4);
            combined.push(left[i++]);
            k++;
        }

        while (j < right.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;


            let targetX = startX + k * space;
            await this.move(right[j].obj, targetX, targetY, 4);
            combined.push(right[j++]);
            k++;
        }

        boxL.col = this.sortedCol;
        boxR.col = this.sortedCol;
        boxL.strokeW = boxR.strokeW = 4;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        DrawArray(this.squareArray);

        if (!this.isAnimating) return;
        this.squareArray.pop()
        this.squareArray.pop()
        await this.delay(this.TimeoutDelay * 2);

        return combined;
    }


    async mergeSortAlgo(Array, depth) {
        await this.waitWhilePaused();

        if (Array.length <= 1) {
            Array[0].obj.col = this.sortedCol;
            DrawArray(this.squareArray);
            return Array;
        }
        let mid = Math.floor(Array.length / 2);
        let leftArray = Array.slice(0, mid);
        let rightArray = Array.slice(mid);

        await this.waitWhilePaused();
        await this.drawSquare(leftArray);
        await this.drawSquare(rightArray);
        await this.waitWhilePaused();

        await this.waitWhilePaused();
        await this.moveDiagonal(leftArray, Math.PI / (2 + Array.length * 0.1), -1, depth, 70);
        await this.moveDiagonal(rightArray, Math.PI / (2 + Array.length * 0.1), 1, depth, 70);
        await this.waitWhilePaused();

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        let left = await this.mergeSortAlgo(leftArray, depth + 1);
        let right = await this.mergeSortAlgo(rightArray, depth + 1);

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        return await this.merge(left, right, depth);
    }

    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return; 
        
        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2)));

        await this.waitWhilePaused();
        if (!this.isAnimating) return; 
        
        await this.mergeSortAlgo(this.objNodeArray, 1);
        await this.waitWhilePaused();
    }

    async run() {
        this.isAnimating = true;

        await this.algoExecutor();

        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;
        DrawArray(this.squareArray);

        this.isAnimating = false;
    }


};

export const mergeSort = new mergeSortClass();