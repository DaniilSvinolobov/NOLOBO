import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Language } from '../content';
import { MaskRevealHeadline } from './MaskRevealHeadline';

interface SectionDividerProps {
  sectionNumber?: string;
  label?: string;
  currentLang?: Language;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  sectionNumber,
  label,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref} className="relative w-full overflow-hidden py-1">
      {/* 1px Hairline drawing itself across from left to right on scroll */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left center' }}
        className="h-[1px] w-full bg-[#0E0E0E]/15"
      />

      {(sectionNumber || label) && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex items-center justify-between font-mono text-[9px] text-[#0E0E0E]/40 uppercase tracking-widest select-none"
        >
          {sectionNumber && (
            <span className="flex items-center gap-1.5">
              <span className="text-accent">■</span>
              <span>SECTION {sectionNumber}</span>
            </span>
          )}
          {label && <span>{label}</span>}
        </motion.div>
      )}
    </div>
  );
};
