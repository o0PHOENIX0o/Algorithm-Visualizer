let algoData = {
  "bubble-sort": {
    "name": "Bubble Sort",
    "description": "A simple sorting algorithm that repeatedly compares and swaps adjacent elements until the array is sorted.",
    "steps": [
      "Start with the last position in the array as the current end position.",
      "From the beginning of the array, compare each element with the one immediately after it.",
      "If the current element is larger than the next one, swap their positions.",
      "Continue comparing and swapping until you reach the current end position.",
      "The largest value is now at its correct position at the end of the array.",
      "Move the end position one step closer to the start of the array.",
      "Repeat the process until the array is completely sorted."
    ],
    "complexity": {
      "time": "O(n^2)",
      "space": "O(1)",
      "stable": true,
      "inPlace": true
    },
    "notes": {
      "heading": "Bubble Sort Explaination",
      "subHeading": "Bubble Sort is one of the simplest sorting algorithms to understand and implement. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=1"
      },
      "complexity": {
        "time": {
          "best": "O(n)",
          "average": "O(n^2)",
          "worst": "O(n^2)"
        },
        "space": "O(1)",
        "stable": true,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Compare Adjacent Elements:</strong> Start with the first two elements of the array",
          "img": ""
        },
        {
          "step": "<strong>Swap if Necessary:</strong> If the first element is greater than the second, swap them",
          "img": ""
        },
        {
          "step": "<strong>Move Forward:</strong> Continue this process for each pair of adjacent elements",
          "img": ""
        },
        {
          "step": "<strong>Complete Pass:</strong> After one complete pass, the largest element \"bubbles up\" to the end",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Repeat the process for the remaining unsorted portion",
          "img": ""
        },
        {
          "step": "<strong>Optimization:</strong> Stop early if no swaps occur in a pass (array is sorted)",
          "img": ""
        }
      ],
      "Pseudocode": `BubbleSort(A)
    n ← length(A)
    repeat
        swapped ← false
        for i ← 0 to n − 2 do
            if A[i] > A[i + 1] then
                swap A[i], A[i + 1]
                swapped ← true
        n ← n − 1           // last element is in place
    until swapped = false
    return A
`,
      "applications": [
        "<strong>Educational Purpose:</strong> Perfect for learning sorting concepts",
        "<strong>Small Datasets:</strong> Acceptable for arrays with less than 50 elements",
        "<strong>Nearly Sorted Data:</strong> Performs well when data is almost sorted",
        "<strong>Memory Constraints:</strong> When memory usage must be minimal",
        "<strong>Stable Sorting:</strong> Maintains relative order of equal elements"
      ],
      "advantages": [
        "Simple to understand and implement",
        "No additional memory space needed (in-place)",
        "Stable sorting algorithm",
        "Can detect if list is already sorted"
      ],
      "disadvantages": [
        "Poor time complexity O(n²)",
        "More writes compared to selection sort",
        "Not suitable for large datasets"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Bubble_sort"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/bubble-sort/"
        },
        {
          "name": "Khan Academy",
          "url": "https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/bubble-sort"
        },
        {
          "name": "github code",
          "url": ""
        }
      ]
    }
  },
  "insertion-sort": {
    "name": "Insertion Sort",
    "description": "Insertion Sort builds a sorted array one element at a time by repeatedly taking the next element and inserting it into the correct position in the already sorted part of the array.",
    "steps": [
      "Start with the first element as the sorted part.",
      "Take the next element from the unsorted part.",
      "Compare it with elements in the sorted part from right to left.",
      "Shift larger elements to the right to make space for the new element.",
      "Insert the new element into its correct position.",
      "Repeat until all elements are sorted."
    ],
    "complexity": {
      "time": {
        "best": "O(n)",
        "average": "O(n^2)",
        "worst": "O(n^2)"
      },
      "space": "O(1)",
      "stable": true,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages for small datasets and has some performance advantages over other O(n²) algorithms.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=3"
      },
      "complexity": {
        "time": {
          "best": "O(n)",
          "average": "O(n²)",
          "worst": "O(n²)"
        },
        "space": "O(1)",
        "stable": true,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Start from Second Element:</strong> Assume first element is already sorted",
          "img": ""
        },
        {
          "step": "<strong>Pick Current Element:</strong> Take the next element from unsorted portion",
          "img": ""
        },
        {
          "step": "<strong>Find Correct Position:</strong> Compare with sorted elements from right to left",
          "img": ""
        },
        {
          "step": "<strong>Shift Elements:</strong> Move larger elements one position to the right",
          "img": ""
        },
        {
          "step": "<strong>Insert Element:</strong> Place current element in its correct position",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until all elements are processed",
          "img": ""
        }
      ],
      "Pseudocode": `InsertionSort(A)
    for i ← 1 to length(A) − 1 do
        key ← A[i]
        j ← i − 1
        while j ≥ 0 and A[j] > key do
            A[j + 1] ← A[j]
            j ← j − 1
        A[j + 1] ← key
    return A
`,
      "applications": [
        "<strong>Small Arrays:</strong> Very efficient for small datasets (< 50 elements)",
        "<strong>Nearly Sorted Arrays:</strong> Excellent performance on partially sorted data",
        "<strong>Online Algorithm:</strong> Can sort data as it arrives",
        "<strong>Hybrid Algorithms:</strong> Used as subroutine in advanced algorithms like Timsort",
        "<strong>Linked Lists:</strong> Works well with linked list data structures"
      ],
      "advantages": [
        "Simple to implement",
        "Efficient for small or nearly sorted datasets",
        "Stable sort",
        "In-place sorting (no extra memory needed)",
        "Online algorithm (can sort as data arrives)"
      ],
      "disadvantages": [
        "Inefficient for large datasets (O(n²) time)",
        "Shifts elements multiple times",
        "Not suitable for large unsorted arrays"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Insertion_sort"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Sorts/InsertionSort.js"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sorting"
        }
      ]
    }
  },
  "selection-sort": {
    "name": "Selection Sort",
    "description": "Selection Sort divides the array into a sorted and an unsorted part, repeatedly selecting the smallest (or largest) element from the unsorted part and moving it to the end of the sorted part.",
    "steps": [
      "Start with an empty sorted part and the entire array as unsorted.",
      "Find the smallest element in the unsorted part.",
      "Swap it with the first element of the unsorted part.",
      "Move the boundary between sorted and unsorted parts one step forward.",
      "Repeat until all elements are sorted."
    ],
    "complexity": {
      "time": {
        "best": "O(n^2)",
        "average": "O(n^2)",
        "worst": "O(n^2)"
      },
      "space": "O(1)",
      "stable": false,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Selection Sort is a simple, in-place comparison sorting algorithm. It is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=6"
      },
      "complexity": {
        "time": {
          "best": "O(n^2)",
          "average": "O(n^2)",
          "worst": "O(n^2)"
        },
        "space": "O(1)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Find Minimum:</strong> Find the minimum element in the unsorted part.",
          "img": ""
        },
        {
          "step": "<strong>Swap:</strong> Swap it with the first unsorted element.",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Move the boundary and repeat until sorted.",
          "img": ""
        }
      ],
      "Pseudocode": `SelectionSort(A)
    n ← length(A)
    for i ← 0 to n − 2 do
        minIndex ← i
        for j ← i + 1 to n − 1 do
            if A[j] < A[minIndex] then
                minIndex ← j
        swap A[i], A[minIndex]
    return A
`,
      "applications": [
        "<strong>Small Arrays:</strong> Useful for small datasets.",
        "<strong>Memory Constraints:</strong> When memory writes are costly.",
        "<strong>Educational Purpose:</strong> Good for teaching sorting concepts."
      ],
      "advantages": [
        "Simple to implement",
        "Performs well on small lists",
        "Minimizes number of swaps"
      ],
      "disadvantages": [
        "Inefficient on large lists",
        "Not stable",
        "O(n^2) time complexity"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Selection_sort"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/selection-sort/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sorting"
        }
      ]
    }
  },
  "merge-sort": {
    "name": "Merge Sort",
    "description": "Merge Sort is a divide-and-conquer algorithm that splits the array into halves, sorts each half, and then merges them back together.",
    "steps": [
      "If the array has one or zero elements, it is already sorted.",
      "Split the array into two halves.",
      "Recursively apply Merge Sort to both halves.",
      "Merge the two sorted halves back together:",
      " Compare the smallest elements of both halves and append the smaller one to the result.",
      " Continue until all elements from both halves are merged."
    ],
    "complexity": {
      "time": {
        "best": "O(n log n)",
        "average": "O(n log n)",
        "worst": "O(n log n)"
      },
      "space": "O(n)",
      "stable": true,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Merge Sort is a stable, comparison-based, divide-and-conquer sorting algorithm that is efficient for large datasets.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=4"
      },
      "complexity": {
        "time": {
          "best": "O(n log n)",
          "average": "O(n log n)",
          "worst": "O(n log n)"
        },
        "space": "O(n)",
        "stable": true,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Divide:</strong> Recursively split the array into halves until single elements remain.",
          "img": ""
        },
        {
          "step": "<strong>Conquer:</strong> Merge sorted halves by comparing elements.",
          "img": ""
        },
        {
          "step": "<strong>Combine:</strong> Continue merging until the whole array is sorted.",
          "img": ""
        }
      ],
      "Pseudocode": `MergeSort(A)
    if length(A) ≤ 1 then
        return A
    mid ← ⌊length(A) / 2⌋
    left  ← MergeSort(A[0 .. mid − 1])
    right ← MergeSort(A[mid .. end])
    return Merge(left, right)

Merge(L, R)
    result ← empty list
    i ← 0, j ← 0
    while i < length(L) and j < length(R) do
        if L[i] ≤ R[j] then
            append L[i] to result
            i ← i + 1
        else
            append R[j] to result
            j ← j + 1
    append L[i .. end] to result
    append R[j .. end] to result
    return result
`,
      "applications": [
        "<strong>Large Datasets:</strong> Efficient for sorting large arrays.",
        "<strong>Linked Lists:</strong> Well-suited for linked list sorting.",
        "<strong>External Sorting:</strong> Used when data cannot fit into memory."
      ],
      "advantages": [
        "Stable sort",
        "Consistent O(n log n) time complexity",
        "Works well with large data sets"
      ],
      "disadvantages": [
        "Requires additional memory (O(n))",
        "Slower than in-place algorithms for small arrays"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Merge_sort"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/merge-sort/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sorting"
        }
      ]
    }
  },
  "quick-sort": {
    "name": "Quick Sort",
    "description": "Quick Sort is a divide-and-conquer algorithm that selects a pivot and partitions the array into elements less than and greater than the pivot.",
    "steps": [
      "Choose a pivot element from the array (last or first element).",
      "Partition the array into two sub-arrays:",
      " Elements less than the pivot.",
      " Elements greater than or equal to the pivot.",
      "Recursively apply Quick Sort to both sub-arrays.",
      "Combine the sorted sub-arrays and the pivot to form the sorted array."
    ],
    "complexity": {
      "time": {
        "best": "O(n log n)",
        "average": "O(n log n)",
        "worst": "O(n^2)"
      },
      "space": "O(log n)",
      "stable": false,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=5"
      },
      "complexity": {
        "time": {
          "best": "O(n log n)",
          "average": "O(n log n)",
          "worst": "O(n²)"
        },
        "space": "O(log n)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Choose Pivot:</strong> Select an element as pivot (first, last, random, or median)",
          "img": ""
        },
        {
          "step": "<strong>Partition:</strong> Rearrange array so elements smaller than pivot come before it",
          "img": ""
        },
        {
          "step": "<strong>Recursive Sort:</strong> Apply quicksort to sub-array of elements less than pivot",
          "img": ""
        },
        {
          "step": "<strong>Recursive Sort:</strong> Apply quicksort to sub-array of elements greater than pivot",
          "img": ""
        },
        {
          "step": "<strong>Combine:</strong> No explicit combine step needed due to in-place sorting",
          "img": ""
        }
      ],
      "Pseudocode": `QuickSort(A, low, high)
    if low < high then
        p ← Partition(A, low, high)
        QuickSort(A, low, p − 1)
        QuickSort(A, p + 1, high)
    return A

Partition(A, low, high)
    pivot ← A[high]
    i ← low − 1
    for j ← low to high − 1 do
        if A[j] < pivot then
            i ← i + 1
            swap A[i], A[j]
    swap A[i + 1], A[high]
    return i + 1
`,
      "applications": [
        "<strong>General Purpose:</strong> Most commonly used sorting algorithm",
        "<strong>Large Datasets:</strong> Excellent performance on large arrays",
        "<strong>System Libraries:</strong> Used in many programming language libraries",
        "<strong>Database Systems:</strong> Internal sorting in database management systems",
        "<strong>Cache Efficiency:</strong> Good cache performance due to locality of reference"
      ],
      "advantages": [
        "Very fast on average for large datasets",
        "In-place sorting (low memory usage)",
        "Divide-and-conquer approach",
        "Good cache performance"
      ],
      "disadvantages": [
        "Worst-case time complexity is O(n²)",
        "Not stable by default",
        "Recursive (can cause stack overflow on large arrays)",
        "Performance degrades with poor pivot selection"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Quicksort"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Sorts/QuickSort.js"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sorting"
        }
      ]
    }
  },
  "heap-sort": {
    "name": "Heap Sort",
    "description": "Heap Sort builds a max heap from the input, then repeatedly extracts the maximum element and rebuilds the heap until the array is sorted.",
    "steps": [
      "Build a max heap from the array:",
      " Start from the last non-leaf node and move backward to the root.",
      " For each node, apply Heapify to ensure the max heap property is satisfied.",
      "Once the max heap is built, repeatedly do the following:",
      " Swap the root (largest element) with the last element in the heap.",
      " Reduce the heap size by one (exclude the last sorted element).",
      " Apply Heapify on the new root to restore the max heap property.",
      "Continue until all elements are sorted."
    ],
    "complexity": {
      "time": {
        "best": "O(n log n)",
        "average": "O(n log n)",
        "worst": "O(n log n)"
      },
      "space": "O(1)",
      "stable": false,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Heap Sort is an efficient comparison-based sorting algorithm that uses a binary heap data structure.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=2"
      },
      "complexity": {
        "time": {
          "best": "O(n log n)",
          "average": "O(n log n)",
          "worst": "O(n log n)"
        },
        "space": "O(1)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Build Max Heap:</strong> Arrange the array into a max heap.",
          "img": ""
        },
        {
          "step": "<strong>Extract Max:</strong> Swap the root with the last element, reduce heap size, and heapify.",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until the heap is empty.",
          "img": ""
        }
      ],
      "Pseudocode": `HeapSort(A)
    n ← length(A)
    // Build max heap
    for i ← ⌊n/2⌋ − 1 downto 0 do
        Heapify(A, n, i)
    // Extract elements one by one
    for i ← n − 1 downto 1 do
        swap A[0], A[i]
        Heapify(A, i, 0)
    return A

Heapify(A, n, i)
    largest ← i
    l ← 2i + 1
    r ← 2i + 2
    if l < n and A[l] > A[largest] then largest ← l
    if r < n and A[r] > A[largest] then largest ← r
    if largest ≠ i then
        swap A[i], A[largest]
        Heapify(A, n, largest)
`,
      "applications": [
        "<strong>Large Datasets:</strong> Efficient for large arrays.",
        "<strong>Priority Queues:</strong> Used in implementing priority queues.",
        "<strong>External Sorting:</strong> Useful when memory is limited."
      ],
      "advantages": [
        "Time complexity is always O(n log n)",
        "In-place sorting",
        "Not recursive (can be implemented iteratively)"
      ],
      "disadvantages": [
        "Not stable",
        "Slower than quicksort in practice for small arrays"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Heapsort"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/heap-sort/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sorting"
        }
      ]
    }
  },
  "linear-search": {
    "name": "Linear Search",
    "description": "Linear Search checks each element in the array sequentially until it finds the target value or reaches the end of the array.",
    "steps": [
      "Start from the first element of the array.",
      "Compare the current element with the target value.",
      "If they match, return the index of the current element.",
      "If not, move to the next element.",
      "Repeat until you find the target or reach the end of the array."
    ],
    "complexity": {
      "time": {
        "best": "O(1)",
        "average": "O(n)",
        "worst": "O(n)"
      },
      "space": "O(1)",
      "stable": true,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Linear Search is the simplest searching algorithm that checks every element in the list sequentially until the target value is found or the list ends.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=7"
      },
      "complexity": {
        "time": {
          "best": "O(1)",
          "average": "O(n)",
          "worst": "O(n)"
        },
        "space": "O(1)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Start from First Element:</strong> Begin at the first element in the list",
          "img": ""
        },
        {
          "step": "<strong>Check Value:</strong> Compare current element with target value",
          "img": ""
        },
        {
          "step": "<strong>Match Found:</strong> Return index if element matches target",
          "img": ""
        },
        {
          "step": "<strong>Move to Next:</strong> Continue to next element if no match",
          "img": ""
        },
        {
          "step": "<strong>End:</strong> Return -1 if target not found after checking all elements",
          "img": ""
        }
      ],
      "Pseudocode": `LinearSearch(A, target)
    for i ← 0 to length(A) − 1 do
        if A[i] = target then
            return i
    return −1
`,
      "applications": [
        "<strong>Unsorted Data:</strong> Works on unsorted datasets",
        "<strong>Small Datasets:</strong> Good for lists with small number of elements",
        "<strong>When Simplicity is Key:</strong> Useful when minimal coding is required"
      ],
      "advantages": [
        "Very simple to implement",
        "Works on unsorted data",
        "No preprocessing required",
        "Stable and in-place"
      ],
      "disadvantages": [
        "Inefficient for large datasets (O(n) time)",
        "Not suitable for sorted or large lists",
        "Can be slow if target is at the end or not present"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Linear_search"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Searches/LinearSearch.js"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/searching"
        }
      ]
    }
  },
  "binary-search": {
    "name": "Binary Search",
    "description": "Binary Search is an efficient algorithm for finding a target value in a sorted array by repeatedly dividing the search interval in half.",
    "steps": [
      "Start with the entire array as the search interval.",
      "Find the middle element of the current interval.",
      "If the middle element is equal to the target, return its index.",
      "If the target is less than the middle element, narrow the search to the left half.",
      "If the target is greater than the middle element, narrow the search to the right half.",
      "Repeat until you find the target or the interval is empty."
    ],
    "complexity": {
      "time": {
        "best": "O(1)",
        "average": "O(log n)",
        "worst": "O(log n)"
      },
      "space": "O(1)",
      "stable": true,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Binary Search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=9"
      },
      "complexity": {
        "time": {
          "best": "O(1)",
          "average": "O(log n)",
          "worst": "O(log n)"
        },
        "space": "O(1)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        {
          "step": "<strong>Start with Whole Array:</strong> Set low to first index and high to last index",
          "img": ""
        },
        {
          "step": "<strong>Find Middle:</strong> Calculate middle index of current range",
          "img": ""
        },
        {
          "step": "<strong>Check Middle Value:</strong> If target equals middle value, return index",
          "img": ""
        },
        {
          "step": "<strong>Adjust Range:</strong> If target less than middle value, search left half; otherwise search right half",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until target found or range becomes empty",
          "img": ""
        }
      ],
      "Pseudocode": `BinarySearch(A, target)
    low ← 0
    high ← length(A) − 1
    while low ≤ high do
        mid ← ⌊(low + high) / 2⌋
        if A[mid] = target then
            return mid
        else if A[mid] < target then
            low ← mid + 1
        else
            high ← mid − 1
    return −1
`,
      "applications": [
        "<strong>Sorted Data:</strong> Efficient for large sorted datasets",
        "<strong>Search Operations:</strong> Common in databases and libraries",
        "<strong>Indexing:</strong> Used in search engines and dictionary lookups"
      ],
      "advantages": [
        "Very efficient for large sorted datasets (O(log n) time)",
        "Simple and easy to implement",
        "In-place and low memory usage"
      ],
      "disadvantages": [
        "Requires sorted data",
        "Not suitable for linked lists",
        "Not stable",
        "More complex than linear search for small arrays"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Binary_search_algorithm"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Searches/BinarySearch.js"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/searching"
        }
      ]
    }
  },
  "hash-search": {
    "name": "Hash Search",
    "description": "Hash Search uses a hash table to store key-value pairs, allowing for efficient retrieval of values based on their keys.",
    "steps": [
      "Create a hash table with a fixed size.",
      "For each key-value pair, compute the hash of the key to determine its index in the table.",
      "Store the value at the computed index.",
      "To search for a value, compute the hash of the key and retrieve the value from the corresponding index."
    ],
    "complexity": {
      "time": {
        "best": "O(1)",
        "average": "O(1)",
        "worst": "O(n)"
      },
      "space": "O(n)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Hash Search leverages hash tables for fast data retrieval using key-value pairs.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=8"
      },
      "complexity": {
        "time": {
          "best": "O(1)",
          "average": "O(1)",
          "worst": "O(n)"
        },
        "space": "O(n)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Hash Function:</strong> Compute hash code for the key.",
          "img": ""
        },
        {
          "step": "<strong>Indexing:</strong> Use hash code to determine storage index.",
          "img": ""
        },
        {
          "step": "<strong>Collision Handling:</strong> Resolve collisions using chaining or open addressing.",
          "img": ""
        },
        {
          "step": "<strong>Retrieve:</strong> Use hash function to quickly access value by key.",
          "img": ""
        }
      ],
      "Pseudocode": `HashTable(size)
    table ← array of size, each entry a bucket (list)

    hash(key)
        h ← 0
        for each character c in key do
            h ← (h × 31 + code(c)) mod size
        return h

    set(key, value)
        idx ← hash(key)
        // chaining: replace if key exists, else append
        for each (k, v) in table[idx] do
            if k = key then
                v ← value
                return
        append (key, value) to table[idx]

    get(key)
        idx ← hash(key)
        for each (k, v) in table[idx] do
            if k = key then
                return v
        return null
`,
      "applications": [
        "<strong>Database Indexing:</strong> Used in hash-based indexes.",
        "<strong>Symbol Tables:</strong> Compilers and interpreters.",
        "<strong>Caching:</strong> Fast lookup in caches."
      ],
      "advantages": [
        "Very fast average-case lookup",
        "Simple implementation",
        "Efficient for large datasets"
      ],
      "disadvantages": [
        "Worst-case O(n) if many collisions",
        "Requires good hash function",
        "Not suitable for ordered data"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Hash_table"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/hashing-data-structure/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/hashtable"
        }
      ]
    }
  },
  "bfs": {
    "name": "Breadth-First Search (BFS)",
    "description": "BFS explores all the vertices of a graph layer by layer, starting from a given source vertex.",
    "steps": [
      "Initialize a queue and enqueue the source vertex.",
      "Mark the source vertex as visited.",
      "While the queue is not empty:",
      " Dequeue a vertex from the front of the queue.",
      " For each unvisited neighbor of the dequeued vertex:",
      " Mark it as visited and enqueue it."
    ],
    "complexity": {
      "time": {
        "best": "O(V + E)",
        "average": "O(V + E)",
        "worst": "O(V + E)"
      },
      "space": "O(V)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores vertices in layers.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=10"
      },
      "complexity": {
        "time": {
          "best": "O(V + E)",
          "average": "O(V + E)",
          "worst": "O(V + E)"
        },
        "space": "O(V)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Enqueue Source:</strong> Start with the source node in the queue.",
          "img": ""
        },
        {
          "step": "<strong>Visit Neighbors:</strong> Visit all neighbors of the current node.",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until all reachable nodes are visited.",
          "img": ""
        }
      ],
      "Pseudocode": `BFS(G, s)
    visited ← empty set
    Q ← empty queue
    enqueue(Q, s)
    add s to visited

    while Q is not empty do
        u ← dequeue(Q)
        for each v in neighbors(G, u) do
            if v ∉ visited then
                add v to visited
                enqueue(Q, v)
`,
      "applications": [
        "<strong>Shortest Path:</strong> Finding shortest path in unweighted graphs.",
        "<strong>Web Crawlers:</strong> Used in web crawling algorithms.",
        "<strong>Social Networks:</strong> Finding people within a given distance."
      ],
      "advantages": [
        "Finds shortest path in unweighted graphs",
        "Simple to implement",
        "Can be used for level-order traversal"
      ],
      "disadvantages": [
        "Requires more memory than DFS",
        "Not suitable for very large graphs"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Breadth-first_search"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/dfsbfs"
        }
      ]
    }
  },
  "dfs": {
    "name": "Depth-First Search (DFS)",
    "description": "DFS explores as far as possible along each branch before backtracking, using a stack or recursion.",
    "steps": [
      "Initialize a stack and push the source vertex onto it.",
      "Mark the source vertex as visited.",
      "While the stack is not empty:",
      " Pop a vertex from the top of the stack.",
      " For each unvisited neighbor of the popped vertex:",
      " Mark it as visited and push it onto the stack."
    ],
    "complexity": {
      "time": {
        "best": "O(V + E)",
        "average": "O(V + E)",
        "worst": "O(V + E)"
      },
      "space": "O(V)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Depth First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores as far as possible along each branch before backtracking.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=11"
      },
      "complexity": {
        "time": {
          "best": "O(V + E)",
          "average": "O(V + E)",
          "worst": "O(V + E)"
        },
        "space": "O(V)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Start at Source:</strong> Begin at selected node",
          "img": ""
        },
        {
          "step": "<strong>Visit Node:</strong> Mark node as visited",
          "img": ""
        },
        {
          "step": "<strong>Explore Neighbors:</strong> Recursively visit unvisited neighbors",
          "img": ""
        },
        {
          "step": "<strong>Backtrack:</strong> Return to previous node when no unvisited neighbors remain",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until all reachable nodes are visited",
          "img": ""
        }
      ],
      "Pseudocode": `DFS(G, u, visited)
    if visited is null then
        visited ← empty set

    add u to visited
    for each v in neighbors(G, u) do
        if v ∉ visited then
            DFS(G, v, visited)
`,
      "applications": [
        "<strong>Path Finding:</strong> Used to find paths in a graph",
        "<strong>Cycle Detection:</strong> Detects cycles in graphs",
        "<strong>Topological Sorting:</strong> In directed acyclic graphs",
        "<strong>Solving Puzzles:</strong> Like mazes or Sudoku",
        "<strong>Component Identification:</strong> Finds connected components in graphs"
      ],
      "advantages": [
        "Memory efficient for deep trees",
        "Simple to implement recursively",
        "Can find path to target quickly if in deep branch",
        "Useful for exhaustive searches",
        "Natural for tree/graph problems"
      ],
      "disadvantages": [
        "Can get stuck in infinite loops without visited tracking",
        "May not find shortest path",
        "Stack overflow risk with deep recursion",
        "Not optimal for finding nodes close to root",
        "Can be slower than BFS for shallow solutions"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Depth-first_search"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Graphs/DFS.js"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/dfsbfs"
        }
      ]
    }
  },
  "dijkstra": {
    "name": "Dijkstra's Algorithm",
    "description": "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative weights.",
    "steps": [
      "Initialize a priority queue and add the source vertex with a distance of 0.",
      "Set the distance of all other vertices to infinity.",
      "While the priority queue is not empty:",
      " Dequeue the vertex with the smallest distance.",
      " For each unvisited neighbor of the dequeued vertex:",
      " Calculate the new distance through the current vertex.",
      " If this new distance is smaller, update it and enqueue the neighbor."
    ],
    "complexity": {
      "time": {
        "best": "O(E + V log V)",
        "average": "O(E + V log V)",
        "worst": "O(E + V log V)"
      },
      "space": "O(V)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Dijkstra's Algorithm is a classic algorithm for finding the shortest paths from a source node to all other nodes in a weighted graph.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=12"
      },
      "complexity": {
        "time": {
          "best": "O(E + V log V)",
          "average": "O(E + V log V)",
          "worst": "O(E + V log V)"
        },
        "space": "O(V)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Initialize Distances:</strong> Set all distances to infinity except the source.",
          "img": ""
        },
        {
          "step": "<strong>Priority Queue:</strong> Use a min-priority queue to select the next closest node.",
          "img": ""
        },
        {
          "step": "<strong>Relax Edges:</strong> Update distances for each neighbor if a shorter path is found.",
          "img": ""
        }
      ],
      "Pseudocode": `Dijkstra(G, source)
    for each vertex v in G do
        dist[v] ← ∞
    dist[source] ← 0

    PQ ← min-priority-queue of (distance, vertex)
    insert (0, source) into PQ

    while PQ is not empty do
        (d, u) ← extract-min(PQ)
        if d > dist[u] then
            continue   // outdated entry
        for each edge (u, v, w) outgoing from u do
            if dist[u] + w < dist[v] then
                dist[v] ← dist[u] + w
                insert (dist[v], v) into PQ   // or decrease-key
    return dist
`,
      "applications": [
        "<strong>Network Routing:</strong> Used in routing protocols.",
        "<strong>Map Services:</strong> Shortest path in maps and GPS.",
        "<strong>Resource Allocation:</strong> Project scheduling and resource management."
      ],
      "advantages": [
        "Finds shortest path in weighted graphs with non-negative weights",
        "Efficient with proper data structures",
        "Widely applicable"
      ],
      "disadvantages": [
        "Does not work with negative weights",
        "Can be slow for very large graphs"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-graph-data-structure/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/sssp"
        }
      ]
    }
  },
  "prim": {
    "name": "Prim's Algorithm",
    "description": "Prim's algorithm finds a minimum spanning tree for a connected, weighted graph.",
    "steps": [
      "Initialize a priority queue and add the starting vertex with a distance of 0.",
      "Set the distance of all other vertices to infinity.",
      "While the priority queue is not empty:",
      " Dequeue the vertex with the smallest distance.",
      " For each unvisited neighbor of the dequeued vertex:",
      " If the edge weight is smaller than the current distance, update it and enqueue the neighbor."
    ],
    "complexity": {
      "time": {
        "best": "O(E + V log V)",
        "average": "O(E + V log V)",
        "worst": "O(E + V log V)"
      },
      "space": "O(V)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Prim's Algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=13"
      },
      "complexity": {
        "time": {
          "best": "O(E + V log V)",
          "average": "O(E + V log V)",
          "worst": "O(E + V log V)"
        },
        "space": "O(V)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Start at Any Node:</strong> Begin with any vertex as the starting point.",
          "img": ""
        },
        {
          "step": "<strong>Grow Tree:</strong> Add the smallest edge connecting the tree to a new vertex.",
          "img": ""
        },
        {
          "step": "<strong>Repeat:</strong> Continue until all vertices are included.",
          "img": ""
        }
      ],
      "Pseudocode": `PrimMST(G, start)
    for each vertex v in G do
        key[v] ← ∞
        parent[v] ← NIL
        inMST[v] ← false
    key[start] ← 0

    PQ ← min-priority-queue of (key, vertex)
    insert (0, start) into PQ

    while PQ is not empty do
        (k, u) ← extract-min(PQ)
        if inMST[u] then continue
        inMST[u] ← true
        for each edge (u, v, w) incident to u do
            if ¬inMST[v] and w < key[v] then
                key[v] ← w
                parent[v] ← u
                insert (key[v], v) into PQ

    return { (parent[v], v) for all v with parent[v] ≠ NIL }
`,
      "applications": [
        "<strong>Network Design:</strong> Designing least-cost networks.",
        "<strong>Clustering:</strong> Used in clustering algorithms.",
        "<strong>Approximation Algorithms:</strong> For NP-hard problems."
      ],
      "advantages": [
        "Finds minimum spanning tree efficiently",
        "Works well for dense graphs",
        "Simple greedy approach"
      ],
      "disadvantages": [
        "Not suitable for directed graphs",
        "Requires connected graph"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Prim%27s_algorithm"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/mst"
        }
      ]
    }
  },
  "kruskal": {
    "name": "Kruskal's Algorithm",
    "description": "Kruskal's algorithm finds a minimum spanning tree for a connected, weighted graph by sorting edges and adding them one by one.",
    "steps": [
      "Sort all edges in non-decreasing order of their weights.",
      "Initialize a disjoint-set data structure to keep track of connected components.",
      "For each edge in the sorted list:",
      " If the edge connects two different components, add it to the minimum spanning tree and union the components."
    ],
    "complexity": {
      "time": {
        "best": "O(E log E)",
        "average": "O(E log E)",
        "worst": "O(E log E)"
      },
      "space": "O(V)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Kruskal's Algorithm is a greedy algorithm for finding a minimum spanning tree in a weighted undirected graph.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=14"
      },
      "complexity": {
        "time": {
          "best": "O(E log E)",
          "average": "O(E log E)",
          "worst": "O(E log E)"
        },
        "space": "O(V)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        {
          "step": "<strong>Sort Edges:</strong> Sort all edges by weight.",
          "img": ""
        },
        {
          "step": "<strong>Union-Find:</strong> Use disjoint-set to detect cycles.",
          "img": ""
        },
        {
          "step": "<strong>Add Edges:</strong> Add edges that do not form a cycle.",
          "img": ""
        }
      ],
      "Pseudocode": `KruskalMST(G)
    MST ← ∅
    make-set(v) for each vertex v in G
    E ← edges of G sorted by non-decreasing weight

    for each edge (u, v, w) in E do
        if find(u) ≠ find(v) then
            MST ← MST ∪ {(u, v, w)}
            union(u, v)

    return MST
`,
      "applications": [
        "<strong>Network Design:</strong> Designing least-cost networks.",
        "<strong>Clustering:</strong> Used in clustering algorithms.",
        "<strong>Approximation Algorithms:</strong> For NP-hard problems."
      ],
      "advantages": [
        "Finds minimum spanning tree efficiently",
        "Works well for sparse graphs",
        "Simple greedy approach"
      ],
      "disadvantages": [
        "Not suitable for directed graphs",
        "Requires sorting all edges"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Kruskal%27s_algorithm"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/mst"
        }
      ]
    }
  },
  "binary-tree-traversal": {
    "name": "Tree Traversal",
    "description": "Tree traversal algorithms visit all nodes in a tree in a specific order.",
    "steps": [
      "Pre-order Traversal: Visit the root, then recursively visit the left subtree, followed by the right subtree.",
      "In-order Traversal: Recursively visit the left subtree, visit the root, then recursively visit the right subtree.",
      "Post-order Traversal: Recursively visit the left subtree, then the right subtree, and finally visit the root."
    ],
    "complexity": {
      "time": {
        "best": "O(n)",
        "average": "O(n)",
        "worst": "O(n)"
      },
      "space": "O(h)",
      "stable": false,
      "inPlace": false
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Tree traversal algorithms systematically visit all nodes in a tree data structure.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=15"
      },
      "complexity": {
        "time": {
          "best": "O(n)",
          "average": "O(n)",
          "worst": "O(n)"
        },
        "space": "O(h)",
        "stable": false,
        "inPlace": false
      },
      "working": [
        "<strong>Pre-order:</strong> Root -> Left -> Right",
        "<strong>In-order:</strong> Left -> Root -> Right",
        {
          "step": "<strong>Post-order:</strong> Left -> Right -> Root",
          "img": ""
        }
      ],
      "Pseudocode": `Preorder(node)
    if node = null then return
    visit(node)
    Preorder(node.left)
    Preorder(node.right)

Inorder(node)
    if node = null then return
    Inorder(node.left)
    visit(node)
    Inorder(node.right)

Postorder(node)
    if node = null then return
    Postorder(node.left)
    Postorder(node.right)
    visit(node)
`,
      "applications": [
        "<strong>Expression Trees:</strong> Evaluating and printing expressions.",
        "<strong>File Systems:</strong> Traversing directory structures.",
        "<strong>Binary Search Trees:</strong> In-order traversal for sorted order."
      ],
      "advantages": [
        "Systematic node visiting",
        "Simple recursive implementation",
        "Useful for many tree-based problems"
      ],
      "disadvantages": [
        "Can use stack space proportional to tree height",
        "Not suitable for cyclic graphs"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Tree_traversal"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/bst"
        }
      ]
    }
  },
  "BST": {
    "name": "Binary Search Tree (BST)",
    "description": "A BST is a binary tree where each node has at most two children, and for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.",
    "operations": {
      "insertion": [
        "Start at the root.",
        "If the value is less than the current node's value, go to the left child; if greater, go to the right child.",
        "Repeat until you find an empty spot and insert the new value there."
      ],
      "search": [
        "Start at the root.",
        "If the value matches the current node's value, return it.",
        "If the value is less, search in the left subtree; if greater, search in the right subtree.",
        "If no node is found, the value is not in the tree."
      ],
      "deletion": [
        "Find the node to delete.",
        "If the node has no children, remove it directly.",
        "If the node has one child, replace it with that child.",
        "If the node has two children, find the in-order successor or predecessor.",
        "Replace the node's value with the successor/predecessor's value, then delete that successor/predecessor node."
      ]
    },
    "complexity": {
      "time": {
        "best": "O(log n)",
        "average": "O(log n)",
        "worst": "O(n)"
      },
      "space": "O(n)",
      "stable": false,
      "inPlace": true
    },
    "notes": {
      "heading": "Overview",
      "subHeading": "Binary Search Tree (BST) is a hierarchical data structure that maintains sorted data and allows for efficient insertion, deletion, and search operations.",
      "images": {
        "algorithm": "https://picsum.photos/500/250?random=16"
      },
      "complexity": {
        "time": {
          "best": "O(log n)",
          "average": "O(log n)",
          "worst": "O(n)"
        },
        "space": "O(n)",
        "stable": false,
        "inPlace": true
      },
      "working": [
        "<strong>Binary Property:</strong> Left subtree contains values less than node, right subtree contains values greater",
        "<strong>Recursive Structure:</strong> Each subtree is also a valid BST",
        "<strong>Search Path:</strong> At each node, decide to go left or right based on comparison",
        "<strong>Dynamic Structure:</strong> Tree shape depends on insertion order",
        "<strong>Balancing:</strong> Unbalanced trees can degrade to linked list performance"
      ],
      "Pseudocode": `structure Node
          value
          left
          right

      Insert(root, value)
          if root = null then
              return new Node(value)
          if value < root.value then
              root.left ← Insert(root.left, value)
          else
              root.right ← Insert(root.right, value)
          return root

      Search(root, value)
          while root ≠ null do
              if value = root.value then
                  return true
              else if value < root.value then
                  root ← root.left
              else
                  root ← root.right
          return false

      Delete(root, value)
          if root = null then return null
          if value < root.value then
              root.left ← Delete(root.left, value)
          else if value > root.value then
              root.right ← Delete(root.right, value)
          else
              // node with 0 or 1 child
              if root.left = null then return root.right
              if root.right = null then return root.left
              // node with 2 children
              succ ← MinNode(root.right)
              root.value ← succ.value
              root.right ← Delete(root.right, succ.value)
          return root

      MinNode(node)
          while node.left ≠ null do
              node ← node.left
          return node
      `,
      "applications": [
        "<strong>Database Indexing:</strong> B-trees and B+ trees are variants used in databases",
        "<strong>File Systems:</strong> Directory structures and file organization",
        "<strong>Expression Parsing:</strong> Abstract syntax trees in compilers",
        "<strong>Priority Queues:</strong> When combined with heap properties",
        "<strong>Autocomplete:</strong> Prefix trees (tries) for text suggestions"
      ],
      "advantages": [
        "Efficient search, insertion, and deletion (O(log n) average)",
        "Maintains sorted order of elements",
        "In-order traversal gives sorted sequence",
        "No need for pre-sorting data",
        "Dynamic size - grows and shrinks as needed"
      ],
      "disadvantages": [
        "Can become unbalanced (worst case O(n))",
        "No constant time operations",
        "Requires extra memory for pointers",
        "Not cache-friendly due to pointer chasing",
        "Performance depends on insertion order"
      ],
      "links": [
        {
          "name": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Binary_search_tree"
        },
        {
          "name": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/binary-search-tree-data-structure/"
        },
        {
          "name": "Interactive Visualization",
          "url": "https://visualgo.net/en/bst"
        },
        {
          "name": "github code",
          "url": "https://github.com/TheAlgorithms/JavaScript/blob/master/Data-Structures/Tree/BinarySearchTree.js"
        }
      ]
    }
  }
};


let keys = [
  'bubble-sort',
  'insertion-sort',
  'selection-sort',
  'merge-sort',
  'quick-sort',
  'heap-sort',
  'linear-search',
  'binary-search',
  'hash-search',
  'bfs',
  'dfs',
  'dijkstra',
  'prim',
  'kruskal',
  'binary-tree-traversal',
  'BST'
]

export default algoData