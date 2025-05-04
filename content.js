function overrideChatGPTInput() {
    const textarea = document.querySelector("textarea");
    const form = textarea?.closest("form");
  
    if (!textarea || !form) return;
  
    // Step 1: フォーム送信を完全に殺す
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }, true);
  
    // Step 2: textareaのキーダウン処理をカスタマイズ
    textarea.addEventListener("keydown", function (event) {
      const isEnter = event.key === "Enter";
      const isCmdEnter = isEnter && (event.metaKey || event.ctrlKey);
      const isShiftEnter = isEnter && event.shiftKey;
      const isPlainEnter = isEnter && !event.metaKey && !event.ctrlKey && !event.shiftKey;
  
      // Cmd/Ctrl + Enter → 明示的に送信ボタンをクリック
      if (isCmdEnter) {
        event.preventDefault();
        const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submitButton) submitButton.click();
        return;
      }
  
      // Shift+Enter → 無効化
      if (isShiftEnter) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
  
      // Enterのみ → 改行挿入（送信は完全ブロック済み）
      if (isPlainEnter) {
        event.preventDefault();
        event.stopImmediatePropagation();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        textarea.value = value.slice(0, start) + "\n" + value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        return;
      }
    }, true);
  }
  
  // textareaが出てくるのを監視してフックする
  const observer = new MutationObserver(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      overrideChatGPTInput();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  