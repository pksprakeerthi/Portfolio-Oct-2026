import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import Reveal from '../components/Reveal';
import Btn from '../components/Btn';
import { LINKS, profile } from '../data/profile';
import { mailto } from '../lib/links';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-16 overflow-hidden px-5 pb-10 pt-24 sm:px-8 md:pt-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-lav/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-volt">
            06 <span className="text-slate-500">/</span> Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Let's build something <span className="text-gradient">secure.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            I'm a student working toward a career in Application Security. If you're working on something related, I'd
            like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
          <Btn label="LinkedIn" icon={Linkedin} href={LINKS.linkedin} />
          <Btn label="GitHub" icon={Github} href={LINKS.github} />
          <Btn label="Email" icon={Mail} variant="primary" href={mailto(LINKS.email)} />
          <Btn
            label="Download Resume"
            icon={FileText}
            href={LINKS.resume}
            external={false}
            download={profile.resumeDownloadName}
          />
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 max-w-6xl border-t border-white/10 pt-6 text-center font-mono text-[11px] text-slate-600">
        © {new Date().getFullYear()} {profile.fullName} · Built with React, TypeScript, Vite, Tailwind CSS &amp; Framer
        Motion
      </footer>
    </section>
  );
}
