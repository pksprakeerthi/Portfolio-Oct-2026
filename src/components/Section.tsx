import type { ReactNode } from 'react';
import Reveal from './Reveal';
import Sparkle from './Sparkle';

interface SectionProps {
  id: string;
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Section({ id, index, kicker, title, subtitle, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative scroll-mt-16 px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 md:mb-14">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-volt">
            <Sparkle className="h-3.5 w-3.5 shrink-0 text-lav" />
            <span>
              {index} <span className="text-slate-500">/</span> {kicker}
            </span>
          </p>
          <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 max-w-2xl text-base text-slate-400">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
