import { DrawArray, Square, clearCanvas, Circle, height, width, Line } from "../../canvas.js";
import { TreeBase } from "./TreeBase.js";
import {Logger} from "../../logger.js";

class BSTclass extends TreeBase {
    constructor() {
        super('BST');
        this.pointerSquares = null;
        this.linePositions = [];
        this.lineArray = [];
        this.keyObject = null;
        this.edgeMap = new Map();

        // Configuration constants
        this.MAX_NODES = 31;
        this.MAX_DEPTH = 5;
        this.LEAF_GAP = 36;
        this.MOBILE_MAX_NODES = 15;
        this.MOBILE_MAX_DEPTH = 4;

        // Visual constants
        this.Y_OFFSET = 100;
        this.NODE_SPACING = 10;
        this.SCALING_FACTOR = 0.9; // 0.9 for keeping some margin
        this.SPEED_UP_FACTOR = 1;

        this.silentMode = false;
        this.logger = new Logger();
    }


    showLog({message, type = "info", isEvent = false, timer} = {}) {
        if (this.silentMode) return; 
        this.logger.show({ message, type, isEvent, timer: timer ?? 0 });
    }


    reset({ preserveLayout = false, preserveLogs = false } = {}) {
        this.showLog({
            message: { title: "Reset", text: "BST state and visuals have been reset." },
            type: "warning",
            isEvent: true
        });
        this.objNodeArray = [];
        this.inputArray = [];
        this.lineArray = [];
        if (!preserveLayout) this.objPositions = [];
        if (!preserveLayout) this.linePositions = [];
        this.pointerSquares = null;
        this.keyObject = null;
        this.edgeMap.clear();

        this.isAnimating = false;
        this.isPause = false;
        if(!preserveLogs) this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
    }

    


    getParentIndex(index) { return Math.floor((index - 1) / 2); }
    getLeftChildIndex(index) { return 2 * index + 1; }
    getRightChildIndex(index) { return 2 * index + 2; }
    isMobileDevice() { return width < 780; }

    showError(message) {
        console.error(message);
        alert(message);
    }

    valueExists(value, nodeArray) {
        return nodeArray.some(node => node && node.value === value);
    }

    findInorderSuccessor(index, nodeArray) {
        let successorIndex = this.getRightChildIndex(index);
        while (nodeArray[this.getLeftChildIndex(successorIndex)] !== undefined) {
            successorIndex = this.getLeftChildIndex(successorIndex);
        }
        return successorIndex;
    }

    isLeafNode(nodeIndex, nodeArray) {
        const leftChild = this.getLeftChildIndex(nodeIndex);
        const rightChild = this.getRightChildIndex(nodeIndex);
        return nodeArray[leftChild] === undefined && nodeArray[rightChild] === undefined;
    }

    getCurrentConfig() {
        if (this.isMobileDevice()) {
            return {
                maxNodes: this.MOBILE_MAX_NODES,
                maxDepth: this.MOBILE_MAX_DEPTH
            };
        }
        return {
            maxNodes: this.MAX_NODES,
            maxDepth: this.MAX_DEPTH
        };
    }


    async generatePositionMap(objPositions, linePositions) {
        const config = this.getCurrentConfig();

        const buildBranch = async ({ nodeIndex, offsetX, direction, depth }) => {
            if (nodeIndex === 0) {
                const targetX = width / 2;
                const targetY = depth * (this.dia + this.spacing + this.Y_OFFSET);
                objPositions.push({ x: targetX, y: targetY });
                return;
            }

            const parentIndex = this.getParentIndex(nodeIndex);
            const parent = objPositions[parentIndex];

            if (!parent) {
                console.error(`Parent not found for node ${nodeIndex}`);
                return;
            }

            const targetX = parent.x + (direction * offsetX) - (direction * depth);
            const targetY = parent.y + this.dia + this.spacing + this.NODE_SPACING;

            objPositions.push({ x: targetX, y: targetY });
            linePositions.push({
                x1: parent.x,
                y1: parent.y,
                x2: targetX,
                y2: targetY
            });
        };

        let totalWidth = 0;
        for (let i = 0; i < config.maxDepth; i++) {
            totalWidth += this.LEAF_GAP * Math.pow(2, i);
        }

        const scalingFactor = Math.min(1, (width * this.SCALING_FACTOR) / totalWidth);
        const adjustedLeafGap = this.LEAF_GAP * scalingFactor;

        let currentDepth = 1;
        for (let i = 0; i < config.maxNodes; i++) {
            const direction = (i % 2) ? -1 : 1;

            if ((i + 1) > Math.pow(2, currentDepth) - 1) currentDepth++;

            await buildBranch({
                nodeIndex: i,
                offsetX: adjustedLeafGap * Math.pow(2, config.maxDepth - currentDepth),
                direction: direction,
                depth: currentDepth
            });
        }
    }


    async removeEdge(edgeKey) {
        if (!this.edgeMap.has(edgeKey)) {
            console.warn(`Edge ${edgeKey} not found in edge map`);
            return;
        }

        const removedIndex = this.edgeMap.get(edgeKey);
        this.lineArray.splice(removedIndex, 1);
        this.edgeMap.delete(edgeKey);

        for (const [key, index] of this.edgeMap) {
            if (index > removedIndex) {
                this.edgeMap.set(key, index - 1);
            }
        }
    }


    createEdge(childIndex) {
        if (!this.isAnimating) return;
        const linePosition = this.linePositions[childIndex - 1];
        if (!linePosition) {
            console.error(`Line position not found for child index ${childIndex}`);
            return null;
        }

        const edge = new Line({
            x1: linePosition.x1,
            y1: linePosition.y1,
            x2: linePosition.x2,
            y2: linePosition.y2,
            col: 0,
            strokeW: 1,
            // label: `${childIndex - 1}`,
            // textPos: 'center'
        });

        this.lineArray.push(edge);
        const edgeKey = `${childIndex - 1}`;
        this.edgeMap.set(edgeKey, this.lineArray.length - 1);

        return edge;
    }


    async bulkInsert(values) {
        this.isAnimating = true;
        console.log("Bulk inserting values:", values);

        const numericValues = values.map(Number).filter(v => !isNaN(v));
        if (numericValues.length === 0) {
            this.showLog({
                message: { title: "Error", text: "No valid numbers provided for insertion." },
                type: "error",
                isEvent: true
            });
            return;
        }

        if (this.objPositions.length < 1 || this.linePositions.length < 1)
                await this.generatePositionMap(this.objPositions, this.linePositions);

        for (const value of numericValues) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            if (this.objNodeArray.length < 1) {
                const circle = new Circle({
                    xPos: width / 2,
                    yPos: this.dia + 80,
                    dia: this.dia,
                    label: value,
                    col: this.HighlightCol
                });

                this.objNodeArray.push({ value: value, obj: circle });
                const targetPosition = this.objPositions[0];

                this.showLog({
                    message: { title: "Insert Root", text: `Inserting value ${value} as the root of the BST.` },
                    type: "success"
                })

                await this.move({
                    element: circle,
                    x: targetPosition.x,
                    y: targetPosition.y,
                    speedFactor: 4 * this.SPEED_UP_FACTOR,
                });

                this.drawAll(this.lineArray);
                await this.delay(this.TimeoutDelay / this.SPEED_UP_FACTOR);

                await this.waitWhilePaused();
                if (!this.isAnimating) return;
            } else {
                await this.insertBST(value, 0, this.objNodeArray);
            }

        }

        this.isAnimating = false;
    }


    async insertBST(value, rootIndex, nodeArray) {
        if (!this.isAnimating) return;
        this.showLog({
            message: { title: `Insert Node: ${value}`, text: `Starting insertion of value ${value} into the BST.` },
            type: "info"
        })

        if (this.valueExists(value, nodeArray)) {
            this.showLog({
                message: { title: "Error", text: "Duplicate values are not allowed in BST." },
                type: "error",
                isEvent: true
            })
            this.drawAll(this.lineArray);
            return;
        }

        const newNode = {
            value: value,
            obj: new Circle({
                xPos: width / 2,
                yPos: this.dia + 50,
                dia: this.dia,
                label: value,
                col: this.sortedCol
            })
        };

        this.pointerSquare = this.BoxAround({
            index: rootIndex,
            Nodes: nodeArray,
            col: this.HighlightCol
        });

        this.drawAll([...this.lineArray, newNode.obj, this.pointerSquare]);
        await this.delay(this.TimeoutDelay / this.SPEED_UP_FACTOR);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;


        let currentIndex = rootIndex;

        while (nodeArray[currentIndex] !== undefined) {
            if (!this.isAnimating) return;
            this.showLog({
                message: { title: "Traverse To Find Insertion Position", text: `Value ${value} is ${value < nodeArray[currentIndex].value ? "less" : "greater"} than ${nodeArray[currentIndex].value}. Moving ${value < nodeArray[currentIndex].value ? "left" : "right"}.` },
                type: "info"
            });
            currentIndex = (nodeArray[currentIndex].value > value) ? this.getLeftChildIndex(currentIndex) : this.getRightChildIndex(currentIndex);

            await this.moveSquare({
                element: this.pointerSquare,
                xc: this.objPositions[currentIndex]?.x,
                yc: this.objPositions[currentIndex]?.y,
                otherObjects: [...this.lineArray, newNode.obj],
                speedFactor: 4 * this.SPEED_UP_FACTOR
            });
            await this.delay(2 * this.TimeoutDelay / this.SPEED_UP_FACTOR);
            await this.waitWhilePaused();
        }

        const config = this.getCurrentConfig();
        if (currentIndex >= config.maxNodes) {
            this.showLog({
                message: { title: "Error", text: "Maximum tree depth reached. Cannot insert node at this position." },
                type: "error",
                isEvent: true
            });
            this.drawAll(this.lineArray);
            return;
        }

        const targetPosition = this.objPositions[currentIndex];
        if (!targetPosition) {
            console.error(`Position not found for index ${currentIndex}`);
            return;
        }
        nodeArray[currentIndex] = newNode;
        this.createEdge(currentIndex);
        this.pointerSquare.col = this.sortedCol;

        await this.moveSquare({
            element: this.pointerSquare,
            xc: targetPosition.x,
            yc: targetPosition.y,
            otherObjects: this.lineArray,
            speedFactor: 4 * this.SPEED_UP_FACTOR
        });
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        this.showLog({
            message: { title: `Inserted Node: ${value}`, text: `Inserted value ${value} at the correct position.` },
            type: "success"
        });

        await this.move({
            element: newNode.obj,
            x: targetPosition.x,
            y: targetPosition.y,
            otherObjects: [...this.lineArray, this.pointerSquare],
            speedFactor: 4 * this.SPEED_UP_FACTOR
        });

        this.drawAll(this.lineArray);
        await this.delay(this.TimeoutDelay / this.SPEED_UP_FACTOR);

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
    }


    async insert(value) {
        this.isAnimating = true;

        try {
            if (this.objPositions.length < 1 || this.linePositions.length < 1)
                await this.generatePositionMap(this.objPositions, this.linePositions);


            const numericValue = Number(value);
            if (isNaN(numericValue)) {
                this.showError("Please enter a valid number");
                this.showLog({
                    message: { title: "Error", text: "Invalid input for insertion." },
                    type: "error",
                    isEvent: true
                });
                return;
            }

            if (this.objNodeArray.length < 1) {
                const circle = new Circle({
                    xPos: width / 2,
                    yPos: this.dia + 80,
                    dia: this.dia,
                    label: value,
                    col: this.HighlightCol
                });

                this.objNodeArray.push({ value: value, obj: circle });
                const targetPosition = this.objPositions[0];

                this.showLog({
                    message: { title: "Insert Root", text: `Inserting value ${value} as the root of the BST.` },
                    type: "success"
                });

                await this.move({
                    element: circle,
                    x: targetPosition.x,
                    y: targetPosition.y,
                    speedFactor: 4 * this.SPEED_UP_FACTOR,
                });

                this.drawAll(this.lineArray);
                await this.delay(this.TimeoutDelay / this.SPEED_UP_FACTOR);

                await this.waitWhilePaused();
                if (!this.isAnimating) return;
            } else {
                await this.insertBST(numericValue, 0, this.objNodeArray);
            }
        } catch (error) {
            console.error("Error during insertion:", error);
            this.showLog({
                message: { title: "Error", text: "An error occurred during insertion." },
                type: "error",
                isEvent: true
            });
        } finally {
            this.isAnimating = false;
            this.showLog({
                message: { title: "Insertion Complete", text: `Insertion process for value ${value} completed.` },
                type: "info"
            });
        }
    }


    async searchBST(value, rootIndex, nodeArray) {
        this.showLog({
            message: { title: `Search for ${value}`, text: `Searching for value ${value} in the BST.` },
            type: "info"
        });
        let currentIndex = rootIndex;

        this.pointerSquare = this.BoxAround({
            index: currentIndex,
            Nodes: nodeArray,
            col: this.unsortedCol,
            Boxtext: 'searching'
        });

        this.drawAll([...this.lineArray, this.pointerSquare]);
        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        while (nodeArray[currentIndex] != undefined && nodeArray[currentIndex].value != value) {
            if (!this.isAnimating) return;

            this.showLog({
                message: { title: "Traverse for Searching", text: `Value ${value} is ${value < nodeArray[currentIndex].value ? "less" : "greater"} than ${nodeArray[currentIndex].value}. Moving ${value < nodeArray[currentIndex].value ? "left" : "right"}.` },
                type: "info"
            });
            currentIndex = (nodeArray[currentIndex].value > value) ? this.getLeftChildIndex(currentIndex) : this.getRightChildIndex(currentIndex);

            await this.moveSquare({
                element: this.pointerSquare,
                xc: this.objPositions[currentIndex]?.x,
                yc: this.objPositions[currentIndex]?.y,
                otherObjects: [...this.lineArray]
            });
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            await this.delay(2 * this.TimeoutDelay);
        }

        if (nodeArray[currentIndex] === undefined) {
            this.showLog({
                message: { title: "Not Found", text: `Value ${value} not found in the BST.` },
                type: "warning",
                isEvent: true
            });
            this.showError("Value not found in BST");
            this.drawAll(this.lineArray);
            return null;
        }

        // Value found - highlight it
        this.showLog({
            message: { title: "Found", text: `Value ${value} found in the BST.` },
            type: "success",
        });
        this.pointerSquare.col = this.sortedCol;
        this.pointerSquare.text = 'found';
        this.drawAll([...this.lineArray, this.pointerSquare]);


        await this.delay(this.TimeoutDelay);
        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        return currentIndex;
    }


    async search(value) {
        this.isAnimating = true;

        try {
            if (this.objPositions.length < 1 || this.linePositions.length < 1) {
                this.showLog({
                    message: { title: "Error", text: "No nodes to search. Please insert nodes first." },
                    type: "error",
                    isEvent: true
                });
                return;
            }

            if (this.objNodeArray.length === 0) {
                this.showLog({
                    message: { title: "Error", text: "Tree is empty. Please insert nodes first." },
                    type: "error",
                    isEvent: true
                });
                return;
            }

            const numericValue = Number(value);
            if (isNaN(numericValue)) {
                this.showLog({
                    message: { title: "Error", text: "Invalid input for search." },
                    type: "error",
                    isEvent: true
                });
                return;
            }

            await this.searchBST(numericValue, 0, this.objNodeArray);
        } catch (error) {
            console.error("Error during search:", error);
            this.showLog({
                message: { title: "Error", text: "An error occurred during search." },
                type: "error",
                isEvent: true
            });
        } finally {
            this.showLog({
                message: { title: "Search Complete", text: `Search process for value ${value} completed.` },
                type: "success"
            });
            this.isAnimating = false;
        }
    }



    async buildBinaryTree(keepValues) {
        this.SPEED_UP_FACTOR = 50;
        this.reset({ preserveLayout: true, preserveLogs: true });
        this.silentMode = true;
        this.isAnimating = true;

        await this.bulkInsert(keepValues);

        this.SPEED_UP_FACTOR = 1;
        this.silentMode = false;
        this.isAnimating = false;
    }

    // async reflowSubtreeBFS(prevRoot, rootIndex, nodeArray, objPositions, lineArray) {
    //     let queue = [{ cur: rootIndex, newPos: objPositions[prevRoot], oldPos: objPositions[rootIndex] }];

    //     while (queue.length > 0) {
    //         let { cur, newPos, oldPos } = queue.shift();

    //         // Move node to target position
    //         console.log("Moving node:", cur, nodeArray[cur], "to position:", newPos);
    //         await this.move({
    //             element: nodeArray[cur].obj,
    //             x: newPos.x,
    //             y: newPos.y,
    //             otherObjects: lineArray
    //         });

    //         // LEFT child
    //         let left = this.getLeftChildIndex(cur);
    //         if (left != undefined && nodeArray[left]) {
    //             let dx = objPositions[left].x - oldPos.x;
    //             let dy = objPositions[left].y - oldPos.y;
    //             let leftPos = { x: newPos.x + dx, y: newPos.y + dy };

    //             let edge = lineArray[this.edgeMap.get(`${left - 1}`)];
    //             edge.x1 = newPos.x;
    //             edge.y1 = newPos.y;
    //             edge.x2 = leftPos.x;
    //             edge.y2 = leftPos.y;

    //             queue.push({ cur: left, newPos: leftPos, oldPos: objPositions[left] });
    //         }

    //         // RIGHT child
    //         let right = this.getRightChildIndex(cur);
    //         if (right != undefined && nodeArray[right]) {
    //             let dx = objPositions[right].x - oldPos.x;
    //             let dy = objPositions[right].y - oldPos.y;
    //             let rightPos = { x: newPos.x + dx, y: newPos.y + dy };

    //             let edge = lineArray[this.edgeMap.get(`${right - 1}`)];
    //             edge.x1 = newPos.x;
    //             edge.y1 = newPos.y;
    //             edge.x2 = rightPos.x;
    //             edge.y2 = rightPos.y;

    //             queue.push({ cur: right, newPos: rightPos, oldPos: objPositions[right] });
    //         }
    //     }

    //     this.drawAll(lineArray);
    // }



    async deleteBST(value, root, nodeArray) {
        this.showLog({
            message: { title: `Delete Node: ${value}`, text: `Starting deletion of value ${value} from the BST.` },
            type: "info"
        });
        await this.delay(this.TimeoutDelay);
        let keyIndex = await this.searchBST(value, root, nodeArray);
        if (keyIndex === null) return;

        nodeArray[keyIndex].obj.col = this.unsortedCol;

        let leftChildIndex = this.getLeftChildIndex(keyIndex);
        let rightChildIndex = this.getRightChildIndex(keyIndex);

        const rebuildTree = async () => {
            let newTreeValues = nodeArray.filter(node => node !== undefined).map(node => node.value);
            await this.buildBinaryTree(newTreeValues);
        };

        // Case 1: Node has TWO children
        if (nodeArray[leftChildIndex] && nodeArray[rightChildIndex]) {
            this.showLog({
                message: { title: "Node has Two Children", text: `Node with value ${value} has two children. Finding inorder predecessor.` },
                type: "info"
            });
            let cur = leftChildIndex;
            let prev = cur;

            let predecessorBox = this.BoxAround({
                index: cur,
                Nodes: nodeArray,
                col: this.HighlightCol,
                Boxtext: "Predecessor"
            });

            this.drawAll([...this.lineArray, predecessorBox]);
            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            this.showLog({
                message: { title: "Finding Inorder Predecessor", text: `Finding inorder predecessor of node with value ${value}. i.e the rightmost node in its left subtree.` },
                type: "info"
            });
            // Find rightmost in left subtree
            while (nodeArray[cur] != undefined) {
                prev = cur;
                cur = this.getRightChildIndex(cur);

                await this.moveSquare({
                    element: predecessorBox,
                    xc: this.objPositions[prev]?.x,
                    yc: this.objPositions[prev]?.y,
                    otherObjects: [...this.lineArray, this.pointerSquare]
                });

                await this.delay(2 * this.TimeoutDelay);
                await this.waitWhilePaused();
                if (!this.isAnimating) return;
            }

            nodeArray[prev].obj.col = this.HighlightCol;

            this.showLog({
                message: { title: "Predecessor Found", text: `Inorder predecessor found with value ${nodeArray[prev].value}. Swapping values.` },
                type: "info"
            });
            // Swap predecessor with target node
            await this.SwapNodes(
                nodeArray[keyIndex].obj,
                nodeArray[prev].obj,
                [...this.lineArray, this.pointerSquare, predecessorBox]
            );
            [nodeArray[keyIndex], nodeArray[prev]] = [nodeArray[prev], nodeArray[keyIndex]];

            delete nodeArray[prev];

            // Edge adjustments if predecessor had a left child
            let leftChildOfPrev = this.getLeftChildIndex(prev);
            if (nodeArray[leftChildOfPrev]) {
                let edge = this.lineArray[this.edgeMap.get(`${leftChildOfPrev - 1}`)];
                if (edge) {
                    edge.x1 = this.objPositions[this.getParentIndex(prev)].x;
                    edge.y1 = this.objPositions[this.getParentIndex(prev)].y;
                }
            }

            await this.removeEdge(`${prev - 1}`);
            this.drawAll(this.lineArray);
            await this.delay(5 * this.TimeoutDelay);

            return await rebuildTree();
        }

        // -----------------------------
        // Case 2: Node has ONE child
        // -----------------------------
        if (nodeArray[leftChildIndex] || nodeArray[rightChildIndex]) {
            this.showLog({
                message: { title: "Delete Node With Single Child", text: `Node with value ${value} found. Deleting...` },
                type: "info"
            });

            let childIndex = nodeArray[leftChildIndex] ? leftChildIndex : rightChildIndex;
            nodeArray[childIndex].obj.col = this.HighlightCol;

            let childBox = this.BoxAround({
                index: childIndex,
                Nodes: nodeArray,
                col: this.HighlightCol,
                Boxtext: "New Root"
            });

            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();

            delete nodeArray[keyIndex];

            let pos = this.objPositions[keyIndex];
            await this.move({
                element: nodeArray[childIndex].obj,
                x: pos.x,
                y: pos.y,
                otherObjects: [...this.lineArray, childBox]
            });

            await this.removeEdge(`${childIndex - 1}`);

            // Adjust edges for child's children
            [this.getLeftChildIndex(childIndex), this.getRightChildIndex(childIndex)]
                .forEach(child => {
                    if (nodeArray[child]) {
                        let edge = this.lineArray[this.edgeMap.get(`${child - 1}`)];
                        if (edge) {
                            edge.x1 = pos.x;
                            edge.y1 = pos.y;
                        }
                    }
                });

            this.drawAll(this.lineArray);
            await this.delay(5 * this.TimeoutDelay);

            return await rebuildTree();
        }

        // -----------------------------
        // Case 3: Leaf Node
        // -----------------------------
        this.showLog({
            message: { title: "Delete Leaf Node", text: `Node with value ${value} found. Deleting...` },
            type: "info"
        });

        this.drawAll(this.lineArray);
        await this.delay(this.TimeoutDelay);

        delete nodeArray[keyIndex];
        await this.removeEdge(`${keyIndex - 1}`);
        this.drawAll(this.lineArray);
        await this.delay(5 * this.TimeoutDelay);

        this.showLog({
            message: { title: `Node ${value} is Deleted`, text: `Node with value ${value} deleted from the BST.` },
            type: "success",
            isEvent: true
        });
        return await rebuildTree();
    }




    async delete(value) {
        this.isAnimating = true;

        if (this.objPositions.length < 1 || this.linePositions.length < 1) {
            this.showLog({
                message: { title: "Error", text: "No nodes to delete. Please insert nodes first." },
                type: "error",
                isEvent: true
            })
            this.isAnimating = false;
            return;
        }

        const v = Number(value);
        if (isNaN(v)) {
            this.logger.show({
                message: { title: "Error", text: "Invalid input for deletion." },
                type: "error",
                isEvent: true
            });
            this.isAnimating = false;
            return;
        }

        await this.deleteBST(v, 0, this.objNodeArray);

        this.isAnimating = false;
    }
}

export const BST = new BSTclass();