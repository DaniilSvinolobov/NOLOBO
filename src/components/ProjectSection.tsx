import React from 'react';
import { content, Language } from '../content';
import { Tramuntana } from './projectSections/Tramuntana';
import { Calatrava } from './projectSections/Calatrava';
import { CalaLlamp } from './projectSections/CalaLlamp';
import { FincaSonVida } from './projectSections/FincaSonVida';
import { Santanyi } from './projectSections/Santanyi';

interface ProjectSectionProps {
  projectId: string;
  currentLang: Language;
  active: number | null;
}

/**
 * One section drawing per project. Numbered markers match the rows of the
 * reasoning table (marker n = row n). The drawings explain, they don't measure.
 */
const DRAWINGS: Record<string, React.FC<{ active: number | null }>> = {
  'tramuntana-villa': Tramuntana,
  'palma-penthouse': Calatrava,
  'cliff-pavilion': CalaLlamp,
  'finca-son-vida': FincaSonVida,
  'santanyi-studio': Santanyi,
};

export const hasProjectSection = (projectId: string) => projectId in DRAWINGS;

export const ProjectSection: React.FC<ProjectSectionProps> = ({ projectId, currentLang, active }) => {
  const Drawing = DRAWINGS[projectId];
  if (!Drawing) return null;
  return (
    <div className="border border-hairline bg-[#F5F5F2] flex flex-col h-full">
      <div className="px-4 py-2.5 border-b border-hairline font-mono text-[10px] tracking-wider text-[#0E0E0E]/50">
        {content.work.sectionLabel[currentLang]}
      </div>
      <div className="p-4 flex-1 flex items-center text-[#0E0E0E]">
        <Drawing active={active} />
      </div>
    </div>
  );
};
