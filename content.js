function overrideEnterBehavior() {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;
  
    textarea.addEventListener("keydown", function (event) {
      const isEnter = event.key === "Enter";
      const isCmdEnter = isEnter && (event.metaKey || event.ctrlKey);
      const isShiftEnter = isEnter && event.shiftKey;
      const isPlainEnter = isEnter && !event.metaKey && !event.ctrlKey && !event.shiftKey;
  
      // Cmd/Ctrl + Enter → 送信
      if (isCmdEnter) {
        event.preventDefault();
        const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submitButton) {
          submitButton.click();
        }
        return;
      }
  
      // Shift + Enter → 封印（改行も送信もしない）
      if (isShiftEnter) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
  
      // Enter単体 → 改行に置き換え
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
    }, true); // ← キャプチャでガッチリ奪う
  }
  
  // textarea が出現するのを待ってフックする
  const observer = new MutationObserver(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      overrideEnterBehavior();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  