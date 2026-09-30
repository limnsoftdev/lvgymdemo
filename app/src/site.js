// Plain-DOM behaviour for the static markup in index.html.
const nav = document.getElementById('nav');
const toggle = nav.querySelector('.nav-toggle');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// mobile menu
function setMenu(open) {
  nav.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
nav.querySelectorAll('.nav-links a, .nav-links button').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// login modal
const modal = document.getElementById('login-modal');
document.querySelectorAll('[data-open-login]').forEach((b) => b.addEventListener('click', () => {
  setMenu(false);
  modal.classList.add('open');
}));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('open');
    setMenu(false);
  }
});

// scroll reveal: checks on scroll and again once fonts settle, so a late
// layout shift can't leave something stuck invisible
function checkReveal() {
  const vh = window.innerHeight;
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('visible');
  });
}
let ticking = false;
function queueReveal() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; checkReveal(); });
}
window.addEventListener('scroll', queueReveal, { passive: true });
window.addEventListener('resize', queueReveal);
window.addEventListener('load', checkReveal);
document.fonts?.ready?.then(checkReveal);
checkReveal();
