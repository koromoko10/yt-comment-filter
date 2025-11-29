// フィルター対象のコメントパターン（正規表現）
const commentFilters = [
  /1コメ/i, 
  /いちこめ/i,
  /今見てる/i,
  /いま見てる/i,
  /いまみてる/i,
  /今みてる/i,
  /今見てる人/i, 
  /今見てる人いる/i,
  /見てる人いる/i,
  /みてるひといる/i,
  /見てるひといる/i,
  /みてる人いる/i,
  /見てる/i,
  /みてる/i,
  /みて/i,
  /見て/i,
  /見に/i,
  /みに/i,
  /今いいね/i,
  /いまいいね/i,
  /いいねの数だけ/i, 
  /今でも/i,
  /いまでも/i,
  /今も/i,
  /いまも/i,
  /いま/i,
  /今/i,
  /挙手/i, 
  /今いいねついたら/i,
  /いない/i,
  /流石に/i,
  /さすがに/i,
  /流石にもういいね/i,
  /流石にいいね/i,
  /流石にいない/i,
  /さすがにいない/i,
  /今見てる人いいね/i,
  /今見てるやつ/i,
  /なう/i,
  /さすが/i,
  /流石/i,
  /さすがに/i,
  /流石に/i,
  /年も/i,
  /年でも/i,
  /年に/i,
  /2024/i,
  /いいね/i,
  /良いね/i,
  /見に来る/i,
  /みにくる/i,
  /今見てたら/i,
  /定期的/i,
  /久しぶり/i,
  /ひさしぶり/i,
  /まさか/i,
  /伝説/i,
  /始まり/i,
  /はじまり/i,
  /ここから/i,
  /新しい順/i,
  /秒前/i,
  /罪悪感/i,
  /してしまった/i,
  /で？/i,
  /だから？/i,
  /それってあなたの/i,
  /貴方の感想/i,
  /あなたの感想/i,
  /あなたのかんそう/i,
  /貴方のかんそう/i,
  /jk/i,
  /聞いて/i,
  /きいて/i,
  /もらえる/i,
  /貰える/i,
  /追記/i,
  /固定/i,
  /本物/i,
  /草とかつけとけばいい/i,
  /ふゆかい/i,
  /不愉快/i,
  /絶対に翻訳したら/i,
  /絶対に翻訳/i,
  /翻訳/i,
  /ほんやく/i,
  /呪い/i,
  /思ってもないこと/i
];


// ユーザー定義フィルターを保持する変数
let allFilters = [...commentFilters];

// ユーザー定義リストをストレージから読み込み、フィルタリング処理を開始する
function initializeFiltersAndHideComments() {
    chrome.storage.local.get('userCommentFilters', (data) => {
        const userFiltersText = data.userCommentFilters || '';
        const userFilters = [];

        // ユーザー入力を改行で分割し、正規表現オブジェクトに変換
        // 正規表現メタ文字のエスケープ処理がないため、ユーザーには「通常の文字列として」入力してもらう前提
        // ユーザーが入力する各行を新しいフィルターとして処理
        userFiltersText.split('\n').forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                // シンプルな文字列一致フィルターとして /.../i (大文字小文字無視) の正規表現に変換
                try {
                    // ユーザーが意図的に正規表現を入力する場合に備えて、Stringを正規表現に変換
                    // 注意: ユーザー入力が不正な正規表現の場合、エラーを避けるために try-catch が必要
                    // ここではシンプルに、入力文字列全体にマッチするパターンを生成
                    const escapedLine = trimmedLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    userFilters.push(new RegExp(escapedLine, 'i'));
                } catch (e) {
                    console.error("無効なユーザーフィルターパターン:", trimmedLine, e);
                }
            }
        });

        // デフォルトリストとユーザーリストを結合
        allFilters = [...commentFilters, ...userFilters];
        console.log("全フィルターがロードされました:", allFilters);

        // フィルターリストが揃った後で、コメント非表示関数を実行・監視開始
        hideComments();
        // ページロードやスクロールでのコメント表示時に関数を再実行
        new MutationObserver(hideComments).observe(document, { childList: true, subtree: true });
    });
}

// コメント非表示関数
function hideComments() {
  //全てのコメントを取得
  const comments = document.querySelectorAll("ytd-comment-thread-renderer");
  comments.forEach(comment => {
    //コメントの本文を取得
    const text = comment.querySelector("#content-text").textContent.toLowerCase();

    // コメント内容がフィルタに一致するかチェック
    const shouldHide = allFilters.some(filter => filter.test(text));

    if (shouldHide) {
      comment.style.display = "none";
      // 削除カウントをインクリメント
      chrome.runtime.sendMessage({ action: "incrementCount" });
    }
  });
}

// ページがリロードされた際にカウントをリセット
chrome.runtime.sendMessage({ action: "resetCount" });

// フィルターの初期化と処理開始
initializeFiltersAndHideComments();

// ... 既存の MutationObserver の行は initializeFiltersAndHideComments 内に移動

// ページロードやスクロールでのコメント表示時に関数を再実行
//new MutationObserver(hideComments).observe(document, { childList: true, subtree: true });

//テスト用動画 https://www.youtube.com/watch?v=LE-JN7_rxtE
