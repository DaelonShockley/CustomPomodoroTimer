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



// Example usage: Start a 25-minute timer
//startTimer(60);

async function start() {
    const study_time = document.getElementById("study-time").value;
    const break_time = document.getElementById("break-time").value;
    const cycles = document.getElementById("cycles").value;
    const progressBar = document.querySelector('.progress-bar');

    for (let i = 0; i < cycles; i++) {
        console.log(`Cycle ${i + 1}: Study time`);
        await startTimer(study_time * 60, "Studying..."); // Pass "Studying..." text
        progressBar.style.width = '0%';

        console.log(`Cycle ${i + 1}: Break time`);
        await startTimer(break_time * 60, "Break..."); // Pass "Break..." text
        progressBar.style.width = '0%';
    }

    console.log("All cycles complete!");
    document.querySelector('.progress-text').textContent = "All cycles complete!";
}
