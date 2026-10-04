import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from '../hooks/useMediaQuery';

const INTERACTIVE = 'a, button, [role="button"], [role="option"], input, [data-cursor]';

/** Subtle dot + trailing ring. Desktop only; the native cursor is left visible. */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let shown = false;

    const show = (on: boolean) => {
      if (shown === on) return;
      shown = on;
      dotEl.classList.toggle('cursor-visible', on);
      ringEl.classList.toggle('cursor-visible', on);
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        rx = x;
        ry = y;
        show(true);
      }
      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const active = !!target?.closest?.(INTERACTIVE);
      ringEl.dataset.active = active ? 'true' : 'false';
    };

    const onLeave = () => show(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className="cursor-ring" data-active="false" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
