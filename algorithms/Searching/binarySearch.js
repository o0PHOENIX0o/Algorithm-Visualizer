import { Base } from "../Base.js"
import { DrawArray, PointerArrow, Circle, Square, clearCanvas } from '../../canvas.js';


class BinarySearchClass extends Base {
    constructor() {
        super("Binary Search", 10, 40);
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


    async binarySearchAlgo(array, l, r, key) {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.delay(this.TimeoutDelay);
        if (l > r) {
            alert("key not found in dataset");
            DrawArray(this.keyCircle);
            await this.delay(this.TimeoutDelay);
            return;
        };
        let mid = Math.floor((l + r) / 2);

        this.keyCircle = [ new Circle({xPos: array[mid].obj.xPos, yPos: (array[mid].obj.yPos - array[mid].obj.dia - this.spacing), dia: this.dia, label: key, col: this.sortedCol}) ];

        let BoxX1 = array[l].obj.xPos - array[l].obj.dia / 2 - 5;
        let BoxY1 = array[l].obj.yPos + array[l].obj.dia / 2 + 5;
        let BoxX2 = array[r].obj.xPos + array[l].obj.dia / 2 + 5;
        let BoxY2 = array[r].obj.yPos - array[l].obj.dia / 2 - 5;

        let pointerBoxX1 = this.keyCircle[0].xPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxY1 = this.keyCircle[0].yPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxX2 = array[mid].obj.xPos + array[mid].obj.dia / 2 + 5;
        let pointerBoxY2 = array[mid].obj.yPos + array[mid].obj.dia / 2 + 5;

        this.squareArray = [
            new Square({xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.HighlightCol}),
            new Square({xPos1: pointerBoxX1, yPos1: pointerBoxY1, xPos2: pointerBoxX2, yPos2: pointerBoxY2, col: this.unsortedCol})
        ];

        let offset = (l === mid || r === mid) ? 90 : 40;
        this.arrows = [
            new PointerArrow({xPos: array[l].obj.xPos, yPos: array[l].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "left"}),
            new PointerArrow({xPos: array[r].obj.xPos, yPos: array[r].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "right"}),
            new PointerArrow({xPos: array[mid].obj.xPos, yPos: array[mid].obj.yPos + offset, col: this.HighlightCol, length: 20, label: "mid"}),
        ];

        DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;


        if (Number(array[mid].value) === key) {
            array[mid].obj.col = this.sortedCol;
            this.arrows = [new PointerArrow({xPos: array[mid].obj.xPos, yPos: array[l].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "key"})];

            this.squareArray = [new Square({xPos1: pointerBoxX1, yPos1: pointerBoxY1, xPos2: pointerBoxX2, yPos2: pointerBoxY2, col: this.sortedCol})];
            DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
            await this.delay(this.TimeoutDelay);
            return;

        } else if (Number(array[mid].value) > key) { // go left
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            for (let i = mid; i <= r; i++) { array[i].obj.col = this.BaseCol; array[i].obj.textCol = "#6d6c6c"; }
            return await this.binarySearchAlgo(array, l, mid - 1, key)

        } else {  // go right
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            for (let i = 0; i <= mid; i++) { array[i].obj.col = this.BaseCol; array[i].obj.textCol = "#6d6c6c"; }
            return await this.binarySearchAlgo(array, mid + 1, r, key)
        }
    }

    isSorted(array) {
        let isAsc = true;
        for (let i = 1; i < array.length; i++)
            if (Number(array[i - 1].value) > Number(array[i].value)) isAsc = false;

        return isAsc;
    }

    async run() {
        this.isAnimating = true;

        let isArraySorted = this.isSorted(this.objNodeArray);
        if (!isArraySorted) {
            alert("binary search only works on sorted data");
            this.reset();
            return;
        }
        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.binarySearchAlgo(this.objNodeArray, 0, this.objNodeArray.length - 1, Number(this.key));


        this.isAnimating = false;
    }
};

export const binarySearch = new BinarySearchClass();