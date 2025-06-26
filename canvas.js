let width, height;

export class Circle {
  constructor(xPos, yPos, dia, label, col) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.dia = dia;
    this.label = label;
    this.col = col;
  }

  draw() {
    fill(this.col);
    noStroke();
    circle(this.xPos, this.yPos, this.dia);
    fill(0);
    text(this.label, this.xPos, this.yPos);
  }
}

export class Sqare {
  constructor(xPos1, yPos1, xPos2, yPos2, col, strokeW=2) {
    this.xPos1 = xPos1;
    this.yPos1 = yPos1;
    this.xPos2 = xPos2;
    this.yPos2 = yPos2;
    this.strokeW = strokeW;
    this.col = col;
  }

  draw() {
    rectMode(CENTER);

    noFill();
    stroke(this.col);
    strokeWeight(this.strokeW); 

    let w = Math.abs(this.xPos2 - this.xPos1);
    let h = Math.abs(this.yPos2 - this.yPos1);

    let centerX = (this.xPos1 + this.xPos2) / 2;
    let centerY = (this.yPos1 + this.yPos2) / 2;

    rect(centerX, centerY, w, h);
    
    
    // noStroke();           
    // fill(0);              
    // textAlign(CENTER, CENTER);
    // text(this.label, this.xPos, this.yPos);
  }
}

export class PointerArrow {
  constructor(xPos, yPos, col, length, label) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.col = col;
    this.length = length;
    this.label = label;
  }

  draw() {
    const h = this.length / (2 * Math.sqrt(3));
    const x1 = this.xPos + (this.length / 2);
    const x2 = this.xPos;
    const x3 = this.xPos - (this.length / 2);
    const y1 = this.yPos + h;
    const y2 = this.yPos - (2 * h);
    const y3 = y1;

    fill(this.col);
    triangle(x1, y1, x2, y2, x3, y3);
    fill(0);
    textSize(16);
    text(this.label, this.xPos, this.yPos + 20);
  }
}

export function DrawArray(arrows = []) {
  clearCanvas();
  if(arrows && arrows.length > 0) arrows.forEach(arrow => arrow.draw());
  window.currentAlgorithm.objNodeArray.forEach(({ obj }) => obj.draw());
}

export function clearCanvas() {
  clear();
  background("#f0f0f0");
}

export function setupCanvas() {
  const parent = document.getElementById("CanvasContainer");
  const canvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
  height = canvas.height;
  width = canvas.width;
  canvas.parent("CanvasContainer");
  textAlign(CENTER, CENTER);
  textSize(16);
  background("#f0f0f0");
}

export function windowResized() {
  console.log("resized");
  const parent = document.getElementById("CanvasContainer");
  resizeCanvas(parent.offsetWidth-64, parent.offsetHeight);
  DrawArray();
}


export {height,width}