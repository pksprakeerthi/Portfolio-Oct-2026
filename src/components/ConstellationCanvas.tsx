import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  tone: 0 | 1 | 2; // 0 pink · 1 lavender · 2 mint
  star: boolean; // drawn as a tiny four-point sparkle
}

const TONES = ['rgba(255, 158, 207, 0.9)', 'rgba(201, 182, 255, 0.9)', 'rgba(154, 240, 208, 0.85)'] as const;

/**
 * Subtle network visualization. Nodes drift slowly and lean toward the cursor.
 * Pauses when off-screen / tab hidden. Fewer nodes on small screens.
 */
export default function ConstellationCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let points: Point[] = [];
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const small = w < 640;
      const count = Math.round(Math.min(small ? 30 : 80, Math.max(20, (w * h) / (small ? 15000 : 17000))));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.8,
        tone: (() => {
          const t = Math.random();
          return t < 0.5 ? 0 : t < 0.85 ? 1 : 2;
        })(),
        star: Math.random() < 0.2,
      }));
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const linkDist = w < 640 ? 90 : 125;
      const mouseDist = 150;

      for (const p of points) {
        if (animate) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < mouseDist && d > 0.1) {
            p.x += (dx / d) * 0.35;
            p.y += (dy / d) * 0.35;
          }
        }
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(255, 158, 207, ${(1 - d / linkDist) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < mouseDist) {
          ctx.strokeStyle = `rgba(201, 182, 255, ${(1 - dm / mouseDist) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of points) {
        ctx.fillStyle = TONES[p.tone];
        ctx.beginPath();
        if (p.star) {
          const s = p.r * 3.4;
          ctx.moveTo(p.x, p.y - s);
          ctx.quadraticCurveTo(p.x, p.y, p.x + s, p.y);
          ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + s);
          ctx.quadraticCurveTo(p.x, p.y, p.x - s, p.y);
          ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - s);
        } else {
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) draw(true);
      raf = requestAnimationFrame(loop);
    };

    init();
    if (reduce) {
      draw(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(() => {
      init();
      if (reduce) draw(false);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
