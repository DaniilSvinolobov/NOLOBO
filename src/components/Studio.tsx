import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { StudioNetworkMap } from './StudioNetworkMap';
import { ScrambleHeadline } from './ScrambleHeadline';

interface StudioProps {
  currentLang: Language;
}

export const Studio: React.FC<StudioProps> = ({ currentLang }) => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const t = content.studio;
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="studio" className="relative py-14 sm:py-20 border-b border-hairline bg-[#F5F5F2] font-mono">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Label */}
        <div className="flex items-center justify-between pb-6 border-b border-hairline">
          <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
            <span className="text-[#FF4D00] font-bold">{t.sectionNumber}</span>
            <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
            <span>{t.label[currentLang]}</span>
          </div>

          <div className="font-mono text-xs text-[#0E0E0E]/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
            <span className="uppercase tracking-wider">{t.mapLabels.studio[currentLang]}</span>
          </div>
        </div>

        {/* Two Columns on Desktop, Stacked on Mobile */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Headline, Subline, and Five Numbered Blocks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="lg:col-span-5 space-y-6"
          >
            {/* JetBrains Mono Headline */}
            <ScrambleHeadline
              as="h2"
              text={t.headline[currentLang]}
              className="text-2xl sm:text-3xl lg:text-4xl font-mono font-medium tracking-tight text-[#0E0E0E]"
            />

            {/* JetBrains Mono Subline */}
            <p className="text-xs sm:text-[13px] md:text-sm text-[#0E0E0E]/80 font-mono leading-relaxed max-w-[44ch]">
              {t.subline[currentLang]}
            </p>

            {/* Five Numbered Blocks (label + one line each) */}
            <div className="pt-2 border-t border-hairline divide-y divide-hairline">
              {t.blocks.map((block) => {
                const isHovered = hoveredBlock === block.number;
                return (
                  <div
                    key={block.number}
                    onMouseEnter={() => setHoveredBlock(block.number)}
                    onMouseLeave={() => setHoveredBlock(null)}
                    onClick={() =>
                      setHoveredBlock(hoveredBlock === block.number ? null : block.number)
                    }
                    className={`py-3.5 sm:py-4 px-2.5 -mx-2.5 transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? 'bg-[#0E0E0E]/[0.035] pl-3.5 border-l-2 border-l-[#FF4D00]'
                        : 'border-l-2 border-l-transparent hover:bg-[#0E0E0E]/[0.02]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Block Number */}
                      <span
                        className={`text-xs font-mono font-bold transition-colors ${
                          isHovered ? 'text-[#FF4D00]' : 'text-[#0E0E0E]/40'
                        }`}
                      >
                        {block.number}
                      </span>

                      {/* Label + one line text */}
                      <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#0E0E0E]/90">
                        <span
                          className={`font-semibold transition-colors ${
                            isHovered ? 'text-[#0E0E0E]' : 'text-[#0E0E0E]'
                          }`}
                        >
                          {block.title[currentLang]}
                        </span>
                        <span className="text-[#0E0E0E]/40 mx-2">—</span>
                        <span
                          className={`transition-colors ${
                            isHovered ? 'text-[#0E0E0E]' : 'text-[#0E0E0E]/80'
                          }`}
                        >
                          {block.text[currentLang]}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Interactive Schematic Map (The visual carries the section) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="lg:col-span-7"
          >
            <StudioNetworkMap
              currentLang={currentLang}
              hoveredBlock={hoveredBlock}
              onSelectBlock={(id) => setHoveredBlock(id)}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
