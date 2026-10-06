import React from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { KeywordBlocks } from './KeywordBlocks';

interface ServicesProps {
  currentLang: Language;
}

export const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const t = content.services;

  return (
    <section id="services" className="relative py-16 sm:py-28 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          number={t.sectionNumber}
          kicker={t.kicker[currentLang]}
          headline={t.headline[currentLang]}
          intro={t.intro[currentLang]}
        />

        <div className="mt-14 sm:mt-24">
          <KeywordBlocks
            blocks={t.items.map((item) => {
              return {
                number: item.number,
                keyword: item.keyword[currentLang],
                lines: [item.summary[currentLang]],
                extra: item.conditions
                  .map((id) => content.conditions.find((c) => c.id === id)?.label[currentLang] ?? id)
                  .join(' · '),
              };
            })}
          />
        </div>

        {/* Scope, one hairline row per service */}
        <ul className="mt-20 border-t border-hairline font-mono text-[12px]">
          {t.items.map((item) => {
            return (
              <li key={item.id} className="grid grid-cols-1 md:grid-cols-[4rem_14rem_1fr] gap-x-6 gap-y-2 py-5 border-b border-hairline">
                <span className="text-[#0E0E0E]/40 tabular-nums">{item.number}</span>
                <span className="text-[#0E0E0E] font-medium">{item.title[currentLang]}</span>
                <span className="text-[#0E0E0E]/65 leading-relaxed">{item.scope[currentLang].join(' · ')}</span>
              </li>
            );
          })}
        </ul>

        {/* Tools sit at the bottom of the hierarchy */}
        <div className="mt-6 px-0 grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-4 gap-y-1 font-mono text-[11px] text-[#0E0E0E]/70">
          <span className="text-[#0E0E0E]/40">{t.toolsLabel[currentLang]}</span>
          <span>{t.toolsLine[currentLang]}</span>
        </div>
      </div>
    </section>
  );
};
