import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, Language } from '../content';

interface HeroProps {
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE_MS = 1.4; // each line takes its time
const PAUSE_MS = 1.0; // and then waits before the next

/**
 * Opening: the statement, and nothing else. It arrives one line at a time,
 * with a pause between lines. The page practises what it says.
 */
export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = content.hero;
  const reduced = useReducedMotion();
  const lines = t.headline[currentLang].split('\n');
  const afterLines = 0.3 + lines.length * PAUSE_MS + 0.4;

  return (
    <section
      className="relative border-b border-hairline font-mono flex flex-col justify-between"
      style={{ minHeight: 'max(560px, calc(100svh - 3.5rem))' }}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28">
        <h1 className="text-[clamp(34px,7vw,108px)] leading-[1] tracking-[-0.05em] font-medium text-[#0E0E0E]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: LINE_MS, delay: 0.3 + i * PAUSE_MS, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: afterLines, ease: EASE }}
          className="mt-8 sm:mt-12 flex items-start gap-3 text-[13px] sm:text-base leading-[1.6] text-[#0E0E0E] max-w-[48ch]"
        >
          <span aria-hidden className="mt-[0.55em] w-1.5 h-1.5 shrink-0 bg-accent" />
          <span>{t.subline[currentLang]}</span>
        </motion.p>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: afterLines + 1.2, ease: EASE }}
        className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <a href="#work" className="inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#0E0E0E] hover:text-accent transition-colors">
          <span>{t.ctaWork[currentLang]}</span>
          <span>↓</span>
        </a>
      </motion.div>
    </section>
  );
};
