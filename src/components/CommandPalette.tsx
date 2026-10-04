import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CornerDownLeft, Search } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EASE } from '../animations/variants';

export interface Command {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: LucideIcon;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

function PaletteBody({ onClose, commands }: { onClose: () => void; commands: Command[] }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.activeElement as HTMLElement | null;
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [index]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    onClose();
    // let the palette close before running (focus / scroll side effects)
    window.setTimeout(cmd.run, 40);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 px-4">
        <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
          aria-label="Search commands"
          placeholder="Type a command…"
          className="h-14 w-full bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
        />
        <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 sm:block">
          Esc
        </kbd>
      </div>

      <ul
        id="palette-list"
        ref={listRef}
        role="listbox"
        aria-label="Commands"
        className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
      >
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">No matching command.</li>}
        {results.map((c, i) => {
          const Icon = c.icon;
          const isActive = i === index;
          return (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={isActive}
              data-index={i}
              onMouseMove={() => setIndex(i)}
              onClick={() => runAt(i)}
              className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${
                isActive ? 'bg-volt/10 text-white' : 'text-slate-300'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-volt' : 'text-slate-500'}`} aria-hidden="true" />
              <span className="flex-1 text-sm">
                <span className="font-mono text-slate-600">&gt; </span>
                {c.label}
              </span>
              {c.hint && <span className="hidden font-mono text-[10px] text-slate-500 sm:block">{c.hint}</span>}
              {isActive && <CornerDownLeft className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass relative w-full max-w-xl overflow-hidden rounded-3xl bg-ink-900/95 shadow-2xl"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <PaletteBody onClose={onClose} commands={commands} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
