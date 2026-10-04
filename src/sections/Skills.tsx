import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '../components/Section';
import LevelBadge from '../components/LevelBadge';
import { panelSwap } from '../animations/variants';
import { projectById } from '../data/projects';
import { skillCategories, skills } from '../data/skills';
import type { Skill, SkillCategory } from '../data/skills';
import { useMediaQuery } from '../hooks/useMediaQuery';

const RX = 17; // ellipse radius in % of canvas width
const RY = 22; // ellipse radius in % of canvas height

interface Placed extends Skill {
  x: number;
  y: number;
}

interface SkillsProps {
  onOpenProject: (id: string) => void;
}

export default function Skills({ onOpenProject }: SkillsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const wide = useMediaQuery('(min-width: 768px)');
  const selected = skills.find((s) => s.id === selectedId) ?? null;

  const placed = useMemo(() => {
    const out: Placed[] = [];
    for (const cat of skillCategories) {
      const list = skills.filter((s) => s.category === cat.id);
      list.forEach((s, i) => {
        const angle = ((-90 + (360 / list.length) * i) * Math.PI) / 180;
        out.push({ ...s, x: cat.x + RX * Math.cos(angle), y: cat.y + RY * Math.sin(angle) });
      });
    }
    return out;
  }, []);

  const toggle = (id: string) => setSelectedId((cur) => (cur === id ? null : id));

  return (
    <Section
      id="skills"
      index="04"
      kicker="Skill constellation"
      title="No percentages. No fake bars."
      subtitle="Skills are nodes, not scores. Select one to see where I've used it, which project it connects to, and its honest learning status."
    >
      {wide ? (
        <div className="relative mx-auto aspect-[16/11] w-full max-w-[1100px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {skillCategories.map((cat) => {
              const list = placed.filter((p) => p.category === cat.id);
              return list.map((p, i) => {
                const next = list[(i + 1) % list.length];
                const on = selectedId === p.id;
                return (
                  <g key={p.id}>
                    <line
                      x1={cat.x}
                      y1={cat.y}
                      x2={p.x}
                      y2={p.y}
                      stroke={on ? '#ff9ecf' : 'rgba(255,255,255,0.12)'}
                      strokeWidth={on ? 1.6 : 1}
                      vectorEffect="non-scaling-stroke"
                      style={{ transition: 'stroke 0.25s ease' }}
                    />
                    {list.length > 2 && (
                      <line
                        x1={p.x}
                        y1={p.y}
                        x2={next.x}
                        y2={next.y}
                        stroke="rgba(201, 182, 255,0.12)"
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                  </g>
                );
              });
            })}
          </svg>

          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${cat.x}%`, top: `${cat.y}%` }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-white">{cat.label}</p>
              <p className="mt-1 font-mono text-[10px] text-slate-500">{cat.blurb}</p>
            </div>
          ))}

          {placed.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selectedId === p.id}
              onClick={() => toggle(p.id)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-[box-shadow,border-color,background-color,color] duration-200 ${
                selectedId === p.id
                  ? 'border border-volt bg-volt/15 text-white shadow-glow'
                  : 'glass text-slate-300 hover:border-volt/60 hover:text-white hover:shadow-glow'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-volt">{cat.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === (cat.id as SkillCategory))
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={selectedId === s.id}
                      onClick={() => toggle(s.id)}
                      className={`min-h-[44px] rounded-full px-4 text-sm ${
                        selectedId === s.id
                          ? 'border border-volt bg-volt/15 text-white'
                          : 'glass text-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      <div className="mt-8" aria-live="polite">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              variants={panelSwap}
              initial="initial"
              animate="animate"
              exit="exit"
              className="glass rounded-3xl p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold text-white">{selected.label}</h3>
                <LevelBadge level={selected.level} />
              </div>

              <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">Where I used it</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {selected.usedIn ?? (
                      <span className="text-slate-500">
                        {selected.level === 'learning'
                          ? 'Currently studying — not yet applied in a project.'
                          : 'Add where you used this (src/data/skills.ts).'}
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-lav">Related project</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-2 text-sm">
                    {selected.projects.length > 0 ? (
                      selected.projects.map((id) => {
                        const proj = projectById(id);
                        if (!proj) return null;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => onOpenProject(id)}
                            className="min-h-[36px] rounded-full border border-white/15 px-3 text-xs text-slate-200 hover:border-lav/60 hover:text-white"
                          >
                            Case #{proj.caseNumber} · {proj.title}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-slate-500">None linked yet.</span>
                    )}
                  </dd>
                </div>
              </dl>
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
              select a skill node
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
