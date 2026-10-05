import React from 'react';
import { content, Language } from '../content';

interface ProjectSectionProps {
  projectId: string;
  currentLang: Language;
  active: number | null;
}

const INK = '#0E0E0E';
const ACCENT = '#FF4D00';

/** Marker: numbered square, accent when its row is active. */
const Marker: React.FC<{ x: number; y: number; n: number; on: boolean }> = ({ x, y, n, on }) => (
  <g>
    <rect x={x - 6} y={y - 6} width="12" height="12" fill="#F5F5F2" stroke={on ? ACCENT : INK} strokeWidth="0.8" />
    <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" fill={on ? ACCENT : INK} stroke="none">
      {n}
    </text>
  </g>
);

/** Casa Tramuntana, section through the slope. Drawn to explain, not to measure. */
const Tramuntana: React.FC<{ active: number | null }> = ({ active }) => {
  const c = (i: number) => (active === i ? ACCENT : INK);
  const op = (i: number) => (active === null || active === i ? 1 : 0.35);
  return (
    <svg viewBox="0 0 320 210" className="w-full h-auto fill-none" strokeWidth="1" role="img" aria-label="Section through the slope">
      {/* 1 · Slope: terrain line, 38° from the horizontal */}
      <g stroke={c(0)} opacity={op(0)}>
        <line x1="20" y1="24" x2="250" y2="190" strokeWidth="1.4" />
        <line x1="140" y1="190" x2="250" y2="190" strokeDasharray="2 3" strokeOpacity="0.5" />
        <path d="M196,190 A56,56 0 0 0 189.5,164" />
        <text x="152" y="186" fill={c(0)} stroke="none" fontSize="8" fontFamily="JetBrains Mono, monospace">38°</text>
      </g>

      {/* House dug into the slope: two stepped volumes below the surface */}
      <g stroke={INK} opacity={active === null ? 1 : 0.6}>
        <rect x="108" y="118" width="34" height="30" />
        <rect x="142" y="142" width="34" height="30" />
        <line x1="142" y1="148" x2="142" y2="142" />
        <line x1="108" y1="133" x2="142" y2="133" strokeOpacity="0.3" strokeDasharray="2 2" />
      </g>

      {/* 4 · Stone: excavated stone returns as retaining walls uphill of the house */}
      <g stroke={c(3)} opacity={op(3)}>
        <rect x="98" y="96" width="9" height="54" />
        <line x1="98" y1="108" x2="107" y2="108" />
        <line x1="98" y1="120" x2="107" y2="120" />
        <line x1="98" y1="132" x2="107" y2="132" />
        <path d="M126,138 C112,150 96,156 88,150" strokeDasharray="2 3" />
      </g>

      {/* 2 · Sun: western, afternoon, stopped by a deep overhang */}
      <g stroke={c(1)} opacity={op(1)}>
        <circle cx="290" cy="30" r="6" />
        <line x1="284" y1="36" x2="196" y2="142" strokeDasharray="3 3" />
        <line x1="176" y1="142" x2="204" y2="142" strokeWidth="1.6" />
        <line x1="178" y1="146" x2="198" y2="146" strokeOpacity="0.4" strokeDasharray="1 2" />
        <line x1="178" y1="150" x2="198" y2="150" strokeOpacity="0.4" strokeDasharray="1 2" />
      </g>

      {/* 3 · Air: sea air enters the courtyard on the downhill face */}
      <g stroke={c(2)} opacity={op(2)}>
        <path d="M312,162 C270,162 230,166 196,160" />
        <polygon points="192,160 200,156 200,164" fill={c(2)} stroke="none" />
      </g>

      {/* 5 · Road: the line of sight rises from the road and passes above the house */}
      <g stroke={c(4)} opacity={op(4)}>
        <line x1="250" y1="198" x2="316" y2="198" strokeWidth="1.4" />
        <circle cx="270" cy="192" r="2.2" fill={c(4)} stroke="none" />
        <line x1="270" y1="192" x2="20" y2="24" strokeDasharray="4 3" />
      </g>

      {/* Markers */}
      <Marker x={60} y={78} n={1} on={active === 0} />
      <Marker x={304} y={44} n={2} on={active === 1} />
      <Marker x={246} y={150} n={3} on={active === 2} />
      <Marker x={84} y={118} n={4} on={active === 3} />
      <Marker x={296} y={180} n={5} on={active === 4} />
    </svg>
  );
};

const DRAWINGS: Record<string, React.FC<{ active: number | null }>> = {
  'tramuntana-villa': Tramuntana,
};

export const hasProjectSection = (projectId: string) => projectId in DRAWINGS;

export const ProjectSection: React.FC<ProjectSectionProps> = ({ projectId, currentLang, active }) => {
  const Drawing = DRAWINGS[projectId];
  if (!Drawing) return null;
  return (
    <div className="border border-hairline bg-[#F5F5F2] flex flex-col">
      <div className="px-4 py-2.5 border-b border-hairline font-mono text-[10px] tracking-wider text-[#0E0E0E]/50">
        {content.work.sectionLabel[currentLang]}
      </div>
      <div className="p-4 flex-1 flex items-center text-[#0E0E0E]">
        <Drawing active={active} />
      </div>
    </div>
  );
};
