import { LEVEL_META } from '../types';
import type { Level } from '../types';

const STYLES: Record<Level, string> = {
  learning: 'border-lav/40 bg-lav/10 text-lav-soft',
  'worked-with': 'border-white/25 bg-white/5 text-slate-200',
  project: 'border-volt/50 bg-volt/10 text-volt-soft',
};

export default function LevelBadge({ level, className = '' }: { level: Level; className?: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STYLES[level]} ${className}`}
    >
      {LEVEL_META[level].label}
    </span>
  );
}
