import { Base, compare } from "../Base.js"
import { DrawArray, PointerArrow, clearCanvas } from '../../canvas.js';

class SelectionSortClass extends Base {
    constructor() {
        super("Selection Sort");
        this.arrows = [];
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
        this.isAnimating = false;
        this.isPause = false;
        await this.delay(50);
        clearCanvas();
        DrawArray(null);
    }

    async run() {
        this.isAnimating = true;
        for (let i = 0; i < this.objNodeArray.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let min = i;
            let a = this.objNodeArray[min];

            for (let j = i + 1; j < this.objNodeArray.length; j++) {
                await this.waitWhilePaused();
                if (!this.isAnimating) return;

                this.objNodeArray[i].obj.col = this.HighlightCol;
                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;
                this.objNodeArray[min].obj.col = this.HighlightCol2;

                this.arrows = [
                    new PointerArrow(this.objNodeArray[i].obj.xPos, this.objNodeArray[i].obj.yPos + 40, this.HighlightCol, 20, "i"),
                    new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j"),
                    new PointerArrow(this.objNodeArray[min].obj.xPos, this.objNodeArray[min].obj.yPos + 40, this.HighlightCol, 20, "min"),
                ];

                await this.waitWhilePaused();
                DrawArray(this.arrows);

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

                this.objNodeArray[min].obj.col = this.HighlightCol2;
                this.arrows = [
                    new PointerArrow(this.objNodeArray[i].obj.xPos, this.objNodeArray[i].obj.yPos + 40, this.HighlightCol, 20, "i"),
                    new PointerArrow(this.objNodeArray[min].obj.xPos, this.objNodeArray[min].obj.yPos + 40, this.HighlightCol2, 20, "min"),
                ];
                DrawArray(this.arrows);
                await this.delay(this.TimeoutDelay);
                await this.waitWhilePaused();

                if (!this.isAnimating) return;
                [this.objNodeArray[i], this.objNodeArray[min]] = [this.objNodeArray[min], this.objNodeArray[i]];
                await this.swapAnimation(this.objNodeArray[min].obj, this.objNodeArray[i].obj, this.arrows);
                this.objNodeArray[i].obj.col = this.objNodeArray[min].obj.col = this.BaseCol;
            }

            if (!this.isAnimating) return;
            this.objNodeArray[i].obj.col = this.BaseCol;
            a.obj.col = this.sortedCol;
            DrawArray();
        }

        this.isAnimating = false;
    }
};

export const SelectionSort = new SelectionSortClass();