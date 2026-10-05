import React from 'react';
import { ACCENT, INK, PAPER, Figure, Head, Label, Marker, Patterns, Rubble, Sun, rowState } from './primitives';

/**
 * Ático Calatrava. Section through a 17th-century attic, street on the left.
 * Rows: 1 partitions · 2 walls · 3 floor.
 */
export const Calatrava: React.FC<{ active: number | null }> = ({ active }) => {
  const { c, o, on } = rowState(active);

  // Roof: outer line and a timber band 6 thick. Ridge at x = 160.
  const roofY = (x: number) => 98 - 0.45 * (x <= 160 ? x - 40 : 280 - x);
  const roofBand = `M40,${roofY(40)} L160,${roofY(160)} L280,${roofY(280)} L280,${roofY(280) + 6} L160,${roofY(160) + 6} L40,${roofY(40) + 6} Z`;
  const under = (x: number) => roofY(x) + 6;

  const partitions = [118, 166, 214];
  const beams = Array.from({ length: 11 }, (_, i) => 80 + i * 16);

  return (
    <svg viewBox="0 0 320 214" className="w-full h-auto" fill="none" strokeWidth="0.9" role="img" aria-label="Section through the attic">
      <Patterns id="at" />

      {/* Street level */}
      <rect x="10" y="198" width="300" height="8" fill="url(#at-earth)" stroke="none" />
      <line x1="10" y1="198" x2="310" y2="198" stroke={INK} strokeWidth="1.2" />
      <Label x={14} y={190}>STREET</Label>

      {/* Lower storey, cut off: ceiling line and outline */}
      <rect x="72" y="173" width="176" height="25" stroke={INK} strokeOpacity="0.4" strokeDasharray="3 3" />

      {/* 2 · Walls: thick masonry, left and right, with deep window reveals */}
      <g opacity={o(1)}>
        {[44, 248].map((x, i) => (
          <g key={x}>
            <rect x={x} y="96" width="28" height="102" fill={PAPER} stroke={c(1)} strokeWidth="1.1" />
            <Rubble x={x} y={96} w={28} h={102} seed={11 + i} course={7} stroke={c(1)} sw={0.5} />
          </g>
        ))}
        {/* Openings, splayed inwards */}
        <polygon points="44,112 72,106 72,136 44,130" fill={PAPER} stroke="none" />
        <polygon points="276,112 248,106 248,136 276,130" fill={PAPER} stroke="none" />
        <g stroke={c(1)} strokeWidth="1.1">
          <line x1="44" y1="112" x2="72" y2="106" />
          <line x1="44" y1="130" x2="72" y2="136" />
          <line x1="276" y1="112" x2="248" y2="106" />
          <line x1="276" y1="130" x2="248" y2="136" />
        </g>
        <line x1="50" y1="113" x2="50" y2="129" stroke={INK} strokeWidth="0.7" />
        <line x1="270" y1="113" x2="270" y2="129" stroke={INK} strokeWidth="0.7" />

        {/* Street heat stops at the wall */}
        <Sun x={13} y={96} color={c(1)} />
        {[137, 151, 165].map((y) => (
          <g key={y}>
            <line x1="22" y1={y - 19} x2="41" y2={y} stroke={c(1)} strokeDasharray="3 2.5" />
            <line x1="41" y1={y - 3.5} x2="41" y2={y + 3.5} stroke={c(1)} strokeWidth="1.4" />
          </g>
        ))}
      </g>

      {/* Roof: timber band, tiles on top, a rooflight on the left slope */}
      <path d={roofBand} fill={PAPER} stroke="none" />
      <path d={roofBand} fill="url(#at-strata)" stroke={INK} strokeWidth="1" />
      <polygon points={`98,${roofY(98)} 118,${roofY(118)} 118,${under(118)} 98,${under(98)}`} fill={PAPER} stroke="none" />
      <g stroke={INK} strokeWidth="0.8">
        <line x1="98" y1={roofY(98) - 1.5} x2="118" y2={roofY(118) - 1.5} />
        <line x1="98" y1={roofY(98)} x2="98" y2={roofY(98) - 5} />
        <line x1="118" y1={roofY(118)} x2="118" y2={roofY(118) - 5} />
      </g>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 48 + i * 10;
        return x < 98 || x > 118 ? (
          <line key={x} x1={x} y1={roofY(x) - 0.2} x2={x} y2={roofY(x) - 3} stroke={INK} strokeWidth="0.5" strokeOpacity="0.6" />
        ) : null;
      })}

      {/* 3 · Floor: stone slabs left bare, on timber beams */}
      <g opacity={o(2)}>
        <rect x="72" y="150" width="176" height="7" fill={PAPER} stroke={c(2)} strokeWidth="1.2" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={72 + 22 * (i + 1)} y1="150" x2={72 + 22 * (i + 1)} y2="157" stroke={c(2)} strokeWidth="0.7" />
        ))}
        <line x1="72" y1="153.5" x2="248" y2="153.5" stroke={c(2)} strokeWidth="0.4" strokeOpacity="0.6" />
      </g>
      {beams.map((x) => (
        <g key={x} stroke={INK} strokeWidth="0.6">
          <rect x={x - 4} y="157" width="8" height="14" fill={PAPER} />
          <path d={`M${x - 4},157 L${x + 4},171 M${x + 4},157 L${x - 4},171`} strokeOpacity="0.5" />
        </g>
      ))}

      {/* 1 · Partitions: removed. Light and air cross the whole floor */}
      <g opacity={o(0)}>
        {partitions.map((x) => (
          <g key={x} stroke={c(0)}>
            <line x1={x - 1.5} y1="150" x2={x - 1.5} y2={under(x) + 1} strokeDasharray="2.5 2.5" strokeOpacity="0.85" />
            <line x1={x + 1.5} y1="150" x2={x + 1.5} y2={under(x) + 1} strokeDasharray="2.5 2.5" strokeOpacity="0.85" />
            <path d={`M${x - 5},104 L${x + 5},114 M${x + 5},104 L${x - 5},114`} strokeWidth="1.1" />
          </g>
        ))}
        <Label x={190} y={145} anchor="middle" color={c(0)} opacity={0.9}>REMOVED</Label>

        {/* Daylight through the rooflight */}
        {[
          [100, 70],
          [108, 66],
          [116, 63],
        ].map(([x, y]) => (
          <line key={x} x1={x} y1={y + 1} x2={x + 0.5 * (146 - y)} y2="146" stroke={c(0)} strokeOpacity="0.8" strokeDasharray="3 2.5" />
        ))}

        {/* Air from window to window */}
        <line x1="74" y1="121" x2="240" y2="121" stroke={c(0)} />
        <Head x={246} y={121} angle={0} color={c(0)} />
        <line x1="74" y1="130" x2="228" y2="130" stroke={c(0)} strokeOpacity="0.5" />
        <Head x={234} y={130} angle={0} color={c(0)} />
      </g>

      <Figure x={190} y={150} s={3.4} />

      <Marker x={232} y={96} n={1} on={on(0)} />
      <Marker x={58} y={160} n={2} on={on(1)} />
      <Marker x={236} y={141} n={3} on={on(2)} />
    </svg>
  );
};
