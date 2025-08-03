import { DrawArray, Square, clearCanvas, height } from "../../canvas.js";
import { TreeBase } from "./TreeBase.js";

class TreeTraversalClass extends TreeBase {
    constructor() {
        super('Tree Traversal');
        this.pointerSquares = []
    }

    reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.lineArray = [];
        this.objPositions = [];
        this.pointerSquares = []

        this.isAnimating = false;
        this.isPause = false;
        clearCanvas();
        DrawArray(null);
    }

    async preOrder(i, Array) {
        if (i < 0 || i >= Array.length) return;
        if (!this.isAnimating) return;

        let root = Array[i];
        let leftChildIndex = 2 * i + 1;
        let rightChildIndex = 2 * i + 2;

        this.pointerSquares = [
            (Array[i] != null) ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            (Array[leftChildIndex] != null && Array[leftChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            (Array[rightChildIndex] != null && Array[rightChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];

        root.obj.col = this.HighlightCol;
        this.drawAll(this.pointerSquares);
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();


        console.log("Visiting node: ", root.value);
        root.obj.col = this.sortedCol;

        let position = this.objPositions.shift();
        await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();


        await this.preOrder(leftChildIndex, Array);
        await this.waitWhilePaused();
        await this.preOrder(rightChildIndex, Array);
        await this.waitWhilePaused();

    }
    // /******************************************* */
    // /* iterative method for pre-order traversal  */
    // /*********************************************/
    // async preOrder(i, Array) {
    //     console.log('Running Tree Traversal', this.key);

    //     let stack = [];
    //     let current = i;

    //     while ((current < Array.length && Array[current] != null) || stack.length > 0) {
    //         let reuslt = [];
    //         while (current < Array.length && Array[current] != null) {
    //             let root = Array[current];
    //             this.pointerSquares = [
    //                 root != null ? this.BoxAround({ index: current, Nodes: Array, Boxtext: "Root" }) : null,
    //                 Array[2 * current + 1] != null ? this.BoxAround({ index: 2 * current + 1, Nodes: Array, Boxtext: "Left" }) : null,
    //                 Array[2 * current + 2] != null ? this.BoxAround({ index: 2 * current + 2, Nodes: Array, Boxtext: "Right" }) : null
    //             ];
    //             reuslt.push(root.value);
    //             console.log("Visiting node: ", root.value);

    //             stack.push({ root: root, index: current });
    //             root.obj.col = this.HighlightCol;
    //             current = 2 * current + 1;
    //             this.drawAll(this.pointerSquares);
    //             await this.delay(2 * this.TimeoutDelay);

    //             let position = this.objPositions.shift();
    //             await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
    //             await this.waitWhilePaused();

    //             await this.delay(this.TimeoutDelay);
    //         }

    //         let { root, index } = stack.pop();
    //         current = 2 * index + 2;
    //     }
    // }

    /******************************************* */
    /*  iterative method for in-order traversal  */
    /*********************************************/
    // async inOrder(i, Array) {
    //     console.log('Running Tree Traversal', this.key);

    //     let stack = [];
    //     let current = i;

    //     while ((current < Array.length && Array[current] != null) || stack.length > 0) {
    //         while (current < Array.length && Array[current] != null) {
    //             this.pointerSquares = [
    //                 Array[current] != null ? this.BoxAround({ index: current, Nodes: Array, Boxtext: "Root" }) : null,
    //                 Array[2 * current + 1] != null ? this.BoxAround({ index: 2 * current + 1, Nodes: Array, Boxtext: "Left" }) : null,
    //                 Array[2 * current + 2] != null ? this.BoxAround({ index: 2 * current + 2, Nodes: Array, Boxtext: "Right" }) : null
    //             ];
    //             stack.push({ root: Array[current], index: current });
    //             Array[current].obj.col = this.HighlightCol;
    //             current = 2 * current + 1;
    //             this.drawAll(this.pointerSquares);
    //             await this.delay(2 * this.TimeoutDelay);
    //         }
    //         let { root, index } = stack.pop();
    //         current = index

    //         root.obj.col = this.sortedCol;
    //         console.log("Visiting node: ", root.value);


    //         let left = 2 * current + 1;
    //         let right = 2 * current + 2;
    //         this.pointerSquares = [
    //             (Array[current] != null) ? this.BoxAround({ index: current, Nodes: Array, Boxtext: "Root" }) : null,
    //             (Array[left] != null && Array[left].obj.col != this.sortedCol) ? this.BoxAround({ index: left, Nodes: Array, Boxtext: "Left" }) : null,
    //             (Array[right] != null && Array[right].obj.col != this.sortedCol) ? this.BoxAround({ index: right, Nodes: Array, Boxtext: "Right" }) : null
    //         ];

    //         this.drawAll(this.pointerSquares);
    //         await this.delay(this.TimeoutDelay)

    //         let position = this.objPositions.shift();
    //         await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
    //         await this.waitWhilePaused();
    //         await this.delay(2 * this.TimeoutDelay);

    //         current = 2 * index + 2;

    //     }
    // }
    async inOrder(i, Array) {
        if (i < 0 || i >= Array.length) return;
        if (!this.isAnimating) return;
        await this.waitWhilePaused();

        let root = Array[i];
        let leftChildIndex = 2 * i + 1;
        let rightChildIndex = 2 * i + 2;


        this.pointerSquares = [
            Array[i] != null ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            Array[leftChildIndex] != null ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            Array[rightChildIndex] != null ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];

        root.obj.col = this.HighlightCol;
        this.drawAll(this.pointerSquares);
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();

        await this.inOrder(leftChildIndex, Array);
        await this.waitWhilePaused();

        console.log("Visiting node: ", root.value);
        root.obj.col = this.sortedCol;

        this.pointerSquares = [
            (Array[i] != null) ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            (Array[leftChildIndex] != null && Array[leftChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            (Array[rightChildIndex] != null && Array[rightChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];
        this.drawAll(this.pointerSquares);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();


        let position = this.objPositions.shift();
        await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
        await this.waitWhilePaused();
        await this.delay(2 * this.TimeoutDelay)

        await this.inOrder(rightChildIndex, Array);
        await this.waitWhilePaused();
    }

    async postOrder(i, Array) {
        if (i < 0 || i >= Array.length) return;
        if (!this.isAnimating) return;

        let root = Array[i];
        let leftChildIndex = 2 * i + 1;
        let rightChildIndex = 2 * i + 2;


        if (Array[leftChildIndex]) {
            Array[leftChildIndex].obj.col = this.HighlightCol;
        }
        this.pointerSquares = [
            Array[i] != null ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            Array[leftChildIndex] != null ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            Array[rightChildIndex] != null ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];

        this.drawAll(this.pointerSquares);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();


        await this.postOrder(leftChildIndex, Array);
        await this.waitWhilePaused();

        if (Array[rightChildIndex]) {
            Array[rightChildIndex].obj.col = this.HighlightCol;
        }
        this.pointerSquares = [
            (Array[i] != null) ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            (Array[leftChildIndex] != null && Array[leftChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            (Array[rightChildIndex] != null && Array[rightChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];
        this.drawAll(this.pointerSquares);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();


        await this.postOrder(rightChildIndex, Array);
        await this.waitWhilePaused();

        console.log("Visiting node: ", root.value);
        root.obj.col = this.sortedCol;

        this.pointerSquares = [
            (Array[i] != null) ? this.BoxAround({ index: i, Nodes: Array, Boxtext: "Root" }) : null,
            (Array[leftChildIndex] != null && Array[leftChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: leftChildIndex, Nodes: Array, Boxtext: "Left" }) : null,
            (Array[rightChildIndex] != null && Array[rightChildIndex].obj.col != this.sortedCol) ? this.BoxAround({ index: rightChildIndex, Nodes: Array, Boxtext: "Right" }) : null
        ];
        this.drawAll(this.pointerSquares);
        await this.delay(2 * this.TimeoutDelay)

        let position = this.objPositions.shift();
        await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
        await this.waitWhilePaused();
    }

    async run() {
        this.isAnimating = true;
        await this.buildBTree(this.objNodeArray);

        console.log('line map', this.lineMap);

        await this.delay(this.TimeoutDelay)

        if (this.key == 'preOrder') await this.preOrder(0, this.objNodeArray);
        else if (this.key == 'postOrder') await this.postOrder(0, this.objNodeArray);
        else await this.inOrder(0, this.objNodeArray);

        this.lineArray = [];
        this.drawAll();

        await Promise.all(this.objNodeArray.map(element => this.animateY(element.obj, null, (height / 2 - 30), 2))); //animateY -> move all nodes to the top of the canvas (in base class)


        await this.delay(this.TimeoutDelay);
        if (!this.isAnimating) return;

        this.isAnimating = false;
    }

}

export const TreeTraversal = new TreeTraversalClass();