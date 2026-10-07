import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Language, content } from '../content';
import {
  MAP_W, MAP_H, KM_PX, ISLAND_PATH, CONTOURS, GRATICULE, PTS, INSET, INSET_PTS,
} from './studioMapGeo';

/* ------------------------------------------------------------------ */
/* Types & constants                                                   */
/* ------------------------------------------------------------------ */

type Layer = 'both' | 'island' | 'remote';
type Group = 'base' | 'contours' | 'habitat' | 'studio' | 'artisans' | 'builders' | 'sites' | 'remote' | 'team' | 'inset';

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = '#0E0E0E';
const PAPER = '#F5F5F2';
import { ACCENT } from '../theme';
const FONT = "'JetBrains Mono', ui-monospace, monospace";

/** Which map groups each text block on the left relates to. */
const BLOCK_GROUPS: Record<string, Group[]> = {
  '01': ['base', 'contours', 'habitat'],
  '02': ['remote', 'team', 'builders', 'sites'],
  '03': ['sites'],
  '04': ['inset', 'team'],
  '05': ['artisans', 'remote'],
};
const ISLAND_LAYER: Group[] = ['base', 'contours', 'habitat', 'artisans', 'builders', 'sites'];
const REMOTE_LAYER: Group[] = ['remote', 'team', 'inset'];

/* Timeline in seconds from the moment the section triggers. */
const T = {
  island: 0.3,
  islandDur: 1.6,
  contours: 1.2,
  studio: 1.9,
  local: 2.2,
  localStagger: 0.15,
  localDur: 0.7,
  remote: 3.6,
  remoteStagger: 0.15,
  remoteDur: 0.9,
  inset: 4.4,
};

const REMOTE_Y = 486;
const INSET_BOX = { x: 506, y: 40, w: 188, h: 186 };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const SCRAMBLE = '01#/+<>[]_-';

/** Mono label that resolves through random characters once `play` turns true. */
const Scramble: React.FC<{ text: string; play: boolean; reduced: boolean; duration?: number }> = ({
  text, play, reduced, duration = 400,
}) => {
  const [out, setOut] = useState(reduced ? text : '');
  useEffect(() => {
    if (reduced) { setOut(text); return; }
    if (!play) { setOut(''); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const resolved = Math.floor(p * text.length);
      let s = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        s += text[i] === ' ' ? ' ' : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, play, reduced, duration]);
  return <>{out}</>;
};

/** Gently curved quadratic path between two points. */
const curve = (a: [number, number], b: [number, number], bend: number) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  return `M${a[0]},${a[1]} Q${(mx - dy * bend).toFixed(1)},${(my + dx * bend).toFixed(1)} ${b[0]},${b[1]}`;
};

const studio = PTS.studio;
const remotePath = (x: number) =>
  // Shared trunk runs straight down through the Bay of Palma, then fans out below the island.
  `M${studio[0]},${studio[1]} L${studio[0]},405 C${studio[0]},440 ${x},432 ${x},${REMOTE_Y - 6}`;
const INSET_LINK = `M${INSET_PTS.mallorca[0]},${INSET_BOX.y + INSET_BOX.h} L600,${REMOTE_Y - 6}`;

const textStyle = (size = 8.5, weight = 400, color = INK, alpha = 1): React.CSSProperties => ({
  fontFamily: FONT, fontSize: size, fontWeight: weight, fill: color, fillOpacity: alpha,
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  currentLang: Language;
  hoveredBlock: string | null;
  started: boolean;
  reduced: boolean;
}

export const StudioNetworkMap: React.FC<Props> = ({ currentLang, hoveredBlock, started, reduced }) => {
  const m = content.studio.map;
  const tr = (k: string) => m[k][currentLang];
  const [layer, setLayer] = useState<Layer>('both');
  const [shown, setShown] = useState<Set<string>>(() => new Set());
  const reveal = useCallback((id: string) => {
    setShown((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);
  const on = (id: string) => reduced || shown.has(id);

  /* Milestones not chained to a line: studio, habitats, remote rule, inset labels, readouts. */
  const timers = useRef<number[]>([]);
  useEffect(() => {
    if (!started || reduced) return;
    const at = (s: number, id: string) => timers.current.push(window.setTimeout(() => reveal(id), s * 1000));
    at(0, 'frame');
    at(T.studio, 'studio');
    at(T.contours + CONTOURS.length * 0.08 + 0.6, 'habitat');
    at(T.remote, 'remoteRule');
    at(T.inset - 0.2, 'insetFrame');
    at(T.inset + 0.9, 'insetLabels');
    [0, 1, 2, 3].forEach((i) => at(T.inset + 0.4 + i * 0.15, `readout${i}`));
    at(T.inset + 1.0, 'legend');
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, [started, reduced, reveal]);

  /* ---------------- Network ---------------- */
  const local: {
    id: string; group: Group; kind: 'site' | 'artisan' | 'builder';
    title: string; place: string; lx: number; ly: number; anchor: 'start' | 'end';
  }[] = [
    { id: 'deia', group: 'sites', kind: 'site', title: tr('site'), place: 'Deià', lx: -9, ly: -2, anchor: 'end' },
    { id: 'drystone', group: 'artisans', kind: 'artisan', title: tr('drystone'), place: 'Tramuntana', lx: -8, ly: -1, anchor: 'end' },
    { id: 'ceramics', group: 'artisans', kind: 'artisan', title: tr('ceramics'), place: 'Marratxí', lx: 8, ly: 4, anchor: 'start' },
    { id: 'builders', group: 'builders', kind: 'builder', title: tr('builders'), place: 'Inca', lx: 8, ly: -2, anchor: 'start' },
    { id: 'pollenca', group: 'sites', kind: 'site', title: tr('site'), place: 'Pollença', lx: 9, ly: 0, anchor: 'start' },
    { id: 'wood', group: 'artisans', kind: 'artisan', title: tr('wood'), place: 'Pla de Mallorca', lx: 8, ly: 4, anchor: 'start' },
    { id: 'arta', group: 'sites', kind: 'site', title: tr('site'), place: 'Artà', lx: -9, ly: -10, anchor: 'end' },
    { id: 'felanitx', group: 'sites', kind: 'site', title: tr('site'), place: 'Felanitx', lx: 9, ly: 0, anchor: 'start' },
    { id: 'stone', group: 'artisans', kind: 'artisan', title: tr('stone'), place: 'Santanyí', lx: 8, ly: 4, anchor: 'start' },
  ];

  const remote: { id: string; group: Group; title: string; x: number }[] = [
    { id: 'comp', group: 'remote', title: tr('comp'), x: 104 },
    { id: 'eng', group: 'remote', title: tr('eng'), x: 268 },
    { id: 'analysis', group: 'remote', title: tr('analysis'), x: 432 },
    { id: 'team', group: 'team', title: tr('team'), x: 600 },
  ];

  /* ---------------- Dimming: hover isolation + layer toggle ---------------- */
  const gs = (g: Group): React.CSSProperties => {
    let o = 1;
    if (layer === 'island' && REMOTE_LAYER.includes(g)) o = 0.1;
    else if (layer === 'remote' && ISLAND_LAYER.includes(g)) o = 0.1;
    else if (hoveredBlock && g !== 'studio' && !BLOCK_GROUPS[hoveredBlock]?.includes(g)) o = g === 'base' ? 0.45 : 0.15;
    return { opacity: o, transition: 'opacity 300ms cubic-bezier(0.16,1,0.3,1)' };
  };

  /* ---------------- Animation presets ---------------- */
  const draw = (delay: number, duration: number) =>
    reduced
      ? { initial: false as const, animate: { pathLength: 1 } }
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: started ? 1 : 0 },
          transition: { pathLength: { delay, duration, ease: EASE } },
        };

  const nodeIn = (id: string) => ({
    initial: reduced ? (false as const) : { opacity: 0, scale: 0.6 },
    animate: on(id) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 },
    transition: { duration: 0.5, ease: EASE },
    style: { transformBox: 'fill-box' as const, transformOrigin: 'center' },
  });

  const fadeIn = (id: string, duration = 0.6) => ({
    initial: reduced ? (false as const) : { opacity: 0 },
    animate: { opacity: on(id) ? 1 : 0 },
    transition: { duration, ease: EASE },
  });

  /** Node appears exactly when its incoming line finishes drawing. */
  const chained = (id: string) => (def: { pathLength?: number }) => {
    if (started && def?.pathLength === 1) reveal(id);
  };

  const dashed = [
    ...remote.map((r, i) => ({ id: r.id, d: remotePath(r.x), delay: T.remote + i * T.remoteStagger })),
    { id: 'insetLink', d: INSET_LINK, delay: T.inset + 0.6 },
  ];

  return (
    <figure className="relative w-full border border-hairline bg-[#F5F5F2] font-mono select-none m-0">
      {/* Header */}
      <motion.div
        {...fadeIn('frame')}
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-hairline text-[11px]"
      >
        <span className="flex items-center gap-2 text-[#0E0E0E]">
          <span className="w-1.5 h-1.5 bg-accent" aria-hidden />
          {tr('fig')}
        </span>
        <div role="group" aria-label={tr('layerAria')} className="flex border border-hairline">
          {(['both', 'island', 'remote'] as Layer[]).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={layer === l}
              onClick={() => setLayer(l)}
              className={`px-2.5 py-1 text-[10.5px] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent ${
                layer === l ? 'bg-[#0E0E0E] text-[#F5F5F2]' : 'text-[#0E0E0E]/55 hover:text-[#0E0E0E]'
              }`}
            >
              {tr(l)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Map (scrolls sideways on narrow screens so labels stay legible) */}
      <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="block w-full min-w-[640px] h-auto"
        role="img"
        aria-label={tr('mapAria')}
        style={{ shapeRendering: 'geometricPrecision' }}
      >
        <defs>
          <pattern id="snm-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke={INK} strokeWidth="0.6" strokeOpacity="0.55" />
          </pattern>
          {/* Masks reveal dashed lines without breaking their dash pattern */}
          {dashed.map(({ id, d, delay }) => (
            <mask key={id} id={`snm-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_W} height={MAP_H}>
              <motion.path
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth="6"
                {...draw(delay, T.remoteDur)}
                onAnimationComplete={chained(id)}
              />
            </mask>
          ))}
        </defs>

        {/* Graticule */}
        <motion.g {...fadeIn('frame', 1)}>
          {GRATICULE.map((g) => (
            <g key={g.label}>
              <path d={g.d} stroke={INK} strokeOpacity="0.07" strokeWidth="0.5" fill="none" />
              <text
                x={g.k === 'lat' ? 6 : g.x}
                y={g.k === 'lat' ? g.y - 2.5 : 22}
                textAnchor={g.k === 'lat' ? 'start' : 'middle'}
                style={textStyle(7, 400, INK, 0.35)}
              >
                {g.label}
              </text>
            </g>
          ))}
        </motion.g>

        {/* Island */}
        <g style={gs('base')}>
          <motion.path d={ISLAND_PATH} fill={INK} fillOpacity="0.025" stroke="none" {...fadeIn('habitat', 1)} />
          <motion.path
            d={ISLAND_PATH}
            fill="none"
            stroke={INK}
            strokeWidth="1.1"
            strokeLinejoin="round"
            {...draw(T.island, T.islandDur)}
          />
        </g>

        {/* Tramuntana contours */}
        <g style={gs('contours')}>
          {CONTOURS.map((c, i) => (
            <motion.path
              key={i}
              d={c.d}
              fill="none"
              stroke={INK}
              strokeOpacity={0.12 + ((9000 - c.lvl) / 9000) * 0.24}
              strokeWidth="0.6"
              {...draw(T.contours + i * 0.08, 1)}
            />
          ))}
        </g>

        {/* Habitats */}
        <g style={gs('habitat')}><motion.g {...fadeIn('habitat')}>
          <path d={`M${PTS.puig[0]},${PTS.puig[1] - 4} l4,7 h-8 z`} fill="none" stroke={INK} strokeWidth="0.9" />
          <text x={PTS.puig[0]} y={PTS.puig[1] - 17} textAnchor="middle" style={textStyle(8.5, 500)}>Puig Major</text>
          <text x={PTS.puig[0]} y={PTS.puig[1] - 8} textAnchor="middle" style={textStyle(7.5, 400, INK, 0.5)}>
            {tr('peak')} · 1436 m
          </text>
          <ellipse cx={PTS.albufera[0]} cy={PTS.albufera[1]} rx="10" ry="5.5" fill="url(#snm-hatch)" stroke={INK} strokeOpacity="0.5" strokeWidth="0.6" />
          <text x={PTS.albufera[0] + 15} y={PTS.albufera[1] - 1} style={textStyle(8.5, 500)}>S&apos;Albufera</text>
          <text x={PTS.albufera[0] + 15} y={PTS.albufera[1] + 8.5} style={textStyle(7.5, 400, INK, 0.5)}>{tr('wetland')}</text>
        </motion.g></g>

        {/* Remote zone rule */}
        <g style={gs('remote')}>
          <motion.line
            x1="16" y1="452" x2={MAP_W - 16} y2="452"
            stroke={ACCENT} strokeOpacity="0.5" strokeWidth="0.6"
            {...draw(T.remote, 1.2)}
          />
          <text x="16" y="444" style={textStyle(8.5, 500, ACCENT)}>
            <Scramble text={tr('remoteZone')} play={on('remoteRule')} reduced={reduced} />
          </text>
        </g>

        {/* In-person lines (solid) */}
        {local.map((n, i) => (
          <g key={`l-${n.id}`} style={gs(n.group)}>
            <motion.path
              d={curve(studio, PTS[n.id], i % 2 ? 0.14 : -0.14)}
              fill="none"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="0.8"
              {...draw(T.local + i * T.localStagger, T.localDur)}
              onAnimationComplete={chained(n.id)}
            />
          </g>
        ))}

        {/* Remote lines (dashed, revealed through masks) */}
        {remote.map((r) => (
          <g key={`r-${r.id}`} style={gs(r.group)}>
            <path
              d={remotePath(r.x)}
              fill="none"
              stroke={ACCENT}
              strokeWidth="0.9"
              strokeDasharray="3 3"
              mask={`url(#snm-mask-${r.id})`}
            />
          </g>
        ))}

        {/* Local nodes */}
        {local.map((n) => {
          const [x, y] = PTS[n.id];
          return (
            <g key={`n-${n.id}`} style={gs(n.group)}>
              <motion.g {...nodeIn(n.id)}>
                {n.kind === 'site' && <rect x={x - 3} y={y - 3} width="6" height="6" fill={INK} />}
                {n.kind === 'artisan' && <circle cx={x} cy={y} r="2.8" fill={INK} />}
                {n.kind === 'builder' && <circle cx={x} cy={y} r="3.2" fill={PAPER} stroke={INK} strokeWidth="1" />}
              </motion.g>
              <text x={x + n.lx} y={y + n.ly} textAnchor={n.anchor} style={textStyle(8.5, 500)}>
                <Scramble text={n.title} play={on(n.id)} reduced={reduced} />
              </text>
              <text x={x + n.lx} y={y + n.ly + 9.5} textAnchor={n.anchor} style={textStyle(7.5, 400, INK, 0.5)}>
                <Scramble text={n.place} play={on(n.id)} reduced={reduced} />
              </text>
            </g>
          );
        })}

        {/* Remote nodes */}
        {remote.map((r) => (
          <g key={`rn-${r.id}`} style={gs(r.group)}>
            <motion.g {...nodeIn(r.id)}>
              <path
                d={`M${r.x},${REMOTE_Y - 5} l5,5 l-5,5 l-5,-5 z`}
                fill={r.id === 'team' ? ACCENT : PAPER}
                stroke={ACCENT}
                strokeWidth="1"
              />
            </motion.g>
            <text x={r.x} y={REMOTE_Y + 21} textAnchor="middle" style={textStyle(8.5, 500)}>
              <Scramble text={r.title} play={on(r.id)} reduced={reduced} />
            </text>
          </g>
        ))}

        {/* Studio */}
        <g style={gs('studio')}>
          {!reduced && (
            <motion.circle
              cx={studio[0]} cy={studio[1]} r="4" fill="none" stroke={ACCENT} strokeWidth="0.8"
              initial={{ scale: 1, opacity: 0 }}
              animate={on('studio') ? { scale: 5, opacity: [0, 0.8, 0] } : { scale: 1, opacity: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          )}
          <motion.g {...nodeIn('studio')}>
            <circle cx={studio[0]} cy={studio[1]} r="4.2" fill={ACCENT} />
          </motion.g>
          <text x={studio[0] - 9} y={studio[1] + 2} textAnchor="end" style={textStyle(9.5, 600, ACCENT)}>
            <Scramble text={content.studio.mapLabels.studio[currentLang]} play={on('studio')} reduced={reduced} />
          </text>
          <text x={studio[0] - 9} y={studio[1] + 12} textAnchor="end" style={textStyle(7.5, 400, INK, 0.5)}>
            <Scramble text={tr('studioPlace')} play={on('studio')} reduced={reduced} />
          </text>
        </g>

        {/* Inset: DE · ES project experience */}
        <g style={gs('inset')}>
          <motion.rect
            x={INSET_BOX.x} y={INSET_BOX.y} width={INSET_BOX.w} height={INSET_BOX.h}
            fill={PAPER} stroke={INK} strokeOpacity="0.25" strokeWidth="0.6"
            {...fadeIn('insetFrame')}
          />
          {[...INSET.es, ...INSET.de].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={INK}
              strokeOpacity="0.6"
              strokeWidth="0.6"
              strokeLinejoin="round"
              {...draw(T.inset + i * 0.05, 1)}
            />
          ))}
          <motion.g {...fadeIn('insetLabels')}>
            <text x={INSET_BOX.x + 8} y={INSET_BOX.y + 15} style={textStyle(8.5, 500)}>{tr('experience')}</text>
            <text x={INSET_PTS.de[0]} y={INSET_PTS.de[1] + 3} textAnchor="middle" style={textStyle(9, 600)}>DE</text>
            <text x={INSET_PTS.es[0]} y={INSET_PTS.es[1] + 3} textAnchor="middle" style={textStyle(9, 600)}>ES</text>
            <circle cx={INSET_PTS.mallorca[0]} cy={INSET_PTS.mallorca[1]} r="2.6" fill={ACCENT} />
          </motion.g>
          <path d={INSET_LINK} fill="none" stroke={ACCENT} strokeWidth="0.9" strokeDasharray="3 3" mask="url(#snm-mask-insetLink)" />
        </g>

        {/* Scale bar + north arrow */}
        <motion.g {...fadeIn('legend')}>
          <g transform="translate(516 404)">
            <rect x="0" y="0" width={KM_PX * 5} height="3" fill={INK} />
            <rect x={KM_PX * 5} y="0" width={KM_PX * 5} height="3" fill="none" stroke={INK} strokeWidth="0.6" />
            {[0, 5, 10].map((k) => (
              <text key={k} x={KM_PX * k} y="14" textAnchor="middle" style={textStyle(7, 400, INK, 0.6)}>
                {k === 10 ? '10 km' : k}
              </text>
            ))}
          </g>
          <g transform="translate(680 396)">
            <path d="M0,-10 L4,4 L0,1 L-4,4 Z" fill={INK} />
            <text x="0" y="16" textAnchor="middle" style={textStyle(8, 600)}>{tr('north')}</text>
          </g>
        </motion.g>
      </svg>
      </div>

      {/* Readouts */}
      <div className="border-t border-hairline grid grid-cols-2 sm:grid-cols-4 text-[11px]">
        {[
          { k: 'dailyWork', v: tr('legendRemote') },
          { k: 'meetings', v: tr('legendInPerson') },
          { k: 'projectsYear', v: '[X]' },
          { k: 'disciplines', v: '3' },
        ].map((r, i) => (
          <motion.div
            key={r.k}
            {...fadeIn(`readout${i}`)}
            className={`px-4 py-2.5 border-hairline ${i < 3 ? 'sm:border-r' : ''} ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b sm:border-b-0' : ''}`}
          >
            <div className="text-[#0E0E0E]/50">{tr(r.k)}</div>
            <div className="text-[#0E0E0E] font-medium mt-0.5">{r.v}</div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div
        {...fadeIn('legend')}
        className="border-t border-hairline px-4 py-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-[10.5px] text-[#0E0E0E]/70"
      >
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" />{content.studio.mapLabels.studio[currentLang]}</span>
        <span className="flex items-center gap-1.5"><span className="w-5 h-px bg-[#0E0E0E]/70" />{tr('legendInPerson')}</span>
        <span className="flex items-center gap-1.5">
          <svg width="20" height="2" aria-hidden><line x1="0" y1="1" x2="20" y2="1" stroke={ACCENT} strokeDasharray="3 3" /></svg>
          {tr('legendRemote')}
        </span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0E0E0E]" />{tr('legendArtisans')}</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#0E0E0E]" />{tr('legendSites')}</span>
        <span className="flex items-center gap-1.5">
          <svg width="10" height="8" aria-hidden><path d="M5,0.5 L9.5,7.5 H0.5 Z" fill="none" stroke={INK} strokeWidth="1" /></svg>
          {tr('legendHabitat')}
        </span>
      </motion.div>
    </figure>
  );
};
