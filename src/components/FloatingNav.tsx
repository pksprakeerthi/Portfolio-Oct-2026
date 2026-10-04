import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ScanSearch, Search, Terminal as TerminalIcon, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';

interface FloatingNavProps {
  active: string;
  onNavigate: (id: string) => void;
  onPalette: () => void;
  onRecruiter: () => void;
  onTerminal: () => void;
}

export default function FloatingNav({ active, onNavigate, onPalette, onRecruiter, onTerminal }: FloatingNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the menu unlock scrolling before we scroll
    window.setTimeout(() => onNavigate(id), 30);
  };

  return (
    <>
      {/* Desktop / tablet pill */}
      <nav
        aria-label="Primary"
        className="glass fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 md:flex"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                isActive ? 'text-ink-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-volt to-lav"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop utilities */}
      <div className="fixed right-4 top-4 z-50 hidden items-center gap-2 md:flex">
        <button
          type="button"
          onClick={onPalette}
          aria-label="Open command palette"
          className="glass inline-flex min-h-[40px] items-center gap-2 rounded-full px-3.5 font-mono text-[11px] text-slate-300 hover:text-white"
        >
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden lg:inline">Command</span>
          <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-slate-400">Ctrl K</kbd>
        </button>
        <button
          type="button"
          onClick={onRecruiter}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-lav/50 bg-lav/10 px-4 font-mono text-[11px] uppercase tracking-widest text-lav-soft transition-shadow hover:shadow-glow-lav"
        >
          <ScanSearch className="h-3.5 w-3.5" aria-hidden="true" />
          Recruiter mode
        </button>
      </div>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 md:hidden">
        <span className="glass rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] text-slate-200">
          PKS_SYSTEM
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRecruiter}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-lav/50 bg-ink-900/80 px-3 font-mono text-[11px] uppercase tracking-wider text-lav-soft"
          >
            <ScanSearch className="h-3.5 w-3.5" aria-hidden="true" />
            Recruiter
          </button>
          <button
            type="button"
            onClick={onPalette}
            aria-label="Open command palette"
            className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 px-6 py-5 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.2em] text-slate-400">PKS_SYSTEM</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-8 flex flex-1 flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`flex min-h-[52px] w-full items-center gap-4 rounded-xl px-3 text-left text-2xl font-semibold ${
                      active === item.id ? 'text-volt' : 'text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pb-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onRecruiter();
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-lav/50 bg-lav/10 px-4 font-mono text-xs uppercase tracking-wider text-lav-soft"
              >
                <ScanSearch className="h-4 w-4" aria-hidden="true" /> Recruiter mode
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onTerminal();
                }}
                className="glass inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 font-mono text-xs uppercase tracking-wider text-slate-200"
              >
                <TerminalIcon className="h-4 w-4" aria-hidden="true" /> Terminal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
