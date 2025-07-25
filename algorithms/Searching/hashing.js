import { Base, compare } from "../Base.js"
import { DrawArray, Circle, Square, Line, width, height, clearCanvas } from '../../canvas.js';


class hashSearchClass extends Base {
  constructor() {
    super("Hash Search", 10, 40);
    this.arrows = [];
    this.keyCircle = [];
    this.squareArray = [];
    this.bucketArray = [];
    this.lineArray = [];
    this.hashTable = [];
    this.hashBox = null;
    this.bucketSize = 13;
    this.GD = 0.6180339887;
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
    this.bucketArray = [];
    this.lineArray = [];
    this.hashTable = [];
    this.hashBox = null;
    this.isAnimating = false;
    this.isPause = false;
    await this.delay(50);
    clearCanvas();
    DrawArray(null);
  }


  async move(element, x, y, speedFactor = 4) {
    if (!this.isAnimating) return;
    return new Promise(resolve => {
      if (!this.isAnimating) return;

      const startX = element.xPos, startY = element.yPos;
      let t = 0;
      const animate = async () => {
        if (!this.isAnimating) return;

        t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
        element.xPos = lerp(startX, x, t);
        element.yPos = lerp(startY, y, t);
        DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray, ...this.keyCircle]);

        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolve();
      };
      animate();
    });
  }

  async generateBucket() {
    if (!this.isAnimating) return;
    let yOffset = 70;
    let boxLength = this.objNodeArray[0].obj.dia + (1.1 * this.spacing);
    let totalLength = (boxLength + this.spacing) * this.bucketSize;


    //hash box
    let BoxX1 = (width / 2) - (2 * boxLength);
    let BoxY1 = this.objNodeArray[0].obj.yPos + yOffset;
    let BoxX2 = (width / 2) + (2 * boxLength)
    let BoxY2 = BoxY1 - boxLength;
    this.hashBox = new Square({xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.HighlightCol2, strokeW: 2, text: "Hash Function"});

    let x1 = (width / 2) - (totalLength / 2) + (boxLength / 2);
    let y1 = BoxY1 + yOffset;
    let x2 = x1 + boxLength;
    let y2 = y1 - boxLength;

    for (let i = 0; i < this.bucketSize; i++) {
      if (!this.isAnimating) return;
      this.bucketArray.push( new Square({xPos1: x1, yPos1: y1, xPos2: x2, yPos2: y2, col: this.HighlightCol, strokeW: 2, text: i}) );
      x1 += (boxLength + this.spacing);
      x2 += (boxLength + this.spacing);
    }

    DrawArray([...this.bucketArray, this.hashBox]);
    await this.delay(this.TimeoutDelay);
  }

  async generateHashTable(array) {
    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    let hashBoxWidth = this.hashBox.xPos2 - this.hashBox.xPos1;
    let hashBoxHeight = this.hashBox.yPos1 - this.hashBox.yPos2;

    let bucketWidth = this.bucketArray[0].xPos2 - this.bucketArray[0].xPos1;
    let bucketHeight = this.bucketArray[0].yPos1 - this.bucketArray[0].yPos2;
    let BucketPositions = this.bucketArray.map(element => (
      {
        x: element.xPos1 + bucketWidth / 2,
        y: element.yPos1 - bucketWidth / 2
      }
    ));


    let seenX = [];
    for (const element of array) {
      await this.waitWhilePaused();
      if (!this.isAnimating) return;

      let index = await this.Hash(Number(element.value));
      let { x: targetX, y: targetY } = BucketPositions[index];
      Object.assign(BucketPositions[index], { x: BucketPositions[index].x, y: BucketPositions[index].y + element.obj.dia + this.spacing - 5 });

      this.lineArray = [
       new Line({x1: element.obj.xPos, y1: element.obj.yPos, x2: (this.hashBox.xPos1 + hashBoxWidth / 2), y2: (this.hashBox.yPos1 - hashBoxHeight / 2), col: 0})
      ];
      DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray]);

      await this.delay(this.TimeoutDelay);
      await this.waitWhilePaused();
      if (!this.isAnimating) return;
      
      await this.move(element.obj, this.hashBox.xPos1 + hashBoxWidth / 2, this.hashBox.yPos1 - hashBoxHeight / 2);
      
      await this.delay(this.TimeoutDelay);
      await this.waitWhilePaused();
      if (!this.isAnimating) return;

      this.lineArray.push(new Line({x1: (this.hashBox.xPos1 + hashBoxWidth / 2), y1: (this.hashBox.yPos1 - hashBoxHeight / 2), x2: targetX, y2: targetY, col: this.HighlightCol2}));
      
      DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray]);
      await this.waitWhilePaused();
      if (!this.isAnimating) return;


      //collision
      if (seenX.includes(targetX)) {
        console.log("collision");
        this.bucketArray[index].col = this.unsortedCol;
        this.bucketArray[index].textYOffset = -bucketHeight / 2 - 10;

        this.bucketArray[index].text = "COLLISION";
        DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray]);

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

      }
      seenX.push(targetX);

      await this.delay(this.TimeoutDelay);
      await this.move(element.obj, targetX, targetY);
      await this.waitWhilePaused();
      if (!this.isAnimating) return;


      if (this.hashTable[index]) this.hashTable[index].push(element);
      else this.hashTable[index] = [element];

      this.bucketArray[index].col = this.HighlightCol;
      this.bucketArray[index].textYOffset = 0;
      this.bucketArray[index].text = "";
      DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray]);

    }
  }

  async Hash(num) {
    return (Math.floor(999983 * ((num * this.GD) % 1))) % this.bucketSize;
  }


  async Hashing(array, key) {
    await this.generateBucket();
    await this.delay(this.TimeoutDelay);

    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    await this.generateHashTable(array);

    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    DrawArray([...this.bucketArray, this.hashBox]);
    await this.delay(this.TimeoutDelay);

    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    let hashBoxWidth = this.hashBox.xPos2 - this.hashBox.xPos1;
    let hashBoxHeight = this.hashBox.yPos1 - this.hashBox.yPos2;

    let bucketWidth = this.bucketArray[0].xPos2 - this.bucketArray[0].xPos1;
    let bucketHeight = this.bucketArray[0].yPos1 - this.bucketArray[0].yPos2;

    let keyIndex = await this.Hash(Number(key));
    console.log("keyIndex = ", keyIndex)
    let targetX = this.bucketArray[keyIndex].xPos1 + bucketWidth / 2;
    let targetY = this.bucketArray[keyIndex].yPos1 - bucketHeight / 2;

    this.keyCircle = [ new Circle({xPos: width / 2, yPos: 30, dia: array[0].obj.dia, label: key, col: this.sortedCol}) ];
    DrawArray([...this.bucketArray, this.hashBox, ...this.keyCircle]);

    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    this.lineArray = [
      new Line({x1: this.keyCircle[0].xPos, y1: this.keyCircle[0].yPos, x2: (this.hashBox.xPos1 + hashBoxWidth / 2), y2: (this.hashBox.yPos1 - hashBoxHeight / 2), col: 0})
    ];
    DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray, ...this.keyCircle]);


    await this.delay(this.TimeoutDelay);
    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    await this.move(this.keyCircle[0], this.hashBox.xPos1 + hashBoxWidth / 2, this.hashBox.yPos1 - hashBoxHeight / 2);

    await this.delay(this.TimeoutDelay);
    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    this.lineArray.push(new Line({x1: (this.hashBox.xPos1 + hashBoxWidth / 2), y1: (this.hashBox.yPos1 - hashBoxHeight / 2), x2: targetX, y2: targetY, col: this.HighlightCol2}));

    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] && i !== keyIndex) {
        console.log(this.hashTable[i]);
        for (const element of this.hashTable[i]) {
          element.obj.col = this.BaseCol;
          element.obj.textCol = "#6d6c6c";
        }
      }
    }

    this.bucketArray.forEach((element, i) => {
      if (i !== keyIndex) {
        element.col = this.BaseCol;
        element.textCol = "#6d6c6c";
      } else element.col = "#f0f0f0";
    });

    await this.waitWhilePaused();
    if (!this.isAnimating) return;

    await this.move(this.keyCircle[0], targetX - array[0].obj.dia - this.spacing, targetY);
    this.lineArray = [];
    DrawArray([...this.bucketArray, this.hashBox, ...this.keyCircle]);
    await this.delay(this.TimeoutDelay);


    let targetbuckets = this.hashTable[keyIndex];
    console.log("target buckets : ", targetbuckets, this.hashTable[keyIndex]);
    for (let i = 0; i < targetbuckets.length; i++) {
      await this.waitWhilePaused();
      if (!this.isAnimating) return;

      targetbuckets[i].obj.col = this.HighlightCol;

      this.keyCircle = [
        new Circle({xPos: (targetbuckets[i].obj.xPos - targetbuckets[i].obj.dia - this.spacing), yPos: targetbuckets[i].obj.yPos, dia: targetbuckets[i].obj.dia, label: key, col: this.sortedCol})
      ];

      let BoxX1 = this.keyCircle[0].xPos - this.keyCircle[0].dia / 2 - 5;
      let BoxY1 = this.keyCircle[0].yPos + this.keyCircle[0].dia / 2 + 5;
      let BoxX2 = targetbuckets[i].obj.xPos + targetbuckets[i].obj.dia / 2 + 5;
      let BoxY2 = targetbuckets[i].obj.yPos - targetbuckets[i].obj.dia / 2 - 5;

      this.squareArray = [
        new Square({xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.unsortedCol})
      ];


      DrawArray([...this.bucketArray, this.hashBox, ...this.lineArray, ...this.squareArray, ...this.keyCircle]);

      await this.waitWhilePaused();
      await this.delay(this.TimeoutDelay);
      if (!this.isAnimating) return;
      if (targetbuckets[i].value == key) {

        console.log("found at ", i);
        targetbuckets[i].obj.col = this.sortedCol;
        this.squareArray[0].col = this.sortedCol;

        DrawArray([...this.bucketArray, this.hashBox, ...this.squareArray, ...this.keyCircle]);

        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();

        return;
      } else {
        targetbuckets[i].obj.col = this.unsortedCol;
        await this.delay(this.TimeoutDelay);
      }
    }

    targetbuckets[targetbuckets.length - 1].obj.col = this.unsortedCol;
    DrawArray([...this.bucketArray, this.hashBox, ...this.keyCircle]);



    await this.waitWhilePaused();
    if (!this.isAnimating) return;
  }


  async run() {
    this.isAnimating = true;

    await this.waitWhilePaused();
    if (!this.isAnimating) return;
    await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2)));
    this.objNodeArray.forEach(element => element.obj.dia = 30);
    await this.waitWhilePaused();

    await this.Hashing(this.objNodeArray, this.key);


    this.isAnimating = false;
  }
};

export const hashSearch = new hashSearchClass();