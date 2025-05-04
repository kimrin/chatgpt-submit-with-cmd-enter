function overrideChatGPT() {
    const textarea = document.querySelector("textarea");
    const submitButton = document.querySelector("button[data-testid='send-button'], button[type='submit']");
  
    if (!textarea || !submitButton) return;
  
    // 送信ボタンを物理的に無効にする（Enter単体では押せなくなる）
    submitButton.disabled = true;
  
    textarea.addEventListener("keydown", function (event) {
      const isEnter = event.key === "Enter";
      const isCmdEnter = isEnter && (event.metaKey || event.ctrlKey);
      const isShiftEnter = isEnter && event.shiftKey;
      const isPlainEnter = isEnter && !event.metaKey && !event.ctrlKey && !event.shiftKey;
  
      // Cmd/Ctrl + Enter → ボタンを一時的に有効にして送信
      if (isCmdEnter) {
        event.preventDefault();
        submitButton.disabled = false;
        submitButton.click();
        setTimeout(() => {
          submitButton.disabled = true;
        }, 100); // 送信後すぐ再び無効化
        return;
      }
  
      // Shift + Enter → 封印
      if (isShiftEnter) {
        event.preventDefault();
        return;
      }
  
      // Enter単体 → 改行
      if (isPlainEnter) {
        event.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        textarea.value = value.slice(0, start) + "\n" + value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        return;
      }
    }, true);
  }
  
  // textareaと送信ボタンが出てくるのを監視
  const observer = new MutationObserver(() => {
    const textarea = document.querySelector("textarea");
    const button = document.querySelector("button[data-testid='send-button'], button[type='submit']");
    if (textarea && button) {
      overrideChatGPT();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  