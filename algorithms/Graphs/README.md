# Graph Algorithms

This folder contains implementations of fundamental graph algorithms:

- `BFS.js` – Breadth-First Search
- `DFS.js` – Depth-First Search
- `Dijkstra.js` – Dijkstra's Shortest Path Algorithm
- `GraphBase.js` – Base classes/utilities for graph algorithms
- `Kruskal.js` – Kruskal's Minimum Spanning Tree Algorithm
- `Prim.js` – Prim's Minimum Spanning Tree Algorithm
# Graph Algorithms Visualizer

A comprehensive web-based visualization tool for graph algorithms that provides interactive animations to help understand how different graph algorithms work step-by-step.

## 🎯 Overview

This Graph Algorithms Visualizer is part of a larger Algorithm Visualizer project that demonstrates various graph algorithms through animated visualizations. The visualizer supports both directed and undirected graphs, with customizable input vertices and edges, and provides real-time animation of algorithm execution.

## 🏗️ Architecture

### File Structure

```
algorithms/Graphs/
├── GraphBase.js      # Base class for all graph algorithms
├── BFS.js           # Breadth-First Search implementation
├── DFS.js           # Depth-First Search implementation
├── Dijkstra.js      # Dijkstra's shortest path algorithm
├── Prim.js          # Prim's minimum spanning tree algorithm
├── Kruskal.js       # Kruskal's minimum spanning tree algorithm
└── README.md        # This documentation
```

### Core Components

#### 1. **GraphBase.js** - Foundation Class
The `GraphBase` class extends the `Base` class and provides common functionality for all graph algorithms:

**Key Properties:**
- `edgeList`: Array storing edge information [from, to, weight]
- `adjMatrix`: Adjacency matrix representation of the graph
- `directedEdges`: 2D array storing visual edge objects
- `indexMap`: Maps vertex names to array indices
- `radius`: Radius for circular graph layout
- `highlightColors`: Array of colors for visual highlighting

**Core Methods:**

```javascript
// Graph generation and layout
generate(input, edges, startVertex, adjMatrix)
// Creates circular layout of vertices and edge visualizations

// Animation utilities
async move({element, x, y, otherElements, speedFactor})
// Smoothly animates element movement

createArrow(posA, posB, weight, scaleFactor)
// Creates directed edge with arrow and weight label

// Graph validation
isGraphConnected()
// Checks if all vertices are connected (required for MST algorithms)

// Visual highlighting
BoxAround(index, Nodes, text)
// Creates a highlight box around specified vertex
```

**PriorityQueue Class:**
A helper class implementing priority queue operations for Dijkstra and Prim algorithms:
- `enqueue(item, priority)`: Add element with priority
- `deQueue()`: Remove and return minimum priority element
- `decreaseKey(index, newPriority)`: Update element priority
- `isEmpty()`: Check if queue is empty

#### 2. **BFS.js** - Breadth-First Search
Implements breadth-first traversal using a queue data structure.

**Core Algorithm Function:**
```javascript
async BFS(Nodes, startVertex)
```

**How it works:**
1. **Initialization**: Creates a queue and marks start vertex as visited
2. **Level-by-level exploration**: Processes vertices in FIFO order
3. **Distance tracking**: Assigns distance levels and colors vertices accordingly
4. **Visual feedback**: Highlights edges as they're traversed, shows queue state

**Visual Features:**
- Color-codes vertices by their distance from start vertex
- Animates edge traversal with highlighted paths
- Shows BFS tree formation in real-time
- Displays distance labels on vertices

#### 3. **DFS.js** - Depth-First Search
Implements depth-first traversal using recursive approach.

**Core Algorithm Function:**
```javascript
async DFS(Nodes, adjMatrix, startVertex)
```

**How it works:**
1. **Recursive exploration**: Visits vertices depth-first using recursion
2. **Backtracking**: Returns to previous vertex when no unvisited neighbors
3. **Component detection**: Can identify disconnected components
4. **Path highlighting**: Shows the current exploration path

**Visual Features:**
- Highlights current exploration path
- Different colors for different connected components
- Shows backtracking behavior
- Animates the recursive call stack visually

#### 4. **Dijkstra.js** - Single Source Shortest Path
Implements Dijkstra's algorithm for finding shortest paths from a source vertex.

**Core Algorithm Function:**
```javascript
async DijkstraAlgo(Nodes, adjMatrix, sourceVertex)
```

**How it works:**
1. **Initialization**: Sets all distances to infinity except source (0)
2. **Priority queue**: Uses min-heap to always process nearest vertex
3. **Relaxation**: Updates distances to neighbors if shorter path found
4. **Path reconstruction**: Builds shortest path tree

**Visual Features:**
- Distance labels shown outside each vertex
- Moving "min" box highlights current vertex being processed
- Edge highlighting shows relaxation operations
- Final shortest path tree displayed in green
- Real-time distance updates during algorithm execution

**Special Components:**
- Distance text display around vertices
- Priority queue visualization
- Shortest path tree highlighting

#### 5. **Prim.js** - Minimum Spanning Tree
Implements Prim's algorithm for finding minimum spanning tree.

**Core Algorithm Function:**
```javascript
async PrimAlgo(Nodes, adjMatrix, startVertex)
```

**How it works:**
1. **Greedy selection**: Always chooses minimum weight edge connecting tree to non-tree vertex
2. **Priority queue**: Maintains minimum edge weights to each vertex
3. **Tree building**: Incrementally builds MST by adding minimum weight edges
4. **Connectivity check**: Validates graph connectivity before execution

**Visual Features:**
- Weight labels displayed outside vertices
- Green highlighting for MST edges
- Moving "min" box shows current vertex selection
- Edge weight updates during key decrease operations
- Final MST highlighted in green with total weight

#### 6. **Kruskal.js** - Minimum Spanning Tree (Alternative)
Implements Kruskal's algorithm using disjoint set data structure.

**Core Algorithm Function:**
```javascript
async kruskalAlgo(Nodes, adjMatrix, startVertex)
```

**Disjoint Set Implementation:**
```javascript
class DisjointSet {
    find(u)           // Find with path compression
    union(u, v)       // Union by rank
}
```

**How it works:**
1. **Edge sorting**: Sorts all edges by weight in ascending order
2. **Cycle detection**: Uses disjoint set to detect cycles
3. **Edge selection**: Adds minimum weight edges that don't create cycles
4. **Forest merging**: Gradually merges components into single MST

**Visual Features:**
- Sorted edge list displayed as boxes at top
- Pointer moves through edges in weight order
- Red/green coloring for rejected/accepted edges
- Union-find operation visualization
- Component highlighting during merging

**Special Components:**
- Edge sorting visualization
- Disjoint set operation display
- Cycle detection feedback

## 🎮 User Interface Integration

### Input Format
- **Vertices**: Comma-separated values (e.g., "A,B,C,D")
- **Edges**: Tuple format (e.g., "(A,B,5), (B,C,3), (C,D,2)")
- **Start Vertex**: Single vertex identifier for algorithms requiring it

### Control Features
- **Play/Pause**: Control animation playback
- **Speed Control**: Adjust animation speed (1x to 10x)
- **Reset**: Clear current visualization and start over
- **Step-by-step**: Manual advancement through algorithm steps

### Visual Elements
- **Vertices**: Circular nodes with labels
- **Edges**: Lines with optional arrows and weight labels
- **Colors**: 
  - Gray: Unvisited/initial state
  - Blue: Currently processing
  - Green: Final result/visited
  - Red: Rejected/invalid
  - Various highlight colors for different components

## 🔧 Technical Implementation

### Animation System
The visualizer uses a sophisticated animation system built on:
- **RequestAnimationFrame**: Smooth 60fps animations
- **Promise-based timing**: Ensures proper sequencing
- **Pause/Resume support**: User control over animation flow
- **Speed adjustment**: Dynamic timing modifications

### Graph Representation
- **Adjacency Matrix**: For efficient edge weight lookups
- **Edge List**: For algorithm processing
- **Visual Objects**: Separate rendering layer with Canvas API

### Memory Management
- **Object pooling**: Reuses visual elements when possible
- **Cleanup routines**: Proper disposal of animation objects
- **State reset**: Complete state clearing between algorithm runs

## 🚀 Usage Examples

### BFS from vertex 'A':
```javascript
// Input: vertices "A,B,C,D", edges "(A,B), (B,C), (A,D)"
// Result: Level-order traversal with distance coloring
```

### Dijkstra's shortest paths:
```javascript
// Input: vertices "A,B,C", edges "(A,B,5), (B,C,3), (A,C,10)"
// Result: Shortest path tree from source vertex
```

### Minimum Spanning Tree:
```javascript
// Input: weighted graph
// Prim: Grows tree from single vertex
// Kruskal: Sorts edges and avoids cycles
```

## 🎯 Educational Value

This visualizer helps students understand:
- **Algorithm mechanics**: Step-by-step execution flow
- **Data structure usage**: How queues, priority queues, and disjoint sets work
- **Complexity analysis**: Visual demonstration of time/space trade-offs
- **Graph properties**: Connectivity, cycles, and tree structures
- **Real-world applications**: Shortest paths, network design, social networks

## 🔮 Future Enhancements

Potential additions could include:
- A* pathfinding algorithm
- Floyd-Warshall all-pairs shortest paths
- Topological sorting for DAGs
- Graph coloring algorithms
- Network flow algorithms
- Interactive graph editing

---

This visualization tool provides an intuitive way to understand fundamental graph algorithms through interactive animations, making complex algorithmic concepts accessible to learners at all levels.
