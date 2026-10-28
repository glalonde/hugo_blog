(() => {
  const viewer = document.querySelector('.photo-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const image = viewer.querySelector('.photo-viewer-image');
  let opener;

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-photo-zoom]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    // Touch browsers may leave focus on the enclosing main element. Give the
    // dialog a specific return target instead of the entire content column.
    opener.focus({ preventScroll: true });
    image.alt = link.querySelector('img').alt;
    image.src = link.dataset.photoZoom;
    viewer.showModal();
    document.documentElement.classList.add('photo-viewer-open');
  });

  viewer.querySelector('button').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('photo-viewer-open');
    image.removeAttribute('src');
    image.alt = '';
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });
})();
