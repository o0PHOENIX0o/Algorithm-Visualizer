import { clearCanvas, DrawArray, Circle, height, width } from "../../canvas.js";

export class BaseSort {
  constructor(name) {
    this.name = name;
    this.objNodeArray = [];
    this.BaseSpeed = 0.01;
    this.AnimationSpeed = 0.01;
    this.BaseDelay = 500;
    this.TimeoutDelay = 500;
    this.BaseCol = "#9e9e9e";
    this.HighlightCol = "#667eea";
    this.HighlightCol2 = "#09d3ff";
    this.sortedCol = "#4CAF50";
    this.isAnimating = false;
    this.isPause = false;
  }

  generate(input) {
    // console.log("generate");
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
  }

  async reset() {
    
    this.objNodeArray = [];
    this.isAnimating = false;
    this.isPause = false;
    this.i = null;
    await this.delay(50);
    clearCanvas();
    DrawArray();
  }

  Pause() {
    this.isPause = true;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  }
}

export function compare(a, b) {
  const aVal = a.value;
  const bVal = b.value;

  const aNum = Number(aVal);
  const bNum = Number(bVal);

  if (isNaN(aNum) && isNaN(bNum)) return bVal < aVal;
  else return bNum < aNum;
}