class AlgorithmVisualizer {
    constructor() {
        this.canvas = document.getElementById('visualizationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isPlaying = false;
        this.isPaused = false;
        this.animationSpeed = 5;
        this.scale = 1;
        this.currentAlgorithm = null;
        this.array = [];
        this.arraySize = 50;
        
        this.initializeEventListeners();
        this.initializeCanvas();
        this.generateRandomArray();
    }

    initializeEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('navToggle');
        const sidebar = document.getElementById('sidebar');
        
        navToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Algorithm selection
        const algorithmButtons = document.querySelectorAll('.algorithm-btn');
        algorithmButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAlgorithm(e.target.dataset.algorithm, e.target.textContent);
                
                // Update active state
                algorithmButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Controls
        this.initializeControls();
        
        // Responsive canvas
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    initializeControls() {
        // Controls panel toggle
        const controlsToggle = document.getElementById('controlsToggle');
        const controlsContent = document.getElementById('controlsContent');
        
        controlsToggle.addEventListener('click', () => {
            controlsContent.classList.toggle('collapsed');
            controlsToggle.textContent = controlsContent.classList.contains('collapsed') ? '+' : '−';
        });

        // Speed control
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        
        speedSlider.addEventListener('input', (e) => {
            this.animationSpeed = parseInt(e.target.value);
            speedValue.textContent = `${this.animationSpeed}x`;
        });

        // Scale control
        const scaleSlider = document.getElementById('scaleSlider');
        const scaleValue = document.getElementById('scaleValue');
        
        scaleSlider.addEventListener('input', (e) => {
            this.scale = parseInt(e.target.value) / 100;
            scaleValue.textContent = `${e.target.value}%`;
            this.resizeCanvas();
        });

        // Array size control
        const arraySizeSlider = document.getElementById('arraySizeSlider');
        const arraySizeValue = document.getElementById('arraySizeValue');
        
        arraySizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            arraySizeValue.textContent = this.arraySize;
            this.generateRandomArray();
        });

        // Control buttons
        document.getElementById('playBtn').addEventListener('click', () => this.play());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('stepBtn').addEventListener('click', () => this.step());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateRandomArray());
    }

    initializeCanvas() {
        this.resizeCanvas();
        this.drawWelcomeScreen();
    }

    resizeCanvas() {
        console.log("resize canvas")
        const container = this.canvas.parentElement;
        console.log(container);
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = (rect.width - 64) * this.scale; // Account for padding
        this.canvas.height = 400 * this.scale;
        
        this.canvas.style.width = `${this.canvas.width / this.scale}px`;
        this.canvas.style.height = `${this.canvas.height / this.scale}px`;
        
        if (this.currentAlgorithm) {
            this.drawArray();
        } else {
            this.drawWelcomeScreen();
        }
    }

    drawWelcomeScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#667eea';
        this.ctx.font = `${24 * this.scale}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'Select an Algorithm to Begin',
            this.canvas.width / 2,
            this.canvas.height / 2
        );
        
        this.ctx.font = `${16 * this.scale}px Arial`;
        this.ctx.fillStyle = '#888';
        this.ctx.fillText(
            'Choose from the sidebar to start visualization',
            this.canvas.width / 2,
            this.canvas.height / 2 + 40 * this.scale
        );
    }

    generateRandomArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push({
                value: Math.floor(Math.random() * 300) + 10,
                color: '#667eea',
                isComparing: false,
                isSorted: false
            });
        }
        
        if (this.currentAlgorithm) {
            this.drawArray();
        }
    }

    selectAlgorithm(algorithm, name) {
        this.currentAlgorithm = algorithm;
        document.getElementById('algorithmTitle').textContent = name;
        document.getElementById('algorithmInfo').textContent = this.getAlgorithmInfo(algorithm);
        
        this.reset();
        this.drawArray();
    }

    getAlgorithmInfo(algorithm) {
        const info = {
            'bubble-sort': 'Time Complexity: O(n²) | Space Complexity: O(1) | Stable: Yes',
            'quick-sort': 'Time Complexity: O(n log n) avg, O(n²) worst | Space Complexity: O(log n) | Stable: No',
            'merge-sort': 'Time Complexity: O(n log n) | Space Complexity: O(n) | Stable: Yes',
            'heap-sort': 'Time Complexity: O(n log n) | Space Complexity: O(1) | Stable: No',
            'insertion-sort': 'Time Complexity: O(n²) | Space Complexity: O(1) | Stable: Yes',
            'linear-search': 'Time Complexity: O(n) | Space Complexity: O(1)',
            'binary-search': 'Time Complexity: O(log n) | Space Complexity: O(1)',
            'dfs': 'Time Complexity: O(V + E) | Space Complexity: O(V)',
            'bfs': 'Time Complexity: O(V + E) | Space Complexity: O(V)',
            'dijkstra': 'Time Complexity: O((V + E) log V) | Space Complexity: O(V)',
            'astar': 'Time Complexity: O(b^d) | Space Complexity: O(b^d)',
            'kruskal': 'Time Complexity: O(E log E) | Space Complexity: O(V)',
            'prim': 'Time Complexity: O(E log V) | Space Complexity: O(V)',
            'binary-tree': 'Time Complexity: O(n) | Space Complexity: O(h)',
            'avl-tree': 'Time Complexity: O(log n) | Space Complexity: O(n)',
            'red-black': 'Time Complexity: O(log n) | Space Complexity: O(n)'
        };
        
        return info[algorithm] || 'Algorithm information not available';
    }

    drawArray() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.array.length === 0) return;
        
        const barWidth = (this.canvas.width - 40 * this.scale) / this.array.length;
        const maxHeight = this.canvas.height - 60 * this.scale;
        const maxValue = Math.max(...this.array.map(item => item.value));
        
        this.array.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * maxHeight;
            const x = 20 * this.scale + index * barWidth;
            const y = this.canvas.height - 30 * this.scale - barHeight;
            
            // Set color based on state
            if (item.isSorted) {
                this.ctx.fillStyle = '#4CAF50';
            } else if (item.isComparing) {
                this.ctx.fillStyle = '#FF5722';
            } else {
                this.ctx.fillStyle = item.color;
            }
            
            this.ctx.fillRect(x, y, barWidth - 2 * this.scale, barHeight);
            
            // Draw value on top of bar if there's space
            if (barWidth > 20 * this.scale) {
                this.ctx.fillStyle = '#333';
                this.ctx.font = `${10 * this.scale}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    item.value,
                    x + barWidth / 2,
                    y - 5 * this.scale
                );
            }
        });
    }

    play() {
        if (!this.currentAlgorithm) {
            alert('Please select an algorithm first!');
            return;
        }
        
        this.isPlaying = true;
        this.isPaused = false;
        
        // Update button states
        document.getElementById('playBtn').style.opacity = '0.5';
        document.getElementById('pauseBtn').style.opacity = '1';
        
        this.runAlgorithm();
    }

    pause() {
        this.isPaused = true;
        this.isPlaying = false;
        
        // Update button states
        document.getElementById('playBtn').style.opacity = '1';
        document.getElementById('pauseBtn').style.opacity = '0.5';
    }

    reset() {
        this.isPlaying = false;
        this.isPaused = false;
        
        // Reset button states
        document.getElementById('playBtn').style.opacity = '1';
        document.getElementById('pauseBtn').style.opacity = '0.5';
        
        // Reset array colors
        this.array.forEach(item => {
            item.color = '#667eea';
            item.isComparing = false;
            item.isSorted = false;
        });
        
        this.drawArray();
    }

    step() {
        if (!this.currentAlgorithm) {
            alert('Please select an algorithm first!');
            return;
        }
        
        // Implement step-by-step execution
        console.log('Step function - to be implemented for each algorithm');
    }

    async runAlgorithm() {
        if (!this.currentAlgorithm) return;
        
        switch (this.currentAlgorithm) {
            case 'bubble-sort':
                await this.bubbleSort();
                break;
            case 'quick-sort':
                await this.quickSort(0, this.array.length - 1);
                break;
            case 'merge-sort':
                await this.mergeSort(0, this.array.length - 1);
                break;
            default:
                console.log(`Algorithm ${this.currentAlgorithm} not implemented yet`);
                this.showDemoAnimation();
        }
    }

    async bubbleSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (!this.isPlaying) break;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (!this.isPlaying) break;
                
                // Highlight comparing elements
                this.array[j].isComparing = true;
                this.array[j + 1].isComparing = true;
                this.drawArray();
                
                await this.sleep(1000 / this.animationSpeed);
                
                if (this.array[j].value > this.array[j + 1].value) {
                    // Swap elements
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.drawArray();
                    await this.sleep(1000 / this.animationSpeed);
                }
                
                // Remove highlighting
                this.array[j].isComparing = false;
                this.array[j + 1].isComparing = false;
            }
            
            // Mark as sorted
            this.array[n - 1 - i].isSorted = true;
        }
        
        // Mark first element as sorted
        if (this.array.length > 0) {
            this.array[0].isSorted = true;
        }
        
        this.drawArray();
        this.isPlaying = false;
    }

    async quickSort(low, high) {
        if (low < high && this.isPlaying) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high].value;
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (!this.isPlaying) break;
            
            this.array[j].isComparing = true;
            this.array[high].isComparing = true;
            this.drawArray();
            await this.sleep(1000 / this.animationSpeed);
            
            if (this.array[j].value < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.drawArray();
                await this.sleep(1000 / this.animationSpeed);
            }
            
            this.array[j].isComparing = false;
            this.array[high].isComparing = false;
        }
        
        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.drawArray();
        await this.sleep(1000 / this.animationSpeed);
        
        return i + 1;
    }

    async mergeSort(left, right) {
        if (left < right && this.isPlaying) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArr = this.array.slice(left, mid + 1);
        const rightArr = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length && this.isPlaying) {
            this.array[k].isComparing = true;
            this.drawArray();
            await this.sleep(1000 / this.animationSpeed);
            
            if (leftArr[i].value <= rightArr[j].value) {
                this.array[k] = { ...leftArr[i] };
                i++;
            } else {
                this.array[k] = { ...rightArr[j] };
                j++;
            }
            
            this.array[k].isComparing = false;
            k++;
            this.drawArray();
            await this.sleep(1000 / this.animationSpeed);
        }
        
        while (i < leftArr.length && this.isPlaying) {
            this.array[k] = { ...leftArr[i] };
            i++;
            k++;
            this.drawArray();
            await this.sleep(1000 / this.animationSpeed);
        }
        
        while (j < rightArr.length && this.isPlaying) {
            this.array[k] = { ...rightArr[j] };
            j++;
            k++;
            this.drawArray();
            await this.sleep(1000 / this.animationSpeed);
        }
    }

    showDemoAnimation() {
        // Simple demo animation for unimplemented algorithms
        let index = 0;
        const animate = () => {
            if (!this.isPlaying || index >= this.array.length) {
                this.isPlaying = false;
                return;
            }
            
            // Reset previous
            if (index > 0) {
                this.array[index - 1].isComparing = false;
            }
            
            // Highlight current
            this.array[index].isComparing = true;
            this.drawArray();
            
            index++;
            setTimeout(animate, 1000 / this.animationSpeed);
        };
        
        animate();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AlgorithmVisualizer();
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const navToggle = document.getElementById('navToggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !navToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});