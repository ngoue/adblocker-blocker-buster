const hosts = [
  'www.forbes.com',
  'www.sltrib.com',
  'www.usatoday.com',
]

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    var conditions = hosts.map(function(host) {
      return new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: host },
      })
    })
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: conditions,
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})
