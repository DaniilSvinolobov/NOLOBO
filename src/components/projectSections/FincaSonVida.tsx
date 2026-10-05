import React from 'react';
import { ACCENT, INK, PAPER, Figure, Label, Marker, Patterns, Rubble, Sun, rowState } from './primitives';

/**
 * Finca Son Vida. Section: pool, new steel gallery, old fieldstone finca on the right.
 * Rows: 1 fieldstone · 2 new use · 3 pool.
 */
export const FincaSonVida: React.FC<{ active: number | null }> = ({ active }) => {
  const { c, o, on } = rowState(active);
  const G = 156; // ground

  // Old roof: eaves 98, ridge (248, 56). Band 5 thick.
  const oldRoof = (x: number) => 98 - (42 / 62) * (x <= 248 ? x - 186 : 310 - x);
  const roofBand = `M186,${oldRoof(186)} L248,${oldRoof(248)} L310,${oldRoof(310)} L310,${oldRoof(310) + 5} L248,${oldRoof(248) + 5} L186,${oldRoof(186) + 5} Z`;

  return (
    <svg viewBox="0 0 320 214" className="w-full h-auto" fill="none" strokeWidth="0.9" role="img" aria-label="Section through pool, gallery and finca">
      <Patterns id="fs" />

      {/* Ground, with the pool cut out of it */}
      <path d={`M10,${G} L22,${G} L22,190 L108,190 L108,${G} L310,${G} L310,206 L10,206 Z`} fill="url(#fs-earth)" stroke="none" />
      <path d={`M10,${G} L310,${G}`} stroke={INK} strokeWidth="1.3" />

      {/* Shadow of the old finca in the afternoon, from the ridge down to the ground */}
      <g opacity={o(2)}>
        <path d={`M190,88 L66,${G} L190,${G} Z`} fill="url(#fs-shade)" stroke="none" />
      </g>

      {/* 3 · Pool: sun first, then the shade of the old wall */}
      <g opacity={o(2)}>
        <path d="M22,156 L22,190 L108,190 L108,156" fill="url(#fs-water)" stroke={c(2)} strokeWidth="1.2" />
        <path d="M25,156 L25,187 L105,187 L105,156" stroke={c(2)} strokeOpacity="0.5" />
        <line x1="25" y1="162" x2="105" y2="162" stroke={c(2)} strokeDasharray="3 2" />
        <rect x="16" y="153" width="6" height="3" fill={c(2)} stroke="none" />
        <rect x="108" y="153" width="6" height="3" fill={c(2)} stroke="none" />
        <Sun x={26} y={38} color={c(2)} />
        <Label x={26} y={54} anchor="middle" color={c(2)} opacity={0.9}>AM</Label>
        <line x1="31" y1="42" x2="58" y2="162" stroke={c(2)} strokeDasharray="3.5 2.5" />
        <line x1="36" y1="40" x2="84" y2="162" stroke={c(2)} strokeDasharray="3.5 2.5" />
        <Sun x={306} y={24} color={c(2)} />
        <Label x={306} y={40} anchor="middle" color={c(2)} opacity={0.9}>PM</Label>
        <line x1="301" y1="27" x2="248" y2="56" stroke={c(2)} strokeDasharray="3.5 2.5" />
        <line x1="248" y1="56" x2="66" y2={G} stroke={c(2)} strokeOpacity="0.6" strokeDasharray="1 2.5" />
      </g>

      {/* 2 · New use: the old wing's outline, and one thin steel addition inside it */}
      <g opacity={o(1)}>
        <path d={`M112,${G} L112,104 L150,70 L190,104 L190,${G}`} stroke={c(1)} strokeOpacity="0.7" strokeDasharray="3 3" />
        <Label x={150} y={63} anchor="middle" color={c(1)} opacity={0.9}>OLD LINE</Label>
        <g fill={c(1)} stroke="none">
          <rect x="114" y="98" width="76" height="3" />
          <rect x="120" y="101" width="3" height={G - 101 - 4} />
          <rect x="184" y="101" width="3" height={G - 101 - 4} />
          <rect x="114" y={G - 4} width="76" height="4" />
        </g>
        <g stroke={c(1)} strokeWidth="0.7">
          <line x1="125.5" y1="101" x2="125.5" y2={G - 4} />
          <line x1="125.5" y1="126" x2="120" y2="126" strokeOpacity="0.6" />
        </g>
      </g>
      {/* Frames on the old wall, inside the gallery */}
      {[110, 126, 140].map((y) => (
        <rect key={y} x="178" y={y} width="4" height="9" fill={PAPER} stroke={INK} strokeWidth="0.7" />
      ))}
      <Figure x={152} y={G - 4} s={3.2} />

      {/* 1 · Fieldstone: the old finca, left untouched */}
      <g opacity={o(0)}>
        {[190, 290].map((x, i) => (
          <g key={x}>
            <rect x={x} y="96" width="16" height={G - 96} fill={PAPER} stroke={c(0)} strokeWidth="1.1" />
            <Rubble x={x} y={96} w={16} h={G - 96} seed={21 + i} course={7} stroke={c(0)} sw={0.5} />
          </g>
        ))}
        <polygon points="190,118 206,118 206,156 190,156" fill={PAPER} stroke="none" />
        <path d="M190,118 L206,118" stroke={c(0)} strokeWidth="1.1" />
        <path
          d={`M206,${oldRoof(206) + 5} L248,${oldRoof(248) + 5} L290,${oldRoof(290) + 5} L290,${G} L206,${G} Z`}
          fill="url(#fs-shade)"
          stroke="none"
        />
        <path d={roofBand} fill={PAPER} stroke="none" />
        <path d={roofBand} fill="url(#fs-strata)" stroke={c(0)} strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 192 + i * 10;
          return <line key={x} x1={x} y1={oldRoof(x) - 0.2} x2={x} y2={oldRoof(x) - 3} stroke={c(0)} strokeWidth="0.5" strokeOpacity="0.7" />;
        })}
      </g>
      <line x1="206" y1={G} x2="290" y2={G} stroke={INK} strokeWidth="1.3" />

      <Marker x={298} y={126} n={1} on={on(0)} />
      <Marker x={150} y={84} n={2} on={on(1)} />
      <Marker x={92} y={176} n={3} on={on(2)} />
    </svg>
  );
};
