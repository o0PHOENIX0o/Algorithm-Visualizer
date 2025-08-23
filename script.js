import './sketch.js';
import { Notes, Logger } from './logger.js';

import { windowResized } from './canvas.js';

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
import { BST } from './algorithms/Trees/BST.js';


const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
const InputField = document.getElementById("customArrayInput");
const navToggle = document.getElementById('navToggle');
const keyInput = document.getElementById("searchKey");
const keyValue = document.getElementById("searchValue");
const sidebar = document.getElementById('sidebar');



const constrolButtonGrp = document.getElementById('controlBtnGrp');
const treeControlsGrp = document.getElementById('treeControlsGrp');

const algoTitle = document.getElementById("algorithmTitle");
const algoInfo = document.getElementById("algorithmInfo");

let notes = new Notes("bubble-sort");
let logger = new Logger();

let isPlaying = false;

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



// --- Utility Functions ---
function scrollToTop() {
  const header = document.querySelector('header');
  window.scrollTo({
    top: header.offsetHeight,
    behavior: 'smooth'
  });
}

function showError(title, text, isEvent = true) {
  logger.show({ message: { title, text }, type: 'error', timer: 3000, isEvent: isEvent });
}
function showWarning(title, text, isEvent = true) {
  logger.show({ message: { title, text }, type: 'warning', timer: 3000, isEvent: isEvent });
}

function handleNavToggle() {
  sidebar.classList.toggle('active');
  windowResized();
}

function handleControlsToggle() {
  controlsPanel.classList.toggle('active');
  controlsToggle.innerHTML = controlsPanel.classList.contains('active')
    ? `<ion-icon name="chevron-back-outline"></ion-icon>`
    : `<ion-icon name="chevron-forward-outline"></ion-icon>`;
}

function handleSpeedSlider(e) {
  const val = parseInt(e.target.value);
  currentAlgorithm.AnimationSpeed = currentAlgorithm.BaseSpeed * val;
  currentAlgorithm.TimeoutDelay = currentAlgorithm.BaseDelay / val;
  speedValue.textContent = `${val}x`;
}

function handleAlgoTitleClick(e) {
  notes?.showNotes();
  scrollToTop();
  if (!isPlaying) return;
  let btn = document.getElementById("playPauseBtn");
  currentAlgorithm.Pause();
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
}

// Attach modularized event listeners
navToggle.addEventListener('click', handleNavToggle);
controlsToggle.addEventListener('click', handleControlsToggle);
speedSlider.addEventListener('input', handleSpeedSlider);
algoTitle.addEventListener('click', handleAlgoTitleClick);

function resetUiSettings() {
  const controlButtons = document.querySelector('#controlButtons');
  const treeControls = document.querySelector('#treeControls');

  keyInput.classList.remove('active');
  keyValue.value = '';
  InputField.value = '';
  speedSlider.value = 1;
  speedValue.textContent = '1x';
  isPlaying = false;

  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;

  document.getElementById('startVertexDiv')?.remove();

  document.querySelector('.control-group').insertBefore( keyInput, constrolButtonGrp);


  subType?.classList.remove('active');
  treeControls?.classList.replace('displayGrid', 'displayNone');
  controlButtons?.classList.remove('displayNone');
  constrolButtonGrp?.classList.remove('displayNone');
  treeControlsGrp?.classList.replace('displayFlex', 'displayNone');
}

let currentAlgorithm = BubbleSort;
let curAlgoType = "Sorting";
window.currentAlgorithm = currentAlgorithm;

document.querySelectorAll(".algorithm-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logger.clearLogs();


    document.querySelectorAll(".algorithm-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");

    console.log("--> reset", currentAlgorithm);
    if (currentAlgorithm) currentAlgorithm.reset();

    document.getElementById('startVertexDiv')?.remove();

    const controlButtons = document.querySelector('#controlButtons');
    const treeControls = document.querySelector('#treeControls');
    const inputLabel = document.querySelector(`label[for="${InputField.id}"]`);
    const [label, input] = [...keyInput.children];
    const subType = document.getElementById('subType');

    const alg = e.target.dataset.algorithm;
    curAlgoType = e.target.dataset.algoType;

    algoTitle.innerHTML = `${e.target.textContent} <span class="infoIcon"><ion-icon name="help-circle-outline"></ion-icon></span>`;

    algoInfo.textContent = info[alg] || 'No information available';

    notes = new Notes(alg);


    const algorithmMap = {
      'bubble-sort': BubbleSort,
      'selection-sort': SelectionSort,
      'insertion-sort': insertionSort,
      'quick-sort': quickSort,
      'merge-sort': mergeSort,
      'heap-sort': heapSort,
      'linear-search': linearSearch,
      'binary-search': binarySearch,
      'hash-search': hashSearch,
      'dfs': DFS,
      'bfs': BFS,
      'dijkstra': Dijkstra,
      'kruskal': kruskal,
      'prim': prim,
      'binary-tree-traversal': TreeTraversal,
      'BST': BST,
    };

    currentAlgorithm = algorithmMap[alg];

    if (!currentAlgorithm) {
      showError("Algorithm Not Found", `The algorithm "${alg}" is not available.`);
      return;
    }

    // Reset display
    resetUiSettings();

    // type specific UI
    switch (curAlgoType) {
      case "Search":
        keyInput.classList.add('active');
        inputLabel.innerText = "Custom Array (comma-separated)";
        InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
        label.innerText = "Search Key";
        input.setAttribute("placeholder", "Search Key");
        break;

      case "Graph":
        keyInput.classList.add('active');

        if (!document.getElementById('startVertex')) {
          const startVertexDiv = document.createElement('div');
          startVertexDiv.classList = "input-group";
          startVertexDiv.id = "startVertexDiv";
          startVertexDiv.innerHTML = `
            <label for="startVertex">Start Vertex</label>
            <input type="text" id="startVertex" class="array-input" placeholder="eg: A">
          `;
          keyInput.after(startVertexDiv);
        }

        inputLabel.innerText = "Vertices (comma-separated)";
        InputField.setAttribute("placeholder", "eg: A,B,C,D");
        label.innerText = "Edges (src , dest , weight)";
        input.setAttribute("placeholder", "eg: (A,B), (C,D)");

        if (["prim", "kruskal"].includes(currentAlgorithm.name)) {
          const startVertex = document.getElementById('startVertex');
          if (startVertex) {
            startVertex.value = "A";
            startVertex.setAttribute("disabled", "true");
          }
        }
        break;

      case "Tree":

        if (currentAlgorithm.name == "Tree Traversal") {
          inputLabel.innerText = "Vertices (comma-separated)";
          InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");

          subType?.classList.add('active');
          treeControls?.classList.replace('displayGrid', 'displayNone');

          let type = document.getElementById('opType');
          type.innerHTML = `
            <option value="inORder">In order</option>
            <option value="preOrder">Pre order</option>
            <option value="postOrder">Post order</option>
          `;

        } else if (currentAlgorithm.name == "BST") {
          treeControlsGrp?.classList.replace('displayNone', 'displayFlex');
          constrolButtonGrp?.classList.add('displayNone');
          treeControls?.classList.replace('displayNone', 'displayGrid');
          controlButtons?.classList.add('displayNone');

          inputLabel.innerText = "vertices (comma-separated)";
          InputField.setAttribute("placeholder", "eg: 64,64,25,12,22,11,90");
          keyInput.children[0].innerText = "vertex (one at a time)";
          keyValue.setAttribute("placeholder", "eg: 64");
          keyInput.classList.add('active');
        
          document.getElementById('controlsContent').insertBefore( keyInput, treeControls);

          console.log("BST selected", currentAlgorithm);
        }
        break;

      default:
        // For sorting
        inputLabel.innerText = "Custom Array (comma-separated)";
        InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
    }

    window.currentAlgorithm = currentAlgorithm;
  });
});



document.getElementById("generate").addEventListener("click", () => {
  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish or reset the algorithm.");
    return;
  }

  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
  isPlaying = false;


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
  // document.getElementById("applyArrayBtn").click();
})

document.getElementById("generateBST").addEventListener("click", () => {
  if (currentAlgorithm.isAnimating) return;

  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
  isPlaying = false;

  if (currentAlgorithm.name !== "BST") {
    showError("Invalid Selection", "Please select BST algorithm to generate BST.");
    return;
  }

  if (currentAlgorithm.objNodeArray.length > 0) {
    showError("BST Exists", "Please delete all nodes before generating a new BST.");
    return;
  }

  InputField.value = (width < 780) ? "50,30,70,20,60,10,25,65" : "50,30,70,20,60,10,25,65,5,15,55,68,72,90,85,95"

  // document.getElementById("bulkInsert").click();
});

document.getElementById("applyArrayBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  console.log("apply ", currentAlgorithm);
  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish or reset the algorithm.");
    return;
  }

  logger.clearLogs();
  currentAlgorithm.reset();

  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
  isPlaying = false;

  const input = InputField.value;

  const values = input.split(',').map(x => x.trim()).filter(x => x !== '');
  if (["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"].includes(currentAlgorithm.name) && values.length > 10) {
    showError("Input Error", "Use max 10 elements for visualization.");
    return;
  } else if (["Heap Sort"].includes(currentAlgorithm.name) && values.length > 15) {
    showError("Input Error", "Use max 15 elements for visualization.");
    return;
  }

  console.log("cur algo subType ", curAlgoType);

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

  } else if (curAlgoType == 'Tree') {
    currentAlgorithm.generate(values, document.getElementById('opType').value);
  } else currentAlgorithm.generate(values);
});



document.getElementById("togglePlayBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  isPlaying = !isPlaying;

  let btn = document.getElementById("togglePlayBtn");

  btn.classList.add('pause-btn');
  btn.classList.remove('play-btn');

  if (currentAlgorithm.isPause) {
    currentAlgorithm.Resume();

    btn.innerHTML = `<span class="btn-icon"><ion-icon name="pause-outline"></ion-icon></span> Pause`;
  } else if (currentAlgorithm.isAnimating) {
    currentAlgorithm.Pause();
    btn.innerHTML = `<span class="btn-icon"><ion-icon name="play-outline"></ion-icon></span> Resume`;
  } else {
    if (currentAlgorithm.objNodeArray.length < 1) {
      btn.classList.remove('pause-btn');
      btn.classList.add('play-btn');

      (InputField.value.trim() == "")
        ? showError("Input Error", "Please enter an array first.")
        : showError("Input Error", "Please click Apply first.");

      return;
    }
    currentAlgorithm.Play();
    btn.innerHTML = `<span class="btn-icon"><ion-icon name="pause-outline"></ion-icon></span> Pause`;
  }
});



document.getElementById("resetBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');

  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;
  isPlaying = false;
  currentAlgorithm.reset();
});



document.getElementById("insertBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish.");
    return;
  }
  const value = keyValue.value.trim();
  if (!value) {
    showError("Input Error", "Please enter a value to insert.");
    return;
  }
  currentAlgorithm.insert(value);
  keyValue.value = "";
});


document.getElementById("SearchBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish.");
    return;
  }
  const value = keyValue.value.trim();
  if (!value) {
    showError("Input Error", "Please enter a value to search.");
    return;
  }
  currentAlgorithm.search(value);
  keyValue.value = "";
});


document.getElementById("DeleteBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish.");
    return;
  }
  const value = keyValue.value.trim();
  if (!value) {
    showError("Input Error", "Please enter a value to delete.");
    return;
  }
  currentAlgorithm.delete(value);
  keyValue.value = "";
});

document.getElementById("deleteAllBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  isPlaying = false;

  let btn = document.getElementById('bulkInsert');
  InputField.disabled = false
  InputField.classList.remove('disabled');
  btn.disabled = false;
  btn.classList.remove('disabled-btn');

  currentAlgorithm.reset();
  console.log("delete all ", currentAlgorithm.isAnimating);
});


document.getElementById('bulkInsert').addEventListener("click", () => { // bulk insert btn
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  if (currentAlgorithm.isAnimating) {
    showError("Animation in Progress", "Please wait for the current animation to finish.");
    return;
  }

  const input = InputField.value;
  const values = input.split(',').map(x => x.trim()).filter(x => x !== '');
  if (values.length === 0) {
    showError("Input Error", "Please enter values to bulk insert.");
    return;
  }
  let btn = document.getElementById('bulkInsert');

  currentAlgorithm.bulkInsert(values);

  InputField.disabled = true;
  InputField.classList.add('disabled');
  btn.disabled = true;
  btn.classList.add('disabled-btn');
  
});

