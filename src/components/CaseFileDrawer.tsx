import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { ReactNode } from 'react';
import Btn from './Btn';
import CredibilityPanel from './CredibilityPanel';
import { EASE } from '../animations/variants';
import type { Project } from '../data/projects';

interface CaseFileDrawerProps {
  project: Project | null;
  onClose: () => void;
}

const STATUS_STYLE: Record<Project['status'], string> = {
  'In Progress': 'border-volt/50 bg-volt/10 text-volt-soft',
  Completed: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200',
  'Details Pending': 'border-dashed border-slate-500 text-slate-400',
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 py-5">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">{label}</h3>
      <div className="mt-2 text-[15px] leading-relaxed text-slate-200">{children}</div>
    </section>
  );
}

function Placeholder() {
  return (
    <span className="text-slate-500">
      To be added <span className="font-mono text-[11px]">(edit src/data/projects.ts)</span>
    </span>
  );
}

function DrawerBody({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div ref={panelRef} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-volt">CASE FILE · #{project.caseNumber}</p>
          <h2 id="case-title" className="mt-1 text-2xl font-semibold text-white">
            {project.title}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case file"
          className="glass inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-200 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-8 sm:px-8">
        <Field label="Project">
          <p className="font-medium text-white">{project.title}</p>
          <p className="text-slate-400">{project.tagline}</p>
          {project.highlights.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Field label="Status">
          <span
            className={`inline-flex rounded-md border px-3 py-1 font-mono text-xs uppercase tracking-wider ${STATUS_STYLE[project.status]}`}
          >
            {project.status}
          </span>
        </Field>

        {project.visual === 'credibility' && (
          <div className="border-t border-white/10 py-5">
            <CredibilityPanel compact />
          </div>
        )}

        <Field label="Problem">{project.problem ?? <Placeholder />}</Field>
        <Field label="Solution / Approach">{project.solution ?? <Placeholder />}</Field>
        <Field label="Tech stack">
          {project.techStack.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <li key={t} className="rounded-md border border-volt/30 bg-volt/10 px-2.5 py-1 font-mono text-xs text-volt-soft">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder />
          )}
        </Field>
        <Field label="My role">{project.role ?? <Placeholder />}</Field>
        <Field label="What I learned">{project.learned ?? <Placeholder />}</Field>
        <Field label="Security relevance">{project.securityRelevance ?? <Placeholder />}</Field>

        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <Btn label="LIVE DEMO" icon={ExternalLink} variant="primary" href={project.links.demo} />
          <Btn label="GITHUB" icon={Github} href={project.links.github} />
        </div>
      </div>
    </div>
  );
}

export default function CaseFileDrawer({ project, onClose }: CaseFileDrawerProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-file"
          className="fixed inset-0 z-[80] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            className="relative h-full w-full bg-ink-900 shadow-2xl sm:max-w-[640px] sm:border-l sm:border-white/10"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <DrawerBody project={project} onClose={onClose} />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
