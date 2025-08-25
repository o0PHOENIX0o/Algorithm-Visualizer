import { Base, compare } from "../Base/Base.js"
import { DrawArray, PointerArrow, Square, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';

import { Logger } from "../../Core/logger.js";

class SelectionSortClass extends Base {
    constructor() {
        super("Selection Sort");
        this.arrows = [];
        this.squareArray = [];
        this.logger = new Logger();
        this.BOX_PADDING = 5;
    }

    Play() {
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
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

    async run() {
        this.isAnimating = true;
        this.logger.show({
            message: { title: "Selection Sort", text: "Starting Selection Sort." },
            type: "info",
            isEvent: true
        });

        for (let i = 0; i < this.objNodeArray.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let min = i;
            let a = this.objNodeArray[min];

            if (this.objNodeArray.length > 0) {
                let dia = this.objNodeArray[0].obj.dia;
                let sortedBox = null, unsortedBox = null;
                if (i > 0) {
                    let sortedBoxX1 = this.objNodeArray[0].obj.xPos - dia / 2 - this.BOX_PADDING;
                    let sortedBoxY1 = this.objNodeArray[0].obj.yPos + dia / 2 + this.BOX_PADDING;
                    let sortedBoxX2 = this.objNodeArray[i - 1].obj.xPos + dia / 2 + this.BOX_PADDING;
                    let sortedBoxY2 = this.objNodeArray[i - 1].obj.yPos - dia / 2 - this.BOX_PADDING;
                    sortedBox = new Square({xPos1: sortedBoxX1, yPos1: sortedBoxY1, xPos2: sortedBoxX2, yPos2: sortedBoxY2, col: this.sortedCol});
                }
                if (i < this.objNodeArray.length) {
                    let unsortedBoxX1 = this.objNodeArray[i].obj.xPos - dia / 2 - this.BOX_PADDING;
                    let unsortedBoxY1 = this.objNodeArray[i].obj.yPos + dia / 2 + this.BOX_PADDING;
                    let unsortedBoxX2 = this.objNodeArray[this.objNodeArray.length - 1].obj.xPos + dia / 2 + this.BOX_PADDING;
                    let unsortedBoxY2 = this.objNodeArray[this.objNodeArray.length - 1].obj.yPos - dia / 2 - this.BOX_PADDING;
                    unsortedBox = new Square({xPos1: unsortedBoxX1, yPos1: unsortedBoxY1, xPos2: unsortedBoxX2, yPos2: unsortedBoxY2, col: this.unsortedCol});
                }
                this.squareArray = [];
                if (sortedBox) this.squareArray.push(sortedBox);
                if (unsortedBox) this.squareArray.push(unsortedBox);
            }

            this.logger.show({
                message: { title: "Select Minimum Value", text: `Selecting the minimum element in unsorted array: [${this.objNodeArray.slice(i).map(node=>node.value)}]` },
                type: "info"
            });

            for (let j = i + 1; j < this.objNodeArray.length; j++) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                this.objNodeArray[i].obj.col = this.HighlightCol;
                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;
                this.objNodeArray[min].obj.col = this.HighlightCol2;

                this.arrows = [
                    new PointerArrow({xPos: this.objNodeArray[i].obj.xPos, yPos: (this.objNodeArray[i].obj.yPos + 40), col: this.HighlightCol, length: 20, label: "i"}),
                    new PointerArrow({xPos: b.obj.xPos, yPos: (b.obj.yPos + 40), col: this.HighlightCol, length: 20, label: "j"}),
                    new PointerArrow({xPos: this.objNodeArray[min].obj.xPos, yPos: (this.objNodeArray[min].obj.yPos + 40), col: this.HighlightCol2, length: 20, label: "min"})
                ];

                await this.waitWhilePaused();
                DrawArray([...this.arrows, ...this.squareArray]);

                if (!this.isAnimating) return;
                if (compare(a, b)) {
                    this.objNodeArray[min].obj.col = this.BaseCol;
                    a = b;
                    min = j;
                }

                if (!this.isAnimating) return;
                b.obj.col = this.BaseCol;

                await this.delay(this.TimeoutDelay);
            }
            if (this.isAnimating && min != i) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
                this.logger.show({
                    message: { title: `New Minimum: ${this.objNodeArray[min].value} `, text: `Found new minimum value ${this.objNodeArray[min].value} at index ${min}.` },
                    type: "info"
                });

                this.objNodeArray[min].obj.col = this.HighlightCol2;
                this.arrows = [
                    new PointerArrow({xPos: this.objNodeArray[i].obj.xPos, yPos: (this.objNodeArray[i].obj.yPos + 40), col: this.HighlightCol, length: 20, label: "i"}),
                    new PointerArrow({xPos: this.objNodeArray[min].obj.xPos, yPos: (this.objNodeArray[min].obj.yPos + 40), col: this.HighlightCol2, length: 20, label: "min"})
                ];
                DrawArray([...this.arrows, ...this.squareArray]);
                await this.delay(this.TimeoutDelay);
                await this.waitWhilePaused();

                this.logger.show({
                    message: { title: "Swap", text: `Swapping ${this.objNodeArray[i].value} at index ${i} with minimum value ${this.objNodeArray[min].value} at index ${min}.` },
                    type: "info"
                });

                if (!this.isAnimating) return;
                [this.objNodeArray[i], this.objNodeArray[min]] = [this.objNodeArray[min], this.objNodeArray[i]];
                await this.swapAnimation(this.objNodeArray[min].obj, this.objNodeArray[i].obj, [...this.arrows, ...this.squareArray]);
                this.objNodeArray[i].obj.col = this.objNodeArray[min].obj.col = this.BaseCol;
            }

            if (!this.isAnimating) return;
            this.objNodeArray[i].obj.col = this.BaseCol;
            a.obj.col = this.sortedCol;

            this.logger.show({
                message: { title: "Element Sorted", text: `Element ${a.value} is now in its correct position at index ${i}.` },
                type: "success"
            });
            await this.delay(2*this.TimeoutDelay);
            await this.waitWhilePaused();

            DrawArray([...this.arrows, ...this.squareArray]);
        }

        this.logger.show({
            message: { title: "Selection Sort Completed", text: "All elements are now sorted." },
            type: "success",
            isEvent: true
        });

        DrawArray();
    this.isAnimating = false;
    let btn = document.getElementById("togglePlayBtn");
    btn.classList.add('play-btn');
    btn.classList.remove('pause-btn');
    btn.innerHTML = '<span class="btn-icon"><ion-icon name="play-outline"></ion-icon></span> Play';
    }
};

export const SelectionSort = new SelectionSortClass();