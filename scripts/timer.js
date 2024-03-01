var startButton = document.getElementById("startButton");
var timerDisplay = document.getElementById("timer");
var isRunning = false;
var interval;

var settingsButton = document.getElementById("gear-button");
var settingsModal = document.getElementById("settingsModal");
var workDurationInput = document.getElementById("workDuration");
var breakDurationInput = document.getElementById("breakDuration");
var closeSettingsSpan = settingsModal.querySelector(".close-settings");
var notificationModal = document.getElementById("notificationModal");
var notificationClose = document.querySelector(".notification-close");
var alarmAudio = new Audio('sounds/meow.mp3');

settingsButton.addEventListener("click", function() {
    settingsModal.style.display = "block";
});

closeSettingsSpan.addEventListener("click", function() {
    settingsModal.style.display = "none";
});

startButton.addEventListener("click", function() {
    if (!isRunning) {
        if (isWorkSession) {
            startWorkSession();
        } else {
            startBreakSession();
        }
        startButton.textContent = "Reset";
    } else {
        resetTimer();
        startButton.textContent = isWorkSession ? "Start Work" : "Start Break";
    }
});

notificationClose.addEventListener("click", function() {
    notificationModal.style.display = "none";
    pauseAlarm();
});

function playAlarm() {
    alarmAudio.play();
}

function pauseAlarm() {
    alarmAudio.pause();
}

function startTimer() {
    isRunning = true;
    var workDuration = parseInt(workDurationInput.value) * 60;
    var time = workDuration;
    displayTime(time);

    interval = setInterval(function() {
        time--;
        if (time < 0) {
            clearInterval(interval);
            isRunning = false;
            startButton.textContent = "Start";
            notificationModal.style.display = "block";
            playAlarm();
            return;
        }
        displayTime(time);
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    var workDuration = parseInt(workDurationInput.value) * 60;
    displayTime(workDuration);
}

function displayTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    timerDisplay.textContent = pad(minutes) + ":" + pad(remainingSeconds);
}

function pad(value) {
    return value < 10 ? "0" + value : value;
}

var isWorkSession = true;

function startWorkSession() {
    isRunning = true;
    var workDuration = parseInt(workDurationInput.value) * 60;
    var time = workDuration;
    displayTime(time);

    interval = setInterval(function() {
        time--;
        if (time < 0) {
            clearInterval(interval);
            isRunning = false;
            startButton.textContent = "Start Break";
            notificationModal.style.display = "block";
            playAlarm();
            isWorkSession = false;
            return;
        }
        displayTime(time);
    }, 1000);
}

function startBreakSession() {
    isRunning = true;
    var breakDuration = parseInt(breakDurationInput.value) * 60;
    var time = breakDuration;
    displayTime(time);

    interval = setInterval(function() {
        time--;
        if (time < 0) {
            clearInterval(interval);
            isRunning = false;
            startButton.textContent = "Start Work";
            notificationModal.style.display = "block";
            playAlarm();
            isWorkSession = true;
            return;
        }
        displayTime(time);
    }, 1000);
}

