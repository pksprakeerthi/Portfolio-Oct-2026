import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, Github, Linkedin, Mail, X } from 'lucide-react';
import Btn from '../components/Btn';
import LevelBadge from '../components/LevelBadge';
import { fadeUp, stagger } from '../animations/variants';
import { ciscoMilestone } from '../data/journey';
import { LINKS, profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillById } from '../data/skills';
import { mailto } from '../lib/links';

interface RecruiterViewProps {
  onExit: () => void;
  onOpenProject: (id: string) => void;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.section variants={fadeUp} className="glass rounded-3xl p-5 sm:p-6">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-volt">{title}</h2>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

/** A 30-second profile: who, what, proof, how to reach me. */
export default function RecruiterView({ onExit, onOpenProject }: RecruiterViewProps) {
  const coreSkills = profile.recruiter.coreSkills
    .map((id) => skillById(id))
    .filter((s): s is NonNullable<ReturnType<typeof skillById>> => Boolean(s));

  return (
    <div className="relative min-h-screen px-5 pb-20 pt-24 sm:px-8">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="glass rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] text-lav-soft">
          RECRUITER MODE
        </span>
        <button
          type="button"
          onClick={onExit}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-lav/50 bg-ink-900/90 px-4 font-mono text-[11px] uppercase tracking-wider text-lav-soft transition-shadow hover:shadow-glow-lav"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Exit recruiter mode
        </button>
      </div>

      <motion.div
        className="relative mx-auto max-w-5xl"
        variants={stagger(0.06)}
        initial="hidden"
        animate="show"
      >
        {/* Identity */}
        <motion.header variants={fadeUp}>
          <h1 className="text-3xl font-semibold uppercase tracking-[0.14em] text-white sm:text-5xl">
            P K S Prakeerthi
          </h1>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.recruiter.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-volt/40 bg-volt/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-volt-soft"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-slate-400">{profile.summary}</p>
        </motion.header>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Block title="Top projects">
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onOpenProject(p.id)}
                    className="group flex w-full items-start justify-between gap-3 rounded-xl border border-white/10 bg-ink-900/60 p-3 text-left transition-colors hover:border-volt/50"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-white">{p.title}</span>
                      <span className="block text-xs text-slate-400">{p.tagline}</span>
                    </span>
                    <span className="shrink-0 rounded border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      {p.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Block>

          <div className="grid gap-5">
            <Block title="Core skills">
              <ul className="flex flex-wrap gap-2">
                {coreSkills.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 py-1 pl-3 pr-1.5">
                    <span className="text-sm text-slate-200">{s.label}</span>
                    <LevelBadge level={s.level} />
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Current learning">
              <ul className="space-y-2 text-sm text-slate-300">
                {profile.recruiter.currentLearning.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <Award className="h-4 w-4 text-lav-soft" aria-hidden="true" />
                {ciscoMilestone.title} —{' '}
                <span className="text-emerald-200">{ciscoMilestone.status}</span>
              </p>
            </Block>
          </div>
        </div>

        <Block title="Resume · Links · Contact">
          <div className="flex flex-wrap gap-3">
            <Btn
              label="Resume"
              icon={FileText}
              variant="primary"
              href={LINKS.resume}
              external={false}
              download={profile.resumeDownloadName}
            />
            <Btn label="GitHub" icon={Github} href={LINKS.github} />
            <Btn label="LinkedIn" icon={Linkedin} href={LINKS.linkedin} />
            <Btn label="Contact" icon={Mail} href={mailto(LINKS.email)} />
          </div>
        </Block>

        <motion.div variants={fadeUp} className="mt-8 text-center">
          <Btn label="Exit recruiter mode" icon={X} onClick={onExit} />
        </motion.div>
      </motion.div>
    </div>
  );
}
