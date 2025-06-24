import './script.js';
import { DrawArray, setupCanvas, windowResized } from './canvas.js';
import { BubbleSort } from './algorithms/Sorting/bubbleSort.js';

export let currentAlgorithm = BubbleSort;
window.currentAlgorithm = currentAlgorithm;

window.setup = function () {
  setupCanvas();
  DrawArray();
};

window.windowResized = windowResized;

// window.draw = function () {
// };

