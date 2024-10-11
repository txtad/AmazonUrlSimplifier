console.log("Content script loaded and ready");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "simplifyLink") {
    let url = window.location.href;
    let match = url.match(/\/dp\/([A-Z0-9]{10})/);
    if (match) {
      let simplifiedUrl = `https://amazon.com/dp/${match[1]}/`;
      window.location.href = simplifiedUrl;
    }
  }
});
