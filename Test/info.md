- cd Visualizer
- python -m http.server

  ```
  sorting data: 29, 10, 14, 37, 13, 25, 1, 17, 5, 8
  graph data: 
  V = A, B, C, D, E, F, G, H, I, J
  E = (A,B), (A,C), (B,E), (C,F), (E,F), (E,G), (G,H), (F,H), (H,I), (I,J), (J,G)

  ```


  - fix pause/play bug 
  - remove the play btn just keep the play/pause btn
  - if error notifiction already being displayed skip it or increase the timer
  - use uniform naming for object node array (nodesArray), replace Nodes, nodeArray, Array, array with nodesArray


  # ALGORITHM_VISUALIZER

*Empowering Students with Seamless Algorithm Mastery*

![Last Commit](https://img.shields.io/github/last-commit/o0PHOENIX0o/Algorithm-Visualizer?color=gray) 
![JavaScript](https://img.shields.io/badge/javascript-82.5%25-yellow) 
![Languages](https://img.shields.io/github/languages/count/o0PHOENIX0o/Algorithm-Visualizer?color=blue)

**Built with the tools and technologies:**

![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/JSON-black?logo=json&logoColor=white)


<br/>

---

Algorithm Visualizer is an interactive web application that helps users understand and visualize how various algorithms work. Built primarily with JavaScript, CSS, and HTML, this project aims to provide clear, step-by-step animations of popular algorithms, making learning and teaching algorithms more engaging and intuitive.

## Features

- **Visualize Popular Algorithms:** Step-by-step animations for sorting, searching, and pathfinding algorithms.
- **Interactive Controls:** Start, pause, step through, and reset visualizations.
- **Custom Input:** Enter your own data sets to see how algorithms perform.
- **Responsive Design:** Works across desktop and mobile browsers.
- **Educational Tooltips:** Explanations and references for each algorithm.

## Algorithms Included

- **Sorting:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, etc.
- **Searching:** Linear Search, Binary Search.
- **Pathfinding:** Dijkstra’s Algorithm, A* Search (if implemented).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for local development, if using build tools)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/o0PHOENIX0o/Algorithm-Visualizer.git
   cd Algorithm-Visualizer
   ```

2. **Open `index.html` in your browser**
   - No build step required if using pure HTML/JS/CSS.
   - If using a bundler or npm scripts, install dependencies:
     ```bash
     npm install
     npm start
     ```

### Usage

- Select an algorithm from the menu.
- Input custom data or use the default set.
- Use controls to start, pause, or step through the visualization.
- Read tooltips and explanations to learn about each algorithm.

## Project Structure

```
Algorithm-Visualizer/
├── index.html
├── src/
│   ├── algorithms/
│   ├── components/
│   └── ...
├── styles/
│   └── main.css
├── assets/
└── README.md
```

- **src/algorithms/**: JavaScript files for algorithm logic.
- **src/components/**: UI components.
- **styles/**: CSS files.
- **assets/**: Images and icons.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Inspired by [algorithm-visualizer.org](https://algorithm-visualizer.org/) and other educational projects.
- Thanks to all contributors!

---

Happy Visualizing!