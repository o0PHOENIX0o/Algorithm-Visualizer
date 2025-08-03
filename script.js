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
import { TreeTraversal } from './algorithms/Trees/Traversal.js';


const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const InputField = document.getElementById("customArrayInput");
const navToggle = document.getElementById('navToggle');
const keyInput = document.getElementById("searchKey");
const keyValue = document.getElementById("searchValue");
const sidebar = document.getElementById('sidebar');

const algoTitle = document.getElementById("algorithmTitle");
const algoInfo = document.getElementById("algorithmInfo");

let isPlayed = false;

const info = {
  'bubble-sort': 'Time Complexity: O(n²) | Space Complexity: O(1) | Stable: Yes',
  'selection-sort': 'Time Complexity: O(n²) | Space Complexity: O(1) | Stable: No',
  'insertion-sort': 'Time Complexity: O(n²) | Space Complexity: O(1) | Stable: Yes',
  'quick-sort': 'Time Complexity: O(n log n) avg, O(n²) worst | Space Complexity: O(log n) | Stable: No',
  'merge-sort': 'Time Complexity: O(n log n) | Space Complexity: O(n) | Stable: Yes',
  'heap-sort': 'Time Complexity: O(n log n) | Space Complexity: O(1) | Stable: No',

  'linear-search': 'Time Complexity: O(n) | Space Complexity: O(1)',
  'binary-search': 'Time Complexity: O(log n) | Space Complexity: O(1)',
  'hash-search': 'Time Complexity: O(1) avg, O(n) worst | Space Complexity: O(n)',

  'dfs': 'Time Complexity: O(V + E) | Space Complexity: O(V) | Traversal Type: Depth-First',
  'bfs': 'Time Complexity: O(V + E) | Space Complexity: O(V) | Traversal Type: Breadth-First',
  'dijkstra': 'Time Complexity: O((V + E) log V) | Space Complexity: O(V) | Use: Single-source shortest path (non-negative weights)',
  'kruskal': 'Time Complexity: O(E log E) | Space Complexity: O(V) | Use: Minimum Spanning Tree',
  'prim': 'Time Complexity: O(E log V) | Space Complexity: O(V) | Use: Minimum Spanning Tree',

  'binary-tree': 'Time Complexity: O(n) | Space Complexity: O(h) | Traversals: Inorder, Preorder, Postorder',
  'avl-tree': 'Time Complexity: O(log n) | Space Complexity: O(n) | Self-balancing: Yes',
  'red-black': 'Time Complexity: O(log n) | Space Complexity: O(n) | Self-balancing: Yes | Properties: Red/Black coloring, height-balanced',
};




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
    console.log("--> reset", currentAlgorithm.name);
    currentAlgorithm.reset();

    if (document.getElementById('startVertexDiv')) document.getElementById('inputField').removeChild(document.getElementById('startVertexDiv'));

    const alg = e.target.dataset.algorithm;
    curAlgoType = e.target.dataset.algoType;

    algoTitle.textContent = e.target.textContent;
    algoInfo.textContent = info[alg] || 'No information available';

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
      case 'binary-tree-traversal': currentAlgorithm = TreeTraversal; break;
      default: alert(`${alg} not implemented.`); return;
    }

    let inputLabel = document.querySelector(`label[for="${InputField.id}"]`);
    let [label, input] = [...keyInput.children];

    if (curAlgoType == "Search") {
      keyInput.classList.add('active');
      document.getElementById('opType')?.classList.remove('active');

      inputLabel.innerText = "Custom Array (comma-separated)";
      InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");

      label.innerText = "Search Key";
      input.setAttribute("placeholder", "Search Key");
    }
    else if (curAlgoType == "Graph") {
      keyInput.classList.add('active');
      document.getElementById('opType')?.classList.remove('active');

      
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
    } else if(curAlgoType == "Tree") {
      keyInput.classList.remove('active');
      let type = document.getElementById('opType');

      if (currentAlgorithm.name == 'Tree Traversal') {
        let temp = `
          <option value="inORder">In order</option>
          <option value="preOrder">pre order</option>
          <option value="postOrder">post order</option>
        `;
        type.innerHTML = temp;
      }
      type?.classList.add('active');

      inputLabel.innerText = "Vertices (comma-separated)";
      InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
     
    } else {
      keyInput.classList.remove('active');
      document.getElementById('opType')?.classList.remove('active');

      inputLabel.innerText = "Custom Array (comma-separated)";
      InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
    }
    window.currentAlgorithm = currentAlgorithm;
  });
});


document.getElementById("generate").addEventListener("click", () => {
  if (curAlgoType == "Sorting") InputField.value = "29, 10, 14, 37, 13, 25, 1, 17, 5, 8";
  else if (curAlgoType == "Search") {
    console.log("search algo ", currentAlgorithm.name);
    InputField.value = (currentAlgorithm.name == 'Binary Search') ? "1, 5, 8, 10, 13, 14, 17, 25, 29, 37" : "29, 10, 14, 37, 13, 25, 1, 17, 5, 8";
    keyValue.value = 8;
  } else if (curAlgoType == "Graph") {
    InputField.value = (currentAlgorithm.name == 'prim' || currentAlgorithm.name == 'kruskal') ? "A, B, C, E, F, G, H, I, J" : "A, B, C, D, E, F, G, H, I, J";
    keyValue.value = "(A,B,2), (A,C,10), (B,E,11), (C,F,3), (E,F,7), (E,G,1), (G,H,14), (F,H,20), (H,I,13), (I,J,21), (J,G, 5)";
    document.getElementById('startVertex').value = "A";
  } else if (curAlgoType == "Tree") {
    document.getElementById('opType').value = "inORder";
    InputField.value = "29, 10, 14, 37, 13, 25, 1, 17, 5, 8";
  }
  document.getElementById("applyArrayBtn").click();
})


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
      let weight = (w && !isNaN(Number(w))) ? Number(w) : 1;
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

  }else if(curAlgoType == 'Tree'){
    currentAlgorithm.generate(values, document.getElementById('opType').value);
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


