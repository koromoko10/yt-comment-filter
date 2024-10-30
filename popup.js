// 削除されたコメント数を取得して表示
chrome.storage.local.get("deleteCount", (data) => {
    document.getElementById("deleteCount").textContent = data.deleteCount || 0;
  });
  