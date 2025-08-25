import { Base, compare } from "../Base/Base.js"
import { DrawArray, PointerArrow, clearCanvas, drawWelcomeScreen } from "../../Core/canvas.js";
import { Logger } from "../../Core/logger.js";

class BubbleSortClass extends Base {
  constructor() {
    super("Bubble Sort");
    this.logger = new Logger()
    this.arrows = [];
  }

  Play() {
    if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
      this.isPause = false;
      this.run();
    }
  }

  Pause() {
    this.isPause = true;
    this.logger.pauseNotifications();
  }
  Resume() {
    if (this.isPause && this.isAnimating) {
      //console.log("Resuming...");
      this.isPause = false;
      this.logger.resumeNotifications();
    }
  }

  async reset() {
    this.logger.clearLogs();
    this.objNodeArray = [];
    this.inputArray = [];
    this.arrows = [];
    this.isAnimating = false;
    this.isPause = false;
    await this.delay(50);
    clearCanvas();
    DrawArray(null);
    // drawWelcomeScreen();
  }



  async bubbleSort(Array) {
    let start = this.i ?? Array.length - 1;
    try {
      for (let i = start; i >= 0; i--) {
        await this.waitWhilePaused();
        if (!this.isAnimating) return null;

        for (let j = 0; j < i; j++) {
          await this.waitWhilePaused();
          if (!this.isAnimating) return null;

          const a = Array[j];
          const b = Array[j + 1];
          a.obj.col = b.obj.col = this.HighlightCol;

          this.arrows = [
            new PointerArrow({ xPos: a.obj.xPos, yPos: (a.obj.yPos + this.dia), col: this.HighlightCol, length: this.dia / 2, label: "j"  , textS: this.TEXT_SIZE}),
            new PointerArrow({ xPos: b.obj.xPos, yPos: (b.obj.yPos + this.dia), col: this.HighlightCol, length: this.dia / 2, label: "j+1", textS: this.TEXT_SIZE})
          ];

          await this.waitWhilePaused();
          DrawArray(this.arrows);
          await this.delay(this.TimeoutDelay);

          await this.waitWhilePaused();
          if (!this.isAnimating) return null;

          if (compare(a, b)) {
            this.logger.show({
              message: { title: `Comparing ${a.value}, ${b.value}`, text: `swapping nodes as ${b.value} is less then ${a.value}.` },
              type: "info"
            });
            [Array[j], Array[j + 1]] = [b, a];
            await this.swapAnimation(a.obj, b.obj, this.arrows);
          }

          if (!this.isAnimating) return null;
          a.obj.col = b.obj.col = this.BaseCol;
        }

        if (!this.isAnimating) return null;
        Array[i].obj.col = this.sortedCol;
        this.logger.show({
          message: { title: "Element Sorted", text: `Element ${Array[i].value} is now in its correct position.` },
          type: "success"
        });
        DrawArray();
      }
      return true;
    } catch (e) {
      //console.error("Error in bubbleSort: ", e);
      this.logger.show({
        message: { title: "Error", text: "An error occurred during the bubble sort process" },
        type: "error",
        isEvent:true
      });
      return false;
    }

  }



  async run() {
    this.isAnimating = true;
    this.logger.clearLogs();

    //console.log("TEXT_SIZE", this.TEXT_SIZE);

    this.logger.show({
      message: { title: "Bubble Sort Started", text: "Sorting the array using Bubble Sort algorithm." },
      type: "info",
      isEvent: true
    });
    let isSorted = await this.bubbleSort(this.objNodeArray);

    this.isAnimating = false;

    if (isSorted){
      this.logger.show({
        message: { title: "Sorting Complete", text: "Bubble Sort has finished. The array is now sorted." },
        type: "success",
        isEvent: true
      })
    }
  }
};

export const BubbleSort = new BubbleSortClass();