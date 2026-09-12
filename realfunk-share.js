(() => {
  const canonical = document.querySelector('link[rel="canonical"]').href;
  const url = document.querySelector('meta[property="og:url"]')?.content || canonical;
  const title = document.querySelector('meta[property="og:title"]').content;
  document.querySelectorAll('.rf-share').forEach(bar => {
    const status = bar.querySelector('[data-share-status]');
    const native = bar.querySelector('[data-native-share]');
    if (navigator.share) {
      native.hidden = false;
      native.addEventListener('click', async () => {
        try { await navigator.share({title, url}); }
        catch (error) { if (error.name !== 'AbortError') status.textContent = 'Bitte einen der Teilen-Links verwenden.'; }
      });
    }
    bar.querySelector('[data-copy-share]').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(url); status.textContent = 'Link kopiert!'; }
      catch { status.textContent = 'Link zum Kopieren: ' + url; }
    });
  });
})();
