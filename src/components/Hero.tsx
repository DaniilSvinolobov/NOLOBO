import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, Language } from '../content';
import { ACCENT } from '../theme';

interface HeroProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE_MS = 1.4; // each line takes its time
const PAUSE_MS = 1.0; // and then waits before the next

/**
 * Section of a terraced slope, drawn line by line behind the text.
 * Grey ink is what exists. The one pink element is what we add.
 * Everything that matters sits in the right half so it survives a narrow crop.
 */
const SlopeDrawing: React.FC<{ reduced: boolean | null; start: number }> = ({ reduced, start }) => {
  const draw = (delay: number, duration = 1.4) => ({
    initial: reduced ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, delay: start + delay, ease: EASE },
  });
  const ink = { stroke: '#0E0E0E', strokeOpacity: 0.45, strokeWidth: 1, fill: 'none', vectorEffect: 'non-scaling-stroke' as const };
  const walls = [
    { d: 'M 760 404 H 1120', d2: 'M 760 414 H 1120', delay: 0.9 },
    { d: 'M 880 444 H 1300', d2: 'M 880 454 H 1300', delay: 1.2 },
    { d: 'M 700 486 H 1440', d2: 'M 700 496 H 1440', delay: 1.5 },
  ];
  const trees = [870, 960, 1180, 1250, 1350];

  return (
    <svg
      aria-hidden
      className="absolute inset-x-0 bottom-32 sm:bottom-16 w-full h-[44%] md:h-[66%] pointer-events-none"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMaxYMax slice"
    >
      {/* Far ridge, then the near one */}
      <motion.path
        {...ink}
        strokeOpacity={0.22}
        {...draw(0, 2.2)}
        d="M 560 330 C 640 300 700 270 780 250 C 860 230 900 190 1000 160 C 1080 136 1150 110 1230 96 C 1310 82 1380 96 1440 70"
      />
      <motion.path
        {...ink}
        {...draw(0.3, 2)}
        d="M 0 508 L 540 500 C 680 494 740 430 840 372 C 900 338 950 296 1000 262 C 1040 236 1100 206 1150 178 C 1220 150 1280 118 1340 110 C 1390 104 1420 128 1440 148"
      />

      {/* Terrace walls: two faces, with a dotted course between */}
      {walls.map((w) => (
        <g key={w.d}>
          <motion.path {...ink} {...draw(w.delay)} d={w.d} />
          <motion.path {...ink} {...draw(w.delay + 0.15)} d={w.d2} />
          <motion.path
            {...ink}
            {...draw(w.delay + 0.3)}
            d={w.d.replace(/^M (\d+) (\d+)/, (_m, x, y) => `M ${x} ${Number(y) + 5}`)}
            strokeWidth={5}
            strokeOpacity={0.14}
            strokeDasharray="1 5"
          />
        </g>
      ))}

      {/* Olive trees on the terraces */}
      {trees.map((x, i) => {
        const y = x < 1120 ? 404 : x < 1300 ? 444 : 486;
        return (
          <g key={x}>
            <motion.path {...ink} {...draw(2.2 + i * 0.2, 1)} d={`M ${x} ${y} q -3 -12 1 -24`} />
            <motion.ellipse
              {...ink}
              cx={x + 1}
              cy={y - 36}
              rx={16}
              ry={12}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: start + 2.4 + i * 0.2, ease: EASE }}
            />
          </g>
        );
      })}

      {/* Cistern and the channel that feeds it */}
      <motion.path {...ink} {...draw(3.2, 1.2)} d="M 1196 458 C 1240 466 1274 480 1296 494" strokeDasharray="3 4" />
      <motion.path {...ink} {...draw(3.4, 1.2)} d="M 1300 500 V 516 H 1390 V 500" />
      <motion.path {...ink} {...draw(3.7, 1.2)} d="M 1304 508 q 7 -4 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0" />

      {/* The one thing we add: a roof for shade, on an existing terrace */}
      <motion.path
        d="M 1030 408 H 1126 M 1042 408 V 444 M 1114 408 V 444"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="square"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: start + 4.2, ease: EASE }}
      />
    </svg>
  );
};

/**
 * Opening: the statement, arriving one line at a time with a pause between lines,
 * over a drawing that builds itself the same way. The page practises what it says.
 */
export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = content.hero;
  const reduced = useReducedMotion();
  const lines = t.headline[currentLang].split('\n');
  const afterLines = 0.3 + lines.length * PAUSE_MS + 0.4;

  return (
    <section
      className="relative overflow-hidden border-b border-hairline font-mono flex flex-col justify-between"
      style={{ minHeight: 'max(600px, calc(100svh - 3.5rem))' }}
    >
      <SlopeDrawing reduced={reduced} start={0.8} />

      <div className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28">
        <h1 className="text-[clamp(34px,7vw,108px)] leading-[1] tracking-[-0.05em] font-medium text-[#0E0E0E]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: LINE_MS, delay: 0.3 + i * PAUSE_MS, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: afterLines, ease: EASE }}
          className="mt-8 sm:mt-12 flex items-start gap-3 text-[13px] sm:text-base leading-[1.6] text-[#0E0E0E] max-w-[48ch]"
        >
          <span aria-hidden className="mt-[0.55em] w-1.5 h-1.5 shrink-0 bg-accent" />
          <span>{t.subline[currentLang]}</span>
        </motion.p>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: afterLines + 1.2, ease: EASE }}
        className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
          <a href="#work" className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#0E0E0E] hover:text-accent transition-colors">
            <span>{t.ctaWork[currentLang]}</span>
            <span>↓</span>
          </a>
          <ul className="flex items-center gap-5 text-[11px] text-[#0E0E0E]/70" aria-label="Drawing key">
            <li className="flex items-center gap-2">
              <span aria-hidden className="w-6 h-px bg-[#0E0E0E]/45" />
              <span>{t.legendExists[currentLang]}</span>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="w-6 h-[2px] bg-accent" />
              <span>{t.legendAdded[currentLang]}</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};
