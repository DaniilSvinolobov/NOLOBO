import React from 'react';
import { motion } from 'motion/react';
import { Language, content } from '../content';

interface StudioNetworkMapProps {
  currentLang: Language;
  hoveredBlock: string | null;
  onSelectBlock?: (blockId: string | null) => void;
}

export const StudioNetworkMap: React.FC<StudioNetworkMapProps> = ({
  currentLang,
  hoveredBlock,
  onSelectBlock,
}) => {
  const t = content.studio;
  const labels = t.mapLabels;
  const readouts = t.readouts;

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  // Localized dictionary for map annotation text
  const i18n = {
    en: {
      hoverHint: 'HOVER BLOCKS TO ISOLATE NODES',
      corridor: 'CORRIDOR',
      remoteSync: '⇄ REMOTE SYNC [EUROPE / CLIENT]',
      tramuntana: '▲ SERRA DE TRAMUNTANA · 1445M',
      microclimate: '[MICROCLIMATE: 1200MM/YR]',
      habitat: '[HABITAT: COASTAL PINE & OAK]',
      stone: 'STONE',
      wood: 'WOOD',
      ceramics: 'CERAMICS',
      drystone: 'DRY STONE',
      analysis: 'ANALYSIS',
      computation: 'COMPUTATION',
      engineering: 'ENGINEERING',
      palmaHq: 'PALMA HQ',
    },
    es: {
      hoverHint: 'PASA EL CURSOR POR LOS BLOQUES PARA AISLAR NODOS',
      corridor: 'CORREDOR',
      remoteSync: '⇄ CONEXIÓN REMOTA [EUROPA / CLIENTE]',
      tramuntana: '▲ SERRA DE TRAMUNTANA · 1445M',
      microclimate: '[MICROCLIMA: 1200MM/AÑO]',
      habitat: '[HÁBITAT: PINAR Y ENCINAR COSTEÑO]',
      stone: 'PIEDRA',
      wood: 'MADERA',
      ceramics: 'CERÁMICA',
      drystone: 'PIEDRA EN SECO',
      analysis: 'ANÁLISIS',
      computation: 'COMPUTACIÓN',
      engineering: 'INGENIERÍA',
      palmaHq: 'SEDE PALMA',
    },
    ca: {
      hoverHint: 'PASSA EL CURSOR PELS BLOCS PER AÏLLAR NODES',
      corridor: 'CORREDOR',
      remoteSync: '⇄ CONNEXIÓ REMOTA [EUROPA / CLIENT]',
      tramuntana: '▲ SERRA DE TRAMUNTANA · 1445M',
      microclimate: '[MICROCLIMA: 1200MM/ANY]',
      habitat: '[HÀBITAT: PINEDA I ALZINAR COSTER]',
      stone: 'PEDRA',
      wood: 'FUSTA',
      ceramics: 'CERÀMICA',
      drystone: 'PEDRA EN SEC',
      analysis: 'ANÀLISI',
      computation: 'COMPUTACIÓ',
      engineering: 'ENGINYERIA',
      palmaHq: 'SEU PALMA',
    },
    de: {
      hoverHint: 'BLÖCKE ÜBERFAHREN, UM KNOTEN HERVORZUHEBEN',
      corridor: 'KORRIDOR',
      remoteSync: '⇄ REMOTE-KOORDINATION [EUROPA / KUNDE]',
      tramuntana: '▲ SERRA DE TRAMUNTANA · 1445M',
      microclimate: '[MIKROKLIMA: 1200MM/JAHR]',
      habitat: '[HABITAT: KÜSTENKIEFER & EICHE]',
      stone: 'NATURSTEIN',
      wood: 'HOLZ',
      ceramics: 'KERAMIK',
      drystone: 'TROCKENSTEIN',
      analysis: 'ANALYSE',
      computation: 'COMPUTATION',
      engineering: 'INGENIEURWESEN',
      palmaHq: 'PALMA HQ',
    },
    ru: {
      hoverHint: 'НАВЕДИТЕ НА БЛОК ДЛЯ ПОДСВЕТКИ УЗЛОВ',
      corridor: 'КОРИДОР',
      remoteSync: '⇄ УДАЛЁННАЯ СВЯЗЬ [ЕВРОПА / КЛИЕНТ]',
      tramuntana: '▲ СЕРРА-ДЕ-ТРАМУНТАНА · 1445М',
      microclimate: '[МИКРОКЛИМАТ: 1200 ММ/ГОД]',
      habitat: '[СРЕДА: СОСНЫ И ДУБЫ ПОБЕРЕЖЬЯ]',
      stone: 'КАМЕНЬ',
      wood: 'ДЕРЕВО',
      ceramics: 'КЕРАМИКА',
      drystone: 'СУХОЙ КАМЕНЬ',
      analysis: 'АНАЛИЗ',
      computation: 'ВЫЧИСЛЕНИЯ',
      engineering: 'ИНЖЕНЕРИЯ',
      palmaHq: 'ШТАБ ПАЛЬМА',
    },
  }[currentLang];

  // Accurate simplified geographic polygon of Mallorca (540x380 SVG coordinates)
  const MALLORCA_OUTLINE =
    'M 61,193 L 72,175 L 103,166 L 128,148 L 159,127 L 176,107 L 215,88 L 255,75 L 295,61 L 362,45 L 340,65 L 313,76 L 351,76 L 330,96 L 341,123 L 362,142 L 404,107 L 446,142 L 439,166 L 418,185 L 404,208 L 388,230 L 376,255 L 365,274 L 335,295 L 302,317 L 281,297 L 264,278 L 211,278 L 194,227 L 159,200 L 124,220 L 117,239 L 99,220 L 68,208 Z';

  // Faint contour lines for the Tramuntana mountain range (NW spine)
  const CONTOURS = [
    { id: 'c1', d: 'M 75,185 Q 115,158 155,138 T 225,98 T 305,68 T 352,50', elevation: '400M' },
    { id: 'c2', d: 'M 95,172 Q 135,148 175,124 T 235,92 T 290,66', elevation: '800M' },
    { id: 'c3', d: 'M 130,152 Q 168,130 198,112 T 250,88', elevation: '1200M' },
  ];

  // Studio Center Node (Palma area)
  const STUDIO_NODE = { id: 'studio', x: 162, y: 202, name: labels.studio[currentLang], code: i18n.palmaHq };

  // Local Artisans Nodes (Stone, Wood, Ceramics, Dry Stone spread across island)
  const ARTISAN_NODES = [
    { id: 'art-stone', x: 345, y: 268, craftKey: 'stone' as const, location: 'Santanyí', symbol: '■' },
    { id: 'art-wood', x: 265, y: 175, craftKey: 'wood' as const, location: 'Pla', symbol: '◎' },
    { id: 'art-ceramics', x: 195, y: 170, craftKey: 'ceramics' as const, location: 'Marratxí', symbol: '▦' },
    { id: 'art-drystone', x: 135, y: 145, craftKey: 'drystone' as const, location: 'Tramuntana', symbol: '▱' },
  ];

  // Local Specialists Nodes (Analysis, Computational Design, Engineering)
  const SPECIALIST_NODES = [
    { id: 'spec-analysis', x: 235, y: 135, fieldKey: 'analysis' as const, location: 'Inca' },
    { id: 'spec-comp', x: 138, y: 180, fieldKey: 'computation' as const, location: 'Palma Lab' },
    { id: 'spec-eng', x: 335, y: 195, fieldKey: 'engineering' as const, location: 'Manacor' },
  ];

  // Project Sites Nodes (small squares)
  const SITE_NODES = [
    { id: 'site-01', x: 155, y: 125, name: 'Deià', ref: '01' },
    { id: 'site-02', x: 185, y: 105, name: 'Sóller', ref: '02' },
    { id: 'site-03', x: 330, y: 280, name: 'Santanyí', ref: '03' },
    { id: 'site-04', x: 310, y: 80, name: 'Pollença', ref: '04' },
  ];

  // Interactive hover highlight states based on active block
  const isBlock01 = hoveredBlock === '01'; // 01 → Habitats and contours
  const isBlock02 = hoveredBlock === '02'; // 02 → Studio plus dashed remote line off-map
  const isBlock03 = hoveredBlock === '03'; // 03 → Project sites
  const isBlock04 = hoveredBlock === '04'; // 04 → Inset (DE/ES corridor)
  const isBlock05 = hoveredBlock === '05'; // 05 → Artisan and specialist nodes

  return (
    <div className="relative w-full border border-hairline bg-[#F5F5F2] overflow-hidden select-none font-mono">
      {/* Top Map HUD Bar */}
      <div className="px-4 py-2 border-b border-hairline flex items-center justify-between text-[10px] text-[#0E0E0E]/70 bg-[#F5F5F2]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
          <span className="font-semibold text-[#0E0E0E] uppercase tracking-wider">
            MALLORCA NETWORK · EPSG:25831
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-[#0E0E0E]/50">
          <span>LAT 39°34'N</span>
          <span>·</span>
          <span>LON 02°39'E</span>
        </div>
      </div>

      {/* Main SVG Vector Canvas */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full p-2 sm:p-4">
        <svg
          viewBox="0 0 540 380"
          className="w-full h-full overflow-visible"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          <defs>
            {/* Fine drafting grid pattern */}
            <pattern id="studioMapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-[#0E0E0E]/[0.04]"
              />
            </pattern>
          </defs>

          {/* Background drafting coordinate grid */}
          <rect width="540" height="380" fill="url(#studioMapGrid)" />

          {/* Dotted Coastline Buffer (+4px offset effect) */}
          <path
            d={MALLORCA_OUTLINE}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2 3"
            className="text-[#0E0E0E]/20"
            transform="matrix(1.025 0 0 1.025 -6 -5)"
          />

          {/* Accurate Simplified Mallorca Coastline */}
          <path
            d={MALLORCA_OUTLINE}
            fill="#0E0E0E"
            fillOpacity={isBlock01 ? '0.04' : '0.02'}
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-[#0E0E0E]/80 transition-all duration-300"
          />

          {/* Tramuntana Mountain Contours (Highlights on Block 01) */}
          <g className={`transition-all duration-300 ${isBlock01 ? 'opacity-100' : 'opacity-40'}`}>
            {CONTOURS.map((c) => (
              <path
                key={c.id}
                d={c.d}
                fill="none"
                stroke={isBlock01 ? '#FF4D00' : 'currentColor'}
                strokeWidth={isBlock01 ? '1.4' : '0.75'}
                strokeDasharray="3 3"
                className="transition-colors duration-300"
              />
            ))}
            {/* Tramuntana mountain peak & range indicator */}
            <text
              x="160"
              y="112"
              fill={isBlock01 ? '#FF4D00' : 'currentColor'}
              className="text-[7.5px] tracking-wider uppercase transition-colors"
            >
              {i18n.tramuntana}
            </text>
            {isBlock01 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <text x="210" y="82" fill="#FF4D00" className="text-[7px]">
                  {i18n.microclimate}
                </text>
                <text x="75" y="200" fill="#FF4D00" className="text-[7px]">
                  {i18n.habitat}
                </text>
              </motion.g>
            )}
          </g>

          {/* Thin Network Connection Lines (Draw in on scroll, refined motion, linking studio, artisans, specialists & sites) */}
          <g className="transition-all duration-300">
            {/* Lines to Artisans */}
            {ARTISAN_NODES.map((node, idx) => (
              <motion.line
                key={`line-art-${node.id}`}
                x1={STUDIO_NODE.x}
                y1={STUDIO_NODE.y}
                x2={node.x}
                y2={node.y}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + idx * 0.05, ease: smoothEase }}
                stroke={isBlock05 ? '#FF4D00' : 'currentColor'}
                strokeWidth={isBlock05 ? '1.2' : '0.6'}
                strokeDasharray={isBlock05 ? 'none' : '2 3'}
                className={`transition-colors duration-300 ${
                  isBlock05 ? 'opacity-90' : 'opacity-25'
                }`}
              />
            ))}

            {/* Lines to Specialists */}
            {SPECIALIST_NODES.map((node, idx) => (
              <motion.line
                key={`line-spec-${node.id}`}
                x1={STUDIO_NODE.x}
                y1={STUDIO_NODE.y}
                x2={node.x}
                y2={node.y}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 + idx * 0.05, ease: smoothEase }}
                stroke={isBlock05 ? '#FF4D00' : 'currentColor'}
                strokeWidth={isBlock05 ? '1.2' : '0.6'}
                strokeDasharray="2 2"
                className={`transition-colors duration-300 ${
                  isBlock05 ? 'opacity-90' : 'opacity-20'
                }`}
              />
            ))}

            {/* Lines to Project Sites */}
            {SITE_NODES.map((site, idx) => (
              <motion.line
                key={`line-site-${site.id}`}
                x1={STUDIO_NODE.x}
                y1={STUDIO_NODE.y}
                x2={site.x}
                y2={site.y}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 + idx * 0.05, ease: smoothEase }}
                stroke={isBlock03 ? '#FF4D00' : 'currentColor'}
                strokeWidth={isBlock03 ? '1.4' : '0.6'}
                className={`transition-colors duration-300 ${
                  isBlock03 ? 'opacity-95' : 'opacity-25'
                }`}
              />
            ))}
          </g>

          {/* Block 02: Dashed "Remote" line going off-map (highlights on Block 02) */}
          <g
            className={`transition-all duration-300 ${
              isBlock02 ? 'opacity-100' : 'opacity-25'
            }`}
          >
            <line
              x1={STUDIO_NODE.x}
              y1={STUDIO_NODE.y}
              x2="0"
              y2="15"
              stroke="#FF4D00"
              strokeWidth={isBlock02 ? '1.5' : '0.8'}
              strokeDasharray="4 4"
            />
            {/* Arrow & remote label */}
            <circle cx="15" cy="27" r="2.5" fill="#FF4D00" />
            <text x="25" y="30" fill="#FF4D00" className="text-[8px] font-bold tracking-wider">
              {i18n.remoteSync}
            </text>
          </g>

          {/* Artisans Nodes (generic small symbols spread across the island, staggered fade-in) */}
          {ARTISAN_NODES.map((art, idx) => {
            const isHighlight = isBlock05;
            const craftLabel = i18n[art.craftKey];
            return (
              <motion.g
                key={art.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.06, ease: smoothEase }}
                className="transition-all duration-300"
              >
                <circle
                  cx={art.x}
                  cy={art.y}
                  r={isHighlight ? 4 : 2.5}
                  fill={isHighlight ? '#FF4D00' : '#0E0E0E'}
                  className="transition-colors"
                />
                <text
                  x={art.x + 6}
                  y={art.y + 3}
                  fill={isHighlight ? '#FF4D00' : 'currentColor'}
                  className={`text-[7.5px] transition-colors ${
                    isHighlight ? 'font-bold' : 'opacity-65'
                  }`}
                >
                  {craftLabel} [{art.location.toUpperCase()}]
                </text>
              </motion.g>
            );
          })}

          {/* Specialists Nodes (analysis, computational design, engineering, staggered fade-in) */}
          {SPECIALIST_NODES.map((spec, idx) => {
            const isHighlight = isBlock05;
            const fieldLabel = i18n[spec.fieldKey];
            return (
              <motion.g
                key={spec.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.06, ease: smoothEase }}
                className="transition-all duration-300"
              >
                <rect
                  x={spec.x - 2.5}
                  y={spec.y - 2.5}
                  width="5"
                  height="5"
                  fill="none"
                  stroke={isHighlight ? '#FF4D00' : 'currentColor'}
                  strokeWidth="1"
                  transform={`rotate(45 ${spec.x} ${spec.y})`}
                  className="transition-colors"
                />
                <circle cx={spec.x} cy={spec.y} r="1" fill={isHighlight ? '#FF4D00' : 'currentColor'} />
                <text
                  x={spec.x + 6}
                  y={spec.y + 3}
                  fill={isHighlight ? '#FF4D00' : 'currentColor'}
                  className={`text-[7px] transition-colors ${
                    isHighlight ? 'font-bold' : 'opacity-60'
                  }`}
                >
                  {fieldLabel} [{spec.location.toUpperCase()}]
                </text>
              </motion.g>
            );
          })}

          {/* Project Sites (small squares, staggered fade-in) */}
          {SITE_NODES.map((site, idx) => {
            const isHighlight = isBlock03;
            return (
              <motion.g
                key={site.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 + idx * 0.06, ease: smoothEase }}
                className="transition-all duration-300"
              >
                <rect
                  x={site.x - 3}
                  y={site.y - 3}
                  width="6"
                  height="6"
                  fill={isHighlight ? '#FF4D00' : '#0E0E0E'}
                  className="transition-colors"
                />
                <text
                  x={site.x + 6}
                  y={site.y + 3}
                  fill={isHighlight ? '#FF4D00' : 'currentColor'}
                  className={`text-[7.5px] transition-colors ${
                    isHighlight ? 'font-bold' : 'opacity-70'
                  }`}
                >
                  {labels.sites[currentLang].toUpperCase()} {site.ref} [{site.name.toUpperCase()}]
                </text>
              </motion.g>
            );
          })}

          {/* Studio Node (orange, Palma area, anchor, staggered fade-in) */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="transition-all duration-300"
          >
            {/* Concentric radar ring */}
            <circle
              cx={STUDIO_NODE.x}
              cy={STUDIO_NODE.y}
              r="7"
              fill="none"
              stroke="#FF4D00"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className={isBlock02 ? 'animate-spin' : ''}
              style={{ transformOrigin: `${STUDIO_NODE.x}px ${STUDIO_NODE.y}px` }}
            />
            {/* Center orange dot */}
            <circle cx={STUDIO_NODE.x} cy={STUDIO_NODE.y} r="3" fill="#FF4D00" />
            <text
              x={STUDIO_NODE.x + 10}
              y={STUDIO_NODE.y + 3}
              fill="#FF4D00"
              className="text-[8.5px] font-bold tracking-wider"
            >
              {STUDIO_NODE.name.toUpperCase()} [{STUDIO_NODE.code}]
            </text>
          </motion.g>
        </svg>

        {/* Small Inset in Top-Right Corner: schematic outline of Germany and Spain with DE and ES markers connected by a thin line to Mallorca */}
        <div
          className={`absolute top-3 right-3 border bg-[#F5F5F2]/95 backdrop-blur-xs p-2 transition-all duration-300 shadow-xs ${
            isBlock04 ? 'border-[#FF4D00] ring-1 ring-[#FF4D00]' : 'border-hairline'
          }`}
          style={{ width: '138px' }}
        >
          <div className="flex items-center justify-between pb-1 border-b border-hairline text-[8px] text-[#0E0E0E]/60">
            <span className="font-semibold uppercase text-[#0E0E0E]">{i18n.corridor}</span>
            <span className={isBlock04 ? 'text-[#FF4D00] font-bold' : ''}>DE · ES</span>
          </div>

          <svg viewBox="0 0 120 70" className="w-full h-14 mt-1 overflow-visible">
            {/* Spain simplified shape */}
            <polygon
              points="15,40 38,36 44,52 30,62 12,56"
              fill={isBlock04 ? 'rgba(255,77,0,0.12)' : 'rgba(14,14,14,0.03)'}
              stroke={isBlock04 ? '#FF4D00' : 'currentColor'}
              strokeWidth="0.8"
            />
            <circle cx="28" cy="46" r="2" fill="#0E0E0E" />
            <text x="22" y="44" fill="#0E0E0E" className="text-[7px] font-bold">
              ES
            </text>

            {/* Germany simplified shape */}
            <polygon
              points="65,10 85,8 90,26 78,32 62,24"
              fill={isBlock04 ? 'rgba(255,77,0,0.12)' : 'rgba(14,14,14,0.03)'}
              stroke={isBlock04 ? '#FF4D00' : 'currentColor'}
              strokeWidth="0.8"
            />
            <circle cx="76" cy="18" r="2" fill="#0E0E0E" />
            <text x="79" y="19" fill="#0E0E0E" className="text-[7px] font-bold">
              DE
            </text>

            {/* Mallorca marker in inset */}
            <circle cx="58" cy="54" r="2.5" fill="#FF4D00" />
            <text x="63" y="56" fill="#FF4D00" className="text-[6.5px] font-bold">
              MALLORCA
            </text>

            {/* Connection vectors */}
            <line
              x1="28"
              y1="46"
              x2="58"
              y2="54"
              stroke={isBlock04 ? '#FF4D00' : 'currentColor'}
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className={isBlock04 ? 'opacity-100' : 'opacity-40'}
            />
            <line
              x1="76"
              y1="18"
              x2="58"
              y2="54"
              stroke={isBlock04 ? '#FF4D00' : 'currentColor'}
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className={isBlock04 ? 'opacity-100' : 'opacity-40'}
            />
          </svg>

          <div className="text-[7.5px] text-[#0E0E0E]/60 pt-0.5 leading-tight">
            DE &amp; ES ⇄ MALLORCA
          </div>
        </div>

        {/* Small Readout Panel: "Mode: Remote · On site", "Projects / year: [X]", "Disciplines: 3" */}
        <div className="absolute bottom-3 left-3 bg-[#F5F5F2]/95 border border-hairline p-2 text-[9px] space-y-1 shadow-xs min-w-[170px]">
          <div className="flex items-center justify-between text-[#0E0E0E] pb-1 border-b border-hairline">
            <span className="text-[#0E0E0E]/70 font-medium">{readouts.mode[currentLang]}</span>
          </div>
          <div className="flex items-center justify-between text-[#0E0E0E]">
            <span className="text-[#0E0E0E]/70 font-medium">{readouts.projectsPerYear[currentLang]}</span>
          </div>
          <div className="flex items-center justify-between text-[#0E0E0E]">
            <span className="text-[#0E0E0E]/70 font-medium">{readouts.disciplines[currentLang]}</span>
          </div>
        </div>
      </div>

      {/* Map Legend Footer */}
      <div className="px-4 py-2 border-t border-hairline bg-[#F5F5F2] flex flex-wrap items-center justify-between gap-2 text-[9.5px] text-[#0E0E0E]/70">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>{labels.studio[currentLang]}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E0E0E]" />
            <span>{labels.artisans[currentLang]}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 border border-[#0E0E0E] rotate-45" />
            <span>{labels.specialists[currentLang]}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#0E0E0E]" />
            <span>{labels.sites[currentLang]}</span>
          </span>
        </div>
        <div className="text-[9px] text-[#0E0E0E]/50">
          {i18n.hoverHint}
        </div>
      </div>
    </div>
  );
};
