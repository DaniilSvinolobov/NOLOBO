import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { ScrambleHeadline } from './ScrambleHeadline';

interface ServicesProps {
  currentLang: Language;
}

export const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const t = content.services;
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const disciplinesBadge: Record<Language, string> = {
    en: 'DISCIPLINES & CRAFT',
    de: 'DISZIPLINEN & HANDWERK',
    es: 'DISCIPLINAS Y OFICIO',
    ca: 'DISCIPLINES I OFICI',
    ru: 'НАПРАВЛЕНИЯ И РЕМЕСЛО',
  };

  const servicesData = [
    {
      id: 'terrain',
      number: '01',
      label: { en: 'TERRAIN', de: 'TOPOGRAFIE', es: 'TERRENO', ca: 'TERRENY', ru: 'РЕЛЬЕФ' },
      scope: {
        en: 'SLOPE INTEGRATION · STONE TERRACES',
        de: 'HANGBEBELAGUNG · STEINTERRASSEN',
        es: 'INTEGRACIÓN EN PENDIENTE · BANCALES',
        ca: 'INTEGRACIÓ EN PENDENT · MARJADES',
        ru: 'УКЛОН · КАМЕННЫЕ ТЕРРАСЫ',
      },
      code: {
        en: 'LANDSCAPE EMBEDMENT',
        de: 'LANDSCHAFTSEINBETTUNG',
        es: 'INTEGRACIÓN EN EL PAISAJE',
        ca: 'INTEGRACIÓ EN EL PAISATGE',
        ru: 'ИНТЕГРАЦИЯ В ЛАНДШАФТ',
      },
      renderDrawing: (isHovered: boolean) => (
        <svg viewBox="0 0 120 70" className="w-full h-24 stroke-current fill-none" strokeWidth="1">
          {/* Stepped terraced slope section line */}
          <path d="M5,62 L30,62 L30,48 L58,48 L58,32 L88,32 L88,14 L115,14" className="opacity-80" />
          {/* Natural bedrock hatching lines */}
          <line x1="30" y1="62" x2="20" y2="68" className="opacity-30" />
          <line x1="58" y1="48" x2="48" y2="58" className="opacity-30" />
          <line x1="88" y1="32" x2="78" y2="42" className="opacity-30" />
          {/* Dry stone retaining wall symbols */}
          <rect x="27" y="48" width="6" height="14" className={isHovered ? 'stroke-[#FF4D00]' : 'opacity-60'} />
          <rect x="55" y="32" width="6" height="16" className={isHovered ? 'stroke-[#FF4D00]' : 'opacity-60'} />
          <rect x="85" y="14" width="6" height="18" className={isHovered ? 'stroke-[#FF4D00]' : 'opacity-60'} />
          {/* Slope angle dimension arc & label */}
          <path d="M5,62 L115,14" strokeDasharray="2 3" className="opacity-30" />
          <text x="75" y="62" fill="currentColor" stroke="none" className="text-[7px] font-mono opacity-50">
            SLOPE 32°
          </text>
        </svg>
      ),
    },
    {
      id: 'architecture',
      number: '02',
      label: { en: 'ARCHITECTURE', de: 'ARCHITEKTUR', es: 'ARQUITECTURA', ca: 'ARQUITECTURA', ru: 'АРХИТЕКТУРА' },
      scope: {
        en: 'MONOLITHIC VOLUMES · PASSIVE LIGHT',
        de: 'MONOLITHISCHE BAUKÖRPER · PASSIVES LICHT',
        es: 'VOLÚMENES MONOLÍTICOS · LUZ PASIVA',
        ca: 'VOLUMS MONOLÍTICS · LLUM PASSIVA',
        ru: 'МОНОЛИТНЫЕ ОБЪЕМЫ · ПАССИВНЫЙ СВЕТ',
      },
      code: {
        en: 'RESIDENTIAL ARCHITECTURE',
        de: 'WOHNARCHITEKTUR',
        es: 'ARQUITECTURA RESIDENCIAL',
        ca: 'ARQUITECTURA RESIDENCIAL',
        ru: 'ЖИЛАЯ АРХИТЕКТУРА',
      },
      renderDrawing: (isHovered: boolean) => (
        <svg viewBox="0 0 120 70" className="w-full h-24 stroke-current fill-none" strokeWidth="1">
          {/* Pavilion ground datum */}
          <line x1="5" y1="58" x2="115" y2="58" className="opacity-30" />
          {/* Monolithic lower plinth */}
          <rect x="15" y="42" width="90" height="16" className="opacity-50" />
          {/* Recessed glass living void */}
          <rect x="25" y="24" width="70" height="18" className="opacity-40" strokeDasharray="3 2" />
          <line x1="50" y1="24" x2="50" y2="42" className="opacity-40" />
          <line x1="72" y1="24" x2="72" y2="42" className="opacity-40" />
          {/* Cantilever roof slab */}
          <rect x="10" y="18" width="100" height="6" className={isHovered ? 'stroke-[#FF4D00]' : 'opacity-90'} />
          {/* Solar ray vector */}
          <line x1="110" y1="4" x2="88" y2="24" stroke="#FF4D00" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="112" cy="2" r="1.5" fill="#FF4D00" />
        </svg>
      ),
    },
    {
      id: 'interior',
      number: '03',
      label: { en: 'INTERIOR', de: 'INNENAUSBAU', es: 'INTERIOR', ca: 'INTERIOR', ru: 'ИНТЕРЬЕР' },
      scope: {
        en: 'MARÈS & SANTANYÍ · BESPOKE TIMBER',
        de: 'MARÈS & SANTANYÍ · MASSIVHOLZ NACH MASS',
        es: 'MARÈS Y SANTANYÍ · CARPINTERÍA A MEDIDA',
        ca: 'MARÈS I SANTANYÍ · FUSTERIA A MIDA',
        ru: 'МАРЕС И САНТАНЬИ · ДЕРЕВО НА ЗАКАЗ',
      },
      code: {
        en: 'TACTILE INTERIORS',
        de: 'HAPTISCHE INNENRÄUME',
        es: 'INTERIORES TÁCTILES',
        ca: 'INTERIORS TÀCTILS',
        ru: 'ТАКТИЛЬНЫЕ ИНТЕРЬЕРЫ',
      },
      renderDrawing: (isHovered: boolean) => (
        <svg viewBox="0 0 120 70" className="w-full h-24 stroke-current fill-none" strokeWidth="1">
          {/* Wall datum */}
          <line x1="10" y1="12" x2="10" y2="58" className="opacity-40" />
          <line x1="10" y1="58" x2="110" y2="58" className="opacity-40" />
          {/* Monolithic stone island block */}
          <polygon points="40,58 75,58 85,38 50,38" className={isHovered ? 'stroke-[#FF4D00]' : 'opacity-80'} />
          <polygon points="50,38 85,38 85,28 50,28" className="opacity-40" />
          <line x1="40" y1="58" x2="40" y2="48" className="opacity-60" />
          {/* Floor-to-ceiling recessed joinery lines */}
          <line x1="18" y1="12" x2="18" y2="58" className="opacity-30" strokeDasharray="1 3" />
          <line x1="28" y1="12" x2="28" y2="58" className="opacity-30" strokeDasharray="1 3" />
          {/* Concealed cove lighting hairline */}
          <line x1="10" y1="12" x2="95" y2="12" stroke="#FF4D00" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="50" y="22" fill="currentColor" stroke="none" className="text-[7px] font-mono opacity-50">
            SOLID BLOCK
          </text>
        </svg>
      ),
    },
    {
      id: 'direction',
      number: '04',
      label: { en: 'DIRECTION', de: 'BAULEITUNG', es: 'DIRECCIÓN', ca: 'DIRECCIÓ', ru: 'НАДЗОР' },
      scope: {
        en: 'LOCAL CRAFTSMEN · PRECISION · QUALITY',
        de: 'LOKALE HANDWERKER · PRÄZISION · QUALITÄT',
        es: 'ARTESANOS LOCALES · PRECISIÓN · CALIDAD',
        ca: 'ARTESANS LOCALS · PRECISIÓ · QUALITAT',
        ru: 'МЕСТНЫЕ МАСТЕРА · ТОЧНОСТЬ · КАЧЕСТВО',
      },
      code: {
        en: 'SITE & CRAFT DIRECTION',
        de: 'BAU- & HANDWERKSLEITUNG',
        es: 'DIRECCIÓN DE OBRA Y OFICIO',
        ca: "DIRECCIÓ D'OBRA I OFICI",
        ru: 'АВТОРСКИЙ НАДЗОР',
      },
      renderDrawing: (isHovered: boolean) => (
        <svg viewBox="0 0 120 70" className="w-full h-24 stroke-current fill-none" strokeWidth="1">
          {/* Orthogonal coordination grid */}
          <line x1="15" y1="10" x2="15" y2="60" className="opacity-25" />
          <line x1="45" y1="10" x2="45" y2="60" className="opacity-25" />
          <line x1="75" y1="10" x2="75" y2="60" className="opacity-25" />
          <line x1="105" y1="10" x2="105" y2="60" className="opacity-25" />
          <line x1="10" y1="20" x2="110" y2="20" className="opacity-25" />
          <line x1="10" y1="40" x2="110" y2="40" className="opacity-25" />
          <line x1="10" y1="60" x2="110" y2="60" className="opacity-25" />
          {/* Milestone timeline vector */}
          <polyline points="15,50 45,40 75,25 105,15" stroke={isHovered ? '#FF4D00' : 'currentColor'} strokeWidth="1.4" />
          {/* Milestone node diamonds */}
          <polygon points="15,48 17,50 15,52 13,50" fill="#0E0E0E" />
          <polygon points="45,38 47,40 45,42 43,40" fill="#0E0E0E" />
          <polygon points="75,23 77,25 75,27 73,25" fill="#0E0E0E" />
          <polygon points="105,13 107,15 105,17 103,15" fill="#FF4D00" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="relative py-14 sm:py-20 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-hairline">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
              <span className="text-[#FF4D00] font-bold">{t.sectionNumber}</span>
              <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
              <span>{t.kicker[currentLang]}</span>
            </div>
            <ScrambleHeadline
              as="h2"
              text={t.headline[currentLang]}
              className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#0E0E0E]"
            />
          </div>

          <div className="font-mono text-xs text-[#0E0E0E]/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
            <span>{disciplinesBadge[currentLang]}</span>
          </div>
        </div>

        {/* Row of Schematic Line Drawings with One-Word Labels */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, idx) => {
            const isHovered = activeItem === idx;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: smoothEase }}
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
                className={`p-6 border border-hairline bg-[#F5F5F2] hover:border-[#0E0E0E] transition-all flex flex-col justify-between select-none ${
                  isHovered ? 'bg-[#0E0E0E]/[0.02]' : ''
                }`}
              >
                {/* Top: Spec Code & Index */}
                <div className="flex items-center justify-between font-mono text-xs text-[#0E0E0E]/50 pb-4 border-b border-hairline-subtle">
                  <span>{service.number}</span>
                  <span className="text-[10px] tracking-wider">{service.code[currentLang]}</span>
                </div>

                {/* Center: Schematic Line Drawing */}
                <div className="py-6 flex items-center justify-center text-[#0E0E0E] group-hover:scale-102 transition-transform">
                  {service.renderDrawing(isHovered)}
                </div>

                {/* Bottom: One-Word Label & Scope Metadata */}
                <div className="pt-4 border-t border-hairline-subtle space-y-1.5 font-mono">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold tracking-wider text-[#0E0E0E] uppercase">
                      {service.label[currentLang]}
                    </h3>
                    <span className="text-xs text-[#FF4D00]">→</span>
                  </div>
                  <div className="text-[10px] text-[#0E0E0E]/60 tracking-tight leading-relaxed">
                    {service.scope[currentLang]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
