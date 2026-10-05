import React from 'react';
import { ACCENT, INK, PAPER, Figure, Head, Label, Marker, Patterns, Sun, rowState } from './primitives';

/**
 * Pavilion Cala Llamp. Section at the cliff edge, sea on the right.
 * Rows: 1 salt · 2 edge · 3 sun.
 */
export const CalaLlamp: React.FC<{ active: number | null }> = ({ active }) => {
  const { c, o, on } = rowState(active);
  const EDGE = 186;

  return (
    <svg viewBox="0 0 320 214" className="w-full h-auto" fill="none" strokeWidth="0.9" role="img" aria-label="Section at the cliff edge">
      <Patterns id="cl" />

      {/* Rock and cliff face */}
      <path d={`M10,132 L${EDGE},132 L182,150 L190,166 L184,184 L192,200 L192,214 L10,214 Z`} fill="url(#cl-rock)" stroke="none" />
      <path d={`M${EDGE},132 L182,150 L190,166 L184,184 L192,200`} stroke={INK} strokeWidth="1.3" />
      <line x1="10" y1="132" x2={EDGE} y2="132" stroke={INK} strokeWidth="1.3" />

      {/* Sea */}
      <rect x="192" y="200" width="128" height="14" fill="url(#cl-water)" stroke="none" />
      <line x1="192" y1="200" x2="320" y2="200" stroke={INK} strokeOpacity="0.6" />
      <Label x={300} y={209} anchor="middle">SEA</Label>

      {/* Stone plinth */}
      <rect x="100" y="128" width="56" height="4" fill={INK} stroke="none" />

      {/* Lime plaster wall at the back */}
      <g opacity={o(0)}>
        <rect x="96" y="64" width="8" height="58" fill={PAPER} stroke={c(0)} strokeWidth="1.1" />
        <rect x="96" y="64" width="8" height="58" fill="url(#cl-lime)" stroke="none" />
        <Label x={90} y={96} anchor="end" color={c(0)} opacity={0.85}>LIME</Label>
        <line x1="92" y1="94" x2="96" y2="94" stroke={c(0)} />
      </g>

      {/* Floor and the stainless steel cantilever (rows 1 and 2) */}
      <g fill={on(1) || on(0) ? ACCENT : INK} stroke="none">
        <rect x="96" y="122" width={104} height="3" />
        <polygon points="128,125 200,125 200,127.5 128,134" />
      </g>
      <g opacity={o(0)}>
        <Label x={208} y={129} color={c(0)} opacity={0.85}>STEEL</Label>
        <line x1="201" y1="126" x2="206" y2="126" stroke={c(0)} />
      </g>

      {/* Roof: a thin steel plate, a deep overhang */}
      <polygon points="96,61 206,61 206,63.5 190,67 96,67" fill={on(2) || on(0) ? (on(2) ? ACCENT : INK) : INK} stroke="none" />

      {/* Low-iron glass on the sea side */}
      <g opacity={o(0)} stroke={c(0)} strokeWidth="0.8">
        <line x1="171.5" y1="67" x2="171.5" y2="122" />
        <line x1="173.5" y1="67" x2="173.5" y2="122" />
        {[84, 102].map((y) => (
          <line key={y} x1="171.5" y1={y} x2="173.5" y2={y} />
        ))}
        <line x1="176" y1="96" x2="210" y2="96" strokeDasharray="1.5 1.5" strokeOpacity="0.7" />
        <Label x={212} y={98} color={c(0)} opacity={0.85}>LOW-IRON GLASS</Label>
      </g>

      <Figure x={138} y={122} s={3.1} />

      {/* 2 · Edge: the mass stays back, only the plate reaches out */}
      <g opacity={o(1)}>
        <line x1={EDGE} y1="40" x2={EDGE} y2="132" stroke={c(1)} strokeDasharray="2 3" />
        <Label x={EDGE + 4} y={50} color={c(1)} opacity={0.9}>EDGE</Label>
        <path d={`M104,138 L${EDGE},138`} stroke={c(1)} strokeWidth="0.7" />
        <path d={`M104,135 L104,141 M${EDGE},135 L${EDGE},141`} stroke={c(1)} strokeWidth="0.7" />
      </g>

      {/* 3 · Sun: high afternoon sun from the south-west, stopped by the eave */}
      <g opacity={o(2)}>
        <Sun x={244} y={22} color={c(2)} />
        <line x1="241" y1="27" x2="206" y2="65" stroke={c(2)} strokeDasharray="3.5 2.5" />
        <line x1="206" y1="65" x2="172" y2="114" stroke={c(2)} strokeOpacity="0.6" strokeDasharray="1 2.5" />
        <path d="M172,67 L206,67 L172,114 Z" fill="url(#cl-shade)" stroke="none" />
      </g>

      {/* 1 · Salt: air carries it up the cliff to the building */}
      <g opacity={o(0)} stroke={c(0)}>
        <path d="M300,188 C262,188 232,170 208,142" strokeWidth="1.3" strokeDasharray="0.1 3.6" strokeLinecap="round" />
        <path d="M296,176 C266,176 242,160 222,140" strokeWidth="1" strokeDasharray="0.1 3.6" strokeLinecap="round" strokeOpacity="0.6" />
        <Head x={205} y={138} angle={-125} color={c(0)} size={4} />
      </g>

      <Marker x={266} y={170} n={1} on={on(0)} />
      <Marker x={EDGE - 12} y={46} n={2} on={on(1)} />
      <Marker x={266} y={22} n={3} on={on(2)} />
    </svg>
  );
};
