import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { content, Language, MaterialItem } from '../content';
import { ScrambleHeadline } from './ScrambleHeadline';

/** Material photo: always in colour, slight zoom on hover. */
const MaterialTileImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
  />
);

interface LandscapeSchematicsProps {
  currentLang: Language;
}

/** Single-language drawing captions: English only for now, other languages fall back. */
const L = (en: string): Record<Language, string> => ({ en, de: en, es: en, ca: en, ru: en });

/** Condition tags: what the material acts on. */
const ConditionChips: React.FC<{ ids: string[]; currentLang: Language }> = ({ ids, currentLang }) => (
  <>
    {ids.map((id) => (
      <span
        key={id}
        className="px-2 py-0.5 bg-[#F5F5F2]/95 border border-hairline font-mono text-[9px] uppercase tracking-wider text-[#0E0E0E]"
      >
        {content.conditions.find((c) => c.id === id)?.label[currentLang] ?? id}
      </span>
    ))}
  </>
);

export const LandscapeSchematics: React.FC<LandscapeSchematicsProps> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [activeTab, setActiveTab] = useState<'grid' | 'schematics'>('grid');
  const [activeMaterialIdx, setActiveMaterialIdx] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  const materials = content.materials;
  const titles = content.materialsSection;

  const handlePrevMaterial = () => {
    setActiveMaterialIdx((prev) => {
      const nextIdx = prev <= 0 ? materials.length - 1 : prev - 1;
      if (selectedMaterial) setSelectedMaterial(materials[nextIdx]);
      return nextIdx;
    });
  };

  const handleNextMaterial = () => {
    setActiveMaterialIdx((prev) => {
      const nextIdx = prev >= materials.length - 1 ? 0 : prev + 1;
      if (selectedMaterial) setSelectedMaterial(materials[nextIdx]);
      return nextIdx;
    });
  };

  // Keyboard navigation for modal & tabs (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevMaterial();
      } else if (e.key === 'ArrowRight') {
        handleNextMaterial();
      } else if (e.key === 'Escape') {
        setSelectedMaterial(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMaterial]);

  const schematics = [
    {
      id: 'stratigraphy',
      code: 'DWG-01',
      title: L('GROUND · WHAT THE SLOPE HOLDS'),
      scale: 'SCALE 1:50',
      specs: ['BEDROCK UNDER THE TERRACES', 'FOUNDATION ANCHORED IN THE BED', 'BUILDING SET INTO THE SLOPE'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          <motion.path
            d="M10,40 Q70,42 120,60 T220,95 L270,110"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="stroke-[#0E0E0E]"
            strokeWidth="1.4"
          />
          <motion.path
            d="M10,65 Q80,70 140,88 T270,128"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.1 }}
            className="opacity-40"
            strokeDasharray="2 3"
          />
          <motion.path
            d="M10,95 Q100,105 180,118 T270,145"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="opacity-50"
          />
          <line x1="85" y1="52" x2="85" y2="135" stroke="#FF4D00" strokeWidth="1.4" strokeDasharray="3 2" />
          <line x1="140" y1="68" x2="140" y2="145" stroke="#FF4D00" strokeWidth="1.4" strokeDasharray="3 2" />
          <polygon points="65,48 160,48 160,38 65,38" className="opacity-80 stroke-[#0E0E0E]" />
          <text x="70" y="44" fill="currentColor" stroke="none" className="text-[8px] font-mono">
            TERRACE
          </text>
        </svg>
      ),
    },
    {
      id: 'hydrology',
      code: 'DWG-02',
      title: L('WATER · WHERE IT GOES'),
      scale: 'WATER',
      specs: ['RAIN PASSES THROUGH DRY-STONE WALLS', 'CISTERN COLLECTS WHAT FALLS', 'NO PRESSURE BEHIND THE WALL'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          <path d="M10,50 L90,50 L90,95 L190,95 L190,135 L270,135" className="opacity-70 stroke-[#0E0E0E]" strokeWidth="1.2" />
          <line x1="90" y1="50" x2="90" y2="95" stroke="#0E0E0E" strokeWidth="1.6" />
          <line x1="190" y1="95" x2="190" y2="135" stroke="#0E0E0E" strokeWidth="1.6" />
          <motion.path
            d="M50,20 L50,48 M70,20 L70,48 M130,65 L130,93 M150,65 L150,93 M220,105 L220,133"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="stroke-[#FF4D00]"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <circle cx="140" cy="115" r="14" className="stroke-[#0E0E0E] opacity-50" strokeDasharray="3 2" />
          <text x="118" y="117" fill="currentColor" stroke="none" className="text-[7px] font-mono opacity-80">
            CISTERN
          </text>
        </svg>
      ),
    },
    {
      id: 'solar',
      code: 'DWG-03',
      title: L('LIGHT · SUN ANGLE AND MASS'),
      scale: 'SOLSTICE · 39.6°N',
      specs: ['SUMMER NOON: SUN 74° HIGH', 'WINTER NOON: SUN 27° HIGH', 'STONE TAKES THE HEAT AND HOLDS IT'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          <line x1="20" y1="120" x2="260" y2="120" className="opacity-40" />
          <rect x="80" y="70" width="80" height="50" className="opacity-80 stroke-[#0E0E0E]" strokeWidth="1.2" />
          <line x1="80" y1="70" x2="60" y2="70" stroke="#0E0E0E" strokeWidth="1.8" />
          <motion.path
            d="M40,25 L105,70"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.3 }}
            className="stroke-[#FF4D00]"
            strokeWidth="1.4"
          />
          <text x="25" y="20" fill="#FF4D00" stroke="none" className="text-[8px] font-mono">
            SUMMER NOON 74°
          </text>
          <motion.path
            d="M20,60 L140,118"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.1 }}
            className="opacity-50"
            strokeDasharray="3 3"
          />
          <text x="15" y="55" fill="currentColor" stroke="none" className="text-[8px] font-mono opacity-60">
            WINTER NOON 27°
          </text>
        </svg>
      ),
    },
    {
      id: 'microclimate',
      code: 'DWG-04',
      title: L('AIR · EMBAT BREEZE'),
      scale: 'AFTERNOON',
      specs: ['SEA BREEZE ENTERS LOW', 'WARM AIR LEAVES HIGH', 'THE PATIO WORKS AS A CHIMNEY'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          <line x1="20" y1="120" x2="260" y2="120" className="opacity-40" />
          <rect x="70" y="80" width="45" height="40" className="opacity-70 stroke-[#0E0E0E]" />
          <rect x="155" y="80" width="55" height="40" className="opacity-70 stroke-[#0E0E0E]" />
          <rect x="115" y="90" width="40" height="30" className="opacity-30 strokeDasharray-1 stroke-[#0E0E0E]" />
          <motion.path
            d="M15,100 C45,100 65,95 85,95 C105,95 125,75 135,45"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4 }}
            className="stroke-[#FF4D00]"
            strokeWidth="1.4"
          />
          <polygon points="135,40 131,48 139,48" fill="#FF4D00" stroke="none" />
          <text x="145" y="50" fill="#FF4D00" stroke="none" className="text-[8px] font-mono">
            WARM AIR OUT
          </text>
          <text x="15" y="92" fill="currentColor" stroke="none" className="text-[8px] font-mono opacity-60">
            SEA BREEZE IN
          </text>
        </svg>
      ),
    },
    {
      id: 'vegetation',
      code: 'DWG-05',
      title: L('SHADE · TREES AND ROOTS'),
      scale: 'TIME',
      specs: ['OLIVE CANOPY SHADES THE GROUND', 'ROOTS HOLD THE SOIL', 'TREES GROW, SHADE MOVES'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          <path d="M10,80 Q80,85 140,80 T270,75" className="opacity-60 stroke-[#0E0E0E]" strokeWidth="1.2" />
          <line x1="90" y1="80" x2="90" y2="40" stroke="#0E0E0E" strokeWidth="1.4" />
          <ellipse cx="90" cy="30" rx="35" ry="18" className="opacity-40" strokeDasharray="3 2" />
          <motion.path
            d="M90,80 L80,110 L60,135 M90,80 L95,115 L110,145 M90,80 L90,140"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4 }}
            className="stroke-[#FF4D00]"
            strokeWidth="1.2"
          />
          <rect x="150" y="75" width="10" height="35" className="opacity-70" />
          <line x1="160" y1="110" x2="270" y2="110" className="opacity-30" strokeDasharray="2 2" />
          <text x="35" y="24" fill="currentColor" stroke="none" className="text-[8px] font-mono opacity-50">
            CANOPY SHADE
          </text>
          <text x="105" y="130" fill="#FF4D00" stroke="none" className="text-[8px] font-mono font-medium">
            ROOTS
          </text>
        </svg>
      ),
    },
    {
      id: 'shutters',
      code: 'DWG-06',
      title: L('SUN INTO SHADE · SHUTTERS'),
      scale: 'SECTION',
      specs: ['CLOSED: DIRECT SUN STOPS AT THE SLATS', 'LIGHT STAYS, HEAT STAYS OUT', 'OPEN AT NIGHT: AIR PASSES'],
      renderSvg: (inView: boolean) => (
        <svg viewBox="0 0 280 160" className="w-full h-44 stroke-current fill-none" strokeWidth="1">
          {/* Ground and wall in section, with the window opening */}
          <line x1="20" y1="130" x2="260" y2="130" className="opacity-40" />
          <rect x="150" y="20" width="18" height="30" className="opacity-80 stroke-[#0E0E0E]" strokeWidth="1.2" />
          <rect x="150" y="110" width="18" height="20" className="opacity-80 stroke-[#0E0E0E]" strokeWidth="1.2" />

          {/* Shutter slats on the outside, tilted down and away */}
          {[52, 62, 72, 82, 92, 102].map((y) => (
            <line key={y} x1="128" y1={y} x2="146" y2={y + 8} stroke="#0E0E0E" strokeWidth="1.6" />
          ))}

          {/* Sun rays stop at the slats */}
          {[[30, 14, 128, 52], [48, 14, 128, 72], [66, 14, 128, 92]].map(([x1, y1, x2, y2]) => (
            <motion.line
              key={y2}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="stroke-[#FF4D00]"
              strokeWidth="1.4"
            />
          ))}
          <text x="20" y="10" fill="#FF4D00" stroke="none" className="text-[8px] font-mono">
            DIRECT SUN
          </text>

          {/* Shade inside */}
          <line x1="172" y1="60" x2="250" y2="60" className="opacity-40" strokeDasharray="2 3" />
          <line x1="172" y1="100" x2="250" y2="100" className="opacity-40" strokeDasharray="2 3" />
          <text x="186" y="84" fill="currentColor" stroke="none" className="text-[8px] font-mono opacity-60">
            SHADE
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="materials"
      ref={containerRef}
      className="relative py-16 sm:py-24 border-b border-hairline bg-[#F5F5F2]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-hairline">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
              <span className="text-[#FF4D00] font-bold">{titles.sectionNumber}</span>
              <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
              <span>{titles.kicker[currentLang]}</span>
            </div>
            <ScrambleHeadline
              as="h2"
              text={titles.headline[currentLang]}
              className="text-3xl sm:text-4xl lg:text-5xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E]"
            />
          </div>

          {/* View Mode & Material Navigator Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher: 6-Tile Grid vs Site Schematics */}
            <div className="flex items-center p-1 bg-[#0E0E0E]/5 border border-hairline font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('grid')}
                className={`px-3 py-1.5 transition-colors uppercase whitespace-nowrap ${
                  activeTab === 'grid'
                    ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                    : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
                }`}
              >
                {titles.gridTab[currentLang]}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schematics')}
                className={`px-3 py-1.5 transition-colors uppercase whitespace-nowrap ${
                  activeTab === 'schematics'
                    ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                    : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
                }`}
              >
                {titles.schematicsTab[currentLang]}
              </button>
            </div>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={handlePrevMaterial}
                className="px-3 py-1.5 border border-hairline bg-[#F5F5F2] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors flex items-center gap-1"
                aria-label="Previous material"
              >
                <span>{titles.prevBtn[currentLang]}</span>
              </button>
              <span className="text-[11px] text-[#0E0E0E]/60 px-2 tabular-nums font-mono">
                0{activeMaterialIdx + 1} / 0{materials.length}
              </span>
              <button
                type="button"
                onClick={handleNextMaterial}
                className="px-3 py-1.5 border border-hairline bg-[#F5F5F2] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors flex items-center gap-1"
                aria-label="Next material"
              >
                <span>{titles.nextBtn[currentLang]}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Direct Material Navigation Bar: All 6 materials clickable */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-[10px] text-[#0E0E0E]/50 uppercase tracking-wider pr-1">
            {titles.navigateLabel[currentLang]}
          </span>
          {materials.map((mat, idx) => (
            <button
              key={mat.id}
              type="button"
              onClick={() => {
                setActiveMaterialIdx(idx);
                setSelectedMaterial(mat);
              }}
              className={`px-2.5 py-1 border transition-colors text-[11px] flex items-center gap-1.5 ${
                activeMaterialIdx === idx
                  ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                  : 'border-hairline bg-[#F5F5F2] text-[#0E0E0E]/70 hover:border-[#0E0E0E] hover:text-[#0E0E0E]'
              }`}
            >
              <span className="text-[#FF4D00] text-[9px]">0{idx + 1}</span>
              <span>{mat.name[currentLang]}</span>
            </button>
          ))}
        </div>

        {/* View Mode 1: Prominent Grid of 6 Large Material Tiles */}
        {activeTab === 'grid' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {materials.map((mat, idx) => (
              <div
                key={mat.id}
                onClick={() => {
                  setActiveMaterialIdx(idx);
                  setSelectedMaterial(mat);
                }}
                className={`group border bg-[#F5F5F2] flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                  activeMaterialIdx === idx
                    ? 'border-[#0E0E0E] shadow-sm'
                    : 'border-hairline hover:border-[#0E0E0E]'
                }`}
              >
                {/* Header Tag with Number and Origin / Distance */}
                <div className="p-4 sm:p-5 border-b border-hairline font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF4D00] font-bold">0{idx + 1}</span>
                    <span className="font-semibold text-[#0E0E0E] tracking-tight">{mat.name[currentLang]}</span>
                  </div>
                  {/* Mono label with origin and distance to Mallorca site */}
                  <span className="font-mono text-[11px] text-[#0E0E0E]/70 bg-[#0E0E0E]/5 px-2 py-0.5 border border-hairline">
                    {mat.distance}
                  </span>
                </div>

                {/* Large Macro Texture Image */}
                <div className="aspect-[4/3] overflow-hidden relative bg-[#0E0E0E]/10">
                  <MaterialTileImage src={mat.image} alt={mat.name[currentLang]} />
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <ConditionChips ids={mat.conditions} currentLang={currentLang} />
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#0E0E0E] text-[#F5F5F2] font-mono text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    [{titles.inspectBtn[currentLang]} ↗]
                  </div>
                </div>

                {/* Tile Footer Details */}
                <div className="p-4 sm:p-5 border-t border-hairline space-y-2">
                  <h3 className="font-mono text-lg sm:text-xl font-medium tracking-[-0.03em] text-[#0E0E0E] group-hover:text-[#FF4D00] transition-colors">
                    {mat.does[currentLang]}
                  </h3>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xs text-[#FF4D00] italic">
                      {mat.localName}
                    </span>
                    <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase">
                      {mat.origin}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#0E0E0E]/75 leading-relaxed line-clamp-2">
                    {mat.description[currentLang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Site Schematics (Stratigraphy, Hydrology, Solar, Wind, Roots) */}
        {activeTab === 'schematics' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {schematics.map((item) => (
              <div
                key={item.id}
                className="border border-hairline hover:border-[#0E0E0E] bg-[#F5F5F2] p-5 sm:p-6 flex flex-col justify-between transition-colors"
              >
                {/* Header code */}
                <div className="flex items-center justify-between pb-3 border-b border-hairline font-mono text-xs">
                  <span className="font-semibold text-[#0E0E0E] flex items-center gap-1.5">
                    <span className="text-[#FF4D00]">■</span>
                    <span>{item.code}</span>
                  </span>
                  <span className="text-[10px] text-[#0E0E0E]/50">{item.scale}</span>
                </div>

                {/* SVG Drawing */}
                <div className="py-4 my-auto flex items-center justify-center">
                  {item.renderSvg(isInView)}
                </div>

                {/* Bottom details */}
                <div className="pt-3 border-t border-hairline space-y-2 font-mono">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0E0E0E] tracking-tight">
                    {item.title[currentLang]}
                  </h3>
                  <div className="space-y-0.5 text-[9px] text-[#0E0E0E]/60">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <span className="text-[#FF4D00] text-[8px]">+</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Section Footnote */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#0E0E0E]/50 px-1 border-t border-hairline-subtle pt-4">
          <span>{titles.footerPalette[currentLang]}</span>
          <span>{titles.footerHint[currentLang]}</span>
        </div>
      </div>

      {/* Full Material Inspection Dossier Modal with Rich Interactive Navigation */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 z-50 bg-[#0E0E0E]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedMaterial(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#F5F5F2] border border-[#0E0E0E] max-w-3xl w-full p-5 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF4D00]" />
                <span className="font-bold text-[#0E0E0E] uppercase">{titles.dossierTitle[currentLang]}</span>
                <span className="text-[#0E0E0E]/40">·</span>
                {/* Distance Mono Label */}
                <span className="font-semibold text-[#0E0E0E] bg-[#0E0E0E]/5 px-2 py-0.5 border border-hairline">
                  {selectedMaterial.distance}
                </span>
              </div>

              {/* Prev / Next Material Switchers within Modal */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMaterial}
                  className="px-2.5 py-1 border border-hairline bg-[#F5F5F2] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors flex items-center gap-1 text-[11px]"
                  aria-label={content.aria.prevMaterial[currentLang]}
                >
                  <span>←</span>
                  <span className="hidden sm:inline">{titles.prevBtn[currentLang]}</span>
                </button>
                <span className="text-[11px] text-[#0E0E0E]/60 px-1 tabular-nums">
                  0{activeMaterialIdx + 1} / 0{materials.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextMaterial}
                  className="px-2.5 py-1 border border-hairline bg-[#F5F5F2] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors flex items-center gap-1 text-[11px]"
                  aria-label={content.aria.nextMaterial[currentLang]}
                >
                  <span className="hidden sm:inline">{titles.nextBtn[currentLang]}</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMaterial(null)}
                  className="ml-2 px-2 py-1 text-xs hover:text-[#FF4D00] font-bold"
                  aria-label={content.aria.closeModal[currentLang]}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Image with High-Definition View */}
            <div className="aspect-[16/10] overflow-hidden border border-hairline bg-[#0E0E0E]/5 relative">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name[currentLang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                <ConditionChips ids={selectedMaterial.conditions} currentLang={currentLang} />
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-[#FF4D00] uppercase tracking-wider block">
                  {selectedMaterial.localName} · {selectedMaterial.origin}
                </span>
                <h3 className="text-2xl sm:text-3xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E] mt-1">
                  {selectedMaterial.does[currentLang]}
                </h3>
                <p className="text-sm font-mono text-[#0E0E0E]/70 mt-1">
                  {selectedMaterial.name[currentLang]} · {selectedMaterial.subtitle[currentLang]}
                </p>
              </div>

              <p className="font-mono text-xs sm:text-sm leading-relaxed text-[#0E0E0E]/85 border-t border-hairline pt-3">
                {selectedMaterial.description[currentLang]}
              </p>

              {/* Specification Sheet */}
              <div className="p-3.5 bg-[#0E0E0E]/[0.03] border border-hairline font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#0E0E0E]/60 uppercase">{titles.provenanceLabel[currentLang]}</span>
                <span className="font-bold text-[#0E0E0E]">{selectedMaterial.distance}</span>
              </div>

              {/* Direct Material Picker Buttons in Modal */}
              <div className="pt-2 border-t border-hairline-subtle flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                <span className="text-[#0E0E0E]/40 text-[10px] pr-1">{titles.jumpToLabel[currentLang]}</span>
                {materials.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setActiveMaterialIdx(i);
                      setSelectedMaterial(m);
                    }}
                    className={`px-2 py-0.5 border text-[10px] ${
                      activeMaterialIdx === i
                        ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F5F5F2]'
                        : 'border-hairline bg-[#F5F5F2] text-[#0E0E0E]/70 hover:border-[#0E0E0E]'
                    }`}
                  >
                    0{i + 1} {m.name[currentLang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
