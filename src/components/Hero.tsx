import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, Language } from '../content';
import { sunPosition } from './sunset';

interface HeroProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const INTRO_MS = 1600;
const SKEW = 9; // horizontal lean of the shadow edge, in % of width over the full height
const INK = '#0E0E0E';
const PAPER = '#F5F5F2';

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Where the shadow stands: how much of the wall it covers, and which side it falls on. */
function shadowAt(date: Date, latitude: number, longitude: number) {
  const { altitude, azimuth } = sunPosition(date, latitude, longitude);
  const covered = altitude <= 3 ? 1 : Math.min(1, Math.max(0.06, 1 / Math.tan((altitude * Math.PI) / 180) / 5));
  return { altitude, azimuth, covered, fromRight: azimuth < 180 };
}

/** Polygon (in %) of the shaded part of the wall. `covered` is 0..1 of the width. */
function shadePolygon(covered: number, fromRight: boolean) {
  if (covered >= 0.999) return { clip: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', x1: 0, x2: 0, line: false };
  const edge = fromRight ? (1 - covered) * 100 : covered * 100;
  const top = edge + SKEW / 2;
  const bottom = edge - SKEW / 2;
  const clip = fromRight
    ? `polygon(${top}% 0, 100% 0, 100% 100%, ${bottom}% 100%)`
    : `polygon(0 0, ${top}% 0, ${bottom}% 100%, 0 100%)`;
  return { clip, x1: top, x2: bottom, line: true };
}

interface LayerProps {
  currentLang: Language;
  inverted: boolean;
  night: boolean;
  sun: { altitude: number; azimuth: number } | null;
  reduced: boolean | null;
}

/** One reading of the hero. Drawn twice: ink on paper in the light, paper on ink in the shade. */
const HeroLayer: React.FC<LayerProps> = ({ currentLang, inverted, night, sun, reduced }) => {
  const t = content.hero;
  const meta = content.meta;
  const lines = t.headline[currentLang].split('\n');
  const mute = inverted ? 'text-[#F5F5F2]/60' : 'text-[#0E0E0E]/60';
  const tab = inverted ? -1 : undefined;

  return (
    <div className="absolute inset-0 font-mono">
      <div className="h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col justify-between">
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tabular-nums ${mute}`}>
          <span className="inline-flex items-center gap-2 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span>{meta.tagline[currentLang]}</span>
          </span>
        </div>

        <h1 className="text-[clamp(38px,12vw,148px)] leading-[0.98] tracking-[-0.05em] font-medium">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.3, delay: 0.5 + i * 0.14, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 text-[11px] sm:text-xs leading-relaxed">
            <p className={`tabular-nums ${mute}`}>
              {night ? t.shadowNight[currentLang] : t.shadowDay[currentLang]}
              {sun && sun.altitude > 0 && (
                <>
                  {' '}
                  {meta.conditions.sunLabel[currentLang]} {Math.round(sun.altitude)}° / {Math.round(sun.azimuth)}°
                </>
              )}
            </p>
            <p>{t.conceptNote[currentLang]}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              tabIndex={tab}
              className={`px-5 py-2.5 font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors ${
                inverted ? 'bg-[#F5F5F2] text-[#0E0E0E] hover:bg-accent hover:text-white' : 'bg-[#0E0E0E] text-[#F5F5F2] hover:bg-accent'
              }`}
            >
              <span>{t.ctaWork[currentLang]}</span>
              <span>↓</span>
            </a>
            <a
              href="#contact"
              tabIndex={tab}
              className={`px-5 py-2.5 border font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors ${
                inverted ? 'border-[#F5F5F2]/30 hover:border-[#F5F5F2]' : 'border-hairline hover:border-[#0E0E0E]'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>{t.ctaInquire[currentLang]}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Full-screen wall at the real sun angle of Palma. The shadow covers more of it the lower the sun,
 * falls away from the sun, and turns the page to ink at night. The cursor nudges the edge.
 */
export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const reduced = useReducedMotion();
  const meta = content.meta;
  const [sun, setSun] = useState<{ altitude: number; azimuth: number } | null>(null);

  const shadeRef = useRef<HTMLDivElement | null>(null);
  const x1Ref = useRef<SVGLineElement | null>(null);
  const state = useRef({ target: 1, fromRight: true, shown: 1, mouse: 0, mouseShown: 0, start: 0, raf: 0 });

  const paint = useCallback((covered: number) => {
    const s = state.current;
    const poly = shadePolygon(Math.min(1, Math.max(0, covered)), s.fromRight);
    if (shadeRef.current) shadeRef.current.style.clipPath = poly.clip;
    const line = x1Ref.current;
    if (line) {
      line.setAttribute('x1', String(poly.x1));
      line.setAttribute('x2', String(poly.x2));
      line.style.opacity = poly.line ? '1' : '0';
    }
  }, []);

  const frame = useCallback(
    (now: number) => {
      const s = state.current;
      if (!s.start) s.start = now;
      const intro = reduced ? 1 : easeOutExpo((now - s.start) / INTRO_MS);
      s.mouseShown += (s.mouse - s.mouseShown) * 0.06;
      const nudge = reduced ? 0 : s.mouseShown * 0.05 * (s.fromRight ? -1 : 1);
      const goal = Math.min(1, Math.max(0.02, s.target + nudge));
      const covered = 1 + (goal - 1) * intro;
      s.shown = covered;
      paint(covered);
      const settled = intro >= 1 && Math.abs(s.mouse - s.mouseShown) < 0.001;
      s.raf = settled ? 0 : requestAnimationFrame(frame);
    },
    [paint, reduced]
  );

  const kick = useCallback(() => {
    const s = state.current;
    if (!s.raf) s.raf = requestAnimationFrame(frame);
  }, [frame]);

  // The sun is read once a minute; the wall follows it.
  useEffect(() => {
    const update = () => {
      const p = shadowAt(new Date(), meta.conditions.latitude, meta.conditions.longitude);
      state.current.target = p.covered;
      state.current.fromRight = p.fromRight;
      setSun({ altitude: p.altitude, azimuth: p.azimuth });
      kick();
    };
    update();
    const interval = setInterval(update, 60 * 1000);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(state.current.raf);
      state.current.raf = 0;
    };
  }, [meta.conditions.latitude, meta.conditions.longitude, kick]);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    state.current.mouse = ((e.clientX - r.left) / r.width) * 2 - 1;
    kick();
  };

  const night = !sun || sun.altitude <= 3;
  const initial = shadePolygon(1, true);

  return (
    <section
      onPointerMove={onMove}
      className="relative overflow-hidden border-b border-hairline"
      style={{ minHeight: 'max(720px, calc(100svh - 3.5rem))', background: PAPER, color: INK }}
    >
      <HeroLayer currentLang={currentLang} inverted={false} night={night} sun={sun} reduced={reduced} />

      <div
        ref={shadeRef}
        aria-hidden
        className="absolute inset-0"
        style={{ background: INK, color: PAPER, clipPath: initial.clip }}
      >
        <HeroLayer currentLang={currentLang} inverted night={night} sun={sun} reduced={reduced} />
      </div>

      <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none text-accent" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line
          ref={x1Ref}
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0 }}
        />
      </svg>
    </section>
  );
};
