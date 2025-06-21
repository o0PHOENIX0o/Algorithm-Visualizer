
let canvas;  
let ctx;
function setup() {
    const parent = document.getElementById('CanvasContainer');
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    canvas = createCanvas(w, h).parent('CanvasContainer');
    ctx = canvas.elt.getContext('2d')

    canvas.id('visualizationCanvas');

    textSize(16);
    background('#f0f0f0');
}

function draw() {
    background('#f0f0f0');
    fill(0);
    text("Hi", width / 2, height / 2);
}


function windowResized() {
    console.log("resized");
    const container = document.getElementById('CanvasContainer');
    const rect = container.getBoundingClientRect();
    resizeCanvas(rect.width - 64, window.innerHeight /2);
    background('#f0f0f0');
}
