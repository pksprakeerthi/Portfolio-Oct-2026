import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Check, ChevronDown } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import Btn from '../components/Btn';
import { ciscoMilestone, journey, nextNodes } from '../data/journey';
import type { JourneyState } from '../data/journey';
import { LINKS } from '../data/profile';

const STATE_LABEL: Record<JourneyState, string> = {
  done: 'Completed stage',
  current: 'You are here',
  next: 'Up next',
};

export default function Journey() {
  const [open, setOpen] = useState<string | null>(
    () => journey.find((j) => j.state === 'current')?.id ?? null,
  );

  return (
    <Section
      id="journey"
      index="05"
      kicker="Learning journey"
      title="A progression, not a résumé"
      subtitle="Where I've been, where I am now, and what unlocks next."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ol className="relative">
          <span
            className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-volt/60 via-lav/40 to-white/5"
            aria-hidden="true"
          />
          {journey.map((stage) => {
            const isOpen = open === stage.id;
            const isCurrent = stage.state === 'current';
            const panelId = `journey-${stage.id}`;
            return (
              <li key={stage.id} className="relative pb-4">
                <Reveal>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : stage.id)}
                    className={`flex w-full items-start gap-4 rounded-3xl p-2 text-left transition-colors ${
                      isCurrent ? 'bg-volt/[0.06]' : ''
                    }`}
                  >
                    <span
                      className={`relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                        stage.state === 'done'
                          ? 'border-volt/60 bg-ink-900 text-volt'
                          : isCurrent
                            ? 'border-volt bg-volt text-ink-950 shadow-glow'
                            : 'border-dashed border-slate-600 bg-ink-900 text-slate-500'
                      }`}
                    >
                      {stage.state === 'done' ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : isCurrent ? (
                        <>
                          <span className="absolute inset-0 animate-ping rounded-full bg-volt/40" aria-hidden="true" />
                          <span className="relative h-2.5 w-2.5 rounded-full bg-ink-950" aria-hidden="true" />
                        </>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-600" aria-hidden="true" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                          isCurrent ? 'text-volt' : stage.state === 'next' ? 'text-lav' : 'text-slate-500'
                        }`}
                      >
                        {STATE_LABEL[stage.state]}
                      </span>
                      <span
                        className={`mt-0.5 block text-lg font-semibold ${
                          stage.state === 'next' ? 'text-slate-300' : 'text-white'
                        }`}
                      >
                        {stage.title}
                      </span>
                      <span className="block text-sm text-slate-400">{stage.summary}</span>
                    </span>
                    <ChevronDown
                      className={`mt-2 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </Reveal>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="ml-[60px] mt-1 space-y-1.5 pb-2 pr-2 text-sm text-slate-300">
                        {stage.details.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lav" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}

          {/* Subtle next nodes */}
          <li className="relative pl-[60px] pt-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">Next nodes</p>
            <ul className="mt-2 space-y-1.5">
              {nextNodes.map((n) => (
                <li key={n} className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full border border-dashed border-slate-600" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </li>
        </ol>

        {/* Cisco milestone */}
        <Reveal className="self-start lg:sticky lg:top-24">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lav">Milestone unlocked</p>
            <div className="mt-4 flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-lav/40 bg-lav/10 text-lav-soft">
                <Award className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold leading-snug text-white">{ciscoMilestone.title}</h3>
                <span className="mt-2 inline-flex rounded-md border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-emerald-200">
                  {ciscoMilestone.status}
                </span>
              </div>
            </div>
            <div className="mt-5">
              <Btn label="View certificate" href={LINKS.ciscoCertificate} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
