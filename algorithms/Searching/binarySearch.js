import { Base, compare } from "../Base.js"
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

        this.keyCircle = [new Circle(array[mid].obj.xPos, array[mid].obj.yPos - array[mid].obj.dia - this.spacing, this.dia, key, this.sortedCol)];

        let BoxX1 = array[l].obj.xPos - array[l].obj.dia / 2 - 5;
        let BoxY1 = array[l].obj.yPos + array[l].obj.dia / 2 + 5;
        let BoxX2 = array[r].obj.xPos + array[l].obj.dia / 2 + 5;
        let BoxY2 = array[r].obj.yPos - array[l].obj.dia / 2 - 5;

        let pointerBoxX1 = this.keyCircle[0].xPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxY1 = this.keyCircle[0].yPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxX2 = array[mid].obj.xPos + array[mid].obj.dia / 2 + 5;
        let pointerBoxY2 = array[mid].obj.yPos + array[mid].obj.dia / 2 + 5;

        this.squareArray = [
            new Square(BoxX1, BoxY1, BoxX2, BoxY2, this.HighlightCol),
            new Square(pointerBoxX1, pointerBoxY1, pointerBoxX2, pointerBoxY2, this.unsortedCol),
        ];

        let offset = (l === mid || r === mid) ? 90 : 40;
        this.arrows = [
            new PointerArrow(array[l].obj.xPos, array[l].obj.yPos + 40, this.HighlightCol, 20, "left"),
            new PointerArrow(array[r].obj.xPos, array[r].obj.yPos + 40, this.HighlightCol, 20, "right"),
            new PointerArrow(array[mid].obj.xPos, array[mid].obj.yPos + offset, this.HighlightCol, 20, "mid"),
        ];

        DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;


        if (Number(array[mid].value) === key) {
            array[mid].obj.col = this.sortedCol;
            this.arrows = [new PointerArrow(array[mid].obj.xPos, array[l].obj.yPos + 40, this.HighlightCol, 20, "key")];
            this.squareArray = [new Square(pointerBoxX1, pointerBoxY1, pointerBoxX2, pointerBoxY2, this.sortedCol)];
            DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
            await this.delay(this.TimeoutDelay);
            return;

        } else if (Number(array[mid].value) > key) {
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