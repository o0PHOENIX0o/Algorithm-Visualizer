let width, height;

export class Circle {
  constructor(xPos, yPos, dia, label, col, textCol = 0, strokeCol = null, strokeW = 2) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.dia = dia;
    this.label = label;
    this.col = col;
    this.textCol = textCol;
    this.strokeCol = (strokeCol) ? strokeCol : col;
    this.strokeW = strokeW;
  }

  draw() {
    push();
    // console.log(this.strokeCol)
    stroke(this.strokeCol);
    strokeWeight(this.strokeW);
    fill(this.col);
    circle(this.xPos, this.yPos, this.dia);
    pop();

    push();
    noStroke();
    fill(this.textCol);
    textFont('sans-serif');
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(this.label, this.xPos, this.yPos);
    pop();
  }
}

export class Text {
  constructor(xPos, yPos, label, textSize = 16, textCol = 0) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.label = label;
    this.textS = textSize;
    this.textCol = textCol;
  }

  draw() {
    push();
    noStroke();
    textFont('sans-serif');
    textSize(this.textS);
    fill(this.textCol);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(this.label, this.xPos, this.yPos);
    pop();
  }
}

export class Square {
  constructor(xPos1, yPos1, xPos2, yPos2, col, strokeW = 2, text = null, textCol = 0, textYOffset = 0) {
    this.xPos1 = xPos1;
    this.yPos1 = yPos1;
    this.xPos2 = xPos2;
    this.yPos2 = yPos2;
    this.strokeW = strokeW;
    this.col = col;
    this.strokeCol = col;
    this.text = text;
    this.textCol = textCol;
    this.textYOffset = textYOffset;
  }

  draw() {
    rectMode(CENTER);

    push();
    noFill();
    stroke(this.strokeCol);
    strokeWeight(this.strokeW);

    let w = Math.abs(this.xPos2 - this.xPos1);
    let h = Math.abs(this.yPos2 - this.yPos1);

    let centerX = (this.xPos1 + this.xPos2) / 2;
    let centerY = (this.yPos1 + this.yPos2) / 2;

    rect(centerX, centerY, w, h);
    pop();

    if (this.text !== null) {
      push();
      noStroke();
      fill(this.textCol);
      textAlign(CENTER, CENTER);
      text(this.text, centerX, centerY + this.textYOffset);
      pop();
    }
  }
}

export class PointerArrow {
  constructor(xPos, yPos, col, length, label, textCol = 0, textS = 16, textY = 20) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.col = col;
    this.length = length;
    this.label = label;

    this.textCol = textCol;
    this.textS = textS;
    this.textY = textY;
  }


  draw(){
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
    fill(this.textCol);
    textFont('sans-serif');
    textStyle(NORMAL);
    textSize(this.textS);
    textAlign(CENTER);
    text(this.label, this.xPos, this.yPos + this.textY);
    pop();
  }
}


export class Line {
  constructor(x1, y1, x2, y2, col, strokeW = 2, label = null, textCol = 0, textS = 16, textY = 20) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.col = col;
    this.strokeCol = col;
    this.strokeW = strokeW;

    this.label = label;
    this.textCol = textCol;
    this.textS = textS;
    this.textY = textY;
  }

  draw() {
    push();
    stroke(this.col);
    strokeWeight(this.strokeW);

    line(this.x1, this.y1, this.x2, this.y2);
    pop();

    if (this.label) {
      push();

      let slope = (this.y2 - this.y1) / (this.x2 - this.x1);
      let angle = atan(slope);
      let offset = max(0, dist(this.x1, this.y1, this.x2, this.y2) / 4);
      let midX = (this.x1 + this.x2) / 2;
      let midY = (this.y1 + this.y2) / 2;

      let x = midX + offset * cos(angle);
      let y = midY + offset * sin(angle);

      noStroke();
      fill(this.textCol);
      textFont('sans-serif');
      textStyle(BOLD);
      textSize(this.textS);
      textAlign(CENTER);
      text(this.label, x, y);
      pop();
    }
  }
}



export class Triangle {
  constructor(x1, y1, x2, y2, x3, y3, x4, y4, col, strokeW = 2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;

    this.col = col;
    this.strokeCol = col;
    this.strokeW = strokeW;
  }

  draw() {
    push();
    noFill();
    stroke(this.strokeCol);
    strokeWeight(this.strokeW)
    quad(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
    pop();
  }
}

export class PointerTriangles {
  constructor(x1, y1, x2, y2, x3, y3, col, angle, tx, ty) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;

    this.tx = tx;
    this.ty = ty;

    this.col = col;
    this.angle = angle;
  }

  draw() {
    push();
    translate(this.tx, this.ty);
    rotate(this.angle);
    fill(this.col);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    pop();
  }
}



export function DrawArray(objects = []) {
  clearCanvas();

  const algo = window.currentAlgorithm;
  const nodes = algo?.objNodeArray;

  if (algo?.name === "Hash Search") {
    nodes?.forEach(({ obj }) => obj?.draw());
    objects?.forEach(obj => obj?.draw());
  } else {
    objects?.forEach(obj => obj?.draw());
    nodes?.forEach(({ obj }) => obj?.draw());
  }
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