import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface KeywordBlock {
  number: string;
  keyword: string;
  lines: string[];
  /** Small extra content under the lines (glyph, scope list). */
  extra?: React.ReactNode;
}

interface KeywordBlocksProps {
  blocks: KeywordBlock[];
  /** Columns on desktop. */
  columns?: 1 | 2;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** One big word, one or two short lines, generous space. */
export const KeywordBlocks: React.FC<KeywordBlocksProps> = ({ blocks, columns = 2 }) => {
  const reduced = useReducedMotion();
  return (
    <ul className={`font-mono grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2 md:gap-x-16' : ''} gap-y-14 sm:gap-y-20`}>
      {blocks.map((b, i) => (
        <motion.li
          key={b.number}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: EASE }}
          className={`border-t border-hairline pt-5 ${columns === 2 && i % 2 === 1 ? 'md:mt-24' : ''}`}
        >
          <div className="flex items-start justify-between gap-4 text-[11px] text-[#0E0E0E]/40 tabular-nums">
            <span>{b.number}</span>
            {b.extra && <span className="text-[#0E0E0E]">{b.extra}</span>}
          </div>
          <div className="mt-6 sm:mt-10 text-[36px] sm:text-[56px] lg:text-[72px] leading-[1] tracking-[-0.05em] font-medium text-[#0E0E0E] break-words">
            {b.keyword}
          </div>
          <div className="mt-6 space-y-1.5 max-w-[44ch] text-[13px] sm:text-sm leading-[1.6]">
            {b.lines.map((l, j) => (
              <p key={l} className={j === 0 ? 'text-[#0E0E0E]' : 'text-[#0E0E0E]/60'}>
                {l}
              </p>
            ))}
          </div>
        </motion.li>
      ))}
    </ul>
  );
};
