// The secret key for the challenge
const SECRET_KEY = "Elvare50";

window.onload = function() {
    const savedName = localStorage.getItem('player_name');
    if (savedName) {
        showMainForm(savedName);
        renderProgress();
    }
    checkTime();
};

function saveName() {
    const nameInput = document.getElementById('user-name');
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('player_name', name);
        showMainForm(name);
        // We don't log to the activity feed yet, only when they finish.
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

    // Open on Even days, Closed on Odd days
    if (day % 2 === 0) {
        status.innerText = "● STATUS: OPEN";
        status.style.color = "#00ff41";
        wrap.style.display = "block";
    } else {
        status.innerText = "● STATUS: CLOSED";
        status.style.color = "#ff4141";
        wrap.style.display = "none";
    }
}

function submitChar() {
    const input = document.getElementById('char-input');
    const val = input.value.trim();
    const name = localStorage.getItem('player_name');
    
    if (val.length === 1) {
        let progress = JSON.parse(localStorage.getItem('user_chars') || "[]");
        
        if (progress.length < 8) {
            progress.push(val);
            localStorage.setItem('user_chars', JSON.stringify(progress));
            renderProgress();
            input.value = "";

            // Check if this was the final (8th) character
            if (progress.length === 8) {
                handleCompletion(name, progress.join(''));
            }
        }
    }
}

function handleCompletion(name, fullCode) {
    // Hidden validation
    if (fullCode === SECRET_KEY) {
        logActivity(`${name} successfully completed the challenge!`);
        alert("Challenge Complete! All 8 characters recorded.");
    } else {
        // Even if wrong, we don't tell them it's wrong. 
        // We just log that they finished.
        logActivity(`${name} has submitted all 8 characters.`);
        alert("You have submitted all characters. Stay tuned for results!");
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
