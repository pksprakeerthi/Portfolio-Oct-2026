import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Mascot from './Mascot';

const LINES: [string, string][] = [
  ['identity', 'FOUND'],
  ['security_profile', 'FOUND'],
  ['projects', 'FOUND'],
  ['career_direction', 'FOUND'],
];

interface BootSequenceProps {
  onEnter: () => void;
}

/** Short boot sequence (~2s). Skippable. Remembered via localStorage in App. */
export default function BootSequence({ onEnter }: BootSequenceProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState<number>(reduce ? LINES.length : 0);
  const enterRef = useRef<HTMLButtonElement>(null);
  const ready = count >= LINES.length;

  useEffect(() => {
    if (reduce || count >= LINES.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 450 : 300);
    return () => window.clearTimeout(t);
  }, [count, reduce]);

  useEffect(() => {
    if (ready) enterRef.current?.focus();
  }, [ready]);

  return (
    <motion.div
      role="dialog"
      aria-label="PKS_SYSTEM boot sequence"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <Mascot className="mb-5 w-16" />
        <p className="font-mono text-lg font-semibold tracking-[0.2em] text-white">PKS_SYSTEM</p>
        <p className="mt-1 font-mono text-xs text-slate-500">initializing...</p>

        <ul className="mt-8 space-y-2 font-mono text-[13px] sm:text-sm" aria-live="polite">
          {LINES.slice(0, count).map(([label, status]) => (
            <li key={label} className="flex items-baseline gap-2 text-slate-300">
              <span>{label}</span>
              <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-slate-600" aria-hidden="true">
                {'.'.repeat(40)}
              </span>
              <span className="text-volt">{status}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 h-16">
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap items-center gap-4"
            >
              <p className="font-mono text-sm tracking-[0.2em] text-lav-soft">SYSTEM READY</p>
              <button
                ref={enterRef}
                type="button"
                onClick={onEnter}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-volt/60 bg-volt/10 px-5 py-2 font-mono text-sm tracking-wider text-volt-soft transition-shadow hover:shadow-glow"
              >
                [ ENTER SYSTEM ]
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onEnter}
        className="absolute bottom-6 right-6 min-h-[44px] rounded-md px-3 font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-200"
      >
        Skip intro
      </button>
    </motion.div>
  );
}
