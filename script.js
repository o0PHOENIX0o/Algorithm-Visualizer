const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

// const canvas = document.getElementById('visualizationCanvas');
// const ctx = canvas.getContext('2d');
// resizeCanvas();
// window.addEventListener('resize', () => resizeCanvas());

navToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

const algorithmButtons = document.querySelectorAll('.algorithm-btn');
algorithmButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        algorithmButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});

const controlsToggle = document.getElementById('controlsToggle');
const controlsPanel = document.getElementById('controlsPanel');

controlsToggle.addEventListener('click', () => {
    controlsPanel.classList.toggle('active');
    controlsToggle.innerHTML = controlsPanel.classList.contains('active') ? `<ion-icon name="chevron-forward-outline"></ion-icon>` : `<ion-icon name="chevron-back-outline"></ion-icon>`;
});

const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

speedSlider.addEventListener('input', (e) => {
    let animationSpeed = parseInt(e.target.value);
    speedValue.textContent = `${animationSpeed}x`;
});

// Control buttons
// document.getElementById('playBtn').addEventListener('click', () => play());
// document.getElementById('pauseBtn').addEventListener('click', () => pause());
// document.getElementById('resetBtn').addEventListener('click', () => reset());
// document.getElementById('stepBtn').addEventListener('click', () => step());
// document.getElementById('generateBtn').addEventListener('click', () => generateRandomArray());


// function resizeCanvas() {
//     console.log("resize canvas")
//     const container = canvas.parentElement;
//     const rect = container.getBoundingClientRect();

//     canvas.width = (rect.width - 64);
//     canvas.style.width = `${canvas.width}px`;
//     drawWelcomeScreen();
// }


// function drawWelcomeScreen() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = '#f0f0f0';
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = '#f0f0f0';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = '#667eea';
//     ctx.textAlign = 'center';
//     ctx.font = "24px Arial";
//     ctx.fillText(
//         'Select an Algorithm to Begin',
//         canvas.width / 2,
//         canvas.height / 2
//     );

//     ctx.fillStyle = '#888';
//     ctx.font = "16px Arial";
//     ctx.fillText(
//         'Choose from the sidebar to start visualization',
//         canvas.width / 2,
//         canvas.height / 2 + 40
//     );
// }


// drawWelcomeScreen();

const generateRandomArray = (size) => {

}
