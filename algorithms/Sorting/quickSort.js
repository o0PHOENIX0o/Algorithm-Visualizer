import { BaseSort, compare } from "./Base.js"
import { DrawArray, PointerArrow, Sqare, clearCanvas } from '../../canvas.js';

class quickSortClass extends BaseSort {
    constructor() {
        super("Quick Sort", 8, 30);
        this.arrows = [];
    }

    Play() {
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
            this.isAnimating = true;
            this.isPause = false;
            this.run();
        }
    }

    async Pause() {
        this.isPause = true;
    }

    async reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.arrows = [];
        this.isAnimating = false;
        this.isPause = false;
        this.i = null;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }



    // async move(element, x, y, speedFactor = 4) {
    //     if (!this.isAnimating) return;
    //     return new Promise(resolve => {
    //         if (!this.isAnimating) return;

    //         const startX = element.xPos, startY = element.yPos;
    //         let t = 0;
    //         const animate = async () => {
    //             if (!this.isAnimating) return;

    //             t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
    //             element.xPos = lerp(startX, x, t);
    //             element.yPos = lerp(startY, y, t);
    //             DrawArray(this.arrows);
    //             if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
    //             else resolve();
    //         };
    //         animate();
    //     });

    // }

    // moveDiagonal(elements, angle, dir, depth, offsetY = 50) {
    //     if (!this.isAnimating) return;
    //     let i;
    //     i = (dir > 0) ? 1 : elements.length;
    //     return Promise.all(
    //         elements.map((element) => {
    //             if (!this.isAnimating) return;
    //             const y = element.obj.yPos + offsetY;
    //             const offsetX = Math.floor(y / Math.tan(angle));
    //             const x = element.obj.xPos + ((i * dir * offsetX) / depth);
    //             (dir > 0) ? i += 0.1 : i -= 0.1;
    //             return this.move(element.obj, x, y, 4);
    //         })
    //     );
    // };

    // async drawSquare(array) {
    //     if (!this.isAnimating) return;
    //     let r = array[0].obj.dia / 2;
    //     let x1 = array[0].obj.xPos - (r + 5);
    //     let y1 = array[0].obj.yPos + (r + 10);

    //     let x2 = array[array.length - 1].obj.xPos + (r + 5);
    //     let y2 = array[array.length - 1].obj.yPos - (r + 10);

    //     this.arrows.push(new Sqare(x1, y1, x2, y2, "#f44336"));

    //     DrawArray(this.arrows);

    //     await this.delay(this.TimeoutDelay);
    // }

    async partition(Array, leftIndex, rightIndex) {
        let pivotIndex = leftIndex;
        let pivotElement = Array[pivotIndex];
        let swapIndex = pivotIndex;
        let i = 1;
        this.arrows = [
            new PointerArrow(pivotElement.obj.xPos, pivotElement.obj.yPos + 40, this.HighlightCol2, 20, "p"),
            new PointerArrow(Array[swapIndex].obj.xPos, Array[swapIndex].obj.yPos + 70, this.HighlightCol2, 20, "s"),
            new PointerArrow(Array[i].obj.xPos, Array[i].obj.yPos + 40, this.HighlightCol2, 20, "i")
        ]
        DrawArray(this.arrows);
        await this.delay(this.TimeoutDelay);

        while (i <= rightIndex) {
            this.arrows = [
                new PointerArrow(pivotElement.obj.xPos, pivotElement.obj.yPos + 40, this.HighlightCol2, 20, "p"),
                new PointerArrow(Array[swapIndex].obj.xPos, Array[swapIndex].obj.yPos + 70, this.HighlightCol2, 20, "s"),
                new PointerArrow(Array[i].obj.xPos, Array[i].obj.yPos + 40, this.HighlightCol2, 20, "i")
            ]
            Array[i].obj.col = this.HighlightCol;
            DrawArray(this.arrows);
            await this.delay(this.TimeoutDelay);


            if (compare(Array[i], pivotElement)) {
                swapIndex++;
                this.arrows[1] = new PointerArrow(Array[swapIndex].obj.xPos, Array[swapIndex].obj.yPos + 70, this.HighlightCol2, 20, "s")
                Array[swapIndex].obj.col = this.HighlightCol;
                DrawArray(this.arrows);
                await this.delay(this.TimeoutDelay);

                await this.swapAnimation(Array[i].obj, Array[swapIndex].obj, this.arrows);
                [Array[i], Array[swapIndex]] = [Array[swapIndex], Array[i]];
            }

            Array[swapIndex].obj.col = this.BaseCol;
            Array[i].obj.col = this.BaseCol;
            i++;
        }

        Array[pivotIndex].obj.col = Array[swapIndex].obj.col = this.HighlightCol;
        DrawArray(this.arrows);
        await this.delay(this.TimeoutDelay);


        await this.swapAnimation(Array[pivotIndex].obj, Array[swapIndex].obj, this.arrows);
        [Array[pivotIndex], Array[swapIndex]] = [Array[swapIndex], Array[pivotIndex]];
        console.log(swapIndex, Array[swapIndex]);
        Array[swapIndex].obj.col = this.sortedCol;

        Array[pivotIndex].obj.col = Array[swapIndex].obj.col = this.HighlightCol;
        DrawArray(this.arrows);
        await this.delay(this.TimeoutDelay);

        return swapIndex;
    }


    async QuickSort(Array, leftIndex, rightIndex) {
        await this.waitWhilePaused();

        if (leftIndex >= rightIndex) {
            Array[0].obj.col = this.sortedCol;
            DrawArray(this.arrows);
            return;
        }

        let pivotIndex = this.partition(Array, leftIndex, rightIndex);
        this.QuickSort(Array, leftIndex, pivotIndex - 1);
        this.QuickSort(Array, pivotIndex + 1, rightIndex);

        // await this.waitWhilePaused();
        // await this.drawSquare(leftArray);
        // await this.drawSquare(rightArray);
        // await this.waitWhilePaused();

        // await this.waitWhilePaused();
        // await this.moveDiagonal(leftArray, Math.PI / (2 + Array.length * 0.1), -1, depth, 70);
        // await this.moveDiagonal(rightArray, Math.PI / (2 + Array.length * 0.1), 1, depth, 70);
        // await this.waitWhilePaused();

        // await this.delay(this.TimeoutDelay);
        // await this.waitWhilePaused();

        // let left = await this.mergeSortAlgo(leftArray, depth + 1);
        // let right = await this.mergeSortAlgo(rightArray, depth + 1);

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        // return await this.merge(left, right, depth);
    }

    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        // await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2)));

        let pivot = await this.partition(this.objNodeArray, 0, this.objNodeArray.length - 1);
        console.log(pivot, this.objNodeArray);

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        // await this.mergeSortAlgo(this.objNodeArray, 1);
        await this.waitWhilePaused();
    }

    async run() {
        this.isAnimating = true;

        await this.algoExecutor();

        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;
        DrawArray(this.arrows);

        this.isAnimating = false;
    }


};

export const quickSort = new quickSortClass();