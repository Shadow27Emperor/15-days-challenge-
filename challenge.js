// Configuration
const CHALLENGE_CODE = "Elvare50";

window.onload = function() {
    // 1. Check if user already has a saved name
    const savedName = localStorage.getItem('player_name');
    if (savedName) {
        showDigitForm(savedName);
    }
    
    // 2. Run the timer/date check
    checkTimeAccess();
};

function saveName() {
    const nameInput = document.getElementById('user-name');
    const name = nameInput.value.trim();
    
    if (name !== "") {
        localStorage.setItem('player_name', name);
        showDigitForm(name);
        // Simple visual feedback for the scroll list
        addNameToScroll(name);
    } else {
        alert("Please enter your name first!");
    }
}

function showDigitForm(name) {
    document.getElementById('name-input-group').style.display = 'none';
    document.getElementById('digit-input-group').style.display = 'block';
    document.getElementById('display-name').innerText = name;
}

function checkTimeAccess() {
    const now = new Date();
    const day = now.getDate();
    const status = document.getElementById('status-message');
    const controls = document.getElementById('input-controls');

    // Alternative Day Logic: Open on EVEN dates, Closed on ODD dates
    // This resets at 12:00 AM automatically
    if (day % 2 === 0) {
        status.innerText = "● Challenge Status: OPEN";
        status.style.color = "#28a745";
        controls.style.display = "block";
    } else {
        status.innerText = "● Challenge Status: CLOSED (Next digit at 12 AM)";
        status.style.color = "#dc3545";
        controls.style.display = "none";
    }
}

function submitDigit() {
    const digit = document.getElementById('digit-entry').value;
    const name = localStorage.getItem('player_name');

    if (digit.length === 1) {
        console.log(`User: ${name} | Code: ${CHALLENGE_CODE} | Digit: ${digit}`);
        alert(`Success! Digit ${digit} recorded for ${CHALLENGE_CODE}. Write it down!`);
        document.getElementById('digit-entry').value = ''; // Clear input
    } else {
        alert("Please enter only 1 digit.");
    }
}

function addNameToScroll(name) {
    const list = document.getElementById('name-list');
    const newEntry = document.createElement('span');
    newEntry.textContent = `> ${name} just joined the challenge!`;
    newEntry.style.display = "block";
    list.prepend(newEntry);
}
