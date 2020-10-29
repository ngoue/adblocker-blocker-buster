let removeModalBtn = document.getElementById('remove-modal')
removeModalBtn.onclick = function (event) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'remove-modal.js',
    })
  })
}
