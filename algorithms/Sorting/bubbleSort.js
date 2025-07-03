import { Base, compare } from "../Base.js"
import { DrawArray, PointerArrow, clearCanvas } from '../../canvas.js';


class BubbleSortClass extends Base {
  constructor() {
    super("Bubble Sort");
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
    this.i = null;
    await this.delay(50);
    clearCanvas();
    DrawArray(null);
  }



  async run() {
    this.isAnimating = true;
    let start = this.i ?? this.objNodeArray.length - 1;

    for (let i = start; i >= 0; i--) {
      await this.waitWhilePaused();

      for (let j = 0; j < i; j++) {
        await  this.waitWhilePaused();
        if (!this.isAnimating) return;

        const a = this.objNodeArray[j];
        const b = this.objNodeArray[j + 1];
        a.obj.col = b.obj.col = this.HighlightCol;

        this.arrows = [
          new PointerArrow(a.obj.xPos, a.obj.yPos + 40, this.HighlightCol, 20, "j"),
          new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j+1")
        ];

        await  this.waitWhilePaused();
        DrawArray(this.arrows);
        await this.delay(this.TimeoutDelay);

        await  this.waitWhilePaused();
        if (!this.isAnimating) return;

        if (compare(a, b)) {
          [this.objNodeArray[j], this.objNodeArray[j + 1]] = [b, a];
          await this.swapAnimation(a.obj, b.obj, this.arrows);
        }
        
        if (!this.isAnimating) return;
        a.obj.col = b.obj.col = this.BaseCol;
      }

      if (!this.isAnimating) return;
      this.objNodeArray[i].obj.col = this.sortedCol;
      DrawArray();
    }

    this.i = null;
    this.isAnimating = false;
  }
};

export const BubbleSort = new BubbleSortClass();