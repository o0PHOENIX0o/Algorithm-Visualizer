import { Base, compare } from "../Base/Base.js"
import { DrawArray, PointerArrow, Square, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';
import { Logger } from "../../Core/logger.js";

class quickSortClass extends Base {
    constructor() {
        super("Quick Sort", 10, 40);
        this.arrows = [];
        this.squareArray = [];
        this.logger = new Logger();
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
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
        // drawWelcomeScreen();
    }

    async drawSquare(array, col = this.unsortedCol) {
        if (!this.isAnimating || array.length < 1) return;

        let r = array[0].obj.dia / 2;
        let x1 = array[0].obj.xPos - (r + (this.spacing / 2) - 1);
        let y1 = array[0].obj.yPos + (r + this.spacing / 3);

        let x2 = array[array.length - 1].obj.xPos + (r + (this.spacing / 2) - 1);
        let y2 = array[array.length - 1].obj.yPos - (r + this.spacing / 3);

        this.squareArray.push(new Square({ xPos1: x1, yPos1: y1, xPos2: x2, yPos2: y2, col: col }));

        DrawArray([...this.arrows, ...this.squareArray]);
        await this.delay(this.TimeoutDelay);
    }

    async partition(Array, leftIndex, rightIndex) {
        if (!this.isAnimating) return;

        let pivotIndex = leftIndex;
        let swapIndex = leftIndex;
        let pivot = Array[pivotIndex];
        this.logger.show({
            message: { title: "Choose Pivot", text: `Choosing pivot value ${pivot.value} at index ${pivotIndex}.` },
            type: "info"
        });

        pivot.obj.col = this.HighlightCol2;

        for (let i = leftIndex + 1; i <= rightIndex; i++) {
            if (!this.isAnimating) return;
            await this.waitWhilePaused();

            this.arrows = [
                new PointerArrow({ xPos: pivot.obj.xPos, yPos: (pivot.obj.yPos + 40), col: this.HighlightCol2, length: 20, label: "pivot" }),
                new PointerArrow({ xPos: Array[swapIndex].obj.xPos, yPos: (Array[swapIndex].obj.yPos + 80), col: this.HighlightCol, length: 20, label: "swap" }),
                new PointerArrow({ xPos: Array[i].obj.xPos, yPos: (Array[i].obj.yPos + 40), col: this.HighlightCol, length: 20, label: "i" })
            ]
            Array[i].obj.col = this.HighlightCol;
            DrawArray([...this.arrows, ...this.squareArray]);
            await this.delay(this.TimeoutDelay);

            if (!this.isAnimating) return;

            if (compare(pivot, Array[i])) {
                Array[i].obj.col = "#fff176";
                await this.waitWhilePaused();
                swapIndex++;
                this.logger.show({
                    message: { title: "increment swap index", text: `Incrementing swap index to ${swapIndex} because ${Array[i].value} is less than or equal to pivot ${pivot.value}.` },
                    type: "info"
                });

                Array[swapIndex].obj.col = this.HighlightCol;
                this.arrows[1] = new PointerArrow({ xPos: Array[swapIndex].obj.xPos, yPos: (Array[swapIndex].obj.yPos + 80), col: this.HighlightCol, length: 20, label: "swap" });

                DrawArray([...this.arrows, ...this.squareArray]);
                await this.delay(this.TimeoutDelay);
                if (!this.isAnimating) return;

                this.logger.show({
                    message: { title: "Swap", text: `Swapping ${Array[i].value} at index ${i} with ${Array[swapIndex].value} at index ${swapIndex}.` },
                    type: "info"
                });

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

        this.logger.show({
            message: { title: "Swap Pivot", text: `Swapping pivot ${pivot.value} at index ${pivotIndex} with ${Array[swapIndex].value} at index ${swapIndex}.` },
            type: "info"
        });

        Array[swapIndex].obj.col = Array[pivotIndex].obj.col = this.HighlightCol2;
        DrawArray([...this.arrows, ...this.squareArray]);
        await this.delay(this.TimeoutDelay);

        await this.swapAnimation(Array[pivotIndex].obj, Array[swapIndex].obj, [...this.arrows, ...this.squareArray]);
        [Array[pivotIndex], Array[swapIndex]] = [Array[swapIndex], Array[pivotIndex]];
        await this.waitWhilePaused();


        Array[swapIndex].obj.col = this.sortedCol;
        DrawArray([...this.arrows, ...this.squareArray]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();


        return swapIndex;
    }


    async QuickSort(Array, leftIndex, rightIndex) {
        if (!this.isAnimating) return;
        await this.waitWhilePaused();

        if (leftIndex >= rightIndex) {
            await this.waitWhilePaused();
            this.logger.show({
                message: { title: "Base Case", text: `Subarray [${Array.slice(leftIndex, rightIndex + 1).map(n => n.value)}] is already sorted or has one element.` },
                type: "success",
            });

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
        this.logger.show({
            message: { title: "Partition", text: `Partitioning subarray [${Array.slice(leftIndex, rightIndex + 1).map(n => n.value)}] from index ${leftIndex} to ${rightIndex}.` },
            type: "info"
        });

        let pivotIndex = await this.partition(Array, leftIndex, rightIndex);
        await this.waitWhilePaused();

        if (!this.isAnimating) return;
        await this.drawSquare(this.objNodeArray.slice(pivotIndex, pivotIndex + 1), this.sortedCol);
        await this.drawSquare(this.objNodeArray.slice(leftIndex, pivotIndex));
        await this.drawSquare(this.objNodeArray.slice(pivotIndex + 1, rightIndex + 1));

        this.logger.show({
            message: { title: "Pivot is sorted", text: `Pivot placed at index ${pivotIndex}. <br>Now sorting left subarray: [${Array.slice(leftIndex, rightIndex + 1).map(n => n.value)}] and right subarray: [${Array.slice(rightIndex).map(n => n.value)}].` },
            type: "info"
        });
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
        this.logger.show({
            message: { title: "Quick Sort", text: "Starting Quick Sort. The array will be recursively partitioned and sorted." },
            type: "info",
            isEvent: true
        });

        await this.QuickSort(this.objNodeArray, 0, this.objNodeArray.length - 1);
        this.arrows = [];
        this.squareArray = [];
        DrawArray();
        this.logger.show({
            message: { title: "Completed", text: "Quick Sort completed. The array is now sorted." },
            type: "success",
            isEvent: true
        });
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