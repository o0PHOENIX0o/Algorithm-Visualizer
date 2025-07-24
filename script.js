import { BubbleSort } from './algorithms/Sorting/bubbleSort.js';
import { SelectionSort } from './algorithms/Sorting/selectionSort.js';
import { insertionSort } from './algorithms/Sorting/insertionSort.js';
import { quickSort } from './algorithms/Sorting/quickSort.js';
import { mergeSort } from './algorithms/Sorting/mergeSort.js';
import { heapSort } from './algorithms/Sorting/heapSort.js';
import { linearSearch } from './algorithms/Searching/linearSearch.js';
import { binarySearch } from './algorithms/Searching/binarySearch.js';
import { hashSearch } from './algorithms/Searching/hashing.js';
import { DFS } from './algorithms/Graphs/DFS.js';
import { BFS } from './algorithms/Graphs/BFS.js';
import { Dijkstra } from './algorithms/Graphs/Dijkstra.js';
import { kruskal } from './algorithms/Graphs/Kruskal.js';
import { prim } from './algorithms/Graphs/Prim.js';


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
let curAlgoType = "Sorting";
window.currentAlgorithm = currentAlgorithm;

document.querySelectorAll(".algorithm-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    document.querySelectorAll(".algorithm-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    console.log("--> reset");
    currentAlgorithm.reset();

    if (document.getElementById('startVertexDiv')) document.getElementById('inputField').removeChild(document.getElementById('startVertexDiv'));

    const alg = e.target.dataset.algorithm;
    curAlgoType = e.target.dataset.algoType;
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
      case 'dfs': currentAlgorithm = DFS; break;
      case 'bfs': currentAlgorithm = BFS; break;
      case 'dijkstra': currentAlgorithm = Dijkstra; break;
      case 'kruskal': currentAlgorithm = kruskal; break;
      case 'prim': currentAlgorithm = prim; break;
      default: alert(`${alg} not implemented.`); return;
    }

    let inputLabel = document.querySelector(`label[for="${InputField.id}"]`);
    let [label, input] = [...keyInput.children];
    if (curAlgoType == "Search") {
      keyInput.classList.add('active');
      inputLabel.innerText = "Custom Array (comma-separated)";
      InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");

      label.innerText = "Search Key";
      input.setAttribute("placeholder", "Search Key");
    }
    else if (curAlgoType == "Graph") {
      keyInput.classList.add('active');
      label.innerText = "Edges (src , dest , weight)";
      inputLabel.innerText = "Vertices (comma-separated)";

      input.setAttribute("placeholder", "eg: (A,B), (C,D)");
      InputField.setAttribute("placeholder", "eg: A,B,C,D");

      if (!document.getElementById('startVertex')) {
        const temp = document.createElement('div');
        temp.classList = "input-group";
        temp.id = "startVertexDiv"
        let element = `
                  <label for="startVertex">Start Vertex</label>
                  <input type="text" id="startVertex" class="array-input" placeholder="eg: A">
                `;
        temp.innerHTML = element;
        keyInput.after(temp);
        if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") {
          document.getElementById('startVertex').value = "A";
          document.getElementById('startVertex').setAttribute("disabled", "true");
        }
      }
    } else {
      keyInput.classList.remove('active');
      inputLabel.innerText = "Custom Array (comma-separated)";
      InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
    }
    window.currentAlgorithm = currentAlgorithm;
  });
});


document.getElementById("applyArrayBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  console.log("apply ", currentAlgorithm);
  if (currentAlgorithm.isAnimating) return;
  currentAlgorithm.reset();
  const input = InputField.value;

  const values = input.split(',').map(x => x.trim()).filter(x => x !== '');
  if (["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"].includes(currentAlgorithm.name) && values.length > 10) {
    alert("Use max 10 elements for visualization");
    return;
  } else if (["Heap Sort"].includes(currentAlgorithm.name) && values.length > 15) {
    alert("Use max 15 elements for visualization");
    return;
  }
  console.log("cur algo type ", curAlgoType);
  if (curAlgoType == "Search") currentAlgorithm.generate(values, keyValue.value);
  else if (curAlgoType == "Graph") {

    const regex = /\((\w),(\w),?(-?\d+)?\)/g;
    const edges = [];
    let match;
    while ((match = regex.exec(keyValue.value)) !== null) {
      const [_, src, dest, weight] = match;
      edges.push([src, dest, Number(weight)]);
      if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") edges.push([dest, src, Number(weight)]);
    }

    let indexMap = {};
    values.forEach((v, i) => indexMap[v.trim()] = i);
    let n = values.length;
    let adjMatrix = Array.from({ length: n }, () => Array(n).fill(0));

    edges.forEach(edge => {
      let [src, dest, w] = [...edge];
      let weight = (w && !isNaN(Number(w))) ? Number(w) : 1
      if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") {
        adjMatrix[indexMap[src]][indexMap[dest]] = adjMatrix[indexMap[dest]][indexMap[src]] = weight;
      } else {
        adjMatrix[indexMap[src]][indexMap[dest]] = weight;
      }

    })

    let startVertex = document.getElementById('startVertex').value;
    let startIndex;
    if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") startIndex = 0;
    else startIndex = (startVertex && startVertex.length === 1 && !isNaN(indexMap[startVertex])) ? indexMap[startVertex] : -1;

    console.log("initial-> ", adjMatrix, startVertex, indexMap[startVertex]);

    currentAlgorithm.generate(values, edges, startIndex, adjMatrix);

  } else currentAlgorithm.generate(values);
});



document.getElementById("playBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  isPlayed = true;
  currentAlgorithm.Play();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  let btn = document.getElementById("playPauseBtn");
  btn.innerHTML = `<span class="btn-icon">⏸</span> Pause`;
  isPlayed = false;
  currentAlgorithm.reset();
});

document.getElementById("playPauseBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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


