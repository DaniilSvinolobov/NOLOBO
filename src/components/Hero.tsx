import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, Language } from '../content';
import { pageHref } from './useHashRoute';

interface HeroProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Opening: three comforts of an August afternoon, side by side.
 * Hovering or focusing one widens it. Each leads to Research.
 */
export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = content.hero;
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const lines = t.headline[currentLang].split('\n');

  return (
    <section
      className="relative border-b border-hairline font-mono flex flex-col"
      style={{ minHeight: 'max(720px, calc(100svh - 3.5rem))' }}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <h1 className="text-[clamp(30px,6.4vw,92px)] leading-[1] tracking-[-0.05em] font-medium text-[#0E0E0E]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-4 sm:mt-6 text-[13px] sm:text-sm leading-[1.65] text-[#0E0E0E]/65 max-w-[56ch]"
        >
          {t.subline[currentLang]}
        </motion.p>
      </div>

      <ul
        className="flex-1 flex flex-col lg:flex-row border-t border-hairline min-h-[420px]"
        onMouseLeave={() => setActive(null)}
      >
        {t.strips.map((s, i) => {
          const on = active === i;
          return (
            <motion.li
              key={s.number}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.18, ease: EASE }}
              className="relative overflow-hidden border-b lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0 border-hairline min-h-[30svh] lg:min-h-0 transition-[flex-grow] duration-[1100ms]"
              style={{ flexGrow: on ? 2.4 : 1, flexBasis: 0, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            >
              <a
                href={pageHref('research')}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${s.label[currentLang]}: ${s.line[currentLang]}`}
                className="group absolute inset-0 block text-[#F5F5F2] bg-[#0E0E0E] focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
              >
                {s.image && (
                  <img
                    src={s.image}
                    alt=""
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms]"
                    style={{ transform: on ? 'scale(1.04)' : 'scale(1)', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  />
                )}
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/80 via-[#0E0E0E]/10 to-transparent" />

                <span className="absolute left-4 sm:left-6 right-4 sm:right-6 bottom-5 sm:bottom-7">
                  <span className="flex items-baseline gap-3">
                    <span className="text-[11px] tabular-nums text-accent">{s.number}</span>
                    <span className="text-[28px] sm:text-[40px] leading-none tracking-[-0.04em] font-medium">{s.label[currentLang]}</span>
                  </span>
                  <span
                    className={`block mt-3 max-w-[34ch] text-[12px] sm:text-[13px] leading-[1.6] text-[#F5F5F2]/85 transition-opacity duration-[900ms] ${on ? 'lg:opacity-100' : 'lg:opacity-0'}`}
                  >
                    {s.line[currentLang]}
                  </span>
                </span>
              </a>
            </motion.li>
          );
        })}
      </ul>

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-[11px] sm:text-xs text-[#0E0E0E]/70 leading-relaxed">
        <div className="space-y-1">
          <p className="text-[#0E0E0E]">{t.localNote[currentLang]}</p>
          <p>{content.studio.blocks[0].text[currentLang]}</p>
        </div>
        <div className="flex flex-col lg:items-end gap-1">
          <p>{t.conceptNote[currentLang]}</p>
          <a href="#work" className="inline-flex items-center gap-2 text-[#0E0E0E] hover:text-accent transition-colors">
            <span>{t.ctaWork[currentLang]}</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
