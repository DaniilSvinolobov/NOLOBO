import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, Language } from '../content';
import { TerrainWireframe } from './TerrainWireframe';
import { ScrambleHeadline } from './ScrambleHeadline';
import { formatSunset, sunPosition, poleShadow } from './sunset';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [sunset, setSunset] = useState<string | null>(null);
  const [sun, setSun] = useState<{ altitude: number; azimuth: number; shadow: number | null } | null>(null);
  const reduced = useReducedMotion();
  const t = content.hero;
  const meta = content.meta;

  const conditions = meta.conditions;

  // Today's sunset in Palma, recalculated every 10 minutes so it rolls over at midnight
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setSunset(formatSunset(now, conditions.latitude, conditions.longitude, meta.timezone));
      const pos = sunPosition(now, conditions.latitude, conditions.longitude);
      setSun({ ...pos, shadow: poleShadow(pos.altitude) });
    };
    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, [conditions.latitude, conditions.longitude, meta.timezone]);

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      className="relative border-b border-hairline overflow-hidden pt-5 pb-10 sm:py-14"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Technical Corner & Metadata Bar */}
        <div className="border border-hairline bg-[#F5F5F2]/80 p-3 sm:p-3.5 mb-6 sm:mb-10 flex flex-wrap items-center justify-between gap-y-2.5 font-mono text-[11px] text-[#0E0E0E]/70 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
          {/* Node 01: Island conditions */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-0 sm:pr-4 tabular-nums">
            <span className="text-accent">⊕</span>
            <span className="text-[#0E0E0E] font-medium">{conditions.place[currentLang]}</span>
            <span className="text-[#0E0E0E]/40">·</span>
            {sun && sun.altitude > 0 && (
              <>
                <span>
                  {conditions.sunLabel[currentLang]}{' '}
                  <span className="text-[#0E0E0E]">
                    {Math.round(sun.altitude)}° / {Math.round(sun.azimuth)}°
                  </span>
                </span>
                {sun.shadow !== null && (
                  <>
                    <span className="text-[#0E0E0E]/40">·</span>
                    <span>
                      {conditions.poleLabel[currentLang]}{' '}
                      <span className="text-[#0E0E0E]">{sun.shadow.toFixed(1)} m</span>
                    </span>
                  </>
                )}
              </>
            )}
            {sunset && (
              <>
                {sun && sun.altitude > 0 && <span className="text-[#0E0E0E]/40">·</span>}
                <span>
                  {conditions.sunsetLabel[currentLang]} <span className="text-[#0E0E0E]">{sunset}</span>
                </span>
              </>
            )}
          </div>

          {/* Node 02: Availability */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
            <span className="inline-flex items-center gap-1.5 text-[#0E0E0E] font-medium">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>{meta.availability[currentLang]}</span>
            </span>
          </div>
        </div>

        {/* Hero Main Grid: Text on Left (5 cols) & Interactive 3D Terrain on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Typographic Focus */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Sheet Sub-Header Tag */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/70 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>{meta.tagline[currentLang]}</span>
            </div>

            {/* JetBrains Mono Headline with Fast Character Scramble (~600ms) - 3 lines on desktop */}
            <ScrambleHeadline
              as="h1"
              text={t.headline[currentLang]}
              scrambleDuration={600}
              className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-mono font-medium tracking-[-0.04em] leading-[1.05] text-[#0E0E0E] whitespace-pre-line"
            />

            {/* Conditions resolve one by one, then the closing line */}
            <div className="font-mono text-xs sm:text-[13px] md:text-sm text-[#0E0E0E]/80 leading-relaxed">
              <p className="flex flex-wrap gap-x-2">
                {t.conditionWords.map((word, i) => (
                  <motion.span
                    key={word.en}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 + i * 0.18, ease: smoothEase }}
                  >
                    {word[currentLang]}
                  </motion.span>
                ))}
              </p>
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + t.conditionWords.length * 0.18 + 0.3, ease: smoothEase }}
                className="mt-1 flex items-center gap-2 text-[#0E0E0E]"
              >
                <span className="w-1.5 h-1.5 bg-accent" />
                <span>{t.closing[currentLang]}</span>
              </motion.p>
            </div>

            {/* Precision CTA Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="px-5 py-2.5 bg-[#0E0E0E] text-[#F5F5F2] font-mono text-xs tracking-wider uppercase hover:bg-accent transition-colors inline-flex items-center gap-2"
              >
                <span>{t.ctaWork[currentLang]}</span>
                <span>↓</span>
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 border border-hairline font-mono text-xs tracking-wider uppercase text-[#0E0E0E] hover:border-[#0E0E0E] hover:bg-[#0E0E0E]/5 transition-colors inline-flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-accent" />
                <span>{t.ctaInquire[currentLang]}</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Terrain Wireframe with Technical Analysis & 5-Stage Construction Process */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
            className="lg:col-span-7 relative border border-hairline bg-[#F5F5F2]"
          >
            {/* Top Technical Figure Header */}
            <div className="px-3.5 py-2 border-b border-hairline flex items-center justify-between text-[10px] font-mono text-[#0E0E0E]/70 bg-[#F5F5F2]">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">FIG. 00</span>
                <span className="font-semibold text-[#0E0E0E]">{t.model.header[currentLang]}</span>
              </div>
              <div className="text-[#0E0E0E]/50 font-mono text-[9px] hidden sm:block">
                {t.model.locationCode}
              </div>
            </div>

            {/* Interactive 3D Terrain Wireframe Canvas with 5 Stages */}
            <TerrainWireframe currentLang={currentLang} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
