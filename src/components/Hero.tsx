import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { TerrainWireframe } from './TerrainWireframe';
import { ScrambleHeadline } from './ScrambleHeadline';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const [mallorcaTime, setMallorcaTime] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const t = content.hero;
  const meta = content.meta;

  // Live Mallorca local time
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Madrid',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setMallorcaTime(`${formatter.format(now)} CEST`);
      } catch {
        setMallorcaTime('12:45:00 CEST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Brief (100-200ms) random glitch every 6-10 seconds
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let timeoutId: number;
    const scheduleGlitch = () => {
      const delay = 6000 + Math.random() * 4000; // 6-10 seconds
      timeoutId = window.setTimeout(() => {
        setIsGlitching(true);
        window.setTimeout(() => {
          setIsGlitching(false);
          scheduleGlitch();
        }, 160); // 160ms brief pulse
      }, delay);
    };

    scheduleGlitch();
    return () => clearTimeout(timeoutId);
  }, []);

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      className={`relative border-b border-hairline overflow-hidden pt-5 pb-10 sm:py-14 transition-all ${
        isGlitching ? 'glitch-active' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Technical Corner & Metadata Bar */}
        <div className="border border-hairline bg-[#F5F5F2]/80 p-3 sm:p-3.5 mb-6 sm:mb-10 flex flex-wrap items-center justify-between gap-y-2.5 font-mono text-[11px] text-[#0E0E0E]/70 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
          {/* Node 01: Location & Coordinates */}
          <div className="flex items-center gap-2 pr-0 sm:pr-4">
            <span className="text-[#FF4D00]">⊕</span>
            <span className="text-[#0E0E0E] font-medium">{meta.locationName}</span>
            <span className="text-[#0E0E0E]/40">·</span>
            <span>{meta.coordinates}</span>
          </div>

          {/* Node 02: Real-time Mallorca clock */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:px-4 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#0E0E0E]/50">CLOCK:</span>
            <span className="text-[#0E0E0E] font-semibold">{mallorcaTime || '12:00:00 CEST'}</span>
          </div>

          {/* Node 03: Status & Elevation */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[#0E0E0E]/50">DATUM:</span>
            <span className="text-[#0E0E0E]">{meta.elevation}</span>
            <span className="text-[#0E0E0E]/40">·</span>
            <span className="inline-flex items-center gap-1.5 text-[#0E0E0E] font-medium">
              <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
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
              <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
              <span>{meta.tagline[currentLang]}</span>
            </div>

            {/* JetBrains Mono Headline with Fast Character Scramble (~600ms) - 3 lines on desktop */}
            <ScrambleHeadline
              as="h1"
              text={t.headline[currentLang]}
              scrambleDuration={600}
              className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-mono font-medium tracking-[-0.03em] leading-[1.12] text-[#0E0E0E] whitespace-pre-line"
            />

            {/* Subline in JetBrains Mono font, max-width ~42ch */}
            <p className="text-xs sm:text-[13px] md:text-sm text-[#0E0E0E]/80 font-mono leading-relaxed max-w-[42ch]">
              {t.subline[currentLang]}
            </p>

            {/* Precision CTA Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="px-5 py-2.5 bg-[#0E0E0E] text-[#F5F5F2] font-mono text-xs tracking-wider uppercase hover:bg-[#FF4D00] transition-colors inline-flex items-center gap-2"
              >
                <span>{t.ctaWork[currentLang]}</span>
                <span>↓</span>
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 border border-hairline font-mono text-xs tracking-wider uppercase text-[#0E0E0E] hover:border-[#0E0E0E] hover:bg-[#0E0E0E]/5 transition-colors inline-flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
                <span>{t.ctaInquire[currentLang]}</span>
                <span>→</span>
              </a>
            </div>

            {/* Values Row: 01 Listen · 02 Study · 03 Preserve */}
            <div className="pt-5 border-t border-hairline-subtle flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-mono text-[#0E0E0E]/70">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#FF4D00]" />
                <span>{t.labels.listen[currentLang]}</span>
              </span>
              <span className="text-[#0E0E0E]/30">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#0E0E0E]/50" />
                <span>{t.labels.study[currentLang]}</span>
              </span>
              <span className="text-[#0E0E0E]/30">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-[#0E0E0E]/50" />
                <span>{t.labels.preserve[currentLang]}</span>
              </span>
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
                <span className="text-[#FF4D00] font-bold">FIG. 00</span>
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
