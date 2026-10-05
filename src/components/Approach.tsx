import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { ScrambleHeadline } from './ScrambleHeadline';

interface ApproachProps {
  currentLang: Language;
}

export const Approach: React.FC<ApproachProps> = ({ currentLang }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const t = content.approach;
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  // 5 schematic SVG line drawings; titles and lines come from content.approach.steps
  const stepsData = [
    {
      step: '01',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Stepped hillside contours */}
          <path d="M8,54 Q25,54 36,46 T62,34 L74,28" className="opacity-40" strokeDasharray="2 2" />
          <path d="M6,46 Q26,44 42,34 T68,22 L76,18" className={isActive ? 'stroke-[#FF4D00]' : 'opacity-70'} strokeWidth="1.2" />
          <path d="M6,36 Q22,34 38,24 T64,12" className="opacity-30" />

          {/* Rooted wild olive tree symbol on the slope */}
          <line x1="28" y1="40" x2="28" y2="28" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="28" cy="24" r="5" className={isActive ? 'stroke-[#FF4D00]' : 'opacity-80'} strokeDasharray="2 1" />
          <circle cx="32" cy="22" r="3.5" className="opacity-60" />
          <path d="M28,40 L24,44 M28,40 L31,43" className="opacity-50" />

          {/* Sun path trajectory arc with solar ray */}
          <path d="M42,50 A26,26 0 0,0 70,22" className="opacity-30" strokeDasharray="2 3" />
          <circle cx="68" cy="16" r="3" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.1" />
          <line x1="68" y1="10" x2="68" y2="12" stroke="#FF4D00" />
          <line x1="62" y1="16" x2="64" y2="16" stroke="#FF4D00" />

          {/* Prevailing sea breeze stream lines */}
          <path d="M46,38 Q56,36 66,38" className="opacity-45" strokeDasharray="2 2" />
          <path d="M48,42 Q58,40 68,42" className="opacity-30" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      step: '02',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Ground datum */}
          <line x1="8" y1="50" x2="72" y2="50" className="opacity-40" />

          {/* Keep: solid line */}
          <rect x="12" y="34" width="14" height="16" strokeWidth="1.2" className="opacity-90" />

          {/* Remove: dashed and struck through */}
          <rect x="32" y="38" width="12" height="12" strokeDasharray="2 2" className="opacity-50" />
          <line x1="32" y1="38" x2="44" y2="50" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.2" />
          <line x1="44" y1="38" x2="32" y2="50" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.2" />

          {/* Strengthen: doubled line */}
          <rect x="50" y="28" width="16" height="22" strokeWidth="1.2" className="opacity-90" />
          <rect x="52.5" y="30.5" width="11" height="17" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.2" />

          {/* Dimension line above the three marks */}
          <line x1="12" y1="18" x2="66" y2="18" className="opacity-30" />
          <line x1="12" y1="15" x2="12" y2="21" className="opacity-40" />
          <line x1="39" y1="15" x2="39" y2="21" className="opacity-40" />
          <line x1="66" y1="15" x2="66" y2="21" className="opacity-40" />
        </svg>
      ),
    },
    {
      step: '03',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Natural slope profile */}
          <path d="M6,52 L26,52 L26,42 L56,42 L56,22 L74,12" className="opacity-30" strokeDasharray="2 2" />

          {/* Embedded architectural volume cut into hill */}
          <rect x="22" y="38" width="8" height="14" className="opacity-60" />
          <line x1="22" y1="45" x2="30" y2="45" className="opacity-40" />

          {/* Stepped terrace plane */}
          <line x1="22" y1="38" x2="62" y2="38" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.3" />

          {/* Living pavilion under cantilever */}
          <rect x="30" y="24" width="30" height="14" className="opacity-80" strokeWidth="1.2" />
          <line x1="42" y1="24" x2="42" y2="38" className="opacity-40" strokeDasharray="2 2" />

          {/* Continuous green roof slab blending back into terrain */}
          <rect x="26" y="20" width="38" height="4" className={isActive ? 'stroke-[#FF4D00]' : 'opacity-90'} strokeWidth="1.3" />
          <path d="M26,20 L16,20 L6,26" className="opacity-50" />
          <path d="M64,20 L74,14" className="opacity-50" />

          {/* Indoor-outdoor terrace pergola */}
          <line x1="30" y1="20" x2="22" y2="28" className="opacity-40" strokeDasharray="1 2" />
        </svg>
      ),
    },
    {
      step: '04',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Ground datum */}
          <line x1="10" y1="52" x2="70" y2="52" className="opacity-30" />

          {/* Settled home digital twin outline */}
          <rect x="22" y="32" width="34" height="20" className="opacity-80" strokeWidth="1.2" />
          <line x1="34" y1="32" x2="34" y2="52" className="opacity-40" />

          {/* High-end sensor mesh & climate telemetry grid */}
          <line x1="22" y1="38" x2="56" y2="38" className="opacity-30" strokeDasharray="1 2" />
          <line x1="22" y1="45" x2="56" y2="45" className="opacity-30" strokeDasharray="1 2" />
          
          {/* Active telemetry node points (optimisation & analysis) */}
          <circle cx="28" cy="38" r="1.5" fill={isActive ? '#FF4D00' : 'currentColor'} />
          <circle cx="48" cy="45" r="1.5" fill={isActive ? '#FF4D00' : 'currentColor'} />
          
          {/* Analysis diagnostic radar vector / solar ray sweep */}
          <path d="M48,16 L36,32" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="50" cy="14" r="3" stroke="#FF4D00" strokeWidth="1.2" />
          <line x1="50" y1="8" x2="50" y2="10" stroke="#FF4D00" />
          <line x1="54" y1="14" x2="56" y2="14" stroke="#FF4D00" />

          {/* Long-term aftercare stewardship arc */}
          <path d="M14,48 A30,30 0 0,1 66,48" className="opacity-35" strokeDasharray="2 3" />
          
          {/* Continuous pulse signal */}
          <polyline points="14,24 20,24 23,18 26,28 29,24 35,24" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1" className="opacity-70" />
        </svg>
      ),
    },
    {
      step: '05',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Traditional Dry-Stone Wall Course (Pedra en Sec) */}
          <rect x="12" y="38" width="18" height="14" className="opacity-70" />
          <rect x="30" y="38" width="20" height="14" className="opacity-70" />
          <rect x="50" y="38" width="18" height="14" className="opacity-70" />
          
          <rect x="20" y="24" width="22" height="14" className={isActive ? 'stroke-[#FF4D00]' : 'opacity-85'} strokeWidth="1.2" />
          <rect x="42" y="24" width="20" height="14" className="opacity-70" />

          {/* Stone dressing texture lines */}
          <line x1="25" y1="28" x2="36" y2="28" className="opacity-30" />
          <line x1="27" y1="33" x2="34" y2="33" className="opacity-30" />

          {/* Tactile wood joinery / try-square alignment tool */}
          <path d="M52,14 L52,32 L66,32" stroke={isActive ? '#FF4D00' : 'currentColor'} strokeWidth="1.2" />
          <line x1="52" y1="20" x2="55" y2="20" stroke="#FF4D00" />
          <line x1="52" y1="26" x2="55" y2="26" stroke="#FF4D00" />
          
          {/* Plumb datum line */}
          <line x1="20" y1="10" x2="20" y2="48" className="opacity-30" strokeDasharray="2 3" />
          <polygon points="20,52 18,48 22,48" fill={isActive ? '#FF4D00' : 'currentColor'} stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <section id="approach" className="relative py-14 sm:py-20 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-hairline">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
              <span className="text-[#FF4D00] font-bold">{t.sectionNumber}</span>
              <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
              <span>{t.kicker[currentLang]}</span>
            </div>
            <ScrambleHeadline
              as="h2"
              text={t.headline[currentLang]}
              className="text-3xl sm:text-4xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E]"
            />
          </div>

          <p className="font-mono text-xs text-[#0E0E0E]/70 leading-relaxed max-w-[56ch]">{t.intro[currentLang]}</p>
        </div>

        {/* 5 steps: Observe, Decide, Draw, Calculate, Build */}
        {/* Order made visible: three steps are decided, one is calculated, one is built */}
        <div className="mt-8 hidden lg:grid grid-cols-5 gap-4 font-mono text-[10px] tracking-wider text-[#0E0E0E]/50" aria-hidden>
          {[
            { span: 'col-span-3', label: t.phaseLabels.decided[currentLang], accent: true },
            { span: 'col-span-1', label: t.phaseLabels.calculated[currentLang], accent: false },
            { span: 'col-span-1', label: t.phaseLabels.built[currentLang], accent: false },
          ].map((b) => (
            <div key={b.label} className={`${b.span} flex flex-col gap-1.5`}>
              <span className={b.accent ? 'text-[#FF4D00]' : ''}>{b.label}</span>
              <span className={`h-px w-full ${b.accent ? 'bg-[#FF4D00]' : 'bg-[#0E0E0E]/30'}`} />
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {stepsData.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: smoothEase }}
                onClick={() => setActiveStep(idx)}
                className={`p-5 border bg-[#F5F5F2] hover:border-[#0E0E0E] transition-all flex flex-col h-[340px] sm:h-[360px] select-none ${
                  isActive ? 'border-[#0E0E0E] bg-[#0E0E0E]/[0.02]' : 'border-hairline'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveStep(idx);
                }}
              >
                {/* Top Row: Index & Indicator */}
                <div className="h-5 flex items-center justify-between font-mono text-xs shrink-0">
                  <span className={isActive ? 'text-[#FF4D00] font-bold' : 'text-[#0E0E0E]/40'}>
                    {item.step}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 bg-[#FF4D00]" />}
                </div>

                {/* Elaborate Schematic Line Drawing: centered with equal space above and below */}
                <div className="flex-1 flex items-center justify-center text-[#0E0E0E] group-hover:scale-105 transition-transform">
                  <div className="w-16 h-14 flex items-center justify-center">
                    {item.renderDrawing(isActive)}
                  </div>
                </div>

                {/* Bottom Row: Exact same divider line, Title on same line, and Description */}
                <div className="pt-3 border-t border-hairline shrink-0 space-y-1.5 font-mono">
                  <div className="h-5 flex items-center text-base font-bold tracking-wider text-[#0E0E0E] uppercase">
                    {t.steps[idx].phase[currentLang]}
                  </div>
                  <div className="text-[12px] text-[#0E0E0E] leading-snug min-h-[2.5rem] flex items-start">
                    {t.steps[idx].title[currentLang]}
                  </div>
                  <div className="text-[11px] text-[#0E0E0E]/55 leading-snug">
                    {t.steps[idx].description[currentLang]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commitments */}
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(14,14,14,0.12)] border border-hairline font-mono text-[11px] text-[#0E0E0E]/70">
          {t.commitments.map((line) => (
            <li key={line.en} className="bg-[#F5F5F2] px-5 py-3 flex items-center gap-2">
              <span className="w-1 h-1 shrink-0 bg-[#0E0E0E]/40" />
              <span>{line[currentLang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
