import { Base } from "../Base/Base.js"
import { DrawArray, PointerArrow, Circle, Square, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';
import { Logger } from "../../Core/logger.js";

class BinarySearchClass extends Base {
    constructor() {
        super("Binary Search", 10, 40);
        this.arrows = [];
        this.keyCircle = [];
        this.squareArray = [];
        this.logger = new Logger();
        this.isDesc = false; // new flag for descending order
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
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
    }

    async binarySearchAlgo(array, l, r, key) {
        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.delay(this.TimeoutDelay);
        if (l > r) {
            this.logger.show({
                message: {
                    title: "Not Found",
                    text: `Key not found in the sub array: [${array.slice(l, r + 1).map(node => node.value)}].`
                },
                type: "info"
            });

            DrawArray(this.keyCircle);
            await this.delay(this.TimeoutDelay);
            return;
        };
        let mid = Math.floor((l + r) / 2);

        this.logger.show({
            message: {
                title: `mid value ${array[mid].value}`,
                text: `Checking mid index ${mid} with value ${array[mid].value}.`
            },
            type: "info"
        });

        this.keyCircle = [new Circle({ xPos: array[mid].obj.xPos, yPos: (array[mid].obj.yPos - array[mid].obj.dia - this.spacing), dia: this.dia, label: key, col: this.sortedCol })];

        let BoxX1 = array[l].obj.xPos - array[l].obj.dia / 2 - 5;
        let BoxY1 = array[l].obj.yPos + array[l].obj.dia / 2 + 5;
        let BoxX2 = array[r].obj.xPos + array[l].obj.dia / 2 + 5;
        let BoxY2 = array[r].obj.yPos - array[l].obj.dia / 2 - 5;

        let pointerBoxX1 = this.keyCircle[0].xPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxY1 = this.keyCircle[0].yPos - this.keyCircle[0].dia / 2 - 5;
        let pointerBoxX2 = array[mid].obj.xPos + array[mid].obj.dia / 2 + 5;
        let pointerBoxY2 = array[mid].obj.yPos + array[mid].obj.dia / 2 + 5;

        this.squareArray = [
            new Square({ xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: this.HighlightCol }),
            new Square({ xPos1: pointerBoxX1, yPos1: pointerBoxY1, xPos2: pointerBoxX2, yPos2: pointerBoxY2, col: this.unsortedCol })
        ];

        let offset = (l === mid || r === mid) ? 90 : 40;
        this.arrows = [
            new PointerArrow({ xPos: array[l].obj.xPos, yPos: array[l].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "left" }),
            new PointerArrow({ xPos: array[r].obj.xPos, yPos: array[r].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "right" }),
            new PointerArrow({ xPos: array[mid].obj.xPos, yPos: array[mid].obj.yPos + offset, col: this.HighlightCol, length: 20, label: "mid" }),
        ];

        DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        if (Number(array[mid].value) === key) {
            array[mid].obj.col = this.sortedCol;
            this.arrows = [new PointerArrow({ xPos: array[mid].obj.xPos, yPos: array[l].obj.yPos + 40, col: this.HighlightCol, length: 20, label: "key" })];

            this.squareArray = [new Square({ xPos1: pointerBoxX1, yPos1: pointerBoxY1, xPos2: pointerBoxX2, yPos2: pointerBoxY2, col: this.sortedCol })];
            DrawArray([...this.squareArray, ...this.arrows, ...this.keyCircle]);
            await this.delay(this.TimeoutDelay);
            this.logger.show({
                message: {
                    title: "Found",
                    text: `Key ${key} found at index ${mid}.`
                },
                type: "success",
            });

            return;
        }

        // branching depends on order
        if ((!this.isDesc && Number(array[mid].value) > key) || (this.isDesc && Number(array[mid].value) < key)) {
            // go left
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            for (let i = mid; i <= r; i++) { array[i].obj.col = "#525252ff"; array[i].obj.textCol = "#cececeff"; }

            const leftArr = array.slice(l, mid).map(node => node.value);
            const rightArr = array.slice(mid, r + 1).map(node => node.value);

            this.logger.show({
                message: {
                    title: `Key ${key} ${this.isDesc ? ">" : "<"} ${array[mid].value} → Go Left`,
                    text: `Current array: [${array.slice(l, r + 1).map(node => node.value)}] <br>
                        <span style="color:green">Left array: [${leftArr}] </span> <br>
                        <span style="color:red">Right array (discarded): [${rightArr}]</span>`
                },
                type: "info"
            });
            return await this.binarySearchAlgo(array, l, mid - 1, key)
        } else {
            // go right
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            for (let i = 0; i <= mid; i++) { array[i].obj.col = "#525252ff"; array[i].obj.textCol = "#cececeff"; }

            const leftArr = array.slice(l, mid + 1).map(node => node.value);
            const rightArr = array.slice(mid + 1, r + 1).map(node => node.value);

            this.logger.show({
                message: {
                    title: `Key ${key} ${this.isDesc ? "<" : ">"} ${array[mid].value} → Go Right`,
                    text: `Current array: [${array.slice(l, r + 1).map(node => node.value)}] <br>
                        <span style="color:red">Left array (discarded): [${leftArr}] </span> <br>
                        <span style="color:green">Right array: [${rightArr}]</span>`
                },
                type: "info"
            });

            return await this.binarySearchAlgo(array, mid + 1, r, key)
        }
    }

    isSorted(array) {
        if (array.length <= 1) return true;

        let asc = true;
        let desc = true;

        for (let i = 1; i < array.length; i++) {
            const prev = Number(array[i - 1].value);
            const curr = Number(array[i].value);

            if (prev > curr) asc = false;
            if (prev < curr) desc = false;
        }

        if (asc) {
            this.isDesc = false;
            return true;
        } else if (desc) {
            this.isDesc = true;
            return true;
        }
        return false;
    }

    async run() {
        this.isAnimating = true;

        let isArraySorted = this.isSorted(this.objNodeArray);
        if (!isArraySorted) {
            this.logger.show({
                message: { title: "Invalid Data", text: "The array must be sorted before performing binary search." },
                type: "error",
                isEvent: true
            });
            this.reset();
            return;
        }

        this.logger.show({
            message: {
                title: "Binary Search",
                text: `Starting Binary Search for key ${this.key} on a ${this.isDesc ? "descending" : "ascending"} array.`
            },
            type: "info",
            isEvent: true
        });

        await this.binarySearchAlgo(this.objNodeArray, 0, this.objNodeArray.length - 1, Number(this.key));

        this.logger.show({
            message: { title: "Completed", text: "Binary Search completed." },
            type: "success",
            isEvent: true
        });

        this.isAnimating = false;
        let btn = document.getElementById("togglePlayBtn");
        btn.classList.add('play-btn');
        btn.classList.remove('pause-btn');
        btn.innerHTML = '<span class="btn-icon"><ion-icon name="play-outline"></ion-icon></span> Play';
    }
};

export const binarySearch = new BinarySearchClass();
