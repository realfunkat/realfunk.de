(() => {
  const notice = document.querySelector("[data-rf-notice]");
  if (!notice) return;

  const storageKey = "realfunk-reader-notice-20260918";
  const closeButtons = notice.querySelectorAll("[data-rf-notice-close]");

  const closeNotice = () => {
    notice.close();
    try { window.sessionStorage.setItem(storageKey, "seen"); } catch (_) {}
  };

  closeButtons.forEach((button) => button.addEventListener("click", closeNotice));
  notice.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeNotice();
  });
  notice.addEventListener("click", (event) => {
    if (event.target === notice) closeNotice();
  });

  let seen = false;
  try { seen = window.sessionStorage.getItem(storageKey) === "seen"; } catch (_) {}
  if (!seen) notice.showModal();
})();
