// document.getElementById('simplifyButton').addEventListener('click', () => {
//   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, {action: "simplifyLink"}, (response) => {
//       if (chrome.runtime.lastError) {
//         console.error(chrome.runtime.lastError.message);
//       } else {
//         console.log("Message sent successfully");
//       }
//     });
//   });
// });

document.getElementById('simplifyButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: simplifyAmazonLink
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log("Script executed successfully", results);
      }
    });
  });
});

function simplifyAmazonLink() {
  let url = window.location.href;
  let match = url.match(/\/dp\/([A-Z0-9]{10})/);
  if (match) {
    let simplifiedUrl = `https://amazon.com/dp/${match[1]}/`;
    window.location.href = simplifiedUrl;
    return "URL simplified";
  } else {
    return "Not an Amazon product page or ASIN not found";
  }
}