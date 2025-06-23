import { DrawArray, clearCanvas, PointerArrow, Circle } from '../canvas.js';

export const BubbleSort = {
  name: "Bubble Sort",
  objNodeArray: [],
  isAnimating: false,
  BaseSpeed: 0.01,
  AnimationSpeed: 0.01,
  BaseDelay: 500,
  TimeoutDelay: 500,
  BaseCol: "#9e9e9e",
  HighlightCol: "#667eea",
  isPause: false,

  generate(input) {
    clearCanvas();
    this.objNodeArray = [];
    const spacing = 20;
    const dia = 50;
    const totalLength = input.length * (dia + spacing);
    let x = (width / 2) - (totalLength / 2) + dia / 2;

    input.forEach(val => {
      const circle = new Circle(x, height / 2, dia, val, this.BaseCol);
      this.objNodeArray.push({ value: val, obj: circle });
      x += dia + spacing;
    });

    DrawArray();
  },

  reset() {
    this.objNodeArray = [];
    this.isAnimating = false;
    clearCanvas();
    // DrawArray();
  },

  async run() {
    this.isAnimating = true;

    for (let i = this.objNodeArray.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if(this.isPause){ 
          console.log("Paused");
          this.isAnimating = false;
          return;
        }
        const a = this.objNodeArray[j];
        const b = this.objNodeArray[j + 1];
        a.obj.col = b.obj.col = this.HighlightCol;

        const arrows = [
          new PointerArrow(a.obj.xPos, a.obj.yPos + 40, this.HighlightCol, 20, "j"),
          new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j+1")
        ];

        DrawArray(arrows);
        await this.delay(this.TimeoutDelay);

        if (a.value > b.value) {
          [this.objNodeArray[j], this.objNodeArray[j + 1]] = [b, a];
          await this.swapAnimation(a.obj, b.obj, arrows);
        }

        a.obj.col = b.obj.col = this.BaseCol;
      }

      this.objNodeArray[i].obj.col = "#4CAF50"; // sorted color
      DrawArray();
    }

    this.isAnimating = false;
  },

  swapAnimation(obj1, obj2, arrows) {
    return new Promise(resolve => {
      const startX1 = obj1.xPos, startX2 = obj2.xPos;
      let t = 0;
      const animate = () => {
        t = min(t + this.AnimationSpeed, 1);
        obj1.xPos = lerp(startX1, startX2, t);
        obj2.xPos = lerp(startX2, startX1, t);
        clearCanvas();
        DrawArray(arrows);
        if (t < 1) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
