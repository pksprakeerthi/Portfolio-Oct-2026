import { useState } from 'react';
import { credibilitySamples } from '../data/projects';

function Meter({ label, value, tone }: { label: string; value: number; tone: 'volt' | 'lav' }) {
  const filled = Math.round(value / 10);
  return (
    <div className="grid grid-cols-[110px_1fr_44px] items-center gap-3 font-mono text-xs sm:grid-cols-[130px_1fr_48px]">
      <span className="text-slate-400">{label}</span>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="flex gap-[3px]"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-[2px] transition-colors duration-300 ${
              i < filled ? (tone === 'volt' ? 'bg-volt' : 'bg-lav') : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <span className="text-right text-slate-200">{value}%</span>
    </div>
  );
}

/**
 * Visual mock-up of the InfluenceLens interface.
 * All numbers are ILLUSTRATIVE sample data — it is NOT a real scanner.
 */
export default function CredibilityPanel({ compact = false }: { compact?: boolean }) {
  const [sampleId, setSampleId] = useState(credibilitySamples[0].id);
  const sample = credibilitySamples.find((s) => s.id === sampleId) ?? credibilitySamples[0];

  const R = 42;
  const C = 2 * Math.PI * R;

  return (
    <div className={`glass rounded-3xl ${compact ? 'p-5' : 'p-6 sm:p-7'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs tracking-[0.2em] text-volt">CASE #001</p>
        <p className="rounded border border-lav/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lav-soft">
          interface preview
        </p>
      </div>
      <p className="mt-1 font-mono text-sm tracking-[0.15em] text-white">CONTENT ANALYSIS</p>

      <div role="tablist" aria-label="Sample content category" className="mt-4 flex flex-wrap gap-2">
        {credibilitySamples.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === sampleId}
            onClick={() => setSampleId(s.id)}
            className={`min-h-[36px] rounded-full border px-3 text-xs transition-colors ${
              s.id === sampleId
                ? 'border-volt bg-volt/15 text-white'
                : 'border-white/15 text-slate-400 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <Meter label="Evidence" value={sample.evidence} tone="volt" />
        <Meter label="Source Quality" value={sample.source} tone="volt" />
        <Meter label="Risk Signals" value={sample.risk} tone="lav" />
      </div>

      <div className="mt-6 flex items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-24 w-24 shrink-0 -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#cred-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - sample.score / 100)}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
          <defs>
            <linearGradient id="cred-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff9ecf" />
              <stop offset="100%" stopColor="#c9b6ff" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Content credibility</p>
          <p className="mt-1 text-4xl font-semibold text-white">
            {sample.score}
            <span className="text-xl text-slate-500"> / 100</span>
          </p>
        </div>
      </div>

      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
        Illustrative sample values for the project interface — not real analysis output, and not a security scanner.
      </p>
    </div>
  );
}
