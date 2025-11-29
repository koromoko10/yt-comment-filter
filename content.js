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

// フィルター対象のハンドル名（@username）
//参考 https://w.atwiki.jp/trollinformation/pages/129.html 
const handleFilters = [
  "@純白の天使イケメン天才りぐ",
  "@ラフレシアisgod2",
  "@純白の天使ラフレシア",
  "@ラフレシアisGOD配信突撃垢",
  "@japaa.n",
  "@荒らしは正義",
  "@OYASIROKAMI",
  "@OYASIROSUKI",
  "@user-pv7tm9nr4s",
  "@にどね-i4s",
  "@ねるねるA",
  "@ねるねるサブE",
  "@ねるねるサブ1",
  "@ねるねるサブ-k7i",
  "@ねるねるC",
  "@ねるねるさぶ-u5b",
  "@ねるねるサブ4",
  "@クロゴキブリ-h6v",
  "@rezeru_rezenama_god",
  "@NGE.45",
  "@人生過激派代表サザン",
  "@人生過激派サザン2",
  "@MrZeikinTV",
  "@登録者増える度に終戦-f2e",
  "@荒らし系スーパーサイヤヒトラー",
  "@宇宙の予測する俺-t9s",
  "@Uesumrubourg大使館広報",
  "@kncw539",
  "@俺に反応してる時点で同類",
  "@チー豚撲滅",
  "@36日後のあなた",
  "@さとうげんた-r4d",
  "@user-ikemen_",
  "@KANARAZU_ARASU",
  "@荒らし-g2b",
  "@mariruitomariburawakami"
];

// コメント非表示関数
function hideComments() {
  const comments = document.querySelectorAll("ytd-comment-thread-renderer");
  comments.forEach(comment => {
    const text = comment.querySelector("#content-text").textContent.toLowerCase();
    const handle = comment.querySelector("#author-text").textContent.trim().toLowerCase();

    // コメント内容またはハンドル名がフィルタに一致するかチェック
    const shouldHide = commentFilters.some(filter => filter.test(text)) ||
                       handleFilters.includes(handle);

    if (shouldHide) {
      comment.style.display = "none";
      // 削除カウントをインクリメント
      chrome.runtime.sendMessage({ action: "incrementCount" });
    }
  });
}

// ページがリロードされた際にカウントをリセット
chrome.runtime.sendMessage({ action: "resetCount" });

// ページロードやスクロールでのコメント表示時に関数を再実行
new MutationObserver(hideComments).observe(document, { childList: true, subtree: true });

//テスト用動画 https://www.youtube.com/watch?v=LE-JN7_rxtE
