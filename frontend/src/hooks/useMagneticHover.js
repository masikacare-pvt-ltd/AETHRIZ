import { useEffect } from 'react';

/**
 * Hook to apply subtle magnetic hover displacement to .mag-tgt elements
 */
export function useMagneticHover() {
  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const targets = document.querySelectorAll('.mag-tgt');
    const handlers = [];

    targets.forEach((tgt) => {
      const handleMouseMove = (e) => {
        const rect = tgt.getBoundingClientRect();
        const rx = e.clientX - rect.left - rect.width / 2;
        const ry = e.clientY - rect.top - rect.height / 2;
        tgt.style.transform = `translate(${rx * 0.15}px, ${ry * 0.15}px)`;
      };

      const handleMouseLeave = () => {
        tgt.style.transform = 'translate(0, 0)';
      };

      tgt.addEventListener('mousemove', handleMouseMove);
      tgt.addEventListener('mouseleave', handleMouseLeave);
      handlers.push({ tgt, handleMouseMove, handleMouseLeave });
    });

    return () => {
      handlers.forEach(({ tgt, handleMouseMove, handleMouseLeave }) => {
        tgt.removeEventListener('mousemove', handleMouseMove);
        tgt.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
}
