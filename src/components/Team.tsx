import React, { Suspense, lazy } from 'react';
import { content, Language } from '../content';
const HologramFigure = lazy(() =>
  import('./HologramFigure').then((m) => ({ default: m.HologramFigure })),
);

interface TeamProps {
  currentLang: Language;
}

export const Team: React.FC<TeamProps> = ({ currentLang }) => {
  const t = content.studio;
  const tm = t.team;
  const L = currentLang;

  return (
    <div className="font-mono">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Daniil: portrait as a point-cloud hologram */}
        <div className="lg:col-span-5">
          <div className="border border-hairline bg-[#F5F5F2] px-4 pt-4">
            <Suspense fallback={<div className="aspect-[349/763] max-h-[620px] mx-auto" />}>
            <HologramFigure
              kind="portrait"
              src={tm.portraitSrc}
              alt={tm.portraitAlt[L]}
              aspectClass="aspect-[349/763] max-h-[620px] mx-auto"
            />
            </Suspense>
            <div className="flex items-center justify-between py-2.5 mt-2 border-t border-hairline text-[10px] text-[#0E0E0E]/50">
              <span>{tm.photoCredit[L]}</span>
              <span>{tm.dragHint[L]}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <div className="flex items-center gap-2 text-[11px] text-[#0E0E0E]/50 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#FF4D00]" aria-hidden />
            <span>{tm.label[L]}</span>
          </div>
          <h3 className="mt-5 text-[32px] sm:text-[48px] leading-[1.02] tracking-[-0.04em] font-medium text-[#0E0E0E]">
            {t.person.name}
          </h3>
          <p className="mt-4 text-[13px] sm:text-sm text-[#0E0E0E]">{t.person.role[L]}</p>
          <dl className="mt-8 border-t border-hairline text-[12.5px] leading-[1.6]">
            <div className="grid grid-cols-[6rem_1fr] gap-x-4 py-3 border-b border-hairline">
              <dt className="text-[#0E0E0E]/45">{tm.educationLabel[L]}</dt>
              <dd className="text-[#0E0E0E]">
                {t.person.education}
                <span className="block text-[#0E0E0E]/60 tabular-nums">{t.person.years[L]}</span>
              </dd>
            </div>
            <div className="grid grid-cols-[6rem_1fr] gap-x-4 py-3 border-b border-hairline">
              <dt className="text-[#0E0E0E]/45">{tm.experienceLabel[L]}</dt>
              <dd className="text-[#0E0E0E] space-y-1">
                {tm.experience[L].map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Specialist slots: same effect, abstract figure, no face, no name */}
      <ul className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {tm.specialists.map((s, i) => (
          <li key={s.label.en} className="border border-hairline px-3 pt-3">
            <Suspense fallback={<div className="aspect-[3/4]" />}>
            <HologramFigure
              kind="figure"
              variant={i}
              alt={`${tm.figureAlt[L]}: ${s.label[L]}`}
              aspectClass="aspect-[3/4]"
            />
            </Suspense>
            <div className="flex items-baseline gap-3 py-3 mt-1 border-t border-hairline text-[11px] leading-snug text-[#0E0E0E]">
              <span className="text-[#0E0E0E]/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.label[L]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
