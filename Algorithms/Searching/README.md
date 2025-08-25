# Searching Algorithms

This folder contains implementations of basic searching algorithms:

- `binarySearch.js` – Binary Search
- `hashing.js` – Hashing-based search
- `linearSearch.js` – Linear Search
# Searching Algorithms Visualizer

A comprehensive web-based visualization tool for fundamental searching algorithms that provides interactive animations to help understand how different search techniques work step-by-step.

## 🎯 Overview

This Searching Algorithms Visualizer is part of a larger Algorithm Visualizer project that demonstrates three core searching algorithms through animated visualizations. The visualizer supports linear arrays with customizable input data and search keys, providing real-time animation of algorithm execution with detailed visual feedback.

## 🏗️ Architecture

### File Structure

```
algorithms/Searching/
├── linearSearch.js   # Sequential search implementation
├── binarySearch.js   # Divide-and-conquer search implementation
├── hashing.js        # Hash table search implementation
└── README.md         # This documentation
```

### Core Components

All searching algorithms extend the `Base` class and share common visualization components:

**Shared Visual Elements:**
- `arrows`: Pointer arrows indicating current position
- `keyCircle`: Visual representation of the search key
- `squareArray`: Comparison boxes highlighting search operations
- Animation controls for play/pause/reset functionality

#### 1. **linearSearch.js** - Sequential Search
Implements linear search algorithm that checks each element sequentially.

**Core Algorithm Function:**
```javascript
async linearSearchAlgo(array, key)
```

**How it works:**
1. **Sequential Iteration**: Examines each element from left to right
2. **Element Comparison**: Compares current element with search key
3. **Visual Feedback**: Highlights current element and shows comparison
4. **Result Display**: Green highlighting for found element, red for not found

**Visual Features:**
- **Current Position Indicator**: Pointer arrow labeled "i" shows current index
- **Key Comparison**: Search key displayed above current element
- **Comparison Box**: Rectangle encompassing both key and current element
- **Color Coding**:
  - Blue: Currently examining element
  - Green: Found element (success)
  - Red: Rejected elements
  - Gray: Unexamined elements

**Algorithm Flow:**
```
For each element in array:
  1. Highlight current element (blue)
  2. Show search key above element
  3. Create comparison box
  4. If match found: highlight green and stop
  5. If no match: mark red and continue
  6. If end reached: display "not found"
```

**Time Complexity**: O(n) - Linear time
**Space Complexity**: O(1) - Constant space
**Best Case**: O(1) - Element found at first position
**Worst Case**: O(n) - Element not found or at last position

#### 2. **binarySearch.js** - Divide and Conquer Search
Implements binary search algorithm that works on sorted arrays using divide-and-conquer approach.

**Core Algorithm Function:**
```javascript
async binarySearchAlgo(array, left, right, key)
```

**Prerequisites:**
- **Sorted Array Required**: Algorithm validates input array is sorted
- **Numeric Comparison**: Uses numerical comparison for element ordering

**How it works:**
1. **Range Definition**: Maintains left and right pointers for search range
2. **Midpoint Calculation**: Finds middle element of current range
3. **Three-way Comparison**: Compares key with middle element
4. **Range Reduction**: Eliminates half of search space based on comparison
5. **Recursive Division**: Continues until element found or range exhausted

**Visual Features:**
- **Range Highlighting**: Blue box shows current search range
- **Pointer System**: Three arrows show left, right, and mid positions
- **Key Display**: Search key shown above middle element
- **Comparison Box**: Red box highlights key-to-element comparison
- **Elimination Effect**: Grayed-out elements show eliminated portions
- **Adaptive Arrow Positioning**: Arrows adjust when pointers overlap

**Algorithm Flow:**
```
While left <= right:
  1. Calculate mid = (left + right) / 2
  2. Show search range with blue box
  3. Display left, right, mid pointers
  4. Compare key with array[mid]:
     - If equal: found (green highlight)
     - If key < mid: search left half
     - If key > mid: search right half
  5. Gray out eliminated half
  6. Recursively search remaining half
```

**Input Validation:**
```javascript
isSorted(array) // Checks ascending order before execution
```

**Time Complexity**: O(log n) - Logarithmic time
**Space Complexity**: O(log n) - Recursive call stack
**Best Case**: O(1) - Element found at middle
**Worst Case**: O(log n) - Element not found

#### 3. **hashing.js** - Hash Table Search
Implements hash-based search using a hash table with collision handling.

**Core Algorithm Function:**
```javascript
async Hashing(array, key)
```

**Hash Function:**
```javascript
async Hash(num) {
    return (Math.floor(999983 * ((num * this.GD) % 1))) % this.bucketSize;
}
```
- Uses golden ratio (φ ≈ 0.618) for uniform distribution
- Multiplicative hashing with large prime number
- Modulo operation for bucket size constraint

**How it works:**
1. **Hash Table Creation**: Builds hash table with 13 buckets
2. **Element Insertion**: Hashes each array element to appropriate bucket
3. **Collision Handling**: Multiple elements can map to same bucket
4. **Search Process**: Hashes search key and examines target bucket
5. **Bucket Traversal**: Linear search within bucket for collisions

**Visual Features:**
- **Hash Table Display**: 13 buckets shown as numbered boxes
- **Hash Function Box**: Visual representation of hashing process
- **Animation Flow**: Elements move through hash function to buckets
- **Collision Detection**: Red highlighting when collisions occur
- **Search Visualization**: Key follows same path as during insertion
- **Bucket Search**: Linear search within target bucket

**Algorithm Components:**

**1. Hash Table Generation:**
```javascript
async generateHashTable(array)
```
- Creates visual bucket array
- Animates element insertion process
- Handles collision detection and display

**2. Search Process:**
```javascript
// Phase 1: Hash the search key
key → Hash Function → bucket_index

// Phase 2: Search within target bucket
for each element in bucket[bucket_index]:
    if element == key: return found
return not_found
```

**Collision Handling:**
- **Separate Chaining**: Multiple elements stored in same bucket
- **Visual Feedback**: "COLLISION" text displayed in affected buckets
- **Linear Probing**: Within-bucket linear search for target element

**Visual Animation Sequence:**
1. **Setup Phase**: Display empty hash table and hash function
2. **Insertion Phase**: 
   - Each element moves to hash function
   - Hash value calculated and displayed
   - Element moves to target bucket
   - Collision detection and marking
3. **Search Phase**:
   - Search key follows same animation path
   - Non-target buckets grayed out
   - Linear search within target bucket
   - Success/failure indication

**Time Complexity**: 
- Average: O(1) - Direct hash access
- Worst: O(n) - All elements in same bucket
**Space Complexity**: O(n) - Hash table storage
**Load Factor**: Affects performance and collision probability

## 🎮 User Interface Integration

### Input Requirements
- **Array Input**: Comma-separated numeric values (e.g., "64,34,25,12,22,11,90")
- **Search Key**: Single numeric value to search for
- **Binary Search**: Requires sorted input (validation performed automatically)

### Control Features
- **Play/Pause**: Control animation playback with real-time pause capability
- **Speed Control**: Adjust animation speed from 1x to 10x
- **Reset**: Clear visualization and return to initial state
- **Step Control**: Manual progression through algorithm steps

### Visual Feedback System
- **Color Coding**:
  - Gray (#9e9e9e): Initial/unprocessed elements
  - Blue (#667eea): Currently processing
  - Light Blue (#09d3ff): Highlighted/special state
  - Green (#4CAF50): Success/found state
  - Red (#f44336): Failure/rejected state
- **Animation Elements**:
  - Smooth element movement and transitions
  - Pointer arrows with descriptive labels
  - Comparison boxes for visual emphasis
  - Text labels for algorithm state information

## 🔧 Technical Implementation

### Base Class Integration
All searching algorithms extend the `Base` class providing:
- **Animation Framework**: Consistent timing and smoothness controls
- **Canvas Management**: Element drawing and cleanup
- **State Management**: Play/pause/reset functionality
- **Responsive Scaling**: Automatic adjustment to different screen sizes

### Animation System
```javascript
// Common animation pattern
async move(element, targetX, targetY, speedFactor)
DrawArray([...visualElements]) // Render current state
await this.delay(this.TimeoutDelay) // Control timing
await this.waitWhilePaused() // Pause support
```

### Memory Management
- **State Reset**: Complete cleanup between algorithm runs
- **Element Reuse**: Efficient handling of visual components
- **Canvas Clearing**: Proper disposal of drawing objects

### Performance Optimizations
- **Scaling Factor**: Automatic adjustment for large datasets
- **Frame Rate Control**: Smooth 60fps animations
- **Memory Efficient**: Minimal object creation during animation

## 🎯 Educational Value

This visualizer helps students understand:

### **Algorithm Concepts**
- **Time Complexity Comparison**: Visual demonstration of O(n) vs O(log n) vs O(1)
- **Space-Time Tradeoffs**: Hash tables use more space for faster access
- **Preprocessing Requirements**: Binary search needs sorted data
- **Best/Average/Worst Cases**: Visual examples of different scenarios

### **Data Structure Understanding**
- **Array Traversal**: Linear scan patterns and indexing
- **Divide and Conquer**: Range reduction and recursive thinking
- **Hash Tables**: Collision handling and distribution properties
- **Search Strategies**: When to use which algorithm

### **Practical Applications**
- **Database Indexing**: Binary search in sorted indices
- **Web Search**: Hash tables for fast keyword lookup
- **Memory Systems**: Hash-based caching mechanisms
- **Algorithm Selection**: Choosing appropriate search method

### **Complexity Analysis**
- **Linear Search**: Simple but potentially slow for large datasets
- **Binary Search**: Fast but requires sorted data maintenance
- **Hash Search**: Very fast average case but vulnerable to collisions

## 🚀 Usage Examples

### Linear Search Example:
```javascript
// Input: [64, 34, 25, 12, 22, 11, 90], Key: 22
// Result: Sequential check until element 22 found at index 4
// Visualization: Step-by-step highlighting with comparison boxes
```

### Binary Search Example:
```javascript
// Input: [11, 12, 22, 25, 34, 64, 90], Key: 25
// Result: log₂(7) ≈ 3 comparisons to find element
// Visualization: Range reduction with left/right/mid pointers
```

### Hash Search Example:
```javascript
// Input: [64, 34, 25, 12, 22, 11, 90], Key: 34
// Result: Hash(34) → bucket, then find in bucket
// Visualization: Element flow through hash function to target bucket
```

## 🔮 Future Enhancements

Potential additions could include:
- **Interpolation Search**: For uniformly distributed sorted data
- **Exponential Search**: For unbounded/infinite arrays
- **Ternary Search**: Three-way divide and conquer
- **Jump Search**: Block-based linear search optimization
- **Advanced Hashing**: Open addressing, cuckoo hashing
- **Performance Comparison**: Side-by-side algorithm comparison

---

This searching algorithms visualizer provides an intuitive way to understand fundamental search techniques through interactive animations, making algorithmic concepts accessible and engaging for learners at all levels.
