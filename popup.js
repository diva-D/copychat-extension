document
  .getElementById("generate-image")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: generateImage,
    });
  });

document
  .getElementById("generate-markdown")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: generateMarkdown,
    });
  });

function generateImage() {
  // Implement image generation logic
}

function generateMarkdown() {
  // Implement markdown generation logic
}
