import React from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { KeywordBlocks } from './KeywordBlocks';
import { ACCENT } from '../theme';

interface ApproachProps {
  currentLang: Language;
}

export const Approach: React.FC<ApproachProps> = ({ currentLang }) => {
  const t = content.approach;

  // 5 schematic SVG line drawings; titles and lines come from content.approach.steps
  const stepsData = [
    {
      step: '01',
      renderDrawing: (isActive: boolean) => (
        <svg viewBox="0 0 80 64" className="w-16 h-14 stroke-current fill-none" strokeWidth="1">
          {/* Stepped hillside contours */}
          <path d="M8,54 Q25,54 36,46 T62,34 L74,28" className="opacity-40" strokeDasharray="2 2" />
          <path d="M6,46 Q26,44 42,34 T68,22 L76,18" className={isActive ? 'stroke-accent' : 'opacity-70'} strokeWidth="1.2" />
          <path d="M6,36 Q22,34 38,24 T64,12" className="opacity-30" />

          {/* Rooted wild olive tree symbol on the slope */}
          <line x1="28" y1="40" x2="28" y2="28" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="28" cy="24" r="5" className={isActive ? 'stroke-accent' : 'opacity-80'} strokeDasharray="2 1" />
          <circle cx="32" cy="22" r="3.5" className="opacity-60" />
          <path d="M28,40 L24,44 M28,40 L31,43" className="opacity-50" />

          {/* Sun path trajectory arc with solar ray */}
          <path d="M42,50 A26,26 0 0,0 70,22" className="opacity-30" strokeDasharray="2 3" />
          <circle cx="68" cy="16" r="3" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.1" />
          <line x1="68" y1="10" x2="68" y2="12" stroke={ACCENT} />
          <line x1="62" y1="16" x2="64" y2="16" stroke={ACCENT} />

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
          <line x1="32" y1="38" x2="44" y2="50" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.2" />
          <line x1="44" y1="38" x2="32" y2="50" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.2" />

          {/* Strengthen: doubled line */}
          <rect x="50" y="28" width="16" height="22" strokeWidth="1.2" className="opacity-90" />
          <rect x="52.5" y="30.5" width="11" height="17" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.2" />

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
          <line x1="22" y1="38" x2="62" y2="38" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.3" />

          {/* Living pavilion under cantilever */}
          <rect x="30" y="24" width="30" height="14" className="opacity-80" strokeWidth="1.2" />
          <line x1="42" y1="24" x2="42" y2="38" className="opacity-40" strokeDasharray="2 2" />

          {/* Continuous green roof slab blending back into terrain */}
          <rect x="26" y="20" width="38" height="4" className={isActive ? 'stroke-accent' : 'opacity-90'} strokeWidth="1.3" />
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
          <circle cx="28" cy="38" r="1.5" fill={isActive ? ACCENT : 'currentColor'} />
          <circle cx="48" cy="45" r="1.5" fill={isActive ? ACCENT : 'currentColor'} />
          
          {/* Analysis diagnostic radar vector / solar ray sweep */}
          <path d="M48,16 L36,32" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="50" cy="14" r="3" stroke={ACCENT} strokeWidth="1.2" />
          <line x1="50" y1="8" x2="50" y2="10" stroke={ACCENT} />
          <line x1="54" y1="14" x2="56" y2="14" stroke={ACCENT} />

          {/* Long-term aftercare stewardship arc */}
          <path d="M14,48 A30,30 0 0,1 66,48" className="opacity-35" strokeDasharray="2 3" />
          
          {/* Continuous pulse signal */}
          <polyline points="14,24 20,24 23,18 26,28 29,24 35,24" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1" className="opacity-70" />
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
          
          <rect x="20" y="24" width="22" height="14" className={isActive ? 'stroke-accent' : 'opacity-85'} strokeWidth="1.2" />
          <rect x="42" y="24" width="20" height="14" className="opacity-70" />

          {/* Stone dressing texture lines */}
          <line x1="25" y1="28" x2="36" y2="28" className="opacity-30" />
          <line x1="27" y1="33" x2="34" y2="33" className="opacity-30" />

          {/* Tactile wood joinery / try-square alignment tool */}
          <path d="M52,14 L52,32 L66,32" stroke={isActive ? ACCENT : 'currentColor'} strokeWidth="1.2" />
          <line x1="52" y1="20" x2="55" y2="20" stroke={ACCENT} />
          <line x1="52" y1="26" x2="55" y2="26" stroke={ACCENT} />
          
          {/* Plumb datum line */}
          <line x1="20" y1="10" x2="20" y2="48" className="opacity-30" strokeDasharray="2 3" />
          <polygon points="20,52 18,48 22,48" fill={isActive ? ACCENT : 'currentColor'} stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <section id="approach" className="relative py-16 sm:py-28 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          number={t.sectionNumber}
          kicker={t.kicker[currentLang]}
          headline={t.headline[currentLang]}
          intro={t.intro[currentLang]}
        />

        <div className="mt-14 sm:mt-24">
          <KeywordBlocks
            blocks={stepsData.map((item, idx) => ({
              number: item.step,
              keyword: t.steps[idx].phase[currentLang],
              lines: [t.steps[idx].title[currentLang], t.steps[idx].description[currentLang]],
              extra: item.renderDrawing(false),
            }))}
          />
        </div>

        {/* Order made visible: three steps are decided, one is calculated, one is built */}
        <div className="mt-20 grid grid-cols-5 gap-4 font-mono text-[10px] tracking-wider text-[#0E0E0E]/50" aria-hidden>
          {[
            { span: 'col-span-3', label: t.phaseLabels.decided[currentLang], accent: true },
            { span: 'col-span-1', label: t.phaseLabels.calculated[currentLang], accent: false },
            { span: 'col-span-1', label: t.phaseLabels.built[currentLang], accent: false },
          ].map((b) => (
            <div key={b.label} className={`${b.span} flex flex-col gap-1.5`}>
              <span className={b.accent ? 'text-accent' : ''}>{b.label}</span>
              <span className={`h-px w-full ${b.accent ? 'bg-accent' : 'bg-[#0E0E0E]/30'}`} />
            </div>
          ))}
        </div>

        {/* Commitments */}
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(14,14,14,0.12)] border border-hairline font-mono text-[11px] text-[#0E0E0E]/70">
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
