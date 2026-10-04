import Sparkle from './Sparkle';

/**
 * "Shieldie" — a tiny kawaii shield. Floats gently, blinks now and then.
 * Decorative only (aria-hidden); animations are neutralised by prefers-reduced-motion.
 */
export default function Mascot({ className = '' }: { className?: string }) {
  const eye = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Sparkle className="absolute -left-2 top-2 h-5 w-5 text-mint" delay={0.4} />
      <Sparkle className="absolute -right-1 top-10 h-4 w-4 text-lav" delay={1.2} />
      <Sparkle className="absolute bottom-6 -left-4 h-3.5 w-3.5 text-volt" delay={2} />

      <svg viewBox="0 0 160 184" className="animate-float h-auto w-full drop-shadow-[0_10px_24px_rgba(255,158,207,0.28)]">
        <defs>
          <linearGradient id="shieldie-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc4e1" />
            <stop offset="0.6" stopColor="#e2d8ff" />
            <stop offset="1" stopColor="#c9b6ff" />
          </linearGradient>
        </defs>

        {/* shield body */}
        <path
          d="M80 10 140 32v50c0 40-25 70-60 90-35-20-60-50-60-90V32L80 10z"
          fill="url(#shieldie-fill)"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* inner shine */}
        <path
          d="M80 24 128 41v41c0 32-19 56-48 73-29-17-48-41-48-73V41L80 24z"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />

        {/* eyes */}
        <g className="animate-blink" style={eye}>
          <ellipse cx="60" cy="80" rx="8" ry="10.5" fill="#2a1f3d" />
          <circle cx="63" cy="76" r="3" fill="#fff" />
        </g>
        <g className="animate-blink" style={eye}>
          <ellipse cx="100" cy="80" rx="8" ry="10.5" fill="#2a1f3d" />
          <circle cx="103" cy="76" r="3" fill="#fff" />
        </g>

        {/* blush + smile */}
        <ellipse cx="48" cy="98" rx="9" ry="5.5" fill="#ff8fc2" fillOpacity="0.55" />
        <ellipse cx="112" cy="98" rx="9" ry="5.5" fill="#ff8fc2" fillOpacity="0.55" />
        <path d="M70 100q10 10 20 0" fill="none" stroke="#2a1f3d" strokeWidth="3.2" strokeLinecap="round" />

        {/* tiny padlock charm */}
        <rect x="68" y="126" width="24" height="18" rx="5" fill="#fff" fillOpacity="0.85" />
        <path d="M73 126v-5a7 7 0 0 1 14 0v5" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="3.2" />
        <circle cx="80" cy="135" r="2.4" fill="#c4608f" />
      </svg>
    </div>
  );
}
