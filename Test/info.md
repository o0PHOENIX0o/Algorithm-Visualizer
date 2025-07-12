- cd Visualizer
- python -m http.server

```
 animateY(obj1, obj2, arrows, dir) {
    return new Promise((resolveY) => {
      const startY1 = obj1.yPos, startY2 = obj2.yPos;
      let t = 0;
      const animate = () => {
        t = Math.min(t + this.AnimationSpeed, 1);
        obj1.yPos = lerp(startY1, startY1 + (dir * 40), t);
        obj2.yPos = lerp(startY2, startY2 - (dir * 40), t);
        clearCanvas();
        DrawArray(arrows);
        if (t < 1 && this.isAnimating) requestAnimationFrame(animate);
        else resolveY();
      };
      animate();
    });
  };

  async swapAnimation(obj1, obj2, arrows) {
    const startX1 = obj1.xPos, startX2 = obj2.xPos;
    let t = 0;
    const animate = () => {
      return new Promise(resolve => {
        const swap = () => {
          t = min(t + this.AnimationSpeed, 1);
          obj1.xPos = lerp(startX1, startX2, t);
          obj2.xPos = lerp(startX2, startX1, t);
          clearCanvas();
          DrawArray(arrows);
          if (t < 1 && this.isAnimating) requestAnimationFrame(swap);
          else resolve();
        };
        swap();
      });
    };

    await this.animateY(obj1, obj2, arrows, +1);
    await this.delay(this.TimeoutDelay);
    await animate();
    await this.delay(this.TimeoutDelay);
    await this.animateY(obj1, obj2, arrows, -1);
  };
  ```

  ```
  sorting data: 29, 10, 14, 37, 13, 25, 1, 17, 5, 8
  graph data: 
  V = A, B, C, D, E, F, G, H, I, J
  E = (A-B), (A-C), (B-E), (C-F), (E-F), (E-G), (G-H), (F-H), (H-I), (I-J), (J-G)

  ```


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