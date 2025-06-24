import { BaseSort, compare } from "./Base.js"
import { DrawArray, PointerArrow } from '../../canvas.js';


class BubbleSortClass extends BaseSort {
  constructor() {
    super("Bubble Sort");
    this.i = null;
  }

  async run() {
    this.isAnimating = true;
    let start = this.i ?? this.objNodeArray.length - 1;
    // console.log("bubble sort ", this.i);


    for (let i = start; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.isPause) {
          // console.log("Paused");
          this.isAnimating = false;
          this.i = i;
          return;
        }
        if(!this.isAnimating) return;

        const a = this.objNodeArray[j];
        const b = this.objNodeArray[j + 1];
        a.obj.col = b.obj.col = this.HighlightCol;

        const arrows = [
          new PointerArrow(a.obj.xPos, a.obj.yPos + 40, this.HighlightCol, 20, "j"),
          new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j+1")
        ];

        DrawArray(arrows);
        await this.delay(this.TimeoutDelay);

        if(compare(a,b)){
          [this.objNodeArray[j], this.objNodeArray[j + 1]] = [b, a];
          await this.swapAnimation(a.obj, b.obj, arrows);
        }

        a.obj.col = b.obj.col = this.BaseCol;
      }

      this.objNodeArray[i].obj.col = this.sortedCol;
      DrawArray();
    }

    this.i = null;
    this.isAnimating = false;
  }
};

export const BubbleSort = new BubbleSortClass();