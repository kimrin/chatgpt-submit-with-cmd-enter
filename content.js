function overrideEnterBehavior() {
    const textarea = document.querySelector("textarea");
  
    if (!textarea) return;
  
    textarea.addEventListener("keydown", function (event) {
      // Cmd/Ctrl + Enter → 本来の送信動作
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        const submit = document.querySelector("button[data-testid='send-button'], button[type='submit']");
        if (submit) {
          submit.click();
        }
        return;
      }
  
      // Shift+Enter → 無効化
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        return;
      }
  
      // Enter単体 → 改行だけ挿入、送信完全封印
      if (event.key === "Enter") {
        event.stopImmediatePropagation(); // ←これが超重要
        event.preventDefault();
  
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
  
        textarea.value = value.slice(0, start) + "\n" + value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }
    }, true); // キャプチャ + ネイティブで反応
  }
  
  // DOM読み込みを監視して textarea 出現後にフックする
  const observer = new MutationObserver(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      overrideEnterBehavior();
      observer.disconnect(); // 一度フックできたら監視終了
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  