// Function to update the time on the "watch" part of your site
function updateWatchTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // Look for the "about me" header and add the time
    const watchHeader = document.querySelector('.watch-section h3');
    if(watchHeader) {
        watchHeader.innerText = `about me | ${hours}:${minutes}`;
    }
}

// Update time every minute
setInterval(updateWatchTime, 1000);
updateWatchTime();

console.log("Portfolio Script Loaded!");
