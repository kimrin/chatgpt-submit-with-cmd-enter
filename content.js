document.addEventListener('keydown', function(event) {
    // Cmdキー（またはCtrlキー）とEnterキーの組み合わせで送信
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault(); // デフォルトのEnter挙動を防ぐ
  
      const textarea = document.activeElement;
      if (textarea && textarea.tagName === "TEXTAREA") {
        // 送信ボタンのクリックイベントをシミュレート
        const submitButton = document.querySelector("button[type='submit']");
        if (submitButton) {
          submitButton.click(); // 送信ボタンをクリック
        }
      }
    }
    
    // Enter単体では改行のみ
    if (event.key === "Enter" && !event.metaKey && !event.ctrlKey) {
      const textarea = document.activeElement;
      if (textarea && textarea.tagName === "TEXTAREA") {
        // 改行のみ実行
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;  // キャレット位置を移動
      }
      event.preventDefault(); // Enterキーで送信されないようにする
    }
  });
  