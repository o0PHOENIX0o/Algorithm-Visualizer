import { BubbleSort } from './algorithms/Sorting/bubbleSort.js';
import { SelectionSort } from './algorithms/Sorting/selectionSort.js';
import { insertionSort } from './algorithms/Sorting/insertionSort.js';
import { quickSort } from './algorithms/Sorting/quickSort.js';
import { mergeSort } from './algorithms/Sorting/mergeSort.js';
import { heapSort } from './algorithms/Sorting/heapSort.js';
import { linearSearch } from './algorithms/Searching/linearSearch.js';
import { binarySearch } from './algorithms/Searching/binarySearch.js';
import { hashSearch } from './algorithms/Searching/hashing.js';


const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const InputField = document.getElementById("customArrayInput");
const navToggle = document.getElementById('navToggle');
const keyInput = document.getElementById("searchKey");
const keyValue = document.getElementById("searchValue");

let isPlayed = false;


navToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active'); 
});

controlsToggle.addEventListener('click', () => {
  controlsPanel.classList.toggle('active');
  controlsToggle.innerHTML = controlsPanel.classList.contains('active') ? `<ion-icon name="chevron-back-outline"></ion-icon>` : `<ion-icon name="chevron-forward-outline"></ion-icon>`;
});

speedSlider.addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  currentAlgorithm.AnimationSpeed = currentAlgorithm.BaseSpeed * val;
  currentAlgorithm.TimeoutDelay = currentAlgorithm.BaseDelay / val;
  speedValue.textContent = `${val}x`;
});


let currentAlgorithm = BubbleSort;
window.currentAlgorithm = currentAlgorithm;

document.querySelectorAll(".algorithm-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".algorithm-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentAlgorithm.reset();
    const alg = e.target.dataset.algorithm;
    switch (alg) {
      case 'bubble-sort': currentAlgorithm = BubbleSort; break;
      case 'selection-sort': currentAlgorithm = SelectionSort; break;
      case 'insertion-sort': currentAlgorithm = insertionSort; break;
      case 'quick-sort': currentAlgorithm = quickSort; break;
      case 'merge-sort': currentAlgorithm = mergeSort; break;
      case 'heap-sort': currentAlgorithm = heapSort; break;
      case 'linear-search': currentAlgorithm = linearSearch; break;
      case 'binary-search': currentAlgorithm = binarySearch; break;
      case 'hash-search': currentAlgorithm = hashSearch; break;
      default: alert(`${alg} not implemented.`); return;
    }
    if(currentAlgorithm.name.includes("Search")) keyInput.classList.add('active');
    else keyInput.classList.remove('active');
    window.currentAlgorithm = currentAlgorithm;
  });
});


document.getElementById("applyArrayBtn").addEventListener("click", () => {
  console.log("apply ", currentAlgorithm);
  if (currentAlgorithm.isAnimating) return;
  currentAlgorithm.reset();
  const input = InputField.value;
  const values = input.split(',').map(x => x.trim()).filter(x => x !== '');
  if (["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"].includes(currentAlgorithm.name) && values.length > 10) {
    alert("Use max 10 elements for visualization");
    return;
  }else if(["Heap Sort"].includes(currentAlgorithm.name) && values.length > 15){
    alert("Use max 15 elements for visualization");
    return;
  }
  if(currentAlgorithm.name.includes("Search")) currentAlgorithm.generate(values, keyValue.value);
  else currentAlgorithm.generate(values);
});



document.getElementById("playBtn").addEventListener("click", () => {
  isPlayed = true;
  currentAlgorithm.Play();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  let btn = document.getElementById("playPauseBtn");
  btn.innerHTML = `<span class="btn-icon">⏸</span> Pause`;
  isPlayed = false;
  currentAlgorithm.reset();
});

document.getElementById("playPauseBtn").addEventListener("click", () => {
  if (!isPlayed) return;
  let btn = document.getElementById("playPauseBtn");

  if (currentAlgorithm.isPause) {
    currentAlgorithm.Resume();
    btn.innerHTML = `<span class="btn-icon">⏸</span> Pause`;
  } else {
    currentAlgorithm.Pause();
    btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
  }
})


