var settingsButton = document.getElementById("gear-button");
var settingsModal = document.getElementById("settingsModal");
var closeSettingsSpan = settingsModal.querySelector(".close-settings");

settingsButton.addEventListener("click", function() {
    settingsModal.style.display = "block";
});

closeSettingsSpan.addEventListener("click", function() {
    settingsModal.style.display = "none";
});
