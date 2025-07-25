import { Base, compare } from "../Base.js"
import { DrawArray, PointerArrow, Square, clearCanvas } from '../../canvas.js';

class insertionSortClass extends Base {
    constructor() {
        super("Insertion Sort");
        this.i = null;
        this.arrows = [];
        this.squareArray = [];
    }

    Play() {
        console.log("play ", this.isAnimating, this.isPause);
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
        this.i = null;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }

    async run() {
        this.isAnimating = true;
        for (let i = 1; i < this.objNodeArray.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let a = this.objNodeArray[i];
            a.obj.col = this.HighlightCol2;
            let j = i - 1;
            let x = i;

            let unsortedBoxX1 = a.obj.xPos - a.obj.dia / 2 - 5;
            let unsortedBoxY1 = a.obj.yPos + a.obj.dia / 2 + 5;
            let unsortedBoxX2 = this.objNodeArray[this.objNodeArray.length - 1].obj.xPos + a.obj.dia / 2 + 5;
            let unsortedBoxY2 = this.objNodeArray[this.objNodeArray.length - 1].obj.yPos - a.obj.dia / 2 - 5;

            let sortedBoxX1 = this.objNodeArray[0].obj.xPos - this.objNodeArray[0].obj.dia / 2 - 5;
            let sortedBoxY1 = this.objNodeArray[0].obj.yPos + this.objNodeArray[0].obj.dia / 2 + 5;
            let sortedBoxX2 = this.objNodeArray[i - 1].obj.xPos + a.obj.dia / 2 + 5;
            let sortedBoxY2 = this.objNodeArray[i - 1].obj.yPos - a.obj.dia / 2 - 5;

            this.squareArray = [
                new Square({xPos1: sortedBoxX1, yPos1: sortedBoxY1, xPos2: sortedBoxX2, yPos2: sortedBoxY2, col: this.sortedCol}),
                new Square({xPos1: sortedBoxX1, yPos1: sortedBoxY1, xPos2: sortedBoxX2, yPos2: sortedBoxY2, col: this.sortedCol}),
            ];

            DrawArray([...this.arrows, ...this.squareArray]);
            await this.delay(this.TimeoutDelay);

            this.arrows = [
                new PointerArrow({xPos: a.obj.xPos, yPos: (a.obj.yPos + 40), col: this.HighlightCol2, length: 20, label: "i"}),
                new PointerArrow({xPos: this.objNodeArray[j].obj.xPos, yPos: (this.objNodeArray[j].obj.yPos + 40), col: this.HighlightCol, length: 20, label: "j"}  )
            ];

            DrawArray([...this.arrows, ...this.squareArray]);
            await this.waitWhilePaused();

            await this.waitWhilePaused();
            await this.animateY(a.obj, [...this.arrows, ...this.squareArray], -50);
            await this.waitWhilePaused();


            while (j >= 0 && compare(this.objNodeArray[j], a)) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                const b = this.objNodeArray[j];
                if (b.obj.col != this.sortedCol) b.obj.col = this.HighlightCol;

                await this.waitWhilePaused();
                this.arrows = [
                    new PointerArrow({xPos: a.obj.xPos, yPos: (a.obj.yPos + a.obj.dia + 40), col: this.HighlightCol2, length: 20, label: "i"}),
                    new PointerArrow({xPos: b.obj.xPos, yPos: (b.obj.yPos + 40), col: this.HighlightCol, length: 20, label: "j"})
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
            await this.waitWhilePaused();
            await this.animateY(a.obj, [...this.arrows, ...this.squareArray], 50);
            await this.waitWhilePaused();

            if (!this.isAnimating) return;
            this.objNodeArray[i].obj.col = this.sortedCol;
            this.objNodeArray[x].obj.col = this.sortedCol;
            DrawArray([...this.arrows, ...this.squareArray]);

            await this.delay(this.TimeoutDelay);
        }
        DrawArray();
        this.isAnimating = false;
    }
};

export const insertionSort = new insertionSortClass();