import React from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { TerrainWireframe } from './TerrainWireframe';
import { LandscapeSchematics } from './LandscapeSchematics';

interface ResearchProps {
  currentLang: Language;
}

/** Where the technical work lives: terrain study, then what each material does. */
export const Research: React.FC<ResearchProps> = ({ currentLang }) => {
  const t = content.research;
  const model = content.hero.model;

  return (
    <>
      <section id="research" className="relative py-16 sm:py-28 border-b border-hairline bg-[#F5F5F2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            number={t.sectionNumber}
            kicker={t.kicker[currentLang]}
            headline={t.headline[currentLang]}
            intro={t.intro[currentLang]}
          />

          <figure className="mt-14 sm:mt-20 border border-hairline bg-[#F5F5F2] font-mono">
            <div className="px-3.5 py-2 border-b border-hairline flex items-center justify-between text-[10px] text-[#0E0E0E]/70">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">{t.studyLabel[currentLang]}</span>
                <span className="font-semibold text-[#0E0E0E]">{model.header[currentLang]}</span>
              </div>
              <div className="text-[#0E0E0E]/50 text-[9px] hidden sm:block">{model.locationCode}</div>
            </div>
            <TerrainWireframe currentLang={currentLang} />
            <figcaption className="px-3.5 py-2 border-t border-hairline text-[10px] text-[#0E0E0E]/60">
              {t.studyNote[currentLang]}
            </figcaption>
          </figure>
        </div>
      </section>
      <LandscapeSchematics currentLang={currentLang} />
    </>
  );
};
