# Youtube コメントフィルター

<img src="https://github.com/user-attachments/assets/354d23a0-7315-4a7a-98a3-77289188c5f8" title="Logo" width="30%">

### この拡張機能について
特定のパターンに合うYouTubeコメントを非表示にするChrome拡張機能です。<br>
YouTube内でよくある
* **「1コメ！」**
* **「今見てる人いる？」**
* **「今見てる人は流石にいないでしょ」**
* **「今見てる人挙手」**
* **「今いいねついたら流石に怖い」**
* **「〇〇年も見てる人いる？」**
* **「なう(日付)」**
* **「いいね数を〇〇から〇〇にしてしまった罪悪感」**
* **「伝説はここから始まった」**
* **「それってあなたの～」**
* **「jkの〇〇動画上げてます」**
* **「〇〇円もらえる動画上げてます」**
* **「絶対に翻訳したら～」**
* **「草とかつけとけばいいと思ってるでしょ～」**
* **「で？」**
* **「呪いにかかります～」**

などの動画の内容に直接関係のないコメントを非表示にします。<br>

> [!NOTE]
> 現在はβ版です。<br>
> 返信の内容が非表示にされなかったり、ユーザーの指定がうまく機能していません。<br> 
> **この問題を修正できる方はぜひIssuesやプルリクお待ちしております！**

### 導入方法
### 非表示リストを編集する
只今リストを簡単に変更できる機能(オプションページ的な？)はないので、 **直接リストを編集する** ことで変更することができます。<br>
ダウンロードしたZIPファイル内に `content.js` があるのでそれを編集します。
#### 単語をブロック
 `content.js` 内の　`const commentFilters` の中身が非表示にしている単語リストです。
#### ユーザーをブロック
 `content.js` 内の　`const handleFilters` の中身が非表示にしているユーザーリストです。<br>
 ハンドル名で指定します。（@から始まる名前）

> [!WARNING]
> この機能は現在うまく機能していません。

### ライセンス
この拡張機能は **MITライセンス** です。詳細は[LICENSE](https://github.com/koromoko10/yt-comment-filter/blob/main/LICENSE)を確認して下さい。
