import { GraphBase } from './GraphBase.js';
import { DrawArray, clearCanvas, drawWelcomeScreen } from '../../Core/canvas.js';
import { Logger } from '../../Core/logger.js';

class DFSClass extends GraphBase {
    constructor() {
        super("DFS", 10, 40);
        this.logger = new Logger();
    }

    reset() {
        this.objNodeArray = [];
        this.inputArray = [];
        this.edgeList = [];
        this.adjMatrix = [];
        this.directedEdges = [];
        this.indexMap = {};

        this.isAnimating = false;
        this.isPause = false;
        this.logger.clearLogs();
        clearCanvas();
        DrawArray(null);
        // drawWelcomeScreen
    }


    async DFS(Nodes, adjM, u) {
        let DFSOrder = [];
        let isSeen = Array(Nodes.length).fill(false);


        const DFSvisit = async (array, u, highlightColor) => {
            //console.log("Visiting node: ", u, highlightColor);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let box = this.BoxAround(u, array, `Visiting`);
            box.col = this.HighlightCol;
            box.textCol = this.HighlightCol;

            array[u].obj.col = this.BaseCol;
            this.drawAll([box]);

            this.logger.show({
                message: {
                    title: `Exploring Node ${array[u].obj.label}`,
                    text: `Node <b>${array[u].obj.label}</b> is now being visited.<br>
                           <b>Current stack →</b> [${stack?.map(index => array[index]?.obj?.label)}]`
                },
                type: "info"
            });

            await this.delay(this.TimeoutDelay);
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            isSeen[u] = true;
            DFSOrder.push(u);

            let adjNode = []

            for (let v = 0; v < array.length; v++) {
                if (adjM[u][v]) {
                    adjNode.push({
                        node: v,
                        box: this.BoxAround(v, array, `Adj of ${array[u].obj.label}`)
                    });

                    array[v].obj.strokeCol = this.unsortedCol;
                    array[v].obj.strokeW = 4;

                    this.drawAll([...adjNode.map(element => element.box), box]);

                    await this.delay(2 * this.TimeoutDelay);
                    await this.waitWhilePaused();
                    if (!this.isAnimating) return;

                    if (!isSeen[v]) {
                        box.text = "Visiting";
                        box.col = this.HighlightCol;
                        box.textCol = this.HighlightCol;
                        await this.moveSquare({ element: box, xc: array[v].obj.xPos, yc: array[v].obj.yPos });
                        
                        let { line, arrow } = { ...this.directedEdges[u][v] };
                        line.col = arrow.col = highlightColor;
                        line.strokeW = 3;
                        this.drawAll([box]);

                        //console.log("befor 98", u, array, array[u]);
                        this.logger.show({
                            message: {
                                title: `Discovered New Node ${array[v].obj.label}`,
                                text: `From <b>${array[u].obj.label}</b>, moving to un  visited neighbor <b>${array[v].obj.label}</b>.<br>
                                       <b>Stack after push →</b> [${[...stack, v].map(index => array[index].obj.label)}]`
                            },
                            type: "info"
                        });

                        await this.delay(this.TimeoutDelay);
                        await this.waitWhilePaused();
                        if (!this.isAnimating) return;
                        stack.push(v);
                        await DFSvisit(array, v, highlightColor);

                        box.text = "backtracking";
                        await this.moveSquare({ element: box, xc: array[u].obj.xPos, yc: array[u].obj.yPos });

                        //console.log(v," -> v is now visited");
                        adjNode.map(adj =>{
                            if(isSeen[adj.node]){
                                adj.box.col = this.sortedCol;
                                adj.box.textCol = this.sortedCol;
                            }
                        })
                        // adjNode[v].col = this.sortedCol;
                        // adjNode[v].textCol = this.sortedCol;
                    } else {
                        array[v].obj.strokeCol = highlightColor;
                        this.logger.show({
                            message: {
                                title: `Already Visited`,
                                text: `Neighbor <b>${array[v].obj.label}</b> of <b>${array[u].obj.label}</b> has already been visited. Skipping.`
                            },
                            type: "warning"
                        });
                    }
                }
            }
            array[u].obj.col = highlightColor;
            array[u].obj.strokeCol = highlightColor;
            stack.pop();

            this.logger.show({
                message: {
                    title: `Finished Node ${array[u].obj.label}`,
                    text: `Node <b>${array[u].obj.label}</b> has been fully explored.<br>
                           <b>Stack after pop →</b> [${stack.map(index => array[index].obj.label)}]`
                },
                type: "success"
            });

            box.col = this.sortedCol;
            box.textCol = this.sortedCol;
            box.text = 'Visited'
            this.drawAll([...adjNode.map(element => element.box), box]);

            await this.delay(1.5 * this.TimeoutDelay)
            await this.waitWhilePaused();
            if (!this.isAnimating) return;
            return DFSOrder;
        }

        let stack = [];
        let forest = [];
        if (u === -1) {
            //console.log("Starting DFS for disconnected graph", u);
            for (let u = 0; u < Nodes.length; u++) {
                DFSOrder = [];
                let highlightColor = this.highlightColors[u % this.highlightColors.length];
                stack = [u];
                if (!isSeen[u]) {
                    this.logger.show({
                        message: {
                            title: `Starting New DFS Component`,
                            text: `Graph is disconnected. Starting DFS at node <b>${Nodes[u].obj.label}</b>.`
                        },
                        type: "info"
                    });
                    await this.delay(this.TimeoutDelay);
                    let DFStree = await DFSvisit(Nodes, u, highlightColor);
                    //console.log("DFS tree from node ", u, DFStree);
                    forest.push([...DFStree]);
                }
            }
            //console.log("Full DFS forest: ", forest);

            this.logger.show({
                message: {
                    title: `DFS Complete`,
                    text: `DFS forest: <br> ${forest.map((tree, index) => `Tree ${index + 1}: ${tree?.map(i => Nodes[i].obj.label).join(' → ')}`).join('<br>')}`
                },
                type: "success"
            });
        } else {
            stack.push(u);
            this.logger.show({
                message: {
                    title: `Starting DFS`,
                    text: `Beginning DFS traversal from node <b>${Nodes[u].obj.label}</b>.`
                },
                type: "info"
            });
            let dfsTree = await DFSvisit(Nodes, u, this.highlightColors[Math.floor(Math.random() * this.highlightColors.length)]);
            
            this.logger.show({
                message: {
                    title: `DFS Complete`,
                    text: `DFS traversal order: ${dfsTree?.map(i => Nodes[i].obj.label).join(' → ')}`
                },
                type: "success"
            });
        }

        this.directedEdges.forEach((row, i) => {
            row.forEach((edge, j) => {
                if (edge !== null && edge.line.col == "#ffffff") this.directedEdges[i][j] = null;
            })
        })
        this.drawAll();

        await this.delay(this.TimeoutDelay);

        //console.log(DFSOrder);
    }


    async run() {
        this.isAnimating = true;

        await this.waitWhilePaused();
        if (!this.isAnimating) return;
        await this.DFS(this.objNodeArray, this.adjMatrix, this.key);

        this.isAnimating = false;
    }
};

export const DFS = new DFSClass();
