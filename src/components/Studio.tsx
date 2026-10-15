import React from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { KeywordBlocks } from './KeywordBlocks';
import { Team } from './Team';

interface StudioProps {
  currentLang: Language;
}

export const Studio: React.FC<StudioProps> = ({ currentLang }) => {
  const t = content.studio;

  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="relative py-16 sm:py-28 border-b border-hairline bg-[#F5F5F2] font-mono"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          id="studio-title"
          number={t.sectionNumber}
          kicker={t.label[currentLang]}
          headline={t.headline[currentLang]}
          intro={t.subline[currentLang]}
        />

        <div className="mt-14 sm:mt-20">
          <Team currentLang={currentLang} />
        </div>

        <div className="mt-20 sm:mt-32">
          <div className="text-[11px] uppercase tracking-widest text-[#0E0E0E]/60">{t.practicesLabel[currentLang]}</div>
          <ol className="mt-6 border-t border-hairline">
            {t.practices.map((line, i) => (
              <li key={line.en} className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-x-3 py-4 sm:py-5 border-b border-hairline">
                <span className="text-[11px] tabular-nums text-[#0E0E0E]/40 pt-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[16px] sm:text-[22px] leading-[1.35] tracking-[-0.02em] text-[#0E0E0E] max-w-[42ch]">{line[currentLang]}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 sm:mt-32">
          <KeywordBlocks
            blocks={t.blocks.map((b) => ({
              number: b.number,
              keyword: b.title[currentLang],
              lines: [b.text[currentLang]],
            }))}
          />
        </div>
      </div>
    </section>
  );
};
