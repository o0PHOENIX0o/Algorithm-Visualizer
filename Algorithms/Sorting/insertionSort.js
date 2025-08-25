import { Base, compare } from "../Base/Base.js"
import { DrawArray, PointerArrow, Square, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';
import { Logger } from "../../Core/logger.js";

class insertionSortClass extends Base {
    // Class attributes for positioning and animation
    constructor() {
        super("Insertion Sort");
        this.arrows = [];
        this.squareArray = [];
        this.logger = new Logger();
        this.POINTER_Y_OFFSET = 40;
        this.ANIMATE_Y_OFFSET = 50;
        this.BOX_PADDING = 5;
    }

    Play() {
        //console.log("play ", this.isAnimating, this.isPause);
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
            this.isPause = false;
            this.run();
        }
    }



    async reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.arrows = [];
        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs();
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
        // drawWelcomeScreen();
    }

    async run() {
        this.isAnimating = true;
        this.logger.show({
            message: { title: "Insertion Sort", text: "Starting Insertion Sort. We will build a sorted section of the array one element at a time." },
            type: "info",
            isEvent: true
        });

        for (let i = 1; i < this.objNodeArray.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            this.logger.show({
                message: { title: "Select Element", text: `Selecting element form unsorted section at index ${i} (value: ${this.objNodeArray[i].value}) to insert into the sorted section.` },
                type: "info"
            });

            let a = this.objNodeArray[i];
            a.obj.col = this.HighlightCol2;
            let j = i - 1;
            let x = i;


            let unsortedBoxX1 = a.obj.xPos - a.obj.dia / 2 - this.BOX_PADDING;
            let unsortedBoxY1 = a.obj.yPos + a.obj.dia / 2 + this.BOX_PADDING;
            let unsortedBoxX2 = this.objNodeArray[this.objNodeArray.length - 1].obj.xPos + a.obj.dia / 2 + this.BOX_PADDING;
            let unsortedBoxY2 = this.objNodeArray[this.objNodeArray.length - 1].obj.yPos - a.obj.dia / 2 - this.BOX_PADDING;

            let sortedBoxX1 = this.objNodeArray[0].obj.xPos - this.objNodeArray[0].obj.dia / 2 - this.BOX_PADDING;
            let sortedBoxY1 = this.objNodeArray[0].obj.yPos + this.objNodeArray[0].obj.dia / 2 + this.BOX_PADDING;
            let sortedBoxX2 = this.objNodeArray[i - 1].obj.xPos + a.obj.dia / 2 + this.BOX_PADDING;
            let sortedBoxY2 = this.objNodeArray[i - 1].obj.yPos - a.obj.dia / 2 - this.BOX_PADDING;

            this.squareArray = [
                new Square({xPos1: sortedBoxX1, yPos1: sortedBoxY1, xPos2: sortedBoxX2, yPos2: sortedBoxY2, col: this.sortedCol}),
                new Square({xPos1: unsortedBoxX1, yPos1: unsortedBoxY1, xPos2: unsortedBoxX2, yPos2: unsortedBoxY2, col: this.unsortedCol}),
            ];

            DrawArray([...this.arrows, ...this.squareArray]);
            await this.delay(this.TimeoutDelay);


            this.arrows = [
                new PointerArrow({xPos: a.obj.xPos, yPos: (a.obj.yPos + this.POINTER_Y_OFFSET), col: this.HighlightCol2, length: 20, label: "i"}),
                new PointerArrow({xPos: this.objNodeArray[j].obj.xPos, yPos: (this.objNodeArray[j].obj.yPos + this.POINTER_Y_OFFSET), col: this.HighlightCol, length: 20, label: "j"})
            ];

            DrawArray([...this.arrows, ...this.squareArray]);
            await this.waitWhilePaused();

            await this.waitWhilePaused();
            await this.animateY(a.obj, [...this.arrows, ...this.squareArray], -this.ANIMATE_Y_OFFSET);
            await this.waitWhilePaused();

            this.logger.show({
                message: { title: "Compare", text: `finding the correct position of element (${a.value}) in sorted section.` },
                type: "info",
                
            });
            while (j >= 0 && compare(this.objNodeArray[j], a)) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                const b = this.objNodeArray[j];
                if (b.obj.col != this.sortedCol) b.obj.col = this.HighlightCol;

                await this.waitWhilePaused();
                this.arrows = [
                    new PointerArrow({xPos: a.obj.xPos, yPos: (a.obj.yPos + a.obj.dia + this.POINTER_Y_OFFSET), col: this.HighlightCol2, length: 20, label: "i"}),
                    new PointerArrow({xPos: b.obj.xPos, yPos: (b.obj.yPos + this.POINTER_Y_OFFSET), col: this.HighlightCol, length: 20, label: "j"})
                ];
                DrawArray([...this.arrows, ...this.squareArray]);
                await this.delay(this.TimeoutDelay);

                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                await this.swapAnimation(this.objNodeArray[j].obj, this.objNodeArray[x].obj, [...this.arrows, ...this.squareArray]);
                [this.objNodeArray[x], this.objNodeArray[j]] = [this.objNodeArray[j], this.objNodeArray[x]];

                if (b.obj.col != this.sortedCol) b.obj.col = this.BaseCol;
                x = j--;
            }
            this.logger.show({
                message: { title: "Insert", text: `Inserted element (${a.value}) at its correct position at index: ${j+1} in the sorted section.` },
                type: "info"
            });
            
            await this.waitWhilePaused();
            await this.animateY(a.obj, [...this.arrows, ...this.squareArray], this.ANIMATE_Y_OFFSET);
            await this.waitWhilePaused();

            if (!this.isAnimating) return;
            this.objNodeArray[i].obj.col = this.sortedCol;
            this.objNodeArray[x].obj.col = this.sortedCol;
            DrawArray([...this.arrows, ...this.squareArray]);

            await this.delay(this.TimeoutDelay);
        }

        this.logger.show({
            message: { title: "Sorted", text: "array is now fully sorted using Insertion Sort." },
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

export const insertionSort = new insertionSortClass();