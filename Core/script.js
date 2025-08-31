import '../Core/sketch.js';
import { Notes, Logger } from './logger.js';

import { windowResized, drawWelcomeScreen } from './canvas.js';

import { BubbleSort } from '../Algorithms/Sorting/bubbleSort.js';
import { SelectionSort } from '../Algorithms/Sorting/selectionSort.js';
import { insertionSort } from '../Algorithms/Sorting/insertionSort.js';
import { quickSort } from '../Algorithms/Sorting/quickSort.js';
import { mergeSort } from '../Algorithms/Sorting/mergeSort.js';
import { heapSort } from '../Algorithms/Sorting/heapSort.js';
import { linearSearch } from '../Algorithms/Searching/linearSearch.js';
import { binarySearch } from '../Algorithms/Searching/binarySearch.js';
import { hashSearch } from '../Algorithms/Searching/hashing.js';
import { DFS } from '../Algorithms/Graphs/DFS.js';
import { BFS } from '../Algorithms/Graphs/BFS.js';
import { Dijkstra } from '../Algorithms/Graphs/Dijkstra.js';
import { kruskal } from '../Algorithms/Graphs/Kruskal.js';
import { prim } from '../Algorithms/Graphs/Prim.js';
import { TreeTraversal } from '../Algorithms/Trees/Traversal.js';
import { BST } from '../Algorithms/Trees/BST.js';


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
  'bubble-sort': ['O(n²)', 'O(1)', 'Stable'],
  'selection-sort': ['O(n²)', 'O(1)', 'Not Stable'],
  'insertion-sort': ['O(n²)', 'O(1)', 'Stable'],
  'quick-sort': ['O(n log n) avg', 'O(n²) worst', 'O(log n)', 'Not Stable'],
  'merge-sort': ['O(n log n)', 'O(n)', 'Stable'],
  'heap-sort': ['O(n log n)', 'O(1)', 'Not Stable'],

  'linear-search': ['O(n)', 'O(1)'],
  'binary-search': ['O(log n)', 'O(1)'],
  'hash-search': ['O(1) avg', 'O(n) worst', 'O(n)'],

  'dfs': ['O(V + E)', 'O(V)', 'DFS'],
  'bfs': ['O(V + E)', 'O(V)', 'BFS'],
  'dijkstra': ['O((V + E) log V)', 'O(V)', 'Shortest Path'],
  'kruskal': ['O(E log E)', 'O(V)', 'MST'],
  'prim': ['O(E log V)', 'O(V)', 'MST'],

  'binary-tree': ['O(n)', 'O(h)', 'Inorder', 'Preorder', 'Postorder'],
  'avl-tree': ['O(log n)', 'O(n)', 'Self-balancing'],
  'red-black': ['O(log n)', 'O(n)', 'Self-balancing', 'Red/Black', 'Height-balanced'],
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
function showMsg(title, text, isEvent = true) {
  logger.show({ message: { title, text }, type: 'info', timer: 3000, isEvent: isEvent });
}


function handleNavToggle() {
  sidebar.classList.toggle('active');
  document.querySelector('.main-container').style.gridTemplateColumns = sidebar.classList.contains('active') ? '1fr' : '300px  1fr';
  // if(currentAlgorithm) currentAlgorithm.reset();
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
  currentAlgorithm.Pause();
  setPlayState(document.getElementById("togglePlayBtn"));
}

// Attach modularized event listeners
navToggle.addEventListener('click', handleNavToggle);
controlsToggle.addEventListener('click', handleControlsToggle);
speedSlider.addEventListener('input', handleSpeedSlider);
algoTitle.addEventListener('click', handleAlgoTitleClick);

function resetUiSettings() {
  const controlButtons = document.querySelector('#controlButtons');
  const treeControls = document.querySelector('#treeControls');

  keyValue.value = '';
  InputField.value = '';
  speedSlider.value = 1;
  speedValue.textContent = '1x';
  isPlaying = false;
  
  let btn = document.getElementById("togglePlayBtn");
  btn.classList.remove('pause-btn');
  btn.classList.add('play-btn');
  btn.innerHTML = `<span class="btn-icon">▶</span> Play`;

  let treeBtn = [document.getElementById('bulkInsert'), document.getElementById('generateBST')]

  InputField.disabled = false
  InputField.classList.remove('disabled');
  treeBtn.forEach(btn => btn.disabled = false);
  treeBtn.forEach(btn => btn.classList.remove('disabled-btn'));
  
  document.getElementById('startVertexDiv')?.remove();
  
  document.querySelector('.control-group').insertBefore( keyInput, constrolButtonGrp);
  keyInput.classList.remove('active');
  keyInput.classList.remove('tree');


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

    //console.log("--> reset", currentAlgorithm);
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
    if (info[alg]) {
      algoInfo.innerHTML = info[alg].map(val => `<span class="chip">${val}</span>`).join(' ');
    } else {
      algoInfo.innerHTML = '';
    }

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
          keyInput.classList.add('tree');
        
          document.getElementById('controlsContent').insertBefore( keyInput, treeControls);

          //console.log("BST selected", currentAlgorithm);
        }
        break;

      default:
        // For sorting
        inputLabel.innerText = "Custom Array (comma-separated)";
        InputField.setAttribute("placeholder", "eg: 64, 34, 25, 12, 22, 11, 90");
    }

    window.currentAlgorithm = currentAlgorithm;

    setTimeout(() => {
      drawWelcomeScreen();
    }, 100);
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
    //console.log("search algo ", currentAlgorithm.name);
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

  //console.log("apply ", currentAlgorithm);
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

  //console.log("cur algo subType ", curAlgoType);

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
    
    //console.log(values, indexMap);
    let n = values.length;
    let adjMatrix = Array.from({ length: n }, () => Array(n).fill(0));

    edges.forEach(edge => {
      let [src, dest, w] = [...edge];

        if (!(src in indexMap) || !(dest in indexMap)) {
          //console.warn(`Skipping invalid edge (${src}, ${dest}, ${w}) because one or both vertices are missing`);
          return;
        }
        
      let weight = (w && !isNaN(Number(w))) ? Number(w) : 1;
      if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") {
        //console.log(adjMatrix[indexMap[src]][indexMap[dest]], adjMatrix[indexMap[dest]][indexMap[src]], weight);
        adjMatrix[indexMap[src]][indexMap[dest]] = adjMatrix[indexMap[dest]][indexMap[src]] = weight;
      } else {
        adjMatrix[indexMap[src]][indexMap[dest]] = weight;
      }

    })

    let startVertex = document.getElementById('startVertex').value;
    let startIndex;
    if (currentAlgorithm.name == "prim" || currentAlgorithm.name == "kruskal") startIndex = 0;
    else startIndex = (startVertex && startVertex.length === 1 && !isNaN(indexMap[startVertex])) ? indexMap[startVertex] : -1;

    //console.log("initial-> ", adjMatrix, startVertex, indexMap[startVertex]);

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

  let btn = document.getElementById("togglePlayBtn");

  if (currentAlgorithm.isPause) {
    currentAlgorithm.Resume();
    setPauseState(btn);
  } else if (currentAlgorithm.isAnimating) {
    currentAlgorithm.Pause();
    setPlayState(btn);
  } else {
    if (currentAlgorithm.objNodeArray.length < 1) {
      if(InputField.value.trim() == ""){
        showError("Input Error", "Please enter an array first.")
        setPlayState(btn);
        isPlaying = false;
        return;
      }else{
        // showError("Input Error", "Please click Apply first.");
      }
    }
    document.getElementById("applyArrayBtn").click();
    setPauseState(btn);
    isPlaying = true;
    currentAlgorithm.Play();
  }
});



document.getElementById("resetBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  let btn = document.getElementById("togglePlayBtn");
  setPlayState(btn);

  isPlaying = false;
  currentAlgorithm.reset();

  showWarning("Reset", "The algorithm has been reset.");
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

  let btn = [document.getElementById('bulkInsert'), document.getElementById('generateBST')]

  InputField.disabled = false
  InputField.classList.remove('disabled');
  btn.forEach(btn => btn.disabled = false);
  btn.forEach(btn => btn.classList.remove('disabled-btn'));

  currentAlgorithm.reset();
  //console.log("delete all ", currentAlgorithm.isAnimating);
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
  // let btn = document.getElementById('bulkInsert');
  let btn = [document.getElementById('bulkInsert'), document.getElementById('generateBST')]

  currentAlgorithm.bulkInsert(values);

  InputField.disabled = true;
  InputField.classList.add('disabled');
  btn.forEach(btn => btn.disabled = true);
  btn.forEach(btn => btn.classList.add('disabled-btn'));
  
});



function setPauseState(btn) {
  btn.classList.add('pause-btn');
  btn.classList.remove('play-btn');
  btn.innerHTML = `<span class="btn-icon"><ion-icon name="pause-outline"></ion-icon></span> Pause`;
}

function setPlayState(btn) {
  btn.classList.add('play-btn');
  btn.classList.remove('pause-btn');
  btn.innerHTML = `<span class="btn-icon"><ion-icon name="play-outline"></ion-icon></span> Play`;
} 