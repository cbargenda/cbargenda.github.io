(function () {
  const r = document.documentElement, t = document.querySelector('[data-theme-toggle]');
  let d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const sun = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  function apply() {
    r.setAttribute('data-theme', d);
    if (t) { t.innerHTML = d === 'dark' ? sun : moon; t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode'); }
  }
  apply();
  t && t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; apply(); });

  // Lightbox
  const dlg = document.querySelector('dialog.lightbox');
  const img = dlg.querySelector('img'), cap = dlg.querySelector('p');
  let opener = null;
  document.querySelectorAll('[data-full]').forEach((b) => {
    b.addEventListener('click', () => {
      opener = b;
      img.src = b.dataset.full;
      const inner = b.querySelector('img');
      img.alt = inner ? inner.alt : '';
      cap.textContent = b.dataset.caption || '';
      dlg.showModal();
    });
  });
  dlg.querySelector('.lightbox-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { img.src = ''; opener && opener.focus(); });

  // Reduced motion: stop autoplaying clips
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[data-motion]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.setAttribute('controls', ''); });
  }

  // Reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
  } else { els.forEach((el) => el.classList.add('is-in')); }
})();
