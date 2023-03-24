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

function getChatContainer() {
  const chatContainer = document.querySelector("main");
  return chatContainer;
}

function getChatMessages(chatContainer) {
  const messages = Array.from(chatContainer.querySelectorAll(".items-start"));
  return messages;
}

function getPrompt(message) {
  if (!message.querySelector("svg")) {
    return message.textContent.trim();
  }
  return null;
}

function getAnswer(message) {
  if (message.querySelector("svg")) {
    return message.textContent.trim();
  }
  return null;
}

function generateImage() {
  const chatContainer = getChatContainer();

  if (!chatContainer) {
    alert(
      "No chat container found. Please make sure you are on the correct website."
    );
    return;
  }

  html2canvas(chatContainer).then((canvas) => {
    const imgData = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "chatgpt-conversation.png";
    link.click();
  });
}

function generateMarkdown() {
  const chatContainer = getChatContainer();

  if (!chatContainer) {
    alert(
      "No chat container found. Please make sure you are on the correct website."
    );
    return;
  }

  const messages = getChatMessages(chatContainer);
  let markdownContent = "";

  messages.forEach((message, index) => {
    const promptText = getPrompt(message);
    const answerText = getAnswer(message);

    if (promptText) {
      markdownContent += `## Prompt\n${promptText}\n\n`;
    }

    if (answerText) {
      markdownContent += `## Answer\n${answerText}\n\n`;
    }
  });

  // Create a download link for the markdown file
  const markdownBlob = new Blob([markdownContent], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(markdownBlob);
  link.download = "chatgpt-conversation.md";
  link.click();
}
