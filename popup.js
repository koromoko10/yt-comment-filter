// 削除されたコメント数を取得して表示
chrome.storage.local.get("deleteCount", (data) => {
    document.getElementById("deleteCount").textContent = data.deleteCount || 0;
});

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    windows.open(chrome.runtime.getURL('options.html'));
  }
});