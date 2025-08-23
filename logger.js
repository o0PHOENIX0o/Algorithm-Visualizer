import algoData from './algoData.js';

// resizable steps container
const resizable = document.querySelector(".toast-container.steps");
const handle = resizable.querySelector("h3");

let startY, startHeight;

handle.addEventListener("mousedown", function (e) {
    e.preventDefault();
    startResize(e.clientY);

    window.addEventListener("mousemove", resizeWithMouse);
    window.addEventListener("mouseup", stopResize);
});

handle.addEventListener("touchstart", function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    startResize(touch.clientY);

    window.addEventListener("touchmove", resizeWithTouch, { passive: false });
    window.addEventListener("touchend", stopResize);
});

function startResize(clientY) {
    startY = clientY;
    startHeight = resizable.offsetHeight;
}

function resizeWithMouse(e) {
    resize(e.clientY);
}

function resizeWithTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    resize(touch.clientY);
}

function resize(clientY) {
    const dy = clientY - startY;
    const newHeight = startHeight - dy;

    if (newHeight > 0) {
        resizable.style.height = newHeight + "px";
    }
}

function stopResize() {
    window.removeEventListener("mousemove", resizeWithMouse);
    window.removeEventListener("mouseup", stopResize);
    window.removeEventListener("touchmove", resizeWithTouch);
    window.removeEventListener("touchend", stopResize);
}

// logger class
export class Logger {
    constructor({ logTimeout = 5000, titleStyles = {}, messageStyles = {} } = {}) {
        this.logs = [];
        this.isPaused = false;
        this.isHidden = false;
        this.logTimeout = logTimeout;

        titleStyles['font-size'] = titleStyles['font-size'] || '1.1rem';
        this.titleStyles = Object.entries(titleStyles)
            .map(([style, val]) => `${style}: ${val}`).join('; ');
        this.messageStyles = (Object.keys(messageStyles).length > 0)
            ? Object.entries(messageStyles).map(([style, val]) => `${style}: ${val}`).join('; ')
            : 'font-size: 0.9rem;';

        // Updated containers
        this.stepToastContainer = document.querySelector('.toast-container.steps #toastList');
        this.eventToastContainer = document.querySelector('.toast-container.event #eventInnerContainer');


        this.maxHeight = 0.4 * window.innerHeight;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitWhilePaused() {
        while (this.isPaused) {
            await this.delay(100);
        }
    }

    show({ message, type = 'info', timer = 0, isEvent = false } = {}) {
        if (!message || typeof message !== 'object') return;
        const { title = '', text = '' } = message;

        let oldLog = this.logs.find(log => log.message.title == title && log.message.text == text);
        if (oldLog && oldLog.type == type && (Date.now() - oldLog.timestamp) < oldLog.timer) {
            // Reset timer if already exists
            if (!oldLog.timeoutID) return;

            clearTimeout(oldLog.timeoutID);

            oldLog.timeoutID = setTimeout(() => {
                this.removeNotification(oldLog.Element);
            }, timer);

            if (oldLog.progressBar) {
                oldLog.progressBar.style.width = "100%";
                oldLog.progressBar.style.animation = "none";
                oldLog.progressBar.offsetHeight; // force reflow
                oldLog.progressBar.style.animation = `progress ${timer}ms linear forwards`;
            }

            oldLog.timestamp = Date.now();
            oldLog.timer = timer;
            return oldLog.Element;
        }

        let container = isEvent ? this.eventToastContainer : this.stepToastContainer;

        if (isEvent) timer = timer > 0 ? timer : 3000; //event are always timed

        const toastWrapper = document.createElement('div');
        toastWrapper.className = `toast-wrapper ${type}`;
        toastWrapper.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toastWrapper.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = ` <span class="toast-title" style="${this.titleStyles}">${title}</span>
                            <span class="toast-message" style="${this.messageStyles}">${text}</span>`;
        toastWrapper.appendChild(toast);

        let progressBar = null;
        if (timer > 0) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            toastWrapper.appendChild(progressBar);
        }

        container.appendChild(toastWrapper);

        setTimeout(() => {
            toastWrapper.classList.add('show-toast');
        }, 100);


        const scrollContainer = (isEvent) ? document.querySelector('#eventToastContainer') : document.querySelector('.toast-container.steps .scrollable-content');
        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }

        let timeoutID = null;
        if (timer > 0) {
            if (progressBar) progressBar.style.animationDuration = `${timer}ms`;
            timeoutID = setTimeout(async () => {
                await this.waitWhilePaused();
                toastWrapper.classList.replace('show-toast', 'hide-toast');
                setTimeout(() => toastWrapper.remove(), 500);
            }, timer);
        }

        this.logs.push({
            type,
            message,
            container,
            timestamp: Date.now(),
            Element: toastWrapper,
            progressBar,
            timer,
            timeoutID
        });

        return toastWrapper;
    }


    hideSteps() {
        this.isHidden = true;
        let toasts = document.querySelectorAll('.toast-container.steps .toast-wrapper');
        toasts.forEach(toast => {
            toast.classList.remove('show-toast');
            toast.classList.add('hide-toast');
        });
    }

    showSteps() {
        this.isHidden = false;
        let toasts = document.querySelectorAll('.toast-container.steps .toast-wrapper');
        toasts.forEach(toast => {
            toast.classList.remove('hide-toast');
            toast.classList.add('show-toast');
        });
    }

    removeNotification(toast) {
        if (!toast) return;
        toast.classList.replace('show-toast', 'hide-toast');
        setTimeout(() => {
            toast.remove();
        }, 200);
    }

    clearLogs() {
        this.isPaused = false;
        this.logs = [];

        let toasts = document.querySelectorAll('.toast-wrapper');
        toasts.forEach(toast => {
            if (toast.querySelector('.progress-bar')) return;
            toast.classList.replace('show-toast', 'hide-toast');
            setTimeout(() => {
                toast.remove();
            }, 200);
        });
    }

    pauseNotifications() {
        this.isPaused = true;
        document.querySelectorAll('.progress-bar').forEach(toast => {
            toast.style.animationPlayState = 'paused';
        });
        console.log("Notifications paused.");
    }

    resumeNotifications() {
        this.isPaused = false;
        document.querySelectorAll('.progress-bar').forEach(toast => {
            toast.style.animationPlayState = 'running';
        });
        console.log("Notifications resumed.");
    }

    getLogs() {
        return this.logs;
    }
}


export class Notes {
    constructor(name) {
        this.name = name;
        this.notes = {}
        this.initialize();
    }

    initialize() {
        this.modal = document.getElementById('modalOverlay');
        this.title = document.getElementById('modalTitle');
        this.body = document.getElementById('modalBody');
        this.closeButton = document.getElementById('closeModal');

        console.log("algo names: ", this.name)
        this.notes = algoData[this.name].notes || {};

        this.closeButton.addEventListener('click', (e) => {
            this.closeNotes();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeNotes();
            }
        });
    }

    showNotes() {
        let {
            heading,
            subHeading,
            images,
            complexity,
            working,
            Pseudocode,
            applications,
            advantages,
            disadvantages,
            links
        } = this.notes;

        this.title.textContent = heading;

        let algoImage = images.algorithm || "";
        let algoImage2 = images.algorithm2 || "";


        let imgCount = Object.keys(images).length;


        let content = `
            <div class="notes-content">
                    <h3>📚 Overview</h3>
                    <p>${subHeading}</p>

                    <img src="${images.algorithm}" alt="${this.name} Visualization" class="algorithm-image" loading="lazy">

                    <h4><strong>Complexity:</strong></h4>
                    <div class="complexity-box">
                        <div>
                            <li><strong>Best Case:</strong>    ${complexity.time.best}</li>
                            <li><strong>average Case:</strong> ${complexity.time.average}</li>
                            <li><strong>worst Case:</strong>   ${complexity.time.worst}</li>
                        </div>

                        <div class="space-complexity">
                            <strong>Space Complexity:</strong> ${complexity.space}
                        </div>

                        <div class="in-place">
                            <strong>In-Place:</strong> ${complexity.inPlace ? 'Yes' : 'No'}
                        </div>

                        <div class="stable">
                            <strong>Stable:</strong> ${complexity.stable ? 'Yes' : 'No'}
                        </div>                        
                    </div>

                    <h3>🔄 How It Works</h3>
                    <div class="steps-list">
                        <ol>
                            ${working.map(({ step, img }) => {
            if (img == undefined || img == null || img == '') {
                return ` <li>
                                                ${step} 
                                            </li>`
            }
            return ` <li>
                                                ${step} 
                                                <img src="${img}" alt="algo-step" class="algorithm-step-image" loading="lazy"> 
                                            </li>`
        }).join('')
            }
                        </ol>
                    </div>

                    <h3>💻 Code Example</h3>
                    <div class="code-example">
                        <pre><code class="language-javascript">${Pseudocode}</code></pre>
                    </div>                

                    <h3>✅ Use Cases & Applications</h3>
                    <div class="use-cases">
                        <ul>
                            ${applications.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>

                    <h3>✅ Advantages</h3>
                    <div class="advantages-section">
                        <ul>
                            ${advantages.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <h3>❌ Disadvantages</h3>
                    <div class="advantages-section">
                        <ul>
                            ${disadvantages.map(app => `<li>${app}</li>`).join('')}
                        </ul>
                    </div>

                    <h3>🔗 Useful Links</h3>
                    <div class="links-section">      
                        ${links.map(link => `
                                <a href="${link.url}" target="_blank" class="link-btn">
                                    ${link.icon || ""} ${link.name}
                                </a>
                            `).join('')
            }
                    </div>
                </div>
        `

        this.body.innerHTML = `<div class="notes-content">${content}</div>`;

        setTimeout(() => {
            this.modal.classList.add('show-modal-overlay');
            document.body.style.overflow = 'hidden';
        }, 500);
    }

    closeNotes() {
        console.log('Closing notes modal');
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('show-modal-overlay');
        document.body.style.overflow = 'auto';
    }
}

// let i = 0;
// setInterval(() => {
//     // const logger2 = new Logger();
//     // logger2.showNotification({
//     //     title: `Logger Initialized ${++i}`,
//     //     text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     // }, 'info');
// }, 1000);


// const logger = new Logger();
// for(let i = 0; i < 5; i++){
//     logger.showNotification({
//         title: `Logger Initialized ${++i}`,
//         text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus aut modi perferendis pariatur odit itaque maxime voluptas sunt dolorem totam hic ab molestias similique, ratione amet earum accusamus minima dolorum, repellendus architecto doloremque necessitatibus voluptatum inventore. Sapiente odit dolores quasi ab natus esse aliquam dicta possimus optio, earum accusantium voluptates unde qui? Sequi illum esse quo harum beatae excepturi maxime consequuntur cupiditate qui, quaerat, libero odio id cum aperiam molestiae adipisci magni. Neque, assumenda! Ab voluptatum illo sapiente unde illum corporis totam possimus tempora necessitatibus facilis facere error quisquam animi, quis, inventore id cupiditate magnam eveniet nostrum. Incidunt, qui accusantium. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
//     }, 'info');
//     await logger.delay(1000);
// }

// setInterval(() => {
//     logger.removeNotification();
// }, 10000);

// let notes = new Notes('bubbleSortExplanation');
// notes.showNotes();