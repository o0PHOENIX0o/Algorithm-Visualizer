# Sorting Algorithms

This folder contains implementations of common sorting algorithms:

- `bubbleSort.js` – Bubble Sort
- `heapSort.js` – Heap Sort
- `insertionSort.js` – Insertion Sort
- `mergeSort.js` – Merge Sort
- `quickSort.js` – Quick Sort
- `selectionSort.js` – Selection Sort
# Sorting Algorithms Visualizer

A comprehensive web-based visualization tool for fundamental sorting algorithms that provides interactive animations to help understand how different sorting techniques work step-by-step, from simple O(n²) algorithms to advanced O(n log n) divide-and-conquer approaches.

## 🎯 Overview

This Sorting Algorithms Visualizer is part of a larger Algorithm Visualizer project that demonstrates six core sorting algorithms through animated visualizations. The visualizer supports customizable array input with real-time animation of algorithm execution, featuring advanced visual elements like swap animations, recursive call visualization, and tree structure representations.

## 🏗️ Architecture

### File Structure

```
algorithms/Sorting/
├── bubbleSort.js     # Simple comparison-based sorting
├── selectionSort.js  # Minimum element selection sorting
├── insertionSort.js  # Incremental sorted region building
├── quickSort.js      # Divide-and-conquer with partitioning
├── mergeSort.js      # Divide-and-conquer with merging
├── heapSort.js       # Binary heap-based sorting
└── README.md         # This documentation
```

### Algorithm Classifications

#### **Simple Sorting Algorithms (O(n²))**
- **Bubble Sort**: Adjacent element comparison with bubbling effect
- **Selection Sort**: Minimum element selection and placement
- **Insertion Sort**: Building sorted region incrementally

#### **Efficient Sorting Algorithms (O(n log n))**
- **Quick Sort**: Divide-and-conquer with pivot partitioning
- **Merge Sort**: Divide-and-conquer with merge operations
- **Heap Sort**: Binary heap construction and extraction

### Core Components

All sorting algorithms extend the `Base` class and share common visualization infrastructure:

**Shared Visual Elements:**
- **Swap Animations**: Smooth element position exchanges
- **Pointer Arrows**: Algorithm state indicators (i, j, min, pivot, etc.)
- **Color Coding**: State-based element highlighting
- **Geometric Overlays**: Squares, triangles, and lines for structure visualization

## 🔍 Algorithm Implementations

### 1. **bubbleSort.js** - Adjacent Comparison Sorting

**Core Algorithm Function:**
```javascript
async run() // Main execution with nested loops
```

**How it works:**
1. **Outer Loop**: Reduces unsorted region by one element each iteration
2. **Inner Loop**: Compares adjacent elements and swaps if out of order
3. **Bubble Effect**: Largest elements "bubble up" to correct positions
4. **Optimization**: Each pass guarantees one element in final position

**Visual Features:**
- **Comparison Highlighting**: Blue highlighting for elements being compared
- **Pointer System**: "j" and "j+1" arrows show current comparison
- **Swap Animation**: Smooth element position exchange
- **Progress Indication**: Green highlighting for sorted elements
- **Real-time State**: Visual feedback for each comparison and swap

**Algorithm Flow:**
```
for i = n-1 down to 0:
    for j = 0 to i-1:
        1. Highlight elements at j and j+1 (blue)
        2. Show comparison arrows
        3. If arr[j] > arr[j+1]: animate swap
        4. Reset colors and continue
    5. Mark element at position i as sorted (green)
```

**Characteristics:**
- **Time Complexity**: O(n²) - Quadratic in all cases
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Stable - Maintains relative order of equal elements
- **Best Case**: O(n²) - No early termination optimization
- **Worst Case**: O(n²) - Reverse sorted array

### 2. **selectionSort.js** - Minimum Selection Sorting

**Core Algorithm Function:**
```javascript
async run() // Minimum element selection and placement
```

**How it works:**
1. **Unsorted Region**: Maintains pointer to start of unsorted portion
2. **Minimum Search**: Scans unsorted region to find minimum element
3. **Selection**: Identifies minimum element position
4. **Placement**: Swaps minimum with first unsorted element
5. **Progress**: Expands sorted region by one element

**Visual Features:**
- **Triple Pointer System**: "i" (current position), "j" (scanning), "min" (minimum found)
- **Color Differentiation**: 
  - Blue: Current scanning position
  - Light Blue: Current minimum candidate
  - Green: Final sorted elements
- **Dynamic Minimum Tracking**: "min" arrow follows current minimum
- **Swap Visualization**: Clear animation when minimum is placed

**Algorithm Flow:**
```
for i = 0 to n-1:
    1. Set min = i
    2. Show i, j, and min pointers
    3. for j = i+1 to n-1:
        a. Highlight current element j (blue)
        b. If arr[j] < arr[min]:
           - Update min pointer to j
           - Highlight new minimum (light blue)
    4. If min ≠ i: animate swap(arr[i], arr[min])
    5. Mark position i as sorted (green)
```

**Characteristics:**
- **Time Complexity**: O(n²) - Always scans remaining elements
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Unstable - May change relative order of equal elements
- **Comparisons**: Always (n-1) + (n-2) + ... + 1 = n(n-1)/2
- **Swaps**: At most n-1 swaps (better than bubble sort)

### 3. **insertionSort.js** - Incremental Building Sorting

**Core Algorithm Function:**
```javascript
async run() // Building sorted region incrementally
```

**How it works:**
1. **Region Separation**: Maintains sorted and unsorted regions
2. **Element Selection**: Takes next element from unsorted region
3. **Position Finding**: Scans sorted region backwards to find insertion point
4. **Insertion**: Shifts elements and inserts at correct position
5. **Region Expansion**: Sorted region grows by one element

**Visual Features:**
- **Region Visualization**: Green boxes separate sorted and unsorted regions
- **Element Lifting**: Selected element moves up during insertion process
- **Backward Scanning**: Shows comparison process in sorted region
- **Shift Animation**: Elements slide to make room for insertion
- **Dual Pointers**: "i" (current element) and "j" (scanning position)

**Algorithm Flow:**
```
for i = 1 to n-1:
    1. Select element at position i (highlight blue)
    2. Show sorted/unsorted region boundaries
    3. Lift element above array
    4. j = i-1
    5. while j ≥ 0 and arr[j] > current_element:
        a. Highlight comparison elements
        b. Animate shift: arr[j+1] = arr[j]
        c. Decrement j
    6. Lower element to position j+1
    7. Update region boundaries
```

**Special Visual Elements:**
- **Sorted Region Box**: Green rectangle showing established sorted portion
- **Element Elevation**: Vertical movement during insertion search
- **Comparison Boxes**: Highlighting during backward scan
- **Smooth Transitions**: Fluid element movements and region updates

**Characteristics:**
- **Time Complexity**: O(n²) worst case, O(n) best case (nearly sorted)
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Stable - Equal elements maintain relative order
- **Adaptive**: Performs better on partially sorted arrays
- **Online**: Can sort array as elements arrive

### 4. **quickSort.js** - Divide-and-Conquer with Partitioning

**Core Algorithm Functions:**
```javascript
async QuickSort(Array, leftIndex, rightIndex) // Recursive divide
async partition(Array, leftIndex, rightIndex)  // Partitioning logic
```

**How it works:**
1. **Pivot Selection**: Chooses first element as pivot
2. **Partitioning**: Rearranges array around pivot
3. **Recursive Division**: Sorts left and right subarrays
4. **Base Case**: Single elements are inherently sorted

**Partitioning Process:**
1. **Pivot Identification**: First element becomes pivot
2. **Scan and Swap**: Elements smaller than pivot move to left
3. **Final Placement**: Pivot moves to correct final position
4. **Return Position**: Pivot index for recursive calls

**Visual Features:**
- **Pivot Highlighting**: Light blue highlighting for pivot element
- **Triple Pointer System**: "pivot", "swap", "i" arrows
- **Partition Regions**: Colored boxes showing current working area
- **Recursive Visualization**: Nested rectangles for recursive calls
- **Element Promotion**: Yellow highlighting for elements smaller than pivot
- **Final Placement**: Green highlighting when pivot reaches final position

**Algorithm Flow:**
```
QuickSort(arr, left, right):
    if left < right:
        1. Show current subarray with colored box
        2. pivotIndex = partition(arr, left, right)
        3. Highlight pivot in final position (green)
        4. Show left and right subarrays
        5. QuickSort(arr, left, pivotIndex-1)   // Left recursion
        6. QuickSort(arr, pivotIndex+1, right) // Right recursion

partition(arr, left, right):
    1. pivot = arr[left], swapIndex = left
    2. Show pivot, swap, and scanning pointers
    3. for i = left+1 to right:
        a. If arr[i] < pivot:
           - Highlight element (yellow)
           - Increment swapIndex
           - Animate swap(arr[i], arr[swapIndex])
    4. Animate swap(arr[left], arr[swapIndex])
    5. Return swapIndex
```

**Special Visual Elements:**
- **Nested Rectangles**: Show recursive call hierarchy
- **Color-Coded Regions**: Different colors for different recursion levels
- **Dynamic Partitioning**: Real-time visualization of element movements
- **Call Stack Representation**: Visual indication of recursive depth

**Characteristics:**
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n) - Recursive call stack
- **Stability**: Unstable - May change relative order of equal elements
- **In-Place**: Sorts within original array space
- **Cache Efficient**: Good locality of reference

### 5. **mergeSort.js** - Divide-and-Conquer with Merging

**Core Algorithm Functions:**
```javascript
async mergeSortAlgo(Array, depth)     // Recursive division
async merge(left, right)              // Merging sorted subarrays
async moveDiagonal(elements, angle, dir, depth) // Spatial arrangement
```

**How it works:**
1. **Recursive Division**: Splits array into halves until single elements
2. **Spatial Separation**: Moves subarrays diagonally for clear visualization
3. **Merge Process**: Combines sorted subarrays in correct order
4. **Bottom-Up Assembly**: Builds sorted array from individual elements

**Visual Features:**
- **Diagonal Movement**: Subarrays move diagonally to show division
- **Recursive Depth Tracking**: Visual levels show recursion depth
- **Merge Animation**: Elements flow into correct merged positions
- **Rectangle Overlays**: Colored boxes group related subarrays
- **Progressive Assembly**: Bottom-up construction visualization

**Algorithm Flow:**
```
mergeSortAlgo(arr, depth):
    if arr.length <= 1: return arr
    
    1. mid = arr.length / 2
    2. Create left and right subarrays
    3. Draw colored rectangles around subarrays
    4. Move left subarray diagonally left
    5. Move right subarray diagonally right
    6. Recursively sort both subarrays
    7. Merge sorted subarrays
    8. Return merged result

merge(left, right):
    1. Create merge target area above subarrays
    2. Compare first elements of left and right
    3. Move smaller element to merge area
    4. Repeat until one subarray exhausted
    5. Move remaining elements
    6. Highlight successful merge (green)
```

**Spatial Animation System:**
- **Angle-Based Movement**: Calculates diagonal positions using trigonometry
- **Depth-Aware Spacing**: Adjusts spacing based on recursion depth
- **Progressive Assembly**: Shows how small sorted pieces combine
- **Visual Merge Process**: Clear flow from subarrays to merged result

**Characteristics:**
- **Time Complexity**: O(n log n) - Guaranteed in all cases
- **Space Complexity**: O(n) - Additional array space for merging
- **Stability**: Stable - Maintains relative order of equal elements
- **Predictable**: Consistent performance regardless of input
- **External Sorting**: Can handle datasets larger than memory

### 6. **heapSort.js** - Binary Heap-Based Sorting

**Core Algorithm Functions:**
```javascript
async buildBTree(Array)           // Constructs binary tree visualization
async buildHeap(Array)            // Creates max-heap structure
async Heapify(Array, n, i)        // Maintains heap property
async heapSort(Array)             // Main sorting process
```

**How it works:**
1. **Tree Construction**: Arranges elements in binary tree layout
2. **Heap Building**: Ensures max-heap property (parent ≥ children)
3. **Extraction**: Repeatedly removes maximum element
4. **Restoration**: Maintains heap property after each extraction

**Binary Tree Visualization:**
- **Hierarchical Layout**: Elements arranged in complete binary tree
- **Parent-Child Lines**: Visual connections show tree structure
- **Level-Based Positioning**: Automatic spacing for tree levels
- **Responsive Scaling**: Adjusts to different array sizes

**Heapify Process:**
1. **Triangle Highlighting**: Shows current parent-children relationship
2. **Comparison Arrows**: "i" and "max" pointers indicate comparison
3. **Maximum Selection**: Highlights largest among parent and children
4. **Swap Animation**: Exchanges parent with larger child if needed
5. **Recursive Descent**: Continues heapification down the tree

**Visual Features:**
- **Tree Structure**: Complete binary tree with connecting lines
- **Geometric Overlays**: Triangles highlight parent-child relationships
- **Dual Pointer System**: Shows current node and maximum candidate
- **Color Progression**: Different colors for different heap operations
- **Extraction Animation**: Elements move from tree to sorted position

**Algorithm Flow:**
```
heapSort(arr):
    1. Build binary tree visualization
    2. Build max-heap from bottom up:
        for i = n/2-1 down to 0:
            heapify(arr, n, i)
    3. Extract elements one by one:
        for i = n-1 down to 0:
            a. Swap arr[0] with arr[i] (max to end)
            b. Move extracted element to original position
            c. Heapify remaining heap
            d. Update tree visualization

heapify(arr, n, i):
    1. Show triangle around parent and children
    2. Find maximum among parent, left child, right child
    3. If maximum is not parent:
        a. Animate swap with maximum child
        b. Recursively heapify affected subtree
```

**Advanced Visual Elements:**
- **Tree Auto-Layout**: Calculates optimal positioning for tree nodes
- **Connection Management**: Dynamic line drawing between tree levels
- **Memory Positions**: Tracks original array positions for final animation
- **Multi-Level Animation**: Simultaneous tree and array representations

**Characteristics:**
- **Time Complexity**: O(n log n) - Build heap O(n), extract n times O(log n)
- **Space Complexity**: O(1) - In-place sorting after tree construction
- **Stability**: Unstable - Heap operations may change relative order
- **Selection-Based**: Repeatedly selects maximum element
- **Tree-Based**: Utilizes complete binary tree properties

## 🎮 User Interface Integration

### Input Format
- **Array Input**: Comma-separated numeric values (e.g., "64,34,25,12,22,11,90")
- **Automatic Validation**: Handles various input formats and validates data
- **Size Optimization**: Automatically scales visualization for different array sizes

### Control Features
- **Play/Pause**: Real-time control with pause-anywhere capability
- **Speed Control**: Variable animation speed from 1x to 10x
- **Reset**: Complete state reset and visualization cleanup
- **Resume**: Continue from pause point maintaining algorithm state

### Visual Feedback System
- **Universal Color Scheme**:
  - Gray (#9e9e9e): Initial/unprocessed elements
  - Blue (#667eea): Currently processing/comparing
  - Light Blue (#09d3ff): Special states (minimum, pivot, etc.)
  - Green (#4CAF50): Sorted/final position
  - Red (#f44336): Rejected/eliminated elements
  - Yellow (#fff176): Promoted/selected elements

## 🔧 Technical Implementation

### Animation Framework
All sorting algorithms utilize sophisticated animation system:

```javascript
// Common animation patterns
async swapAnimation(obj1, obj2, otherElements) // Element position exchange
async animateY(obj, elements, distance, speed) // Vertical movement
async move(element, x, y, speedFactor)         // General position animation
DrawArray([...visualElements])                 // Render current state
```

### Memory Management
- **State Isolation**: Each algorithm maintains independent state
- **Resource Cleanup**: Proper disposal of visual elements
- **Animation Interruption**: Safe termination of ongoing animations
- **Performance Optimization**: Efficient rendering and memory usage

### Responsive Design
- **Auto-Scaling**: Dynamic sizing based on array length and screen size
- **Element Spacing**: Optimal spacing calculations for readability
- **Performance Scaling**: Animation speed adjustment for large datasets

## 🎯 Educational Value

### Algorithm Comparison Studies

#### **Time Complexity Visualization**
- **O(n²) Algorithms**: Visual demonstration of quadratic growth
- **O(n log n) Algorithms**: Shows efficiency of divide-and-conquer
- **Best/Worst Cases**: Different input patterns and their effects

#### **Algorithm Selection Criteria**
- **Small Arrays**: Simple algorithms may be faster due to low overhead
- **Large Arrays**: Efficient algorithms show dramatic improvements
- **Memory Constraints**: In-place vs external sorting trade-offs
- **Stability Requirements**: When relative order preservation matters

#### **Practical Applications**
- **Database Systems**: Understanding index sorting and query optimization
- **Graphics Programming**: Painter's algorithm and z-buffer sorting
- **Data Processing**: ETL operations and large dataset handling
- **Real-Time Systems**: Choosing algorithms based on time constraints

### Algorithmic Concepts

#### **Divide and Conquer**
- **Quick Sort**: Partitioning and recursive subdivision
- **Merge Sort**: Splitting and combining sorted sequences
- **Heap Sort**: Tree-based divide and extract approach

#### **In-Place vs External**
- **Memory Usage**: Visual comparison of space requirements
- **Cache Efficiency**: Locality of reference demonstration
- **Scalability**: Performance with limited memory

#### **Stability Analysis**
- **Stable Algorithms**: Bubble, Insertion, Merge
- **Unstable Algorithms**: Selection, Quick, Heap
- **Practical Implications**: When stability matters in real applications

## 🚀 Usage Examples

### Simple Sorting Demonstration:
```javascript
// Input: [64, 34, 25, 12, 22, 11, 90]
// Bubble Sort: Shows 21 comparisons with multiple swaps
// Selection Sort: Shows 21 comparisons with 6 swaps maximum
// Insertion Sort: Shows adaptive behavior on partially sorted data
```

### Advanced Sorting Visualization:
```javascript
// Input: [64, 34, 25, 12, 22, 11, 90]
// Quick Sort: Shows partitioning with pivot placement
// Merge Sort: Shows recursive division and merge operations
// Heap Sort: Shows tree construction and repeated extraction
```

### Performance Comparison:
```javascript
// Large Array: [random 100 elements]
// O(n²) algorithms: Visibly slower with quadratic comparisons
// O(n log n) algorithms: Dramatically faster with efficient strategies
```

## 🔮 Future Enhancements

Potential additions could include:
- **Radix Sort**: Non-comparison based sorting
- **Counting Sort**: Integer sorting with linear time complexity
- **Bucket Sort**: Distribution-based sorting for uniform data
- **Tim Sort**: Hybrid merge-insertion sort (used in Python)
- **Parallel Sorting**: Multi-threaded visualization
- **External Sorting**: Handling datasets larger than memory
- **Stability Analysis**: Side-by-side stable vs unstable demonstrations
- **Performance Profiling**: Real-time comparison metrics

---

This sorting algorithms visualizer provides an intuitive and comprehensive way to understand fundamental sorting techniques through interactive animations, making complex algorithmic concepts accessible and engaging for learners at all levels.
