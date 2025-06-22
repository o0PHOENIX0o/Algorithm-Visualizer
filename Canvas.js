const parent = document.getElementById('CanvasContainer');
let canvas;
let ctx;
let currentCircle = null;
let NodeArray = [];
let objNodeArray = [];
let spacing = 20;
let Diameter = 50;
let isAnimating = false;
let backgroundCol = "#f0f0f0";
let HighlightCol = "#667eea";
let BaseCol = '#9e9e9e'
let BaseDelay = 500;
let TimeoutDelay = BaseDelay; 
let BaseSpeed = 0.01;
let AnimationSpeed = BaseSpeed;



class Circle {
    constructor(xPos, yPos, dia, label, col) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.dia = dia;
        this.label = label;
        this.startX = xPos;
        this.col = col
    }

    draw() {
        fill(this.col);
        noStroke();
        circle(this.xPos, this.yPos, this.dia);

        fill(0);
        text(this.label, this.xPos, this.yPos);
    }
}


class PointerArrow{
    constructor(xPos, yPos, col, length, label){
        this.xPos = xPos;
        this.yPos = yPos;
        this.col = col;
        this.length = length;
        this.label = label;
    }

    draw(){
        let y1 = this.yPos + (this.length / ( 2*sqrt(3) ) );
        let x1 = this.xPos + (this.length/2);
        let y2 = this.yPos - (this.length/sqrt(3));
        let x2 = this.xPos;
        let y3 = y1;
        let x3 = this.xPos - (this.length/2);

        fill(this.col);
        triangle(x1, y1, x2, y2, x3, y3)
        fill(0);
        textSize(16);
        text(this.label, this.xPos, this.yPos+20);
    }
}



const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

speedSlider.addEventListener('input', (e) => {
    AnimationSpeed = BaseSpeed * parseInt(e.target.value);
    TimeoutDelay = BaseDelay / parseInt(e.target.value);
    speedValue.textContent = `${e.target.value}x`;
});




function setup() {
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    canvas = createCanvas(w, h).parent('CanvasContainer');
    ctx = canvas.elt.getContext('2d');
    canvas.id('visualizationCanvas');

    textSize(16);
    textAlign(CENTER, CENTER);
    background(backgroundCol);
    fill('#667eea');
    textSize(24);
    textAlign(CENTER);
    text('Select an Algorithm to Begin', w / 2, h / 2);
}

// function draw(){
// }


function DrawArray(highlightArrow = null) {
    if (objNodeArray.length > 0) {
        objNodeArray.forEach(element => {
            element.obj.draw();
        })
    }

    if (highlightArrow){
        highlightArrow.forEach(element=>{
            element.draw();
        })
    }
}


function GenerateArray() {
    if (isAnimating) return;
    clear();
    objNodeArray = [];
    let ArrayInput = document.getElementById('customArrayInput').value;
    if (!ArrayInput.includes(",")) alert("Invalid input");
    ArrayInput = ArrayInput.split(',').map(str => str.trim());
    console.log(ArrayInput);

    let totalLength = ArrayInput.length * (Diameter + spacing);

    let w = (canvas.width / 2) - (totalLength / 2) + Diameter / 2;
    let i = w;
    ArrayInput.forEach(element => {
        console.log(element);
        if (element == "") element = Math.floor(Math.random() * 100) + 1;
        let circle = new Circle(i, canvas.height / 2, Diameter, element, BaseCol);
        objNodeArray.push({ value: element, obj: circle });
        i += (Diameter + spacing);
    });

    DrawArray()
    console.log(objNodeArray);
}


document.getElementById("playBtn").addEventListener('click', (e)=>{
    if(!isAnimating && objNodeArray.length>0){
        BubbleSort();
    }
})


function SwapAnimation(obj1, obj2, pointer = null) {
    return new Promise(resolve => {
        const startX1 = obj1.xPos;
        const startX2 = obj2.xPos;
        let t = 0;

        function animate() {
            t = min(t + AnimationSpeed, 1);
            obj1.xPos = lerp(startX1, startX2, t);
            obj2.xPos = lerp(startX2, startX1, t);

            clear();
            DrawArray(pointer);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                resolve();  
            }
        }
        animate();
    });
}


function windowResized() {
    const rect = parent.getBoundingClientRect();
    resizeCanvas(rect.width - 64, rect.height);
    background(backgroundCol);
}


async function BubbleSort() {
    for (let i = objNodeArray.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            const a = objNodeArray[j];
            const b = objNodeArray[j + 1];
            a.obj.col = b.obj.col = HighlightCol;

            let arrow = [ new PointerArrow(a.obj.xPos, a.obj.yPos + 40, HighlightCol, 20, "j"), 
                          new PointerArrow(b.obj.xPos, b.obj.yPos + 40, HighlightCol, 20, "j+1")
                        ];
            clear();
            DrawArray(arrow);
            await new Promise(resolve => setTimeout(resolve, (TimeoutDelay)));
            if (parseInt(a.value) > parseInt(b.value)) {
                [objNodeArray[j], objNodeArray[j + 1]] = [b, a];
                isAnimating = true;
                await SwapAnimation(objNodeArray[j].obj, objNodeArray[j + 1].obj, arrow);
            }
            a.obj.col = b.obj.col = BaseCol;
        }
        await new Promise(resolve => setTimeout(resolve, 50)); 
        objNodeArray[i].obj.col = "#4CAF50";   
        DrawArray();

    }
  
    isAnimating = false;
    console.log(objNodeArray);
}