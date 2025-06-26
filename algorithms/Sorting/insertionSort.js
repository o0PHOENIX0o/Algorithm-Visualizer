import { BaseSort, compare } from "./Base.js"
import { DrawArray, PointerArrow, clearCanvas } from '../../canvas.js';

class insertionSortClass extends BaseSort {
    constructor() {
        super("Insertion Sort");
        this.i = null;
    }

    async run() {
        this.isAnimating = true;
        let start = this.i ?? 1;

        for (let i = start; i < this.objNodeArray.length; i++) {
            if (this.isPause) {
                console.log("Paused");
                this.i = i;
                return;
            }
            let a = this.objNodeArray[i];
            a.obj.col = this.HighlightCol2;
            await this.delay(this.TimeoutDelay);

            let arrows;
            await this.animateY(a.obj, arrows, -50);

            let j = i - 1;
            let x = i;

            while (j >= 0 && compare(this.objNodeArray[j], a)) {
                if (this.isPause) {
                    console.log("Paused");
                    await this.animateY(a.obj, arrows, 50);
                    this.i = i;
                    return;
                }
                if (!this.isAnimating) return;

                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;

                arrows = [new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j")];
                DrawArray(arrows);

                await this.delay(this.TimeoutDelay);

                await this.swapAnimation(this.objNodeArray[j].obj, this.objNodeArray[x].obj, arrows);
                [this.objNodeArray[x], this.objNodeArray[j]] = [this.objNodeArray[j], this.objNodeArray[x]];

                b.obj.col = this.BaseCol;
                x = j--;
            }
            // [this.objNodeArray[x], this.objNodeArray[j+1]] = [this.objNodeArray[j+1], this.objNodeArray[x]];
            await this.animateY(a.obj, arrows, 50);

            this.objNodeArray[x].obj.col = this.sortedCol;
            DrawArray();
            await this.delay(this.TimeoutDelay);
        }
        this.objNodeArray.forEach(element => element.obj.col = this.sortedCol);
        DrawArray();

        this.i = null;
        this.isAnimating = false;
    }
};

export const insertionSort = new insertionSortClass();