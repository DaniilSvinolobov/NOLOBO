import React from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { motion, useReducedMotion } from 'motion/react';

interface ServicesProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const t = content.services;
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative py-16 sm:py-28 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          number={t.sectionNumber}
          kicker={t.kicker[currentLang]}
          headline={t.headline[currentLang]}
          intro={t.intro[currentLang]}
        />

        {/* One row per service: image, then what it covers */}
        <ol className="mt-14 sm:mt-24 font-mono">
          {t.items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 sm:py-14 border-t border-hairline"
            >
              <figure className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden border border-hairline bg-[#0E0E0E]/5 aspect-[16/10]">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </figure>

              <div className={`lg:col-span-5 flex flex-col ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-start justify-between text-[11px] tabular-nums text-[#0E0E0E]/40">
                  <span>{item.number}</span>
                  <span className="text-[#0E0E0E]/60">
                    {item.conditions
                      .map((id) => content.conditions.find((c) => c.id === id)?.label[currentLang] ?? id)
                      .join(' · ')}
                  </span>
                </div>
                <h3 className="mt-6 text-[32px] sm:text-[48px] leading-[1] tracking-[-0.05em] font-medium text-[#0E0E0E]">
                  {item.title[currentLang]}
                </h3>
                <p className="mt-5 text-[13px] sm:text-sm leading-[1.6] text-[#0E0E0E] max-w-[40ch]">
                  {item.summary[currentLang]}
                </p>
                <ul className="mt-6 border-t border-hairline text-[12px] text-[#0E0E0E]/70">
                  {item.scope[currentLang].map((line) => (
                    <li key={line} className="py-2 border-b border-hairline flex gap-3">
                      <span aria-hidden className="mt-[0.55em] w-1 h-1 shrink-0 bg-[#0E0E0E]/40" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Tools sit at the bottom of the hierarchy */}
        <div className="mt-6 px-0 grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-4 gap-y-1 font-mono text-[11px] text-[#0E0E0E]/70">
          <span className="text-[#0E0E0E]/40">{t.toolsLabel[currentLang]}</span>
          <span>{t.toolsLine[currentLang]}</span>
        </div>
      </div>
    </section>
  );
};
