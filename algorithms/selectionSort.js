import { DrawArray, clearCanvas, PointerArrow, Circle } from '../canvas.js';

export const SelectionSort = {
    name: "Selection Sort",
    objNodeArray: [],
    isAnimating: false,
    BaseSpeed: 0.01,
    AnimationSpeed: 0.01,
    BaseDelay: 500,
    TimeoutDelay: 500,
    BaseCol: "#9e9e9e",
    HighlightCol: "#667eea",
    HighlightCol2: "#09d3ff",
    sortedCol: "#4CAF50",
    isPause: false,
    i:0,

    generate(input) {
        clearCanvas();
        this.objNodeArray = [];
        const spacing = 20;
        const dia = 50;
        const totalLength = input.length * (dia + spacing);
        let x = (width / 2) - (totalLength / 2) + dia / 2;

        input.forEach(val => {
            const circle = new Circle(x, height / 2, dia, val, this.BaseCol);
            this.objNodeArray.push({ value: val, obj: circle });
            x += dia + spacing;
        });

        DrawArray();
    },

    async reset() {
        this.objNodeArray = [];
        this.isAnimating = false;
        this.i = 0;
        await this.delay(50);
        clearCanvas();
        // DrawArray();
    },

    Pause(){ this.isPause = true;},

    async run() {
        this.isAnimating = true;
        console.log(this.objNodeArray);

        for (let i = this.i; i < this.objNodeArray.length; i++) {
            let min = i;
            let a = this.objNodeArray[min];
            a.obj.col = this.HighlightCol;
            let arrows = null;

            for (let j = i+1; j < this.objNodeArray.length; j++) {
                if (this.isPause) {
                    console.log("Paused");
                    this.i = i;
                    return;
                }
                if (!this.isAnimating) return;
                
                const b = this.objNodeArray[j];
                b.obj.col = this.HighlightCol;

                arrows = [
                    new PointerArrow(this.objNodeArray[i].obj.xPos, this.objNodeArray[i].obj.yPos + 40, this.HighlightCol, 20, "i"),
                    new PointerArrow(b.obj.xPos, b.obj.yPos + 40, this.HighlightCol, 20, "j"),
                ];
                DrawArray(arrows);
                await this.delay(this.TimeoutDelay);
                
                if(parseFloat(b.value) < parseFloat(a.value)){
                    a = b;
                    min = j;
                }
                b.obj.col = this.BaseCol;
                
            }
            if(min != i){
                a.obj.col = this.HighlightCol2;
                arrows.push(new PointerArrow(this.objNodeArray[min].obj.xPos, this.objNodeArray[min].obj.yPos + 40, this.HighlightCol, 20, "min"));
                DrawArray(arrows);
                await this.delay(1000);

                [this.objNodeArray[i], this.objNodeArray[min]] = [this.objNodeArray[min], this.objNodeArray[i]];
                await this.swapAnimation(this.objNodeArray[min].obj, this.objNodeArray[i].obj, arrows);
                this.objNodeArray[i].obj.col =  this.objNodeArray[min].obj.col = this.BaseCol;
            }
            
            
            this.objNodeArray[i].obj.col = this.BaseCol;
            a.obj.col = this.sortedCol;
            DrawArray();
        }

        this.isAnimating = false;
    },

    swapAnimation(obj1, obj2, arrows){
        console.log("swap ", obj1.value, obj2.value);

        return new Promise(resolve => {
            const startX1 = obj1.xPos, startX2 = obj2.xPos;
            let t = 0;
            const animate = () => {
                t = min(t + this.AnimationSpeed, 1);
                obj1.xPos = lerp(startX1, startX2, t);
                obj2.xPos = lerp(startX2, startX1, t);
                clearCanvas();
                DrawArray(arrows);
                if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
                else resolve();
            };
            animate();
        });
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};