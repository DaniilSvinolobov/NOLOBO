import React from 'react';
import { ACCENT, INK, PAPER, Figure, Head, Label, Marker, Patterns, Rubble, Sun, rowState } from './primitives';

/**
 * Casa Tramuntana. Section through a 38° terraced slope, sea on the right.
 * Rows: 1 slope · 2 sun · 3 air · 4 stone · 5 road.
 */
export const Tramuntana: React.FC<{ active: number | null }> = ({ active }) => {
  const { c, o, on } = rowState(active);

  // Terraces: tread 18, riser 14, the average being 38°. Corners lie on the 38° line from the crest.
  const treads = Array.from({ length: 8 }, (_, k) => ({ x: 20 + 18 * k, y: 24 + 14 * k }));
  const surface =
    treads.map((t) => `${t.x === 20 ? 'M' : 'L'}${t.x},${t.y} L${t.x + 18},${t.y} L${t.x + 18},${t.y + 14}`).join(' ') +
    ' L164,136';
  // Ground after the cut: courtyard tread, then terraces down to the road.
  const earth = `${surface} L164,176 L218,176 L218,190 L236,190 L236,197 L268,197 L268,214 L20,214 Z`;

  return (
    <svg viewBox="0 0 320 214" className="w-full h-auto" fill="none" strokeWidth="0.9" role="img" aria-label="Section through the slope">
      <Patterns id="tr" />

      {/* Ground */}
      <path d={earth} fill="url(#tr-earth)" stroke="none" />

      {/* Original ground over the excavated wedge */}
      <path d="M164,136 L182,136 L182,150 L200,150 L200,164 L218,164" stroke={INK} strokeOpacity="0.35" strokeDasharray="2 2.5" />

      {/* 1 · Slope: the terrace profile, its 38° line and the angle */}
      <g opacity={o(0)}>
        <path d={surface} stroke={c(0)} strokeWidth="1.3" />
        <line x1="20" y1="24" x2="164" y2="136.5" stroke={c(0)} strokeOpacity="0.55" strokeDasharray="1.5 3" />
        <line x1="20" y1="24" x2="80" y2="24" stroke={INK} strokeOpacity="0.5" strokeDasharray="2 2" />
        <path d="M56,24 A36,36 0 0 1 48.4,46.2" stroke={c(0)} />
        <Label x={60} y={40} color={c(0)} opacity={1}>38°</Label>
      </g>

      {/* Olive trees on the terraces */}
      {[
        [83, 66],
        [119, 94],
        [155, 122],
      ].map(([x, y]) => (
        <g key={x} stroke={INK} strokeOpacity="0.75">
          <line x1={x} y1={y} x2={x} y2={y - 7} />
          <circle cx={x} cy={y - 11} r="4.6" fill={PAPER} strokeDasharray="2.2 1.2" />
          <path d={`M${x - 2},${y - 10} l1.6,-1.8 M${x + 1},${y - 12} l1.6,1.6`} strokeWidth="0.6" />
        </g>
      ))}

      {/* House: two stepped volumes under the terraces. Poché is solid. */}
      <rect x="103" y="123" width="31" height="23" fill={PAPER} stroke="none" />
      <rect x="138" y="155" width="26" height="21" fill={PAPER} stroke="none" />
      <g fill={INK} stroke="none">
        <rect x="100" y="118" width="38" height="5" />
        <rect x="100" y="146" width="38" height="4" />
        <rect x="134" y="118" width="4" height="63" />
        <rect x="134" y="176" width="30" height="5" />
      </g>
      {/* Cantilevered slab: the deep overhang (row 2) */}
      <rect x="134" y="150" width="48" height="5" fill={on(1) ? ACCENT : INK} stroke="none" />

      {/* Glazing on the courtyard side */}
      <g stroke={INK} strokeWidth="0.7">
        <line x1="163" y1="155" x2="163" y2="176" />
        <line x1="165.2" y1="155" x2="165.2" y2="176" />
        <line x1="163" y1="162" x2="165.2" y2="162" />
        <line x1="163" y1="169" x2="165.2" y2="169" />
      </g>

      <Figure x={118} y={146} />
      <Figure x={150} y={176} />

      {/* Courtyard floor */}
      <line x1="164" y1="176" x2="218" y2="176" stroke={INK} strokeWidth="1.3" />

      {/* 4 · Stone: the excavated stone comes back as the retaining wall and the terrace risers */}
      <g opacity={o(3)}>
        <rect x="96" y="80" width="7" height="70" fill={PAPER} stroke={c(3)} />
        <Rubble x={96} y={80} w={7} h={70} seed={7} course={6} stroke={c(3)} sw={0.5} />
        {treads.slice(0, 8).map((t) => (
          <g key={t.x}>
            <rect x={t.x + 18 - 1.6} y={t.y} width="3.2" height="14" fill={PAPER} stroke={c(3)} strokeWidth="0.6" />
            <line x1={t.x + 16.4} y1={t.y + 5} x2={t.x + 19.6} y2={t.y + 5} stroke={c(3)} strokeWidth="0.5" />
            <line x1={t.x + 16.4} y1={t.y + 9.5} x2={t.x + 19.6} y2={t.y + 9.5} stroke={c(3)} strokeWidth="0.5" />
          </g>
        ))}
        <g opacity={on(3) ? 1 : 0.3}>
          <path d="M196,146 C196,100 150,52 108,70" stroke={c(3)} strokeDasharray="2.5 3" />
          <Head x={104} y={74} angle={150} color={c(3)} size={4} />
        </g>
      </g>

      {/* 2 · Sun: afternoon sun from the west, stopped by the overhang */}
      <g opacity={o(1)}>
        <Sun x={262} y={30} color={c(1)} />
        <line x1="259" y1="35" x2="182" y2="155" stroke={c(1)} strokeDasharray="3.5 2.5" />
        <line x1="182" y1="155" x2="168.6" y2="176" stroke={c(1)} strokeOpacity="0.6" strokeDasharray="1 2.5" />
        <path d="M164,155 L182,155 L168.6,176 L164,176 Z" fill="url(#tr-shade)" stroke="none" />
      </g>

      {/* 3 · Air: sea air enters the courtyard in the evening */}
      <g opacity={o(2)} stroke={c(2)}>
        <path d="M300,162 C270,162 232,168 192,167" />
        <Head x={188} y={167} angle={178} color={c(2)} />
        <path d="M300,171 C276,171 252,173 214,172" strokeOpacity="0.55" />
        <Head x={210} y={172} angle={178} color={c(2)} />
      </g>

      {/* 5 · Road: the line of sight rises from the road and passes over the roofs */}
      <g opacity={o(4)}>
        <rect x="236" y="197" width="32" height="3" fill={c(4)} stroke="none" />
        <circle cx="246" cy="190" r="2.2" fill={c(4)} stroke="none" />
        <line x1="246" y1="192" x2="246" y2="197" stroke={c(4)} />
        <line x1="246" y1="190" x2="20" y2="24" stroke={c(4)} strokeDasharray="4 3" />
      </g>

      {/* Sea */}
      <rect x="268" y="197" width="52" height="17" fill="url(#tr-water)" stroke="none" />
      <line x1="268" y1="197" x2="320" y2="197" stroke={INK} strokeOpacity="0.6" />
      <Label x={303} y={209} anchor="middle">SEA</Label>
      <Label x={252} y={210} anchor="middle">COAST ROAD</Label>

      <Marker x={104} y={52} n={1} on={on(0)} />
      <Marker x={286} y={30} n={2} on={on(1)} />
      <Marker x={309} y={160} n={3} on={on(2)} />
      <Marker x={86} y={112} n={4} on={on(3)} />
      <Marker x={262} y={180} n={5} on={on(4)} />
    </svg>
  );
};
