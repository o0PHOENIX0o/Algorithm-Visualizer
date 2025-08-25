import { Base, compare } from "../Base/Base.js"
import { DrawArray, Square, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';

import { Logger } from "../../Core/logger.js";

class mergeSortClass extends Base {
    constructor() {
        super("Merge Sort", 10, 35);
        this.logger = new Logger();
        this.MOVE_SPEED = 4;
        this.BOX_RADIUS_PADDING = 5;
        this.BOX_Y_PADDING = 10;
        this.SORTED_BOX_STROKE = 4;
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
      
        await this.delay(50);
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
        // drawWelcomeScreen();
    }


    async move(element, x, y, speedFactor = this.MOVE_SPEED) {
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


    moveDiagonal(elements, direction, offsetY = 70) {
        if (!this.isAnimating) return Promise.resolve();

        let totalLength = (elements.length * (this.dia + this.spacing)) - this.spacing;

        const startX = (direction > 0)
            ?  (elements[elements.length-1].obj.xPos) - totalLength + this.dia
            : elements[0].obj.xPos;

        return Promise.all(
            elements.map((element, idx) => {
                if (!this.isAnimating) return Promise.resolve();
                const y = element.obj.yPos + offsetY;
                const x = startX + idx * (this.dia + this.spacing);
                return this.move(element.obj, x, y, this.MOVE_SPEED);
            })
        );
    }


    async drawSquare(subArray, mid) {
        if (!this.isAnimating) return;
        let radius = subArray[0].obj.dia / 2;

        if (mid > 0 && mid < subArray.length) {
            let leftStart = subArray[0].obj;
            let leftEnd = subArray[mid - 1].obj;
            
            let rightStart = subArray[mid].obj;
            let rightEnd = subArray[subArray.length - 1].obj;

            let x1 = leftStart.xPos - (radius + this.BOX_RADIUS_PADDING);
            let y1 = leftStart.yPos + (radius + this.BOX_Y_PADDING);

            let x2 = (leftEnd.xPos + rightStart.xPos) /2;
            let y2 = leftEnd.yPos - (radius + this.BOX_Y_PADDING);
                
            this.squareArray.push( new Square({ xPos1: x1, yPos1: y1, xPos2: x2, yPos2: y2, col: this.unsortedCol }));

            x2 = rightEnd.xPos + (radius + this.BOX_RADIUS_PADDING);
            y2 = rightEnd.yPos - (radius + this.BOX_Y_PADDING);

            this.squareArray.push( new Square({ xPos1: x1, yPos1: y1, xPos2: x2, yPos2: y2, col: this.unsortedCol }) );
        }

        

        DrawArray(this.squareArray);
        await this.delay(this.TimeoutDelay);

        return this.squareArray.slice(-2); 
    }


    async merge(leftArray, rightArray, mergedPositions) {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        let leftIndex = 0, rightIndex = 0, mergeIndex = 0;
        let mergedArray = [];

        let leftBox = this.squareArray[this.squareArray.length - 2];
        let rightBox = this.squareArray[this.squareArray.length - 1];

        while (leftIndex < leftArray?.length && rightIndex < rightArray?.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let element;
            if (compare(rightArray[rightIndex], leftArray[leftIndex])) {
                element = leftArray[leftIndex++];
            } else {
                element = rightArray[rightIndex++];
            }

            let { x, y } = mergedPositions[mergeIndex];
            await this.move(element.obj, x, y, this.MOVE_SPEED, this.squareArray);
            mergedArray.push(element);
            mergeIndex++;
        }

        while (leftIndex < leftArray.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let { x, y } = mergedPositions[mergeIndex];
            await this.move(leftArray[leftIndex].obj, x, y, this.MOVE_SPEED);
            mergedArray.push(leftArray[leftIndex++]);
            mergeIndex++;
        }

        while (rightIndex < rightArray.length) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let { x, y } = mergedPositions[mergeIndex];
            await this.move(rightArray[rightIndex].obj, x, y, this.MOVE_SPEED);
            mergedArray.push(rightArray[rightIndex++]);
            mergeIndex++;
        }

        leftBox.col = this.sortedCol;
        rightBox.col = this.sortedCol;
        leftBox.strokeW = rightBox.strokeW = this.SORTED_BOX_STROKE;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        DrawArray(this.squareArray);

        if (!this.isAnimating) return;
        this.squareArray.pop();
        this.squareArray.pop();
        await this.delay(this.TimeoutDelay * 2);

        return mergedArray;
    }



    async mergeSortAlgo(arrayToSort) {
        await this.waitWhilePaused();

        if (arrayToSort.length <= 1) {
            this.logger.show({
                message: { title: "Base Case", text: `Subarray of length 1: [${arrayToSort[0]?.value}] is already sorted.` },
                type: "success",
            });
            arrayToSort[0].obj.col = this.sortedCol;
            DrawArray(this.squareArray);
            return arrayToSort;
        }


        let mid = Math.floor(arrayToSort.length / 2);
        let leftArray = arrayToSort.slice(0, mid);
        let rightArray = arrayToSort.slice(mid);

        await this.waitWhilePaused();
        await this.drawSquare(arrayToSort, mid);
        // await this.drawSquare(rightArray);
        await this.waitWhilePaused();

        this.logger.show({
            message: { title: "Divide", text: `Dividing array [${arrayToSort.map(node => node.value)}] into two halves. <br>Left array:  [${leftArray.map(node => node.value)}]  <br>Right array:  [${rightArray.map(node => node.value)}]` },
            type: "info",

        });

        let mergedPositions = arrayToSort.map(element => ({ x: element.obj.xPos, y: element.obj.yPos }));

        await this.waitWhilePaused();
        await this.moveDiagonal(leftArray, -1);
        await this.moveDiagonal(rightArray, 1);
        await this.waitWhilePaused();



        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        let leftSorted = await this.mergeSortAlgo(leftArray);
        let rightSorted = await this.mergeSortAlgo(rightArray);

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        this.logger.show({
            message: { title: "Merge", text: `Merging two sorted halves. <br>Left array:  [${leftSorted.map(node => node.value)}]  <br>Right array:  [${rightSorted.map(node => node.value)}]` },
            type: "info",

        });
        return await this.merge(leftSorted, rightSorted, mergedPositions);
    }


    async algoExecutor() {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 60), 2)));

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        this.logger.show({
            message: { title: "Merge Sort", text: "Starting Merge Sort. The array will be recursively divided and merged." },
            type: "info",
            isEvent: true,
            timer:2000
        });

        let totalLength = this.objNodeArray.length * (this.dia + this.spacing);
        let availableWidth = width * 0.95;
        let sf = Math.min(1, availableWidth / totalLength);
        this.dia *= sf;
        this.spacing *= sf;
        this.SQUARE_GAP *= sf;
        this.BOX_RADIUS_PADDING *= sf;

        await this.mergeSortAlgo(this.objNodeArray);
        await this.waitWhilePaused();

        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, (height / 2 - 30), 2)));

        this.logger.show({
            message: { title: "Completed", text: "Merge Sort completed. The array is now sorted." },
            type: "success",
            isEvent: true
        });
    }


    async run() {
        this.isAnimating = true;
        await this.algoExecutor();

        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;
        DrawArray(this.squareArray);

        this.isAnimating = false;
    }
}

export const mergeSort = new mergeSortClass();