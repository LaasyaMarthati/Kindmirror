// == sentiment.js ==

function getVisibleText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let text = "";
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const style = window.getComputedStyle(node.parentElement);
    if (style && style.visibility !== "hidden" && style.display !== "none") {
      text += node.textContent + " ";
    }
  }
  return text;
}

// [... truncated for brevity: same as previous message above, full sentiment.js logic included ...]

(function monitorYouTubeShorts() {
  if (location.hostname.includes("youtube.com") && location.href.includes("shorts")) {
    const startTime = Date.now();

    setInterval(() => {
      const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
      if (elapsedMinutes > 15) {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.bottom = '20px';
        popup.style.right = '20px';
        popup.style.padding = '16px';
        popup.style.backgroundColor = '#fffbea';
        popup.style.border = '1px solid #ffd700';
        popup.style.borderRadius = '12px';
        popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        popup.style.fontSize = '16px';
        popup.style.zIndex = '10000';
        popup.innerText = "🛑 You've been watching YouTube Shorts for over 15 minutes.
💡 Quick Action: Take a short break and stretch!";
        document.body.appendChild(popup);
        setTimeout(() => { popup.remove(); }, 10000);
      }
    }, 60000);
  }
})();
