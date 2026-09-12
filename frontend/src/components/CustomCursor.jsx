import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);
  const mousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const trailerPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const loop = () => {
      trailerPos.current.x += (mousePos.current.x - trailerPos.current.x) * 0.2;
      trailerPos.current.y += (mousePos.current.y - trailerPos.current.y) * 0.2;
      if (trailerRef.current) {
        trailerRef.current.style.left = `${trailerPos.current.x}px`;
        trailerRef.current.style.top = `${trailerPos.current.y}px`;
      }
      animFrameId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <>
      <div className="aeth-cursor" id="custom-c" ref={cursorRef}></div>
      <div className="aeth-cursor-trailer" id="custom-c-trail" ref={trailerRef}></div>
    </>
  );
}
