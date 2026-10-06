import React, { useEffect, useRef, useState } from 'react';
import { content, Language } from '../content';
import { StudioNetworkMap } from './StudioNetworkMap';
import { SectionHead } from './SectionHead';
import { KeywordBlocks } from './KeywordBlocks';
import { Team } from './Team';

interface StudioProps {
  currentLang: Language;
}

export const Studio: React.FC<StudioProps> = ({ currentLang }) => {
  const t = content.studio;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* The map starts its own timeline when it is in view. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) { setStarted(true); return; }
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
          <KeywordBlocks
            blocks={t.blocks.map((b) => ({
              number: b.number,
              keyword: b.title[currentLang],
              lines: [b.text[currentLang]],
            }))}
          />
        </div>

        <div ref={mapRef} className="mt-20 sm:mt-32">
          <StudioNetworkMap currentLang={currentLang} hoveredBlock={null} started={started} reduced={reduced} />
        </div>
      </div>
    </section>
  );
};
