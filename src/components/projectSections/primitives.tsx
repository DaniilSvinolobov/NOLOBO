import React from 'react';

export const INK = '#0E0E0E';
export { ACCENT } from '../../theme';
import { ACCENT } from '../../theme';
export const PAPER = '#F5F5F2';
export const MONO = 'JetBrains Mono, ui-monospace, monospace';

/** Which reasoning row is highlighted. Everything tied to another row dims. */
export const rowState = (active: number | null) => ({
  c: (i: number) => (active === i ? ACCENT : INK),
  o: (i: number) => (active === null || active === i ? 1 : 0.28),
  on: (i: number) => active === i,
});

/** Numbered marker: ties a part of the drawing to a row of the reasoning table. */
export const Marker: React.FC<{ x: number; y: number; n: number; on: boolean }> = ({ x, y, n, on }) => (
  <g>
    <rect x={x - 6} y={y - 6} width="12" height="12" fill={PAPER} stroke={on ? ACCENT : INK} strokeWidth="0.8" />
    <text x={x} y={y + 2.8} textAnchor="middle" fontSize="7.5" fontFamily={MONO} fill={on ? ACCENT : INK} stroke="none">
      {n}
    </text>
  </g>
);

/** Small uppercase annotation. */
export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
  opacity?: number;
}> = ({ x, y, children, anchor = 'start', color = INK, opacity = 0.55 }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize="6"
    letterSpacing="0.6"
    fontFamily={MONO}
    fill={color}
    fillOpacity={opacity}
    stroke="none"
  >
    {children}
  </text>
);

/** Arrowhead at (x, y) pointing along angle (degrees, 0 = right, 90 = down). */
export const Head: React.FC<{ x: number; y: number; angle: number; color?: string; size?: number }> = ({
  x,
  y,
  angle,
  color = INK,
  size = 4.5,
}) => (
  <polygon
    points={`0,0 ${-size},${-size * 0.45} ${-size},${size * 0.45}`}
    transform={`translate(${x} ${y}) rotate(${angle})`}
    fill={color}
    stroke="none"
  />
);

export const Sun: React.FC<{ x: number; y: number; color?: string; r?: number }> = ({ x, y, color = INK, r = 5 }) => (
  <g stroke={color} fill={PAPER}>
    <circle cx={x} cy={y} r={r} />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      return (
        <line
          key={i}
          x1={x + Math.cos(a) * (r + 2)}
          y1={y + Math.sin(a) * (r + 2)}
          x2={x + Math.cos(a) * (r + 4.5)}
          y2={y + Math.sin(a) * (r + 4.5)}
        />
      );
    })}
  </g>
);

/** Dimension line with end ticks. Unlabelled on purpose: the drawings explain, they don't measure. */
export const Dim: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({
  x1,
  y1,
  x2,
  y2,
  color = INK,
}) => {
  const a = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
  const t = 3;
  const dx = Math.cos(a) * t;
  const dy = Math.sin(a) * t;
  return (
    <g stroke={color} strokeWidth="0.7">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <line x1={x1 - dx} y1={y1 - dy} x2={x1 + dx} y2={y1 + dy} />
      <line x1={x2 - dx} y1={y2 - dy} x2={x2 + dx} y2={y2 + dy} />
    </g>
  );
};

/** Deterministic pseudo-random numbers, so drawings never change between renders. */
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Coursed rubble masonry inside a rectangle, drawn as one hairline path. */
export const Rubble: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  seed?: number;
  course?: number;
  stroke?: string;
  sw?: number;
}> = ({ x, y, w, h, seed = 1, course = 7, stroke = INK, sw = 0.45 }) => {
  const r = rng(seed);
  let d = '';
  let cy = y;
  while (cy < y + h - 1) {
    const ch = Math.min(course * (0.8 + r() * 0.5), y + h - cy);
    let cx = x - r() * 6;
    while (cx < x + w) {
      const cw = 7 + r() * 9;
      const x0 = Math.max(cx, x);
      const x1 = Math.min(cx + cw, x + w);
      if (x1 - x0 > 1.5) {
        const j = () => (r() - 0.5) * 1.2;
        d += `M${x0},${cy + j() * 0.4} L${x1},${cy + j() * 0.4} L${x1 + j()},${cy + ch} L${x0 + j()},${cy + ch} Z `;
      }
      cx += cw;
    }
    cy += ch;
  }
  return <path d={d} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
};

/** Shared patterns. Each drawing mounts these once under its own id prefix. */
export const Patterns: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <pattern id={`${id}-earth`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.45" strokeOpacity="0.38" />
    </pattern>
    <pattern id={`${id}-rock`} width="9" height="9" patternUnits="userSpaceOnUse">
      <path d="M0,9 L9,0 M-2,2 L2,-2 M7,11 L11,7" stroke={INK} strokeWidth="0.45" strokeOpacity="0.4" />
      <path d="M2,6 L3.4,6 M6,3 L7.4,3" stroke={INK} strokeWidth="0.5" strokeOpacity="0.5" />
    </pattern>
    <pattern id={`${id}-shade`} width="3.2" height="3.2" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="0.4" fill={INK} fillOpacity="0.45" />
    </pattern>
    <pattern id={`${id}-water`} width="8" height="4" patternUnits="userSpaceOnUse">
      <path d="M0,2 Q2,0.5 4,2 T8,2" fill="none" stroke={INK} strokeWidth="0.45" strokeOpacity="0.5" />
    </pattern>
    <pattern id={`${id}-lime`} width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.35" fill={INK} fillOpacity="0.4" />
      <circle cx="3" cy="3" r="0.3" fill={INK} fillOpacity="0.3" />
    </pattern>
    <pattern id={`${id}-strata`} width="12" height="3.4" patternUnits="userSpaceOnUse">
      <path d="M0,1.7 Q6,0.9 12,1.7" fill="none" stroke={INK} strokeWidth="0.4" strokeOpacity="0.45" />
    </pattern>
  </defs>
);

/** Standing figure, about 11 units tall, feet at (x, y). Gives the section a human scale. */
export const Figure: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = INK }) => (
  <g stroke={color} strokeWidth="0.8" strokeLinecap="round" transform={`translate(${x} ${y}) scale(${s})`} fill="none">
    <circle cx="0" cy="-9.6" r="1.5" fill={PAPER} vectorEffect="non-scaling-stroke" />
    <path d="M0,-8 L0,-3.6 M0,-3.6 L-1.6,0 M0,-3.6 L1.6,0 M0,-7 L-2,-4.2 M0,-7 L2,-4.2" vectorEffect="non-scaling-stroke" />
  </g>
);
