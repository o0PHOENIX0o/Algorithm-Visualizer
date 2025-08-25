import { DrawArray, clearCanvas, height, drawWelcomeScreen } from "../../Core/canvas.js";
import { TreeBase } from "./TreeBase.js";
import { Logger } from "../../Core/logger.js";

class TreeTraversalClass extends TreeBase {
    constructor() {
        super('Tree Traversal');
        this.pointerSquares = []
        this.logger = new Logger();
    }

    showLog({message, type = "info", isEvent = false, timer} = {}) {
        if (this.silentMode) return;
        this.logger.show({ message, type, isEvent, timer: timer ?? 0 });
    }

    reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.lineArray = [];
        this.objPositions = [];
        this.pointerSquares = []

        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
        // drawWelcomeScreen();
    }

    async preOrder(i, Array) {
        this.showLog({
            message: { title: "PreOrder Traversal (Root, Left, Right)", text: `Currently at index ${i}: node ${Array[i]?.value ?? 'null'}.` },
            type: "info"
        });

        if (i < 0 || i >= Array.length) return;
        if (!this.isAnimating) return;

        let root = Array[i];
        this.showLog({
            message: { title: "Visit Node", text: `Visiting node ${root?.value} (PreOrder: Root → Left → Right).` },
            type: "info"
        });
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


        root.obj.col = this.sortedCol;

        let position = this.objPositions.shift();
        await this.move({ element: root.obj, x: position.x, y: position.y, otherObjects: this.pointerSquares, speedFactor: 4 });
        await this.delay(2 * this.TimeoutDelay);
        await this.waitWhilePaused();


        this.showLog({
            message: { title: "Traverse Left", text: `Moving to LEFT child of ${root.value} at index ${leftChildIndex}.` },
            type: "info"
        });

        await this.preOrder(leftChildIndex, Array);
        await this.waitWhilePaused();
        
        this.showLog({
            message: { title: "Traverse Right", text: `Moving to RIGHT child of ${root.value} at index ${rightChildIndex}.` },
            type: "info"
        });

        await this.preOrder(rightChildIndex, Array);
        await this.waitWhilePaused();

    }
    // /******************************************* */
    // /* iterative method for pre-order traversal  */
    // /*********************************************/
    // async preOrder(i, Array) {

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
        this.showLog({
            message: { title: "InOrder Traversal (Left, Root, Right)", text: `Currently at index ${i}: node ${Array[i]?.value ?? 'null'}.` },
            type: "info"
        });

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

        this.showLog({
            message: { title: "Traverse Left", text: `Going LEFT from ${root.value} to index ${leftChildIndex}.` },
            type: "info"
        });

        await this.inOrder(leftChildIndex, Array);
        await this.waitWhilePaused();

        this.showLog({
            message: { title: "Visit Node", text: `Visiting node ${root.value} (InOrder: Left → Root → Right).` },
            type: "info"
        });

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

        this.showLog({
            message: { title: "Traverse Right", text: `Going RIGHT from ${root.value} to index ${rightChildIndex}.` },
            type: "info"
        });

        await this.inOrder(rightChildIndex, Array);
        await this.waitWhilePaused();
    }

    async postOrder(i, Array) {
        this.showLog({
            message: { title: "PostOrder Traversal (Left, Right, Root)", text: `Currently at index ${i}: node ${Array[i]?.value ?? 'null'}.` },
            type: "info"
        });

        if (i < 0 || i >= Array.length) return;
        if (!this.isAnimating) return;

        let root = Array[i];
        let leftChildIndex = 2 * i + 1;
        let rightChildIndex = 2 * i + 2;


        this.showLog({
            message: { title: "Traverse Left", text: `Exploring LEFT child of ${root.value} at index ${leftChildIndex}.` },
            type: "info"
        });

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


        this.showLog({
            message: { title: "Traverse Right", text: `Exploring RIGHT child of ${root.value} at index ${rightChildIndex}.` },
            type: "info"
        });


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


        this.showLog({
            message: { title: "Traverse Right", text: `Going to right child of ${root.value} (index ${rightChildIndex}).` },
            type: "info"
        });
        await this.postOrder(rightChildIndex, Array);
        await this.waitWhilePaused();

        this.showLog({
            message: { title: "Visit Node", text: `Visiting node ${root.value} (PostOrderInOrder: Root → Left → Right).` },
            type: "info"
        });

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