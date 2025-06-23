import {BubbleSort} from './algorithms/bubbleSort.js';
import {SelectionSort} from './algorithms/selectionSort.js';
import {clearCanvas, DrawArray} from "./canvas.js"

const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const InputField = document.getElementById("customArrayInput");
const navToggle = document.getElementById('navToggle');


navToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

controlsToggle.addEventListener('click', () => {
    controlsPanel.classList.toggle('active');
    controlsToggle.innerHTML = controlsPanel.classList.contains('active') ? `<ion-icon name="chevron-back-outline"></ion-icon>` : `<ion-icon name="chevron-forward-outline"></ion-icon>`;
});

speedSlider.addEventListener("input", (e)=>{
  const val = parseInt(e.target.value);
  currentAlgorithm.AnimationSpeed = currentAlgorithm.BaseSpeed * val;
  currentAlgorithm.TimeoutDelay = currentAlgorithm.BaseDelay / val;
  speedValue.textContent = `${val}x`;
});



let currentAlgorithm = BubbleSort;
window.currentAlgorithm = currentAlgorithm;


document.querySelectorAll(".algorithm-btn").forEach(btn=>{
  btn.addEventListener("click", (e)=>{
    document.querySelectorAll(".algorithm-btn").forEach(b=>b.classList.remove("active"));
    e.target.classList.add("active");
    resetCanvas();
    const alg = e.target.dataset.algorithm;
    switch(alg){
      case 'bubble-sort': currentAlgorithm = BubbleSort; break;
      case 'selection-sort': currentAlgorithm = SelectionSort; break;
      default: alert(`${alg} not implemented.`); return;
    }
    window.currentAlgorithm = currentAlgorithm;
  });
});


document.getElementById("applyArrayBtn").addEventListener("click", ()=>{
  console.log("apply ",currentAlgorithm);
  if(currentAlgorithm.isAnimating) return;
  const input = InputField.value;
  const values = input.split(',').map(x=>x.trim()).filter(x=>x !== '');
  if(["Bubble Sort", "Selection Sort"].includes(currentAlgorithm.name) && values.length > 10){ 
    alert("Use max 10 elements for visualization");
    return;
  }
  currentAlgorithm.generate(values);
});



document.getElementById("playBtn").addEventListener("click", ()=>{
  if((!currentAlgorithm.isAnimating || currentAlgorithm.isPause) && currentAlgorithm.objNodeArray.length > 0) {
    currentAlgorithm.isPause = false;
    currentAlgorithm.run();
  }
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  currentAlgorithm.reset();
});

document.getElementById("pauseBtn").addEventListener("click",()=>{
  currentAlgorithm.Pause();
})



function resetCanvas(){
  currentAlgorithm.objNodeArray = [];
  currentAlgorithm.isAnimating = false;
  currentAlgorithm.isPause = false;
  currentAlgorithm.i = 0;
  DrawArray(null);
}