import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LevelBadge from './LevelBadge';
import { panelSwap } from '../animations/variants';
import { graphCenter, graphEdges, graphNodes } from '../data/graph';
import type { GraphNode } from '../data/graph';
import { useFinePointer } from '../hooks/useMediaQuery';

const RADIUS = 37; // % of the container, for orbiting nodes

interface Positioned extends GraphNode {
  x: number;
  y: number;
}

export default function MindMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const finePointer = useFinePointer();

  const nodes: Positioned[] = useMemo(
    () => [
      { ...graphCenter, x: 50, y: 50 },
      ...graphNodes.map((n, i) => {
        const angle = ((-90 + (360 / graphNodes.length) * i) * Math.PI) / 180;
        return { ...n, x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
      }),
    ],
    [],
  );

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const edges: [string, string][] = useMemo(
    () => [...graphNodes.map((n): [string, string] => ['center', n.id]), ...graphEdges],
    [],
  );

  const active = hovered ?? selected;
  const shown = byId.get(selected ?? hovered ?? 'center') ?? nodes[0];
  const isPreview = !selected && !!hovered;
  const tooltipNode = finePointer && hovered && hovered !== selected ? byId.get(hovered) : undefined;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Graph */}
      <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[640px]">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map(([a, b]) => {
            const A = byId.get(a);
            const B = byId.get(b);
            if (!A || !B) return null;
            const on = !!active && (a === active || b === active);
            return (
              <line
                key={`${a}-${b}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke={on ? '#ff9ecf' : 'rgba(255,255,255,0.13)'}
                strokeWidth={on ? 1.6 : 1}
                vectorEffect="non-scaling-stroke"
                style={{
                  transition: 'stroke 0.25s ease, stroke-width 0.25s ease',
                  filter: on ? 'drop-shadow(0 0 4px rgba(255, 158, 207,0.7))' : undefined,
                }}
              />
            );
          })}
        </svg>

        {nodes.map((n) => {
          const isCenter = n.id === 'center';
          const isSelected = selected === n.id;
          const isActive = active === n.id;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
              aria-pressed={isSelected}
              aria-label={isCenter ? 'Prakeerthi — overview' : n.label}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 text-center transition-[box-shadow,border-color,background-color,color] duration-200 ${
                isCenter
                  ? 'flex h-[84px] w-[84px] items-center justify-center rounded-full px-1 font-mono text-[10px] font-semibold tracking-[0.12em] sm:h-28 sm:w-28 sm:text-xs'
                  : 'flex min-h-[44px] max-w-[96px] items-center justify-center rounded-3xl px-2.5 py-2 text-[11px] font-medium leading-tight sm:max-w-[140px] sm:px-3.5 sm:text-sm'
              } ${
                isSelected
                  ? 'border border-volt bg-volt/15 text-white shadow-glow'
                  : isActive
                    ? 'border border-volt/70 bg-ink-800 text-white shadow-glow'
                    : isCenter
                      ? 'border border-lav/50 bg-ink-800 text-lav-soft'
                      : 'glass text-slate-300'
              }`}
            >
              {n.label}
            </button>
          );
        })}

        {tooltipNode && (
          <div
            className="glass pointer-events-none absolute z-20 w-56 rounded-xl p-3 text-xs leading-relaxed text-slate-300 shadow-xl"
            style={{
              left: `${Math.min(Math.max(tooltipNode.x, 24), 76)}%`,
              top: `${tooltipNode.y}%`,
              transform: `translate(-50%, ${tooltipNode.y > 50 ? 'calc(-100% - 34px)' : '34px'})`,
            }}
          >
            <span className="font-semibold text-white">{tooltipNode.label}</span>
            <br />
            {tooltipNode.summary}
          </div>
        )}
      </div>

      {/* Info panel */}
      <div className="glass min-h-[300px] rounded-3xl p-6 sm:p-7" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={shown.id} variants={panelSwap} initial="initial" animate="animate" exit="exit">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              {isPreview ? 'preview — click to pin' : selected ? 'node selected' : 'select a node'}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold text-white">{shown.label}</h3>
              {shown.level && <LevelBadge level={shown.level} />}
            </div>
            <p className="mt-3 text-slate-400">{shown.summary}</p>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-volt">Focus</p>
            <ul className="mt-2 grid gap-1.5 text-sm text-slate-200 sm:grid-cols-2">
              {shown.focus.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            {shown.related.length > 0 && (
              <>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-lav">Connected to</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {shown.related.map((id) => {
                    const r = byId.get(id);
                    if (!r) return null;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelected(id)}
                        className="min-h-[36px] rounded-full border border-white/15 px-3 text-xs text-slate-300 hover:border-lav/60 hover:text-white"
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
