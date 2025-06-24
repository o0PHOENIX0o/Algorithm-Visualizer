import {BaseSort, compare} from "./Base.js"
import { DrawArray, PointerArrow } from '../../canvas.js';

class SelectionSortClass extends BaseSort {
    constructor() {
        super("Selection Sort");
        this.i = null;
    }

    async run(){
        this.isAnimating = true;
        let start = this.i ?? 0;
        // console.log("selection sort ", this.i);
        for (let i = start; i < this.objNodeArray.length; i++) {
            console.log("selection sort running", this.objNodeArray);
            let min = i;
            let a = this.objNodeArray[min];
            let arrows = null;
            
            for (let j = i + 1; j < this.objNodeArray.length; j++) {
                this.objNodeArray[i].obj.col = this.HighlightCol;
                if (this.isPause) {
                    console.log("Paused");
                    this.i = i;
                    return;
                }
                if(!this.isAnimating) return;

                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;
                this.objNodeArray[min].obj.col = this.HighlightCol2;

                arrows = [
                    new PointerArrow(this.objNodeArray[i].obj.xPos, this.objNodeArray[i].obj.yPos + 40, this.HighlightCol, 20, "i"),
                    new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j"),
                    new PointerArrow(this.objNodeArray[min].obj.xPos, this.objNodeArray[min].obj.yPos + 40, this.HighlightCol, 20, "min"),
                ];

                DrawArray(arrows);
                
                if (compare(a,b)){
                    this.objNodeArray[min].obj.col = this.BaseCol;
                    a = b;
                    min = j;
                }
                b.obj.col = this.BaseCol;
            
                await this.delay(this.TimeoutDelay);
            }
            if(this.isAnimating && min != i){
                this.objNodeArray[min].obj.col = this.HighlightCol2;
                arrows = [
                    new PointerArrow(this.objNodeArray[i].obj.xPos, this.objNodeArray[i].obj.yPos + 40, this.HighlightCol, 20, "i"),
                    new PointerArrow(this.objNodeArray[min].obj.xPos, this.objNodeArray[min].obj.yPos + 40, this.HighlightCol2, 20, "min"),
                ];
                DrawArray(arrows);
                await this.delay(this.TimeoutDelay);
            
                [this.objNodeArray[i], this.objNodeArray[min]] = [this.objNodeArray[min], this.objNodeArray[i]];
                await this.swapAnimation(this.objNodeArray[min].obj, this.objNodeArray[i].obj, arrows);
                this.objNodeArray[i].obj.col = this.objNodeArray[min].obj.col = this.BaseCol;
            }

            this.objNodeArray[i].obj.col = this.BaseCol;
            a.obj.col = this.sortedCol;
            DrawArray();
        }

        this.i = null;
        this.isAnimating = false;
    }
};

export const SelectionSort = new SelectionSortClass();