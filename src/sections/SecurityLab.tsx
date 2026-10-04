import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Globe, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import LevelBadge from '../components/LevelBadge';
import { panelSwap } from '../animations/variants';
import { labTargets } from '../data/lab';
import type { LabTarget } from '../data/lab';
import { LEVEL_META, LEVEL_ORDER } from '../types';
import type { Level } from '../types';

const ICONS: Record<LabTarget['id'], LucideIcon> = { web: Globe, api: Server, ai: Brain };

export default function SecurityLab() {
  const [selectedId, setSelectedId] = useState<LabTarget['id'] | null>(null);
  const [filter, setFilter] = useState<Level | 'all'>('all');
  const selected = labTargets.find((t) => t.id === selectedId) ?? null;

  const topics = selected ? selected.topics.filter((t) => filter === 'all' || t.level === filter) : [];

  return (
    <Section
      id="lab"
      index="02"
      kicker="Security Lab"
      title="Choose a target"
      subtitle="Three surfaces I'm studying. Each topic is labelled honestly — learning, worked with, or applied in a project."
    >
      {/* Targets */}
      <Reveal>
        <div className="relative">
          <div
            className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
            aria-hidden="true"
          />
          <div role="group" aria-label="Security Lab targets" className="relative grid gap-4 sm:grid-cols-3">
            {labTargets.map((t) => {
              const Icon = ICONS[t.id];
              const isSelected = t.id === selectedId;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(isSelected ? null : t.id)}
                  className={`group relative flex min-h-[148px] flex-col items-center justify-center gap-3 rounded-3xl p-6 text-center transition-[box-shadow,border-color,background-color] duration-200 ${
                    isSelected
                      ? 'border border-volt bg-volt/10 shadow-glow'
                      : 'glass hover:border-volt/50 hover:shadow-glow'
                  }`}
                >
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${
                      isSelected ? 'border-volt text-volt' : 'border-white/20 text-slate-300 group-hover:text-volt'
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    {isSelected && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-volt/40" aria-hidden="true" />
                    )}
                  </span>
                  <span className="font-mono text-lg font-semibold tracking-[0.3em] text-white">{t.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {t.topics.length} topics · {isSelected ? 'open' : 'click to open'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Topics */}
      <div className="mt-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              variants={panelSwap}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass rounded-3xl p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">Target / {selected.label}</p>
              <p className="mt-2 max-w-2xl text-lg text-slate-200">{selected.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter topics by level">
                {(['all', ...LEVEL_ORDER] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={filter === l}
                    onClick={() => setFilter(l)}
                    className={`min-h-[36px] rounded-full border px-3.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      filter === l
                        ? 'border-volt bg-volt/15 text-white'
                        : 'border-white/15 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l === 'all' ? 'All' : LEVEL_META[l].label}
                  </button>
                ))}
              </div>

              {topics.length > 0 ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {topics.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-slate-100">{t.name}</span>
                      <LevelBadge level={t.level} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-slate-500">
                  Nothing at this level yet for {selected.label} — and that's the honest answer.
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              variants={panelSwap}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-3xl border border-dashed border-white/15 p-6 text-center font-mono text-xs uppercase tracking-widest text-slate-500"
            >
              select a target to inspect its topics
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <ul className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Legend">
        {LEVEL_ORDER.map((l) => (
          <li key={l} className="flex items-start gap-3 text-sm text-slate-400">
            <LevelBadge level={l} className="mt-0.5" />
            <span>{LEVEL_META[l].description}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
