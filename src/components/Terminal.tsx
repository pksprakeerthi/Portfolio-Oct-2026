import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE } from '../animations/variants';
import { LINKS, profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillCategories, skills } from '../data/skills';
import { isLinkSet } from '../lib/links';

interface TermLine {
  kind: 'in' | 'out' | 'err';
  text: string;
}

const WELCOME: TermLine = { kind: 'out', text: 'PKS_SYSTEM terminal — type "help" to begin.' };

/** UI-only terminal. It never executes real commands. */
function execute(raw: string): TermLine[] | 'clear' {
  const cmd = raw.trim().toLowerCase();
  const out = (text: string): TermLine[] => [{ kind: 'out', text }];

  switch (cmd) {
    case '':
      return [];
    case 'help':
      return out(
        [
          'available commands:',
          '  whoami    who I am',
          '  projects  list case files',
          '  skills    list skills by category',
          '  contact   how to reach me',
          '  clear     clear the screen',
          '  help      show this message',
        ].join('\n'),
      );
    case 'whoami':
      return out(profile.whoami.join('\n'));
    case 'projects':
      return out(projects.map((p) => `#${p.caseNumber}  ${p.title}  [${p.status}]`).join('\n'));
    case 'skills':
      return out(
        skillCategories
          .map((c) => `${c.label}:\n  ${skills.filter((s) => s.category === c.id).map((s) => s.label).join(', ')}`)
          .join('\n\n'),
      );
    case 'contact':
      return out(
        [
          `github:    ${isLinkSet(LINKS.github) ? LINKS.github : '(not added yet)'}`,
          `linkedin:  ${isLinkSet(LINKS.linkedin) ? LINKS.linkedin : '(not added yet)'}`,
          `email:     ${isLinkSet(LINKS.email) ? LINKS.email : '(not added yet)'}`,
          `resume:    ${LINKS.resume}`,
        ].join('\n'),
      );
    case 'clear':
      return 'clear';
    default:
      return [{ kind: 'err', text: `command not found: ${raw.trim()} — type "help"` }];
  }
}

function TerminalBody({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TermLine[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = input;
    const result = execute(value);
    if (value.trim()) setHistory((h) => [...h, value]);
    setHistIdx(-1);
    setInput('');
    if (result === 'clear') {
      setLines([]);
      return;
    }
    setLines((prev) => [...prev, { kind: 'in', text: value }, ...result]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400">pks_terminal · ui only</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close terminal"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words font-mono ${
              l.kind === 'in' ? 'text-white' : l.kind === 'err' ? 'text-rose-300' : 'text-lav-soft'
            }`}
          >
            {l.kind === 'in' ? `$ ${l.text}` : l.text}
          </pre>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5">
        <span className="font-mono text-sm text-volt" aria-hidden="true">
          $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal input"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="type a command"
          className="min-h-[36px] w-full bg-transparent font-mono text-sm text-white placeholder:text-slate-600 focus:outline-none"
        />
      </form>
    </>
  );
}

export default function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal"
          role="dialog"
          aria-label="Terminal"
          className="glass fixed bottom-0 right-0 z-[70] flex h-[60vh] w-full flex-col overflow-hidden bg-ink-900/95 shadow-2xl sm:bottom-6 sm:right-6 sm:h-[420px] sm:max-w-[480px] sm:rounded-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <TerminalBody onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
