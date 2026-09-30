import { useEffect } from 'react';

export default function useRevealOnScroll() {
  useEffect(() => {
    let ticking = false;

    function check() {
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          el.classList.add('visible');
        }
      });
      ticking = false;
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    }

    // Run immediately (covers above-the-fold content), and again once
    // web fonts finish loading — a late font swap shifts layout enough
    // to change which elements are in view, which can otherwise leave
    // an element permanently stuck at opacity:0 if a single point-in-time
    // check missed it.
    check();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', check);
    document.fonts?.ready?.then(check);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('load', check);
    };
  }, []);
}
