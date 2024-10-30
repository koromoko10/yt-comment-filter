let deleteCount = 0;

// カウントのリセット
function resetCount() {
  deleteCount = 0;
  chrome.storage.local.set({ deleteCount });
  updateBadge();
}

// アイコンにバッジを表示
function updateBadge() {
  chrome.action.setBadgeText({ text: deleteCount ? deleteCount.toString() : '' });
}

// カウントを増やす
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "incrementCount") {
    deleteCount += 1;
    chrome.storage.local.set({ deleteCount });
    updateBadge();
  } else if (message.action === "resetCount") {
    resetCount();
  }
});
