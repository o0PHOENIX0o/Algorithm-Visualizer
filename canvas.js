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
    noStroke();
    fill(0);
    textFont('sans-serif');
    textStyle(NORMAL);
    textAlign(CENTER);
    text(this.label, this.xPos, this.yPos);
  }
}

export class Square {
  constructor(xPos1, yPos1, xPos2, yPos2, col, strokeW = 2) {
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
  constructor(xPos, yPos, col, length, label, textS = 16, textY = 20) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.col = col;
    this.length = length;
    this.label = label;

    this.textS = textS;
    this.textY = textY;
  }

  draw() {
    const h = this.length / (2 * Math.sqrt(3));
    const x1 = this.length / 2;
    const x2 = 0;
    const x3 = -this.length / 2;
    const y1 = h;
    const y2 = -2 * h;
    const y3 = h;

    push();
    translate(this.xPos, this.yPos);
    noStroke(); 
    fill(this.col);
    triangle(x1, y1, x2, y2, x3, y3);
    pop();

    push();
    noStroke();
    fill(0);
    textFont('sans-serif');
    textStyle(NORMAL);
    textSize(this.textS);
    textAlign(CENTER);
    text(this.label, this.xPos, this.yPos + this.textY);
    pop();
  }
}


export class Line {
  constructor(x1, y1, x2, y2, col, strockW = 2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.col = col;
    this.strockW = strockW;
  }

  draw() {
    stroke(this.col);
    strokeWeight(this.strockW);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

export class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4, col, strockW = 2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;

    this.col = col;
    this.strockW = strockW;
  }

  draw() {
    noFill();
    stroke(this.col);
    strokeWeight(this.strockW)
    quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
  }
}

export function DrawArray(arrows = []) {
  clearCanvas();
  if (arrows && arrows.length > 0) arrows.forEach(arrow => arrow.draw());
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
  resizeCanvas(parent.offsetWidth - 64, parent.offsetHeight);
  DrawArray();
}


export { height, width }