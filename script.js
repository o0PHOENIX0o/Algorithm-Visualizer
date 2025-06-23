import { BubbleSort } from './algorithms/bubbleSort.js';
import { SelectionSort } from './algorithms/selectionSort.js';

const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

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
  if(currentAlgorithm.isAnimating) return;
  console.log(currentAlgorithm);
  const input = document.getElementById("customArrayInput").value;
  if(currentAlgorithm.name == "Bubble Sort" && input.length > 10){ 
    alert("Use max 10 elements for visualization");
    return;
  }
  const values = input.split(',').map(x=>x.trim()).filter(x=>x !== '');
  currentAlgorithm.generate(values);
});



document.getElementById("playBtn").addEventListener("click", ()=>{
  if((!currentAlgorithm.isAnimating || currentAlgorithm.isPause) && currentAlgorithm.objNodeArray.length > 0) {
    currentAlgorithm.isPause = false;
    currentAlgorithm.run();
  }
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  currentAlgorithm.isPause = false;
  currentAlgorithm.reset();
});

document.getElementById("pauseBtn").addEventListener("click",()=>{
  currentAlgorithm.isPause = true;
})

