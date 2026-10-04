import { ArrowUpRight } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import CredibilityPanel from '../components/CredibilityPanel';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

const STATUS_STYLE: Record<Project['status'], string> = {
  'In Progress': 'border-volt/50 text-volt-soft',
  Completed: 'border-emerald-300/40 text-emerald-200',
  'Details Pending': 'border-dashed border-slate-500 text-slate-400',
};

interface ProjectsProps {
  onOpen: (id: string) => void;
}

export default function Projects({ onOpen }: ProjectsProps) {
  return (
    <Section
      id="projects"
      index="03"
      kicker="Case files"
      title="Open a case"
      subtitle="Each project is a case file: the problem, the approach, what it taught me, and why it matters for security."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {projects.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => onOpen(p.id)}
                  aria-label={`Open case file ${p.caseNumber}: ${p.title}`}
                  className="group relative block h-full w-full pt-4 text-left"
                >
                  {/* folder tab */}
                  <span className="absolute left-4 top-0 rounded-t-md border border-b-0 border-white/10 bg-ink-800 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-volt">
                    CASE #{p.caseNumber}
                  </span>
                  <span className="glass flex h-full min-h-[210px] flex-col rounded-3xl rounded-tl-none p-5 transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-1 group-hover:border-volt/50 group-hover:shadow-glow">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-lg font-semibold leading-snug text-white">{p.title}</span>
                      <ArrowUpRight
                        className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-volt"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 text-sm text-lav-soft">{p.tagline}</span>
                    <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{p.summary}</span>
                    <span className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                      <span
                        className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLE[p.status]}`}
                      >
                        {p.status}
                      </span>
                      {p.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300">
                          {h}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="lg:sticky lg:top-24">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            Featured interface — InfluenceLens AI
          </p>
          <CredibilityPanel />
        </Reveal>
      </div>
    </Section>
  );
}
