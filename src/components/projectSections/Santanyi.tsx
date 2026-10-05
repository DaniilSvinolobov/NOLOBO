import React from 'react';
import { INK, PAPER, Dim, Figure, Label, Marker, Patterns, Rubble, Sun, rowState } from './primitives';

/**
 * Espacio Santanyí. Section through the room: east window on the left,
 * a kitchen block carved from one piece of stone, a lime wall on the right.
 * Rows: 1 room · 2 light · 3 hand.
 */
export const Santanyi: React.FC<{ active: number | null }> = ({ active }) => {
  const { c, o, on } = rowState(active);
  const F = 176; // floor
  const T = 142; // top of the block

  // Rays: low morning sun through the window, landing on the lime wall.
  const slope = 0.14;
  const rays = [58, 68, 78].map((y) => ({ yStart: y - slope * 34, yEnd: y + slope * 226 }));
  const block = `M108,${F} L108,${T} L150,${T} L150,${T + 14} L190,${T + 14} L190,${T} L236,${T} L236,${F} Z`;

  return (
    <svg viewBox="0 0 320 214" className="w-full h-auto" fill="none" strokeWidth="0.9" role="img" aria-label="Section through the room">
      <Patterns id="sa" />

      {/* Slabs: stone floor, ceiling */}
      <rect x="14" y={F} width="278" height="8" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <rect x="14" y={F} width="278" height="8" fill="url(#sa-strata)" stroke="none" />
      <rect x="14" y="32" width="278" height="6" fill={INK} stroke="none" />

      {/* Left wall with the east window, splayed inwards */}
      <rect x="14" y="38" width="26" height={F - 38} fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <Rubble x={14} y={38} w={26} h={F - 38} seed={31} course={8} sw={0.45} />
      <polygon points="14,56 40,48 40,88 14,80" fill={PAPER} stroke="none" />
      <g stroke={INK} strokeWidth="1.1">
        <line x1="14" y1="56" x2="40" y2="48" />
        <line x1="14" y1="80" x2="40" y2="88" />
      </g>
      <line x1="20" y1="57" x2="20" y2="79" stroke={INK} strokeWidth="0.7" />

      {/* 2 · Light: low sun from the east, softened by the lime wall */}
      <g opacity={o(1)}>
        <Sun x={24} y={22} color={c(1)} r={4} />
        <Label x={36} y={25} color={c(1)} opacity={0.9}>EAST</Label>
        {rays.map((r) => (
          <line key={r.yEnd} x1="6" y1={r.yStart} x2="264" y2={r.yEnd} stroke={c(1)} strokeDasharray="4 3" />
        ))}
        {rays.map((r, i) => (
          <g key={`s${i}`} stroke={c(1)} strokeOpacity="0.6" strokeDasharray="1 2.2">
            <path d={`M262,${r.yEnd - 5} A${6 + i * 2},${6 + i * 2} 0 0 0 262,${r.yEnd + 5}`} />
            <path d={`M260,${r.yEnd - 11} A${13 + i * 2},${13 + i * 2} 0 0 0 260,${r.yEnd + 11}`} />
          </g>
        ))}
      </g>

      {/* Right wall: lime */}
      <rect x="266" y="38" width="26" height={F - 38} fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <rect x="266" y="38" width="26" height={F - 38} fill="url(#sa-lime)" stroke="none" />
      <Label x={279} y={197} anchor="middle" opacity={0.7}>LIME</Label>

      {/* 1 · Room: the kitchen carved from one block. Basin and niche are cut out of it */}
      <g opacity={o(0)}>
        <path d={block} fill={PAPER} stroke={c(0)} strokeWidth="1.3" />
        <path d={block} fill="url(#sa-strata)" stroke="none" />
        <rect x="214" y="152" width="14" height="16" fill={PAPER} stroke={c(0)} strokeWidth="0.9" />
        <Dim x1={108} y1={196} x2={236} y2={196} color={c(0)} />
        <Label x={172} y={207} anchor="middle" color={c(0)} opacity={0.9}>ONE BLOCK</Label>
      </g>

      <Figure x={72} y={F} s={5} />

      {/* 3 · Hand: brass tap, the one place the hand lands */}
      <g opacity={o(2)}>
        <path d={`M204,${T} L204,122 Q204,112 194,112 L176,112 L176,124`} stroke={c(2)} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="204" y1="126" x2="214" y2="120" stroke={c(2)} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="214" cy="120" r="10" stroke={c(2)} strokeDasharray="2 2.5" />
        <Label x={226} y={138} color={c(2)} opacity={0.9}>BRASS</Label>
      </g>

      <Marker x={120} y={160} n={1} on={on(0)} />
      <Marker x={250} y={60} n={2} on={on(1)} />
      <Marker x={240} y={120} n={3} on={on(2)} />
    </svg>
  );
};
