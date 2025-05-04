document.addEventListener('keydown', function(event) {
    // アクティブ要素がtextareaかどうかを確認（安全性のため）
    const active = document.activeElement;
  
    const isTextarea = active && active.tagName === "TEXTAREA";
  
    // CmdまたはCtrl + Enter で送信
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      if (isTextarea) {
        event.preventDefault(); // デフォルト送信キャンセル
  
        // 明示的に submit ボタンを探してクリック
        const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submitButton) {
          submitButton.click();
        } else {
          console.warn("送信ボタンが見つかりませんでした");
        }
      }
    }
  
    // Enter 単体では改行（送信しない）
    if (event.key === "Enter" && !event.metaKey && !event.ctrlKey) {
      if (isTextarea) {
        event.preventDefault(); // 送信を防止して改行だけ挿入
  
        // カーソル位置に改行を挿入
        const start = active.selectionStart;
        const end = active.selectionEnd;
        const value = active.value;
  
        active.value = value.substring(0, start) + "\n" + value.substring(end);
        active.selectionStart = active.selectionEnd = start + 1;
      }
    }
  });
  