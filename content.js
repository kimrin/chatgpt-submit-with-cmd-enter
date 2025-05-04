document.addEventListener('keydown', function(event) {
    const active = document.activeElement;
    const isTextarea = active && active.tagName === "TEXTAREA";
  
    // Cmd/Ctrl + Enter → 送信
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      if (isTextarea) {
        event.preventDefault();
        const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submitButton) {
          submitButton.click();
        }
      }
      return;
    }
  
    // Shift+Enter → 無効化（送信も改行もしない）
    if (event.key === "Enter" && event.shiftKey) {
      if (isTextarea) {
        event.preventDefault();
      }
      return;
    }
  
    // Enter単体 → 改行のみ（送信禁止）
    if (event.key === "Enter") {
      if (isTextarea) {
        event.preventDefault();
        const start = active.selectionStart;
        const end = active.selectionEnd;
        const value = active.value;
        active.value = value.slice(0, start) + "\n" + value.slice(end);
        active.selectionStart = active.selectionEnd = start + 1;
      }
      return;
    }
  }, true); // ←←← キャプチャフェーズでイベントを処理！
  