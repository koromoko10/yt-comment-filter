// options.js
const STORAGE_KEY = 'userCommentFilters';

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);

// ストレージからリストを読み込み、テキストエリアに表示
function restoreOptions() {
    chrome.storage.local.get(STORAGE_KEY, (data) => {
        const filtersText = data[STORAGE_KEY] || '';
        document.getElementById('userFilters').value = filtersText;
    });
}

// テキストエリアの内容をストレージに保存
function saveOptions() {
    const filtersText = document.getElementById('userFilters').value;
    
    // 改行区切りのテキストを配列として保存する準備 (今回はシンプルにテキストとして保存)
    chrome.storage.local.set({ [STORAGE_KEY]: filtersText }, () => {
        const status = document.getElementById('status');
        status.textContent = '保存されました！ページを再読み込みすると反映されます。';
        setTimeout(() => {
            status.textContent = '';
        }, 3000);
    });
}