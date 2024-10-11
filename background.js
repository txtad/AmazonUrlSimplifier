chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("amazon.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: simplifyAmazonLink
    });
  }
});

function simplifyAmazonLink() {
  let url = window.location.href;
  let match = url.match(/\/dp\/([A-Z0-9]{10})/);
  if (match) {
    let simplifiedUrl = `https://amazon.com/dp/${match[1]}/`;
    window.location.href = simplifiedUrl;
  }
}