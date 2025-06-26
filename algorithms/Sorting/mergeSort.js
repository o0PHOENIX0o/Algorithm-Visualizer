import { BaseSort, compare } from "./Base.js"
import { DrawArray, clearCanvas, PointerArrow, Sqare, height, width } from '../../canvas.js';

class mergeSortClass extends BaseSort {
    constructor() {
        super("Merge Sort", 8, 30);
        this.i = null;
    }

    async move(element, x, y, speedFactor = 4, sqareArray) {
        // console.log(element);           
        return new Promise(resolve => {
            const startX = element.xPos, startY = element.yPos;
            let t = 0;
            const animate = async () => { 
                t = min(t + (speedFactor * this.AnimationSpeed), 1);
                element.xPos = lerp(startX, x, t);
                element.yPos = lerp(startY, y, t);
                DrawArray(sqareArray);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });

    }

    moveDiagonal(elements, angle, dir, depth, offsetY = 50, sqareArray) {
        let i;
        console.log("diag move --> ", elements);
        i = (dir > 0) ? 1 : elements.length;
        return Promise.all(
            elements.map((element) => {
                const y = element.obj.yPos + offsetY;
                const offsetX = Math.floor(y / Math.tan(angle));
                const x = element.obj.xPos + ((i * dir * offsetX) / depth);
                // console.log(x, i);
                (dir > 0) ? i += 0.1 : i -= 0.1;
                return this.move(element.obj, x, y, 4, sqareArray);
            })
        );
    };

    async drawSquare(sqareArray, array) {
        let r = array[0].obj.dia / 2;
        let x1 = array[0].obj.xPos - (r + 5);
        let y1 = array[0].obj.yPos + (r + 10);

        let x2 = array[array.length - 1].obj.xPos + (r + 5);
        let y2 = array[array.length - 1].obj.yPos - (r + 10);

        sqareArray.push(new Sqare(x1, y1, x2, y2, "#f44336"));

        DrawArray(sqareArray);

        await this.delay(this.TimeoutDelay);
    }

    async run() {
        this.isAnimating = true;
        let sqareArray = [];
        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2)));

        const merge = async (left, right, sqareArray) => {
            let r = left[0].obj.dia / 2;
            let i = 0, j = 0, k = 0;
            let combined = [];

            let boxL = sqareArray[sqareArray.length - 2];
            let boxR = sqareArray[sqareArray.length - 1];

            let startX = boxL.xPos1 + r + 5;
            let targetY = left[0].obj.yPos - 70;

            let space = this.spacing + 2 * r + 4.5;
            if (sqareArray.length == 2) space = this.spacing + left[0].obj.dia;

            while (i < left.length && j < right.length) {
                let element;
                if (compare(right[j], left[i])) element = left[i++];
                else element = right[j++];

                let targetX = startX + k * space;
                await this.move(element.obj, targetX, targetY, 4, sqareArray);
                combined.push(element);
                k++;
            }

            while (i < left.length) {
                let targetX = startX + k * space;
                await this.move(left[i].obj, targetX, targetY, 4, sqareArray);
                combined.push(left[i++]);
                k++;
            }

            while (j < right.length) {
                let targetX = startX + k * space;
                await this.move(right[j].obj, targetX, targetY, 4, sqareArray);
                combined.push(right[j++]);
                k++;
            }

            boxL.col = this.sortedCol;
            boxR.col = this.sortedCol;
            boxL.strokeW = boxR.strokeW = 4;

            DrawArray(sqareArray);

            sqareArray.pop()
            sqareArray.pop()
            await this.delay(this.TimeoutDelay * 2);

            return combined;
        }


        const mergeSortAlgo = async (Array, depth, sqareArray) => { 
            if (Array.length <= 1) {
                Array[0].obj.col = this.sortedCol;
                DrawArray(sqareArray);
                return Array;
            }
            let mid = Math.floor(Array.length / 2);
            let leftArray = Array.slice(0, mid);
            let rightArray = Array.slice(mid);

            await this.drawSquare(sqareArray, leftArray);
            await this.drawSquare(sqareArray, rightArray);

            await this.moveDiagonal(leftArray, Math.PI / (2 + Array.length * 0.1), -1, depth, 70, sqareArray);
            await this.moveDiagonal(rightArray, Math.PI / (2 + Array.length * 0.1), 1, depth, 70, sqareArray);
            await this.delay(this.TimeoutDelay);

            let left = await mergeSortAlgo(leftArray, depth + 1, sqareArray);
            let right = await mergeSortAlgo(rightArray, depth + 1, sqareArray);

            this.delay(this.TimeoutDelay)
            return await merge(left, right, sqareArray, depth);
        }


        await mergeSortAlgo(this.objNodeArray, 1, sqareArray);

        await this.delay(this.TimeoutDelay);
        DrawArray(sqareArray);

        this.i = null;
        this.isAnimating = false;
    }
};

export const mergeSort = new mergeSortClass();