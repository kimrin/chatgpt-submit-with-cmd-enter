document.addEventListener('keydown', function(event) {
    const active = document.activeElement;
    const isTextarea = active && active.tagName === "TEXTAREA";
  
    // Cmd/Ctrl + Enter → 通常送信（= 本来のEnter）
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      if (isTextarea) {
        event.preventDefault();
  
        const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submitButton) {
          submitButton.click();
        } else {
          console.warn("送信ボタンが見つかりませんでした");
        }
      }
      return;
    }
  
    // Shift + Enter → 本来のEnterだが、今回は無効にする
    if (event.key === "Enter" && event.shiftKey) {
      if (isTextarea) {
        event.preventDefault(); // 無効化
        console.log("Shift+Enterは無効化されています");
      }
      return;
    }
  
    // Enter単体 → 改行として動作させる（本来のShift+Enterの挙動）
    if (event.key === "Enter") {
      if (isTextarea) {
        event.preventDefault();
  
        const start = active.selectionStart;
        const end = active.selectionEnd;
        const value = active.value;
  
        active.value = value.substring(0, start) + "\n" + value.substring(end);
        active.selectionStart = active.selectionEnd = start + 1;
      }
      return;
    }
  });
  