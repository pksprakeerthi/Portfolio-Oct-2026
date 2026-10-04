import { motion } from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import ConstellationCanvas from '../components/ConstellationCanvas';
import Mascot from '../components/Mascot';
import Sparkle from '../components/Sparkle';
import Btn from '../components/Btn';
import { fadeUp, stagger } from '../animations/variants';
import { LINKS, profile } from '../data/profile';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-[360px] w-[360px] rounded-full bg-volt/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-[360px] w-[360px] rounded-full bg-lav/10 blur-3xl"
        aria-hidden="true"
      />
      <ConstellationCanvas className="absolute inset-0 h-full w-full opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto w-full max-w-6xl"
        variants={stagger(0.09)}
        initial="hidden"
        animate="show"
      >
        {/* Mascot: inline on small screens, floating on the right from lg up */}
        <div className="mb-5 w-24 lg:absolute lg:right-0 lg:top-1/2 lg:mb-0 lg:w-64 lg:-translate-y-1/2">
          <motion.div variants={fadeUp}>
            <Mascot />
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-volt"
        >
          <Sparkle className="h-3.5 w-3.5" />
          PKS_SYSTEM <span className="text-slate-600">/</span> online
        </motion.p>

        <motion.h1
          id="hero-heading"
          variants={fadeUp}
          className="mt-5 font-semibold uppercase leading-tight text-white"
        >
          <span className="block text-lg tracking-[0.5em] text-slate-300 sm:text-2xl">P K S</span>
          <span className="block text-[clamp(1.9rem,8.6vw,5rem)] tracking-[0.16em] sm:tracking-[0.2em]">
            Prakeerthi
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 font-mono text-xs text-lav-soft sm:text-sm">
          {profile.subtitle}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-slate-100 sm:text-4xl"
        >
          Building applications. <span className="text-gradient">Understanding how they break.</span> Learning how to
          secure them.
        </motion.p>

        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base text-slate-400 sm:text-lg">
          {profile.summary}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
          <Btn label="Explore My Work" icon={ArrowDown} variant="primary" onClick={onExplore} />
          <Btn label="View Resume" icon={FileText} href={LINKS.resume} />
          <Btn label="GitHub" icon={Github} href={LINKS.github} />
          <Btn label="LinkedIn" icon={Linkedin} href={LINKS.linkedin} />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-10 hidden font-mono text-[11px] text-slate-500 md:block">
          tip: press <kbd className="rounded border border-white/15 px-1.5 py-0.5">Ctrl</kbd> +{' '}
          <kbd className="rounded border border-white/15 px-1.5 py-0.5">K</kbd> to open the command palette
        </motion.p>
      </motion.div>
    </section>
  );
}
