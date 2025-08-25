# Tree Algorithms

This folder contains implementations of tree data structures and algorithms:

- `BST.js` – Binary Search Tree
- `Traversal.js` – Tree Traversal Algorithms
- `TreeBase.js` – Base classes/utilities for tree algorithms
# Tree Algorithms Visualizer

A comprehensive web-based visualization tool for tree data structures and algorithms that provides interactive animations to help understand binary trees, tree traversals, and binary search tree operations through step-by-step visual demonstrations.

## 🎯 Overview

This Tree Algorithms Visualizer is part of a larger Algorithm Visualizer project that demonstrates fundamental tree concepts through animated visualizations. The visualizer supports binary tree construction, three traversal methods (inorder, preorder, postorder), and complete binary search tree operations including insertion, searching, and deletion with automatic tree reconstruction.

## 🏗️ Architecture

### File Structure

```
algorithms/Trees/
├── TreeBase.js      # Foundation class for tree operations
├── Traversal.js     # Tree traversal algorithms (inorder, preorder, postorder)
├── BST.js          # Binary Search Tree with full CRUD operations
└── README.md       # This documentation
```

### Class Hierarchy

#### **TreeBase.js** - Foundation Class
Abstract base class providing common tree functionality:
- Binary tree construction and layout
- Node positioning and edge management
- Animation utilities and visual elements
- Responsive scaling and mobile optimization

#### **Traversal.js** - Tree Traversal Algorithms
Extends TreeBase to implement three traversal methods:
- Recursive traversal visualization
- Step-by-step node visiting
- Pointer tracking and state management

#### **BST.js** - Binary Search Tree Operations
Extends TreeBase for interactive BST operations:
- Dynamic insertion and deletion
- Search operations with path visualization
- Tree reconstruction and balancing
- Edge management and position mapping

## 🌳 Core Components

### 1. **TreeBase.js** - Foundation Infrastructure

**Core Responsibilities:**
- Tree construction and spatial layout
- Animation framework for tree operations
- Edge creation and management utilities
- Responsive design and scaling

**Key Methods:**

```javascript
async buildBTree(Array)              // Constructs binary tree layout
async move({element, x, y, otherObjects, speedFactor}) // Smooth node animation
BoxAround({index, Nodes, Boxtext, col}) // Creates pointer boxes
async moveSquare({element, xc, yc, otherObjects}) // Animates pointer movement
```

**Tree Construction Algorithm:**
```javascript
const buildBranch = async ({Array, i, offsetX, dir, depth}) => {
    // Recursive tree building with calculated positions
    // dir: -1 for left children, +1 for right children
    // offsetX: horizontal spacing based on tree depth
    // depth: current level in tree hierarchy
}
```

**Visual Features:**
- **Automatic Layout**: Calculates optimal node positions for binary trees
- **Responsive Scaling**: Adjusts tree size based on screen dimensions
- **Edge Management**: Dynamic line creation between parent-child nodes
- **Animation Framework**: Smooth transitions and movement animations
- **Mobile Optimization**: Device-specific configurations for smaller screens

**Spatial Calculations:**
- **Width Distribution**: `totalWidth = sum(leafGap * 2^level)` for all levels
- **Scaling Factor**: `min(1, availableWidth / totalWidth)` for responsive design
- **Node Positioning**: Hierarchical placement with calculated offsets
- **Edge Coordinates**: Parent-child connection line management

### 2. **Traversal.js** - Tree Traversal Visualization

**Core Traversal Methods:**
```javascript
async preOrder(i, Array)   // Root → Left → Right
async inOrder(i, Array)    // Left → Root → Right  
async postOrder(i, Array)  // Left → Right → Root
```

**How Tree Traversals Work:**

#### **Preorder Traversal (Root-Left-Right)**
1. **Visit Root**: Process current node first
2. **Traverse Left**: Recursively visit left subtree
3. **Traverse Right**: Recursively visit right subtree

```javascript
async preOrder(i, Array) {
    // 1. Highlight current node as root
    root.obj.col = this.HighlightCol;
    
    // 2. Show pointer boxes for Root, Left, Right
    this.pointerSquares = [
        this.BoxAround({index: i, Nodes: Array, Boxtext: "Root"}),
        this.BoxAround({index: leftChild, Nodes: Array, Boxtext: "Left"}),
        this.BoxAround({index: rightChild, Nodes: Array, Boxtext: "Right"})
    ];
    
    // 3. Process current node (move to output position)
    root.obj.col = this.sortedCol;
    await this.move({element: root.obj, x: outputPosition.x, y: outputPosition.y});
    
    // 4. Recursively process left and right subtrees
    await this.preOrder(leftChildIndex, Array);
    await this.preOrder(rightChildIndex, Array);
}
```

#### **Inorder Traversal (Left-Root-Right)**
1. **Traverse Left**: Recursively visit left subtree first
2. **Visit Root**: Process current node
3. **Traverse Right**: Recursively visit right subtree

```javascript
async inOrder(i, Array) {
    // 1. Highlight current context
    this.pointerSquares = [Root, Left, Right boxes];
    
    // 2. Recursively process left subtree
    await this.inOrder(leftChildIndex, Array);
    
    // 3. Process current node
    root.obj.col = this.sortedCol;
    await this.move({element: root.obj, x: outputPosition.x, y: outputPosition.y});
    
    // 4. Recursively process right subtree
    await this.inOrder(rightChildIndex, Array);
}
```

#### **Postorder Traversal (Left-Right-Root)**
1. **Traverse Left**: Recursively visit left subtree first
2. **Traverse Right**: Recursively visit right subtree
3. **Visit Root**: Process current node last

```javascript
async postOrder(i, Array) {
    // 1. Show context with pointer boxes
    this.pointerSquares = [Root, Left, Right boxes];
    
    // 2. Recursively process left subtree
    await this.postOrder(leftChildIndex, Array);
    
    // 3. Recursively process right subtree  
    await this.postOrder(rightChildIndex, Array);
    
    // 4. Process current node last
    root.obj.col = this.sortedCol;
    await this.move({element: root.obj, x: outputPosition.x, y: outputPosition.y});
}
```

**Visual Features:**
- **Pointer Boxes**: "Root", "Left", "Right" labels show current traversal context
- **Recursive Visualization**: Color-coded nodes show traversal progress
- **Output Animation**: Nodes move to linear arrangement in traversal order
- **Step-by-step Processing**: Clear indication of which node is being visited
- **Context Highlighting**: Boxes around current root and its children

**Algorithm Flow:**
```
1. Build complete binary tree from input array
2. Select traversal method (preorder/inorder/postorder)
3. Start recursive traversal from root
4. For each node:
   a. Show pointer boxes indicating context
   b. Follow traversal order (root/left/right timing)
   c. Move visited node to output position
   d. Update colors to show progress
5. Return all nodes to linear arrangement
```

**Educational Value:**
- **Recursion Visualization**: Shows how recursive calls build up and resolve
- **Order Understanding**: Clear demonstration of different traversal sequences
- **Tree Structure**: Reinforces parent-child relationships in binary trees
- **Output Comparison**: Visual comparison of different traversal results

### 3. **BST.js** - Binary Search Tree Operations

**Core BST Operations:**
```javascript
async insert(value)        // Add new node maintaining BST property
async search(value)        // Find node with path visualization
async delete(value)        // Remove node with tree reconstruction
async bulkInsert(values)   // Batch insertion for tree building
```

**BST Properties Maintained:**
- **Ordering Property**: Left child < Parent < Right child
- **Unique Values**: No duplicate values allowed
- **Dynamic Structure**: Tree grows and shrinks with operations

#### **Insertion Operation**

**Algorithm Flow:**
```javascript
async insertBST(value, rootIndex, nodeArray) {
    // 1. Check for duplicates
    if (valueExists(value, nodeArray)) {
        showError("BST cannot have duplicate values");
        return;
    }
    
    // 2. Create new node
    const newNode = new Circle({value, position: entryPoint});
    
    // 3. Find insertion position
    let currentIndex = rootIndex;
    while (nodeArray[currentIndex] !== undefined) {
        // Move pointer box to show comparison
        await moveSquare({element: pointerBox, position: currentIndex});
        
        // Navigate based on BST property
        currentIndex = (nodeArray[currentIndex].value > value) 
            ? getLeftChildIndex(currentIndex) 
            : getRightChildIndex(currentIndex);
    }
    
    // 4. Insert at found position
    nodeArray[currentIndex] = newNode;
    createEdge(currentIndex); // Connect to parent
    
    // 5. Animate node to final position
    await move({element: newNode, position: objPositions[currentIndex]});
}
```

**Visual Features:**
- **Path Visualization**: Pointer box shows navigation path
- **Comparison Highlighting**: Current node comparison with new value
- **Edge Creation**: Dynamic line drawing to connect new node
- **Position Animation**: Smooth movement to final tree position
- **Error Handling**: Visual feedback for invalid operations

#### **Search Operation**

**Algorithm Flow:**
```javascript
async searchBST(value, rootIndex, nodeArray) {
    let currentIndex = rootIndex;
    
    // Create search pointer
    this.pointerSquare = BoxAround({
        index: currentIndex, 
        Boxtext: 'searching', 
        col: this.unsortedCol
    });
    
    // Navigate tree using BST property
    while (nodeArray[currentIndex] && nodeArray[currentIndex].value !== value) {
        // Animate pointer movement
        await moveSquare({
            element: pointerSquare, 
            position: objPositions[currentIndex]
        });
        
        // Choose left or right based on comparison
        currentIndex = (nodeArray[currentIndex].value > value) 
            ? getLeftChildIndex(currentIndex) 
            : getRightChildIndex(currentIndex);
    }
    
    // Handle search result
    if (nodeArray[currentIndex] === undefined) {
        showError("Value not found in BST");
        return null;
    } else {
        // Found - highlight success
        pointerSquare.col = this.sortedCol;
        pointerSquare.text = 'found';
        return currentIndex;
    }
}
```

**Visual Features:**
- **Search Path**: Red pointer box follows search path
- **Decision Points**: Clear indication of left/right navigation choices
- **Success/Failure**: Green highlighting for found, error message for not found
- **Path Efficiency**: Demonstrates O(log n) search in balanced trees

#### **Deletion Operation**

**Three Deletion Cases:**

**Case 1: Leaf Node (No Children)**
```javascript
// Simple removal with edge cleanup
delete nodeArray[keyIndex];
await removeEdge(`${keyIndex - 1}`);
```

**Case 2: Node with One Child**
```javascript
// Move child to parent's position
let childIndex = nodeArray[leftChild] ? leftChild : rightChild;
await move({
    element: nodeArray[childIndex].obj, 
    position: objPositions[keyIndex]
});
delete nodeArray[keyIndex];
// Adjust edges for child's children
```

**Case 3: Node with Two Children**
```javascript
// Find inorder predecessor (rightmost in left subtree)
let predecessor = findInorderPredecessor(keyIndex);

// Swap values with predecessor
await SwapNodes(nodeArray[keyIndex].obj, nodeArray[predecessor].obj);
[nodeArray[keyIndex], nodeArray[predecessor]] = [nodeArray[predecessor], nodeArray[keyIndex]];

// Delete predecessor (now has at most one child)
delete nodeArray[predecessor];
```

**Tree Reconstruction:**
After complex deletions, the tree is rebuilt to maintain proper BST structure:
```javascript
const rebuildTree = async () => {
    let values = nodeArray.filter(node => node !== undefined).map(node => node.value);
    await buildBinaryTree(values); // Reconstruct with preserved values
};
```

**Visual Features:**
- **Case Identification**: Different animations for different deletion scenarios
- **Predecessor Finding**: Visual search for replacement node
- **Swap Animation**: Clear node value exchange visualization
- **Tree Rebuilding**: Smooth reconstruction maintaining BST properties

### **Advanced Features**

#### **Position Mapping System**
```javascript
async generatePositionMap(objPositions, linePositions) {
    // Pre-calculates all possible node positions for consistent layout
    // Handles responsive scaling for different screen sizes
    // Manages edge coordinates for parent-child connections
}
```

#### **Edge Management**
```javascript
createEdge(childIndex)     // Creates parent-child connection
removeEdge(edgeKey)        // Removes edge and updates map
edgeMap                    // Tracks edge indices for efficient updates
```

#### **Mobile Responsiveness**
```javascript
getCurrentConfig() {
    return isMobileDevice() ? {
        maxNodes: MOBILE_MAX_NODES,     // 15 nodes
        maxDepth: MOBILE_MAX_DEPTH      // 4 levels
    } : {
        maxNodes: MAX_NODES,            // 31 nodes  
        maxDepth: MAX_DEPTH             // 5 levels
    };
}
```

#### **Performance Optimization**
- **Speed Control**: `SPEED_UP_FACTOR` for bulk operations
- **Animation Interruption**: Safe stopping of ongoing animations
- **Memory Management**: Efficient cleanup and state reset
- **Error Handling**: Graceful handling of invalid operations

## 🎮 User Interface Integration

### Input Formats
- **Tree Traversal**: Comma-separated values for binary tree construction
- **BST Operations**: Individual values for insert/search/delete operations
- **Traversal Type**: Selection dropdown (inorder/preorder/postorder)

### Control Features
- **Interactive Buttons**: Insert, Search, Delete for BST operations
- **Traversal Selection**: Dropdown menu for traversal type selection
- **Play/Pause/Reset**: Standard animation controls
- **Speed Adjustment**: Variable animation speed control

### Visual Feedback System
- **Color Coding**:
  - Gray: Initial/unprocessed nodes
  - Blue: Currently processing/searching
  - Light Blue: Special context (root, left, right pointers)
  - Green: Completed/found state
  - Red: Error/not found state
  - Yellow: Highlighted for operations

## 🔧 Technical Implementation

### Animation Framework
```javascript
// Smooth node movement with easing
async move({element, x, y, otherObjects, speedFactor = 4})

// Pointer box movement for navigation visualization  
async moveSquare({element, xc, yc, otherObjects, speedFactor = 4})

// Vertical movement for tree construction
async animateY(element, otherObjects, distance, speedFactor)
```

### Tree Construction Algorithm
```javascript
// Hierarchical positioning with responsive scaling
const buildBranch = async ({nodeIndex, offsetX, direction, depth}) => {
    // Calculate position based on parent and tree level
    // Create edges connecting parent to child
    // Handle responsive scaling for different screen sizes
}
```

### Memory and State Management
- **State Isolation**: Independent state for each algorithm type
- **Resource Cleanup**: Proper disposal of visual elements and animations
- **Edge Tracking**: Efficient map-based edge management
- **Position Caching**: Pre-calculated positions for consistent layout

## 🎯 Educational Value

### Tree Concepts Demonstrated

#### **Binary Tree Structure**
- **Parent-Child Relationships**: Visual connections show tree hierarchy
- **Level-Order Layout**: Nodes arranged by tree depth
- **Complete vs Incomplete Trees**: Different input patterns and resulting structures

#### **Tree Traversal Understanding**
- **Recursion Visualization**: How recursive calls build up and resolve
- **Order Differences**: Clear comparison of inorder, preorder, postorder results
- **Stack Behavior**: Implicit demonstration of recursive call stack

#### **BST Properties**
- **Ordering Invariant**: Visual enforcement of left < parent < right
- **Search Efficiency**: Demonstration of O(log n) search paths
- **Dynamic Structure**: How trees grow and maintain properties

### Algorithmic Concepts

#### **Recursion Patterns**
- **Base Cases**: Handling of leaf nodes and null children
- **Recursive Calls**: Visual progression through tree levels
- **Stack Unwinding**: How recursive calls complete and return

#### **Tree Operations**
- **Insertion Strategy**: Finding correct position while maintaining BST property
- **Search Optimization**: Binary decision-making for efficient navigation
- **Deletion Complexity**: Three cases and their different handling strategies

#### **Data Structure Properties**
- **Time Complexity**: Visual demonstration of O(log n) vs O(n) operations
- **Space Efficiency**: Tree representation vs array storage
- **Balance Implications**: How tree shape affects performance

### Practical Applications

#### **Computer Science Concepts**
- **Expression Trees**: How mathematical expressions can be represented
- **File Systems**: Hierarchical directory structures
- **Decision Trees**: Binary decision-making processes
- **Search Algorithms**: Efficient data retrieval strategies

#### **Real-World Usage**
- **Database Indexing**: B-trees and their variants for fast data access
- **Compiler Design**: Parse trees and syntax analysis
- **Game Development**: Scene graphs and spatial partitioning
- **AI Applications**: Decision trees and search spaces

## 🚀 Usage Examples

### Tree Traversal Example:
```javascript
// Input: [1, 2, 3, 4, 5, 6, 7]
// Tree Structure:
//       1
//     /   \
//    2     3
//   / \   / \
//  4   5 6   7

// Preorder:  1 → 2 → 4 → 5 → 3 → 6 → 7  (Root-Left-Right)
// Inorder:   4 → 2 → 5 → 1 → 6 → 3 → 7  (Left-Root-Right)
// Postorder: 4 → 5 → 2 → 6 → 7 → 3 → 1  (Left-Right-Root)
```

### BST Operations Example:
```javascript
// Insert sequence: [50, 30, 70, 20, 40, 60, 80]
// Resulting BST:
//       50
//     /    \
//   30      70
//  / \     / \
// 20  40  60  80

// Search 40: 50 → 30 → 40 (found in 3 steps)
// Search 90: 50 → 70 → 80 → null (not found)
// Delete 30: Replace with predecessor 20, adjust tree
```

### Performance Comparison:
```javascript
// Balanced BST: O(log n) search time
// Visualization shows efficient path to target

// Unbalanced BST: O(n) search time  
// Visualization shows degraded performance
```

## 🔮 Future Enhancements

Potential additions could include:
- **AVL Trees**: Self-balancing binary search trees with rotation animations
- **Red-Black Trees**: Balanced BST with color-coding properties
- **B-Trees**: Multi-way trees for database applications
- **Heap Operations**: Priority queue operations with heap property
- **Tree Balancing**: Visual demonstration of tree rotation operations
- **Threaded Trees**: Space-efficient tree traversal without recursion
- **Expression Tree Evaluation**: Mathematical expression parsing and evaluation
- **Tree Comparison**: Side-by-side comparison of different tree types

---

This tree algorithms visualizer provides an intuitive and comprehensive way to understand fundamental tree data structures and algorithms through interactive animations, making complex concepts accessible and engaging for learners at all levels.
