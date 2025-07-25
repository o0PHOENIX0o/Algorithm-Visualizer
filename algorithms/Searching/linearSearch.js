import { Base, compare } from "../Base.js"
import { DrawArray, PointerArrow, Circle, Square, clearCanvas } from '../../canvas.js';


class linearSearchClass extends Base {
  constructor() {
    super("Linear Search", 10, 40);
    this.arrows = [];
    this.keyCircle = [];
    this.squareArray = [];
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
    this.keyCircle = [];
    this.squareArray = [];
    this.isAnimating = false;
    this.isPause = false;
    await this.delay(50);
    clearCanvas();
    DrawArray(null);
  }


  async linearSearchAlgo(array, key) {
    for (let i = 0; i < array.length; i++) {
      if (!this.isAnimating) return;
      array[i].obj.col = this.HighlightCol;
      this.arrows = [
        new PointerArrow({xPos: array[i].obj.xPos, yPos: (this.objNodeArray[i].obj.yPos + 40), col: this.HighlightCol, length: 20, label: "i"})
      ];
      this.keyCircle = [
        new Circle({xPos: array[i].obj.xPos, yPos: (array[i].obj.yPos - array[i].obj.dia - this.spacing), dia: this.dia, label: key, col: this.sortedCol})
      ];

      let BoxX1 = this.keyCircle[0].xPos - this.keyCircle[0].dia / 2 - 5;
      let BoxY1 = this.keyCircle[0].yPos - this.keyCircle[0].dia / 2 - 5;
      let BoxX2 = array[i].obj.xPos + array[i].obj.dia / 2 + 5;
      let BoxY2 = array[i].obj.yPos + array[i].obj.dia / 2 + 5;

      this.squareArray = [
        new Square({xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.unsortedCol}),
      ];

      DrawArray([...this.arrows, ...this.squareArray, ...this.keyCircle]);
      await this.waitWhilePaused();
      await this.delay(this.TimeoutDelay);
      if (!this.isAnimating) return;
      if (array[i].value === key) {

        console.log("found at ", i);
        array[i].obj.col = this.sortedCol;
        this.squareArray[0].col = this.sortedCol;
        DrawArray([...this.arrows, ...this.squareArray, ...this.keyCircle]);

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        return;
      } else {

        array[i].obj.col = this.unsortedCol;
        await this.delay(this.TimeoutDelay);
      }
    }
    if (!this.isAnimating) return;

    array[array.length - 1].obj.col = this.unsortedCol;
    DrawArray(this.keyCircle);
    await this.delay(this.TimeoutDelay);
    console.log("not found");
  }


  async run() {
    this.isAnimating = true;

    await this.waitWhilePaused();
    if (!this.isAnimating) return;
    await this.linearSearchAlgo(this.objNodeArray, this.key);


    this.isAnimating = false;
  }
};

export const linearSearch = new linearSearchClass();