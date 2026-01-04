// Hidden ID for this specific challenge
const SECRET_ID = "Elvare50";

window.onload = function() {
    // Load Name if already saved
    const savedName = localStorage.getItem('player_name');
    if (savedName) {
        showMainForm(savedName);
        renderProgress();
    }
    
    // Check if form should be open or closed
    checkTime();
};

function saveName() {
    const nameInput = document.getElementById('user-name');
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('player_name', name);
        showMainForm(name);
        logActivity(`${name} joined the hunt!`);
    }
}

function showMainForm(name) {
    document.getElementById('name-group').style.display = 'none';
    document.getElementById('digit-group').style.display = 'block';
    document.getElementById('display-name').innerText = name;
}

function checkTime() {
    const now = new Date();
    const day = now.getDate();
    const status = document.getElementById('timer-status');
    const wrap = document.getElementById('input-wrap');

    // Alternative day logic: 
    // Open on EVEN dates, Closed on ODD dates (or vice versa)
    if (day % 2 === 0) {
        status.innerText = "● FORM STATUS: OPEN";
        status.style.color = "#00ff41";
        wrap.style.display = "block";
    } else {
        status.innerText = "● FORM STATUS: CLOSED (Wait for next video)";
        status.style.color = "#ff4141";
        wrap.style.display = "none";
    }
}

function submitChar() {
    const input = document.getElementById('char-input');
    const val = input.value.trim();
    
    if (val.length === 1) {
        let progress = JSON.parse(localStorage.getItem('user_chars') || "[]");
        
        if (progress.length < 8) {
            progress.push(val);
            localStorage.setItem('user_chars', JSON.stringify(progress));
            renderProgress();
            logActivity(`Character "${val}" added to log.`);
            input.value = "";
            alert("Saved! Keep watching for the next character.");
        } else {
            alert("All 8 characters collected! Check Instagram for winner details.");
        }
    } else {
        alert("Please enter a single letter or digit.");
    }
}

function renderProgress() {
    const progress = JSON.parse(localStorage.getItem('user_chars') || "[]");
    const display = document.getElementById('progress-display');
    let str = "";
    for (let i = 0; i < 8; i++) {
        str += (progress[i] ? progress[i] : "_") + " ";
    }
    display.innerText = str;
}

function logActivity(msg) {
    const feed = document.getElementById('activity-feed');
    const entry = document.createElement('div');
    entry.style.marginBottom = "5px";
    entry.innerText = `> ${msg}`;
    feed.prepend(entry);
}
