import { useEffect } from 'react';

/**
 * Bulletproof cinematic reveal hook.
 * Guarantees that sections NEVER remain blank:
 * - Generous vertical rootMargin (120px) & low threshold (0.02)
 * - Zero negative horizontal margin (prevents mobile/Vercel iframe clipping)
 * - Immediate viewport check on mount & view change
 * - Passive scroll & resize listener fallback
 * - Safety timer to auto-reveal any pending nodes
 */
export function useReveal(viewTrigger) {
  useEffect(() => {
    const revealAllVisible = () => {
      const elements = document.querySelectorAll('.rv-scroll, .reveal-node');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        const rect = el.getBoundingClientRect();
        // If element is anywhere near the viewport, make it visible
        if (rect.top <= windowHeight + 150 && rect.bottom >= -150) {
          el.classList.add('is-visible');
        }
      });
    };

    // 1. Immediate check
    revealAllVisible();
    const frameId = requestAnimationFrame(revealAllVisible);

    // 2. IntersectionObserver with generous bounds
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '120px 0px 80px 0px' }
      );

      const elements = document.querySelectorAll('.rv-scroll, .reveal-node');
      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    }

    // 3. Passive scroll & resize fallback
    window.addEventListener('scroll', revealAllVisible, { passive: true });
    window.addEventListener('resize', revealAllVisible, { passive: true });

    // 4. Absolute failsafe: After 1.5s, reveal any pending elements so page NEVER looks blank
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-node:not(.is-visible), .rv-scroll:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 1500);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', revealAllVisible);
      window.removeEventListener('resize', revealAllVisible);
      if (observer) observer.disconnect();
    };
  }, [viewTrigger]);
}

