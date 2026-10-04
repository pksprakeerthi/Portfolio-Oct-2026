import type { LucideIcon } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { isLinkSet, PLACEHOLDER_HINT } from '../lib/links';

interface BtnProps {
  label: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'ghost';
  className?: string;
  /** Link mode: pass `href` (even '') to make this a link / placeholder. */
  href?: string;
  external?: boolean;
  download?: string;
  /** Button mode: pass `onClick`. */
  onClick?: () => void;
}

const BASE =
  'group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-[box-shadow,background-color,border-color,color] duration-200';

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-volt to-lav text-ink-950 shadow-glow hover:shadow-[0_0_32px_rgba(255,158,207,0.45)]',
  ghost:
    'glass text-slate-100 hover:border-volt/50 hover:text-white hover:shadow-glow',
};

const PLACEHOLDER =
  'cursor-not-allowed rounded-full border border-dashed border-slate-600 bg-transparent text-slate-400';

export default function Btn({
  label,
  icon: Icon,
  variant = 'ghost',
  className = '',
  href,
  external = true,
  download,
  onClick,
}: BtnProps) {
  const magnet = useMagnetic<HTMLSpanElement>();
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{label}</span>
    </>
  );

  let control: JSX.Element;

  if (href !== undefined && !isLinkSet(href)) {
    control = (
      <button
        type="button"
        aria-disabled="true"
        title={PLACEHOLDER_HINT}
        aria-label={`${label} (link not added yet)`}
        className={`${BASE} ${PLACEHOLDER}`}
        onClick={(e) => e.preventDefault()}
      >
        {content}
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">add link</span>
      </button>
    );
  } else if (href !== undefined) {
    const isExternal = external && /^https?:/i.test(href);
    control = (
      <a
        href={href}
        download={download}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`${BASE} ${VARIANTS[variant]}`}
      >
        {content}
      </a>
    );
  } else {
    control = (
      <button type="button" onClick={onClick} className={`${BASE} ${VARIANTS[variant]}`}>
        {content}
      </button>
    );
  }

  return (
    <span
      ref={magnet.ref}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
    >
      {control}
    </span>
  );
}
