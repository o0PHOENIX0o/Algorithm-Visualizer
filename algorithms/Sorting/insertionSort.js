import { BaseSort, compare } from "./Base.js"
import { DrawArray, PointerArrow, clearCanvas } from '../../canvas.js';

class insertionSortClass extends BaseSort {
    constructor() {
        super("Insertion Sort");
        this.i = null;
        this.arrows = [];
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
            while (this.isPause) await this.delay(this.TimeoutDelay);
            if (!this.isAnimating) return;

            let a = this.objNodeArray[i];
            a.obj.col = this.HighlightCol2;

            await this.delay(this.TimeoutDelay);

            while (this.isPause) await this.delay(this.TimeoutDelay);
            await this.animateY(a.obj, this.arrows, -50);
            while (this.isPause) await this.delay(this.TimeoutDelay);

            let j = i - 1;
            let x = i;

            while (j >= 0 && compare(this.objNodeArray[j], a)) {
                while (this.isPause) await this.delay(this.TimeoutDelay);
                if (!this.isAnimating) return;

                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;

                while (this.isPause) await this.delay(this.TimeoutDelay);
                
                this.arrows = [
                    new PointerArrow(a.obj.xPos, a.obj.yPos + 40, this.HighlightCol2, 20, "i"),
                    new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j")
                ];
                DrawArray(this.arrows);
                await this.delay(this.TimeoutDelay);

                while (this.isPause) await this.delay(this.TimeoutDelay);
                if (!this.isAnimating) return;

                await this.swapAnimation(this.objNodeArray[j].obj, this.objNodeArray[x].obj, this.arrows);
                [this.objNodeArray[x], this.objNodeArray[j]] = [this.objNodeArray[j], this.objNodeArray[x]];

                b.obj.col = this.BaseCol;
                x = j--;
            }
            while (this.isPause) await this.delay(this.TimeoutDelay);
            await this.animateY(a.obj, this.arrows, 50);
            while (this.isPause) await this.delay(this.TimeoutDelay);

            if (!this.isAnimating) return;
            this.objNodeArray[x].obj.col = this.sortedCol;
            DrawArray();
            await this.delay(this.TimeoutDelay);
        }
        this.objNodeArray.forEach(element => element.obj.col = this.sortedCol);
        DrawArray();
        this.isAnimating = false;
    }
};

export const insertionSort = new insertionSortClass();