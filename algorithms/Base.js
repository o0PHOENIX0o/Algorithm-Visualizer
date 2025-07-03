import { clearCanvas, DrawArray, Circle, height, width } from "../canvas.js";

export class Base {
  constructor(name, spacing = 20, diameter = 50) {
    this.name = name;
    this.objNodeArray = [];
    this.inputArray = [];
    this.key = null;
    this.BaseSpeed = 0.01;
    this.AnimationSpeed = 0.01;
    this.BaseDelay = 500;
    this.TimeoutDelay = 500;
    this.BaseCol = "#9e9e9e";
    this.HighlightCol = "#667eea";
    this.HighlightCol2 = "#09d3ff";
    this.sortedCol = "#4CAF50";
    this.unsortedCol = "#f44336";
    this.isAnimating = false;
    this.isPause = false;

    this.spacing = spacing;
    this.dia = diameter;
  }

  generate(input, key = null, x = null, y = null) {
    if(input.length<1) return;
    this.inputArray = [...input];
    y = (y == null) ? Number(height / 2) : Number(y);
    clearCanvas();
    if (input.length > 0 && this.name.includes("Search")) {
      if (key) this.key = key;
      else {
        alert("search key not provided!");
        return;
      }
    }
    this.objNodeArray = [];
    const totalLength = input.length * (this.dia + this.spacing);
    if (x == null) x = (width / 2) - (totalLength / 2) + this.dia / 2; 
    input.forEach(val => {
      const circle = new Circle(x, y, this.dia, val, this.BaseCol);
      this.objNodeArray.push({ value: val, obj: circle });
      x += this.dia + this.spacing;
    });
    
    console.log("key = ", this.key)
    DrawArray();
  }

  Pause() { this.isPause = true; }
  Resume() {
    if (this.isPause && this.isAnimating) {
      console.log("Resuming...");
      this.isPause = false;
    }
  }


  async waitWhilePaused() {
    while (this.isPause) {
      await this.delay(this.TimeoutDelay);
    }
  }

  delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  animateY(obj1, arrows, dist, speedFactor = 4) {
    return new Promise((resolveY) => {
      const startY1 = obj1.yPos;
      let t = 0;
      const animate = () => {
        t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
        obj1.yPos = lerp(startY1, startY1 + dist, t);
        DrawArray(arrows);
        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolveY();
      };
      animate();
    });
  }

  swapAnimation(obj1, obj2, arrows) {
    if (obj1 == obj2) return;
    return new Promise(resolve => {
      const startX1 = obj1.xPos, startX2 = obj2.xPos;
      let t = 0;
      const animate = () => {
        t = min(t + this.AnimationSpeed, 1);
        obj1.xPos = lerp(startX1, startX2, t);
        obj2.xPos = lerp(startX2, startX1, t);
        DrawArray(arrows);
        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  }

  async SwapNodes(obj1, obj2, arrows, speedFactor = 2) {
    if (obj1 == obj2) return;
    return new Promise(resolve => {
      const startX1 = obj1.xPos, startX2 = obj2.xPos;
      const startY1 = obj1.yPos, startY2 = obj2.yPos;
      let t = 0;
      const animate = () => {
        t = min(t + this.AnimationSpeed * speedFactor, 1);
        obj1.xPos = lerp(startX1, startX2, t);
        obj1.yPos = lerp(startY1, startY2, t);
        obj2.xPos = lerp(startX2, startX1, t);
        obj2.yPos = lerp(startY2, startY1, t);
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