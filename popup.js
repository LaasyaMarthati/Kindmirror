function sendScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => document.body.innerText,
    }, (injectionResults) => {
      if (injectionResults && injectionResults[0]) {
        const text = injectionResults[0].result;
        const score = analyzeSentiment(text);
        const prompt = getMoodPrompt(score);
        document.getElementById('message').innerText = prompt;
      } else {
        document.getElementById('message').innerText = "Couldn't analyze content.";
      }
    });
  });
}

window.onload = sendScript;
