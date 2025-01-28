function startTimer(duration) {
    const progressBar = document.querySelector('.progress-bar');
    const startTime = Date.now(); // Record the starting time
    const endTime = startTime + duration * 1000; // Calculate the end time
    const totalWidth = 100; // Full width of the progress bar (percentage)
    const frameRate = 60; // Updates per second
    const intervalTime = 1000 / frameRate; // Time per frame in milliseconds

    const interval = setInterval(() => {
        const currentTime = Date.now(); // Get the current time
        const elapsedTime = currentTime - startTime; // Calculate elapsed time
        const progress = Math.min((elapsedTime / (duration * 1000)) * totalWidth, totalWidth); // Calculate progress

        progressBar.style.width = `${progress}%`; // Update the width of the progress bar

        if (currentTime >= endTime) {
            clearInterval(interval); // Stop the timer
            progressBar.style.width = '100%'; // Ensure the bar is completely filled
            alert('Time is up!');
        }
    }, intervalTime);
}

// Example usage: Start a 25-minute timer
startTimer(60);

