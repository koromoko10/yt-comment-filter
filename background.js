let deleteCount = 0;

function resetCount() {
  deleteCount = 0;
  chrome.storage.local.set({ deleteCount });
  updateBadge();
}

function updateBadge() {
  chrome.action.setBadgeText({ text: deleteCount ? deleteCount.toString() : '' });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "incrementCount") {
    deleteCount += 1;
    chrome.storage.local.set({ deleteCount });
    updateBadge();
  } else if (message.action === "resetCount") {
    resetCount();
  }
});