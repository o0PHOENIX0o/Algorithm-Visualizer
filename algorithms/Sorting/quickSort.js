import { Base, compare } from "../Base.js"
import { DrawArray, PointerArrow, Square, clearCanvas } from '../../canvas.js';

class quickSortClass extends Base {
    constructor() {
        super("Quick Sort", 10, 40);
        this.arrows = [];
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
        this.arrows = [];
        this.squareArray = [];
        this.isAnimating = false;
        this.isPause = false;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }

    async drawSquare(array, col = this.unsortedCol) {
        if (!this.isAnimating || array.length < 1) return;

        let r = array[0].obj.dia / 2;
        let x1 = array[0].obj.xPos - (r + (this.spacing / 2) - 1);
        let y1 = array[0].obj.yPos + (r + this.spacing / 3);

        let x2 = array[array.length - 1].obj.xPos + (r + (this.spacing / 2) - 1);
        let y2 = array[array.length - 1].obj.yPos - (r + this.spacing / 3);

        this.squareArray.push(new Square(x1, y1, x2, y2, col));
        DrawArray([...this.arrows, ...this.squareArray]);
        await this.delay(this.TimeoutDelay);
    }

    async partition(Array, leftIndex, rightIndex) {
            if (!this.isAnimating) return;

        let pivotIndex = leftIndex;
        let swapIndex = leftIndex;
        let pivot = Array[pivotIndex];

        pivot.obj.col = this.HighlightCol2;

        for (let i = leftIndex + 1; i <= rightIndex; i++) {
            if (!this.isAnimating) return;
            await this.waitWhilePaused();

            this.arrows = [
                new PointerArrow(pivot.obj.xPos, pivot.obj.yPos + 40, this.HighlightCol2, 20, "pivot"),
                new PointerArrow(Array[swapIndex].obj.xPos, Array[swapIndex].obj.yPos + 80, this.HighlightCol, 20, "swap"),
                new PointerArrow(Array[i].obj.xPos, Array[i].obj.yPos + 40, this.HighlightCol, 20, "i")
            ]
            Array[i].obj.col = this.HighlightCol;
            DrawArray([...this.arrows, ...this.squareArray]);
            await this.delay(this.TimeoutDelay);

            if (!this.isAnimating) return;
            if (compare(pivot, Array[i])){
                Array[i].obj.col = "#fff176";
                await this.waitWhilePaused();
                swapIndex++;
                Array[swapIndex].obj.col = this.HighlightCol;
                this.arrows[1] = new PointerArrow(Array[swapIndex].obj.xPos, Array[swapIndex].obj.yPos + 80, this.HighlightCol, 20, "swap")
                DrawArray([...this.arrows, ...this.squareArray]);
                await this.delay(this.TimeoutDelay);
                if (!this.isAnimating) return;


                await this.swapAnimation(Array[i].obj, Array[swapIndex].obj, [...this.arrows, ...this.squareArray]);
                [Array[i], Array[swapIndex]] = [Array[swapIndex], Array[i]];
                await this.waitWhilePaused();
            }

            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            Array[swapIndex].obj.col = this.BaseCol;
            Array[i].obj.col = this.BaseCol;
        }

        await this.waitWhilePaused();

        await this.swapAnimation(Array[pivotIndex].obj, Array[swapIndex].obj, [...this.arrows, ...this.squareArray]);
        [Array[pivotIndex], Array[swapIndex]] = [Array[swapIndex], Array[pivotIndex]];
        await this.waitWhilePaused();


        Array[swapIndex].obj.col = this.sortedCol;
        DrawArray([...this.arrows, ...this.squareArray]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();


        return swapIndex;
    }


    async QuickSort(Array, leftIndex, rightIndex){
        if (!this.isAnimating) return;
        await this.waitWhilePaused();

        if (leftIndex >= rightIndex) {
            await this.waitWhilePaused();

            if (Array[leftIndex]) {
                Array[leftIndex].obj.col = this.sortedCol;
                if (!this.isAnimating) return;
                await this.drawSquare(this.objNodeArray.slice(leftIndex, rightIndex + 1), this.sortedCol);
                DrawArray([...this.arrows, ...this.squareArray]);
                await this.delay(this.TimeoutDelay);
            }
            return;
        }


        await this.waitWhilePaused();
        let pivotIndex = await this.partition(Array, leftIndex, rightIndex);
        await this.waitWhilePaused();

        if (!this.isAnimating) return;
        await this.drawSquare(this.objNodeArray.slice(pivotIndex, pivotIndex + 1), this.sortedCol);
        await this.drawSquare(this.objNodeArray.slice(leftIndex, pivotIndex));
        await this.drawSquare(this.objNodeArray.slice(pivotIndex + 1, rightIndex + 1));
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        await this.QuickSort(Array, leftIndex, pivotIndex - 1);
        await this.waitWhilePaused();
        await this.QuickSort(Array, pivotIndex + 1, rightIndex);
        await this.waitWhilePaused();

        await this.delay(this.TimeoutDelay);
    }

    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.QuickSort(this.objNodeArray, 0, this.objNodeArray.length - 1);
        this.arrows = [];
        this.squareArray = [];
        DrawArray();
        await this.delay(this.TimeoutDelay);
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