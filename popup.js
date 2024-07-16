console.log("AdBlocker Blocker Buster is running");

function getCurrentUrl() {}

function manual() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const url = activeTab.url;
    console.log("invoked manually...", url);
  });
}

function report() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const url = activeTab.url;
    console.log("reporting...", url);
  });
}

document.getElementById("manual").addEventListener("click", manual);
document.getElementById("report").addEventListener("click", report);
