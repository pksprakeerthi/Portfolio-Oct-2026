import type { Variants } from 'framer-motion';

/** Shared easing curve (mutable tuple so it satisfies Framer Motion's types). */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const stagger = (gap = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
});

export const panelSwap: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};
