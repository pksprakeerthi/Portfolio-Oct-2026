import { useEffect, useState } from 'react';

/**
 * Tracks which section is under the "reading line" (40% down the viewport).
 * Uses a throttled scroll listener so lazily-mounted sections are picked up too.
 */
export function useActiveSection(ids: string[], enabled = true): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, enabled]);

  return active;
}
