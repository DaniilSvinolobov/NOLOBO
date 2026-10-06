import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SectionHeadProps {
  number: string;
  kicker: string;
  headline: string;
  intro?: string;
  id?: string;
  aside?: React.ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Opening of every section: the headline is the main visual element. */
export const SectionHead: React.FC<SectionHeadProps> = ({ number, kicker, headline, intro, id, aside }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const lines = headline.split('\n');

  return (
    <div ref={ref} className="font-mono pb-10 sm:pb-14 border-b border-hairline">
      <div className="flex items-center gap-3 text-xs text-[#0E0E0E]/60 uppercase tracking-widest">
        <span className="text-[#FF4D00] font-bold">{number}</span>
        <span className="h-px w-6 bg-[#0E0E0E]/20" aria-hidden />
        <span>{kicker}</span>
      </div>

      <h2
        id={id}
        className="mt-8 sm:mt-12 text-[40px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-[-0.05em] font-medium text-[#0E0E0E]"
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="block"
              initial={reduced ? false : { y: '110%' }}
              animate={reduced || inView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      {(intro || aside) && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          {intro && <p className="text-[13px] sm:text-sm leading-[1.65] text-[#0E0E0E]/65 max-w-[56ch]">{intro}</p>}
          {aside}
        </motion.div>
      )}
    </div>
  );
};
