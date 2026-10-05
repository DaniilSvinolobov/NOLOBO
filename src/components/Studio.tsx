import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { StudioNetworkMap } from './StudioNetworkMap';

interface StudioProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const Studio: React.FC<StudioProps> = ({ currentLang }) => {
  const t = content.studio;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* One trigger for the whole section: text and map run on the same timeline. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) { setStarted(true); return; }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3 || entry.intersectionRect.height >= window.innerHeight * 0.3) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines = t.headline[currentLang].split('\n');
  const reveal = (delay: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 12 },
          animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section
      id="studio"
      ref={sectionRef}
      aria-labelledby="studio-title"
      className="relative py-16 sm:py-24 border-b border-hairline bg-[#F5F5F2] font-mono"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 pb-6 border-b border-hairline text-xs text-[#0E0E0E]/60">
          <span className="text-[#FF4D00] font-semibold">{t.sectionNumber}</span>
          <span className="h-px w-6 bg-[#0E0E0E]/20" aria-hidden />
          <span>{t.label[currentLang]}</span>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Text column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <h2 id="studio-title" className="text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.08] tracking-[-0.03em] font-medium text-[#0E0E0E]">
              {lines.map((line, i) => (
                <span key={`${currentLang}-${i}`} className="block overflow-hidden pb-1 -mb-1">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { y: '110%' }}
                    animate={started ? { y: '0%' } : { y: '110%' }}
                    transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.p
              {...reveal(0.3)}
              className="mt-5 text-[13px] sm:text-sm leading-[1.65] text-[#0E0E0E]/65 max-w-[46ch]"
            >
              {t.subline[currentLang]}
            </motion.p>

            {/* Who leads the studio: the evidence for the headline */}
            <motion.div {...reveal(0.5)} className="mt-7 border border-hairline px-4 py-3.5 text-[12.5px] leading-[1.6]">
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0E0E0E]">
                <span className="w-1.5 h-1.5 bg-[#FF4D00]" aria-hidden />
                <span>{t.person.name}</span>
              </div>
              <div className="mt-1 text-[#0E0E0E]/70">{t.person.role[currentLang]}</div>
              <div className="mt-2 text-[#0E0E0E]">{t.person.education}</div>
              <div className="text-[#0E0E0E]/60 tabular-nums">{t.person.years[currentLang]}</div>
            </motion.div>

            <ul className="mt-6 border-t border-hairline">
              {t.blocks.map((block, i) => {
                const isActive = active === block.number;
                return (
                  <motion.li key={block.number} {...reveal(0.6 + i * 0.12)} className="border-b border-hairline">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => setActive(block.number)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(block.number)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : block.number)}
                      className="relative w-full text-left grid grid-cols-[2.25rem_1fr] py-4 pr-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#FF4D00]"
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF4D00] origin-top transition-transform duration-500"
                        style={{ transform: `scaleY(${isActive ? 1 : 0})`, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                      />
                      <span className={`pl-3 text-[11px] pt-[3px] transition-colors duration-300 ${isActive ? 'text-[#FF4D00]' : 'text-[#0E0E0E]/35'}`}>
                        {block.number}
                      </span>
                      <span>
                        <span className="block text-[13px] font-medium text-[#0E0E0E]">{block.title[currentLang]}</span>
                        <span className={`block mt-1 text-[12.5px] leading-[1.6] transition-colors duration-300 ${isActive ? 'text-[#0E0E0E]/85' : 'text-[#0E0E0E]/60'}`}>
                          {block.text[currentLang]}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Map column */}
          <div className="lg:col-span-7">
            <StudioNetworkMap currentLang={currentLang} hoveredBlock={active} started={started} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
};
