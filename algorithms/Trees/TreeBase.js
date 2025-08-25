import { Base } from "../Base/Base.js";
import { DrawArray, Line, width, Square } from "../../Core/canvas.js";

export class TreeBase extends Base {
    constructor(name, spacing = 10, diameter = 30, gap = 36) {
        super(name, spacing, diameter)
        this.leafGap = gap;
        this.lineArray = [];
        this.objPositions = [];
        this.lineMap = {};
        this.TEXT_SIZE = 16;
    }

    Play() {
        if (!this.isAnimating && !this.isPause && this.objNodeArray.length > 0) {
            this.isPause = false;
            this.run();
        }
    }

    drawAll(otherObjects = []) {
        if (otherObjects.length > 0) DrawArray([... this.lineArray, ...otherObjects]);
        else DrawArray(this.lineArray);
    }


    async move({ element, x, y, otherObjects = [], speedFactor = 4 } = {}) {
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
                DrawArray([...otherObjects, ...this.lineArray]);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    }

    BoxAround({ index, Nodes, Boxtext = "", col = this.HighlightCol2, strokeW = 2, textCol = "#ffffff", textYOffset = 10 } = {}) {
        let offset = 5 + (Nodes[index].obj.dia * this.scaleFactor) / 2;

        let BoxX1 = Nodes[index].obj.xPos - offset;
        let BoxY1 = Nodes[index].obj.yPos + offset;

        let BoxX2 = Nodes[index].obj.xPos + offset;
        let BoxY2 = Nodes[index].obj.yPos - offset;

        let BoxH = Math.abs(BoxY2 - BoxY1);

        let box = new Square({ xPos1: BoxX1, yPos1: BoxY1, xPos2: BoxX2, yPos2: BoxY2, col: col, strokeW: strokeW, text: Boxtext, textCol: textCol, textYOffset: -(textYOffset + BoxH / 2) });

        return box;
    }

    async moveSquare({element, xc, yc, otherObjects = [], speedFactor = 4} = {}) {
        let offset = 5 + this.objNodeArray[0].obj.dia / 2;
        let targetX1 = xc - offset;
        let targetY1 = yc + offset;
        let targetX2 = xc + offset;
        let targetY2 = yc - offset;

        if (!this.isAnimating) return;
        return new Promise(resolve => {
            if (!this.isAnimating) return;

            let startX1 = element.xPos1;
            let startY1 = element.yPos1;
            let startX2 = element.xPos2;
            let startY2 = element.yPos2;
            let t = 0;
            const animate = async () => {
                if (!this.isAnimating) return;

                t = Math.min(t + (speedFactor * this.AnimationSpeed), 1);
                element.xPos1 = lerp(startX1, targetX1, t);
                element.yPos1 = lerp(startY1, targetY1, t);
                element.xPos2 = lerp(startX2, targetX2, t);
                element.yPos2 = lerp(startY2, targetY2, t);
                this.drawAll([...otherObjects, element]);

                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    }

    async buildBTree(Array) {
        if (!this.isAnimating) return;

        await Promise.all(Array.map(element => this.animateY(element.obj, null, -(element.obj.yPos - 30), 2))); //animateY -> move all nodes to the top of the canvas (in base class)

        await this.waitWhilePaused();
        if (!this.isAnimating) return;

        Array.forEach((element => this.objPositions.push({ x: element.obj.xPos, y: element.obj.yPos })))



        const buildBranch = async ({ Array, i, offsetX, dir, depth }) => { // dir -ve: for odd index -> left node, +ve for even -> right node 
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let element = Array[i];
            // //console.log('element -> ', element);
            if (i == 0) {
                let targetX = width / 2;
                let targetY = depth * (element.obj.dia + this.spacing + 70);
                // //console.log(element, depth);
                this.move({ element: element.obj, x: targetX, y: targetY, speedFactor: 4 });
                await this.waitWhilePaused();
                return
            }

            let parent = Array[Math.floor((i - 1) / 2)];
            let curX = parent.obj.xPos;
            let curY = parent.obj.yPos
            let targetX = parent.obj.xPos + (dir * offsetX) - (dir * depth);
            let targetY = (parent.obj.yPos + element.obj.dia + this.spacing + 10);
            await this.move({ element: element.obj, x: targetX, y: targetY, speedFactor: 4 });
            await this.waitWhilePaused();

            let line = new Line({ x1: curX, y1: curY, x2: targetX, y2: targetY, col: "#ffffff", strokeW: 1, textPos: 'center' });
            this.lineArray.push(line);

            this.lineMap[element.obj.label] = line;

            DrawArray([...this.lineArray]);
            await this.waitWhilePaused();

            this.delay(this.TimeoutDelay);
        }

        //console.log('Building Binary Tree', Array.length);
        let dia = Array[0].obj.dia;
        let d = 1;
        let maxD = 4;

        let totalwidth = 0;
        for (let i = 0; i < maxD; i++) {
            totalwidth += this.leafGap * Math.pow(2, i);
        }

        //console.log('total width', totalwidth)
        //console.log('available width', width * 0.9);

        let scalingFactor = Math.min(1, (width * 0.9) / totalwidth);
        
        this.leafGap *= scalingFactor;
        this.dia *= scalingFactor;
        this.spacing *= scalingFactor;

        for (let i = 0; i < Array.length; i++) {
            await this.waitWhilePaused();
            if (!this.isAnimating) return;

            let dir = (i % 2) ? -1 : 1;
            if ((i + 1) > Math.pow(2, d) - 1) d++;
            // //console.log('build branch', i, dir, d);
            await buildBranch({
                Array: Array,
                i: i,
                // offsetX: (this.spacing + dia + this.gap) / (Math.pow(2, d - 1)), 
                offsetX: (this.leafGap * (Math.pow(2, maxD - d))),
                dir: dir,
                depth: d
            });

            await this.delay(this.TimeoutDelay);
        }
    }
}