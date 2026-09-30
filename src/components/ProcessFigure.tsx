import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { processOverlays, OverlayHatch, OverlayLabel, OverlayStroke, Pt } from './processOverlays';

export type LayerState = 'hidden' | 'active' | 'past';

interface ProcessFigureProps {
  currentLang: Language;
  /** Index of the current step, -1 before the first one. */
  activeStep: number;
  /** Show every layer at once without animation (prefers-reduced-motion). */
  showAll?: boolean;
  className?: string;
}

type Project = (p: Pt) => Pt;

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = '#0E0E0E';
const ACCENT = '#FF4D00';
const NOTE_MAX_WIDTH = 180;
const LABEL_MAX_WIDTH = 190;
const EDGE_PAD = 12;

/** Deterministic pseudo-random numbers so the dry-stone pattern is stable between renders. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Straight or Catmull-Rom smoothed SVG path through projected points. */
function toPath(points: Pt[], smooth = false, closed = false): string {
  if (points.length < 2) return '';
  const f = (n: number) => n.toFixed(1);
  if (!smooth || points.length < 3) {
    return `M${points.map(([x, y]) => `${f(x)},${f(y)}`).join(' L')}${closed ? ' Z' : ''}`;
  }
  let d = `M${f(points[0][0])},${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

function arrowHead(points: Pt[], size = 7): string {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const wing = (s: number): Pt => [x2 - size * Math.cos(a + s), y2 - size * Math.sin(a + s)];
  const [lx, ly] = wing(0.5);
  const [rx, ry] = wing(-0.5);
  return `M${lx.toFixed(1)},${ly.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${rx.toFixed(1)},${ry.toFixed(1)}`;
}

/** Hatch segments in photo percent, projected into one path. */
function hatchPath(hatch: OverlayHatch, project: Project, seed: number): string {
  const [x, y, w, h] = hatch.rect;
  const segs: [Pt, Pt][] = [];
  if (hatch.pattern === 'courses') {
    const rows = Math.max(3, Math.round(h / 0.9));
    const rowH = h / rows;
    for (let r = 1; r < rows; r++) segs.push([[x, y + r * rowH], [x + w, y + r * rowH]]);
    const blockW = w / 3;
    for (let r = 0; r < rows; r++) {
      const shift = r % 2 === 0 ? 0 : blockW / 2;
      for (let bx = x + shift + blockW; bx < x + w - 0.2; bx += blockW) {
        segs.push([[bx, y + r * rowH], [bx, y + (r + 1) * rowH]]);
      }
    }
  } else {
    const rand = seeded(seed);
    const rows = 3;
    const rowH = h / rows;
    for (let r = 0; r < rows; r++) {
      const top = y + r * rowH;
      if (r > 0) segs.push([[x, top + (rand() - 0.5) * 0.2], [x + w, top + (rand() - 0.5) * 0.2]]);
      let bx = x + rand() * 1.2;
      while (bx < x + w - 0.6) {
        bx += 0.9 + rand() * 1.4;
        if (bx >= x + w) break;
        const lean = (rand() - 0.5) * 0.5;
        segs.push([[bx - lean, top], [bx + lean, top + rowH]]);
      }
    }
  }
  return segs
    .map(([a, b]) => {
      const [ax, ay] = project(a);
      const [bx, by] = project(b);
      return `M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)}`;
    })
    .join(' ');
}

/** Places a label next to its anchor, flipping sides so it stays inside the frame. */
function labelPosition(
  label: OverlayLabel,
  project: Project,
  size: { w: number; h: number },
  maxWidth: number
) {
  const [ax, ay] = project(label.at);
  const x = Math.min(Math.max(ax, EDGE_PAD), size.w - EDGE_PAD);
  const y = Math.min(Math.max(ay, EDGE_PAD + 10), size.h - EDGE_PAD - 10);
  let align = label.align;
  if (align === 'right' && x - maxWidth < EDGE_PAD) align = 'left';
  else if (align === 'left' && x + maxWidth > size.w - EDGE_PAD) align = 'right';
  return { x, y, align };
}

export const ProcessFigure: React.FC<ProcessFigureProps> = ({
  currentLang,
  activeStep,
  showAll = false,
  className = '',
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const p = content.approach.process;
  const photo = p.photo;

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Same maths as object-fit: cover, with an adjustable focus point.
  const scale = size.w && size.h ? Math.max(size.w / photo.width, size.h / photo.height) : 0;
  const imgW = photo.width * scale;
  const imgH = photo.height * scale;
  const offX = Math.min(0, Math.max(size.w - imgW, size.w / 2 - (photo.focusX / 100) * imgW));
  const offY = Math.min(0, Math.max(size.h - imgH, size.h / 2 - (photo.focusY / 100) * imgH));
  const project: Project = ([x, y]) => [offX + (x / 100) * imgW, offY + (y / 100) * imgH];

  const stateOf = (layer: number): LayerState => {
    if (showAll) return 'active';
    if (layer > activeStep) return 'hidden';
    return layer === activeStep ? 'active' : 'past';
  };

  /** Line-reveal for one stroke; `order` sequences strokes inside a layer. */
  const draw = (state: LayerState, order: number, targetOpacity = 1) => {
    if (showAll) {
      return { initial: false as const, animate: { pathLength: 1, opacity: targetOpacity } };
    }
    const visible = state !== 'hidden';
    return {
      initial: { pathLength: 0, opacity: 0 },
      animate: visible
        ? { pathLength: 1, opacity: targetOpacity }
        : { pathLength: 0, opacity: 0 },
      transition: visible
        ? {
            pathLength: { duration: 1.2, delay: order * 0.12, ease: EASE },
            opacity: { duration: 0.2, delay: order * 0.12 },
          }
        : { duration: 0.4, ease: EASE },
    };
  };

  /** Fade for HTML labels, after the lines of their layer. */
  const reveal = (state: LayerState, order: number) => {
    if (showAll) return { initial: false as const, animate: { opacity: 1, y: 0 } };
    const visible = state !== 'hidden';
    return {
      initial: { opacity: 0, y: 4 },
      animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 },
      transition: visible
        ? { duration: 0.8, delay: 0.5 + order * 0.2, ease: EASE }
        : { duration: 0.3, ease: EASE },
    };
  };

  const layerOpacity = (state: LayerState) => ({
    initial: false as const,
    animate: { opacity: state === 'past' ? 0.4 : 1 },
    transition: { duration: showAll ? 0 : 0.8, ease: EASE },
  });

  const strokeProps = (s: OverlayStroke) => ({
    fill: 'none',
    stroke: s.accent ? ACCENT : INK,
    strokeWidth: 1.1 * (s.weight ?? 1),
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  });

  const renderStrokes = (strokes: OverlayStroke[], state: LayerState, startOrder = 0) =>
    strokes.map((s, i) => {
      const pts = s.points.map(project);
      return (
        <React.Fragment key={i}>
          <motion.path
            d={toPath(pts, s.smooth, s.closed)}
            {...strokeProps(s)}
            // The line reveal uses stroke-dasharray, so "dashed" lines are drawn lighter instead.
            strokeOpacity={s.dashed ? 0.55 : 1}
            {...draw(state, startOrder + i, s.opacity ?? 1)}
          />
          {s.arrow && (
            <motion.path d={arrowHead(pts)} {...strokeProps(s)} {...draw(state, startOrder + i + 2, s.opacity ?? 1)} />
          )}
        </React.Fragment>
      );
    });

  /** Leader line from a label to its target, ending in a small dot. */
  const renderLeader = (label: OverlayLabel, state: LayerState, order: number, accentDot = false) => {
    const pos = labelPosition(label, project, size, LABEL_MAX_WIDTH);
    const [tx, ty] = project(label.target);
    return (
      <React.Fragment key={label.id}>
        <motion.path
          d={`M${pos.x.toFixed(1)},${pos.y.toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}`}
          fill="none"
          stroke={INK}
          strokeWidth={0.9}
          {...draw(state, order)}
        />
        <motion.circle
          cx={tx}
          cy={ty}
          r={3.5}
          fill="none"
          stroke={accentDot ? ACCENT : INK}
          strokeWidth={1.4}
          {...draw(state, order + 1)}
        />
      </React.Fragment>
    );
  };

  const renderTag = (label: OverlayLabel, text: string, state: LayerState, order: number) => {
    const pos = labelPosition(label, project, size, LABEL_MAX_WIDTH);
    return (
      <motion.div
        key={label.id}
        {...reveal(state, order)}
        className="absolute font-mono text-[9px] sm:text-[11px] leading-tight text-[#0E0E0E] bg-[#F5F5F2]/90 border border-hairline px-1.5 py-0.5 whitespace-nowrap"
        style={{
          left: pos.x,
          top: pos.y,
          translate: pos.align === 'right' ? 'calc(-100% - 4px) -50%' : '4px -50%',
        }}
      >
        {text}
      </motion.div>
    );
  };

  const listen = stateOf(0);
  const site = stateOf(1);
  const design = stateOf(2);
  const craft = stateOf(3);
  const tech = stateOf(4);
  const ready = size.w > 0;

  const svgProps = {
    className: 'absolute inset-0 w-full h-full overflow-visible pointer-events-none process-lines',
    width: size.w,
    height: size.h,
    viewBox: `0 0 ${size.w || 1} ${size.h || 1}`,
    'aria-hidden': true,
  };

  return (
    <figure ref={frameRef} className={`relative overflow-hidden bg-[#E9E7E1] ${className}`}>
      {ready && (
        <img
          src={photo.src}
          alt={photo.alt[currentLang]}
          className="absolute max-w-none select-none"
          style={{ left: offX, top: offY, width: imgW, height: imgH }}
          draggable={false}
        />
      )}

      {ready && (
        <>
          {/* 1 Listen */}
          <motion.div className="absolute inset-0" {...layerOpacity(listen)}>
            <svg {...svgProps}>
              {processOverlays.listen.notes.map((n, i) => renderLeader(n, listen, i * 2, true))}
            </svg>
            {processOverlays.listen.notes.map((n, i) => {
              const note = p.notes.find((c) => c.id === n.id);
              if (!note) return null;
              const pos = labelPosition(n, project, size, NOTE_MAX_WIDTH);
              return (
                <motion.div
                  key={n.id}
                  {...reveal(listen, i)}
                  className="absolute process-note"
                  style={{
                    left: pos.x,
                    top: pos.y,
                    maxWidth: NOTE_MAX_WIDTH,
                    translate: pos.align === 'right' ? 'calc(-100% - 6px) -60%' : '6px -60%',
                    textAlign: pos.align === 'right' ? 'right' : 'left',
                  }}
                >
                  {note.image ? (
                    <img src={note.image} alt={note.text[currentLang]} className="h-8 sm:h-10 w-auto" />
                  ) : (
                    <span className="font-hand text-[15px] sm:text-[24px] leading-none text-[#0E0E0E] whitespace-nowrap">
                      {note.text[currentLang]}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* 2 Site */}
          <motion.div className="absolute inset-0" {...layerOpacity(site)}>
            <svg {...svgProps}>
              {renderStrokes(processOverlays.site.strokes, site)}
              {(() => {
                const [sx, sy] = project(processOverlays.site.sun);
                return (
                  <motion.circle
                    cx={sx}
                    cy={sy}
                    r={9}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth={1.4}
                    {...draw(site, 6)}
                  />
                );
              })()}
            </svg>
            {processOverlays.site.labels.map((l, i) => {
              const copy = p.siteLabels.find((c) => c.id === l.id);
              return copy ? renderTag(l, copy.text[currentLang], site, i + 1) : null;
            })}
          </motion.div>

          {/* 3 Design */}
          <motion.div className="absolute inset-0" {...layerOpacity(design)}>
            <svg {...svgProps}>{renderStrokes(processOverlays.design.strokes, design)}</svg>
          </motion.div>

          {/* 4 Craft */}
          <motion.div className="absolute inset-0" {...layerOpacity(craft)}>
            <svg {...svgProps}>
              {processOverlays.craft.hatches.map((h, i) => (
                <motion.path
                  key={i}
                  d={hatchPath(h, project, 11 + i)}
                  fill="none"
                  stroke={INK}
                  strokeWidth={0.8}
                  {...draw(craft, i * 2)}
                />
              ))}
              {processOverlays.craft.labels.map((l, i) => renderLeader(l, craft, 4 + i * 2))}
            </svg>
            {processOverlays.craft.labels.map((l, i) => {
              const copy = p.craftLabels.find((c) => c.id === l.id);
              return copy ? renderTag(l, copy.text[currentLang], craft, i + 1) : null;
            })}
          </motion.div>

          {/* 5 Tech */}
          <motion.div className="absolute inset-0" {...layerOpacity(tech)}>
            <svg {...svgProps}>{renderStrokes(processOverlays.tech.strokes, tech)}</svg>
            {/* Readouts at the frame edge: a strip along the bottom on mobile, a stack top-right above */}
            <motion.div
              {...reveal(tech, 0)}
              className="absolute left-3 right-3 bottom-3 grid grid-cols-3 divide-x divide-hairline sm:left-auto sm:bottom-auto sm:top-3 sm:w-[216px] sm:grid-cols-1 sm:divide-x-0 sm:divide-y border border-hairline bg-[#F5F5F2]/90 font-mono text-[9px] sm:text-[11px] text-[#0E0E0E]"
            >
              {p.readouts.map((r, i) => (
                <motion.div
                  key={r.id}
                  {...reveal(tech, i + 1)}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-3 px-2 sm:px-2.5 py-1.5 tabular-nums whitespace-nowrap"
                >
                  <span className="text-[#0E0E0E]/60 uppercase tracking-wider">{r.label[currentLang]}</span>
                  <span className={r.id === 'trees' ? 'text-[#FF4D00] font-semibold' : 'font-semibold'}>{r.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </figure>
  );
};
