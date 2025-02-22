let timerInProgress = false; // Track whether a timer is running
let cancelTimer = false;
const musicElement = document.getElementById("background-music");

document.getElementById("volume-slider").addEventListener("input", function () {
    const audio = document.getElementById("background-music");
    if (audio) {
        audio.volume = this.value;
    }
});

function startTimer(duration, mode) {
    return new Promise((resolve) => {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        const totalWidth = 100;
        const frameRate = 60;
        const intervalTime = 1000 / frameRate;

        const updateText = () => {
            const remainingSeconds = Math.ceil((endTime - Date.now()) / 1000);
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            progressText.textContent = `${mode} ${formattedTime}`;
        };

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min((elapsedTime / (duration * 1000)) * totalWidth, totalWidth);

            if (cancelTimer) {
                clearInterval(interval); // Stop the timer if canceled
                resolve();
                progressText.textContent = "Cancelled Timer"
                return;

            }

            progressBar.style.width = `${progress}%`;
            updateText();

            if (currentTime >= endTime) {
                clearInterval(interval);
                progressBar.style.width = '100%';
                resolve(); // Notify that the timer is complete
            }
        }, intervalTime);

        // Initial text update
        updateText();
    });
}

function playMusic() {
    const audio = document.getElementById("background-music");
    const volumeSlider = document.getElementById("volume-slider");
    if (!audio) {
        console.error("Audio element not found!");
        return;
    }

    const musicSelection = document.getElementById("music").value;
    let musicSrc = "";

    if (musicSelection === "Lofi") {
        musicSrc = "Lofi.mp3";
    } else if (musicSelection === "Synthwave") {
        musicSrc = "synthwave.mp3";
    } else if (musicSelection === "Rain") {
        musicSrc = "rain.mp3";
    }

    if (musicSrc) {
        audio.src = musicSrc;
        audio.volume = volumeSlider.value; // Set initial volume
        audio.play();
    }
}

function stopMusic() {
    musicElement.pause();
    musicElement.currentTime = 0;  // Reset to start
}

async function start() {
    const startButton = document.querySelector('.start-button');

    const study_time = document.getElementById("study-time").value;
    const break_time = document.getElementById("break-time").value;
    const cycles = document.getElementById("cycles").value;
    const progressBar = document.querySelector('.progress-bar');

    if (timerInProgress) {
        cancelTimer = true; 
        return; 
    }

    timerInProgress = true; 
    cancelTimer = false;
    startButton.textContent = "Cancel";

    playMusic();

    for (let i = 0; i < cycles; i++) {
        console.log(`Cycle ${i + 1}: Study time`);
        await startTimer(study_time * 60, "Studying..."); 
        progressBar.style.width = '0%';

        console.log(`Cycle ${i + 1}: Break time`);
        await startTimer(break_time * 60, "Break..."); 
        progressBar.style.width = '0%';
    }

    console.log("All cycles complete!");
    if(!cancelTimer){
        document.querySelector('.progress-text').textContent = "Session Complete!";
    }

    stopMusic();

    timerInProgress = false; // Reset the timer state
    cancelTimer = false; // Reset cancel state
    startButton.textContent = "Start";
}
