import { useCallback, useRef } from 'react';
import type { MouseEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFinePointer } from './useMediaQuery';

/** Subtle magnetic pull toward the cursor. Desktop + motion-allowed only. */
export function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T>(null);
  const finePointer = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;

  const onMouseMove = useCallback(
    (e: MouseEvent<T>) => {
      const el = ref.current;
      if (!enabled || !el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    },
    [enabled, strength],
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
