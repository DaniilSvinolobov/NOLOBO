import React from 'react';
import { content, Language, Project } from '../content';

interface ProjectReasoningProps {
  project: Project;
  currentLang: Language;
  active: number | null;
  onActive: (index: number | null) => void;
}

const Arrow: React.FC = () => (
  <span aria-hidden className="text-accent md:text-center select-none">
    <span className="hidden md:inline">→</span>
    <span className="md:hidden">↓</span>
  </span>
);

/** Condition → decision → consequence. The labels come from each project's own site. */
export const ProjectReasoning: React.FC<ProjectReasoningProps> = ({ project, currentLang, active, onActive }) => {
  const w = content.work;
  const cols = 'md:grid-cols-[2rem_minmax(0,1fr)_1.5rem_minmax(0,1fr)_1.5rem_minmax(0,1fr)]';

  return (
    <div className="border border-hairline bg-[#F5F5F2] font-mono">
      <div className={`hidden md:grid ${cols} gap-x-3 px-4 py-2.5 border-b border-hairline text-[10px] tracking-wider text-[#0E0E0E]/50`}>
        <span />
        <span>{w.reasoningCondition[currentLang]}</span>
        <span />
        <span>{w.reasoningDecision[currentLang]}</span>
        <span />
        <span>{w.reasoningConsequence[currentLang]}</span>
      </div>

      <ol className="divide-y divide-hairline-subtle">
        {project.reasoning.map((row, i) => {
          const isActive = active === i;
          return (
            <li
              key={row.label.en}
              tabIndex={0}
              onMouseEnter={() => onActive(i)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(i)}
              onBlur={() => onActive(null)}
              className={`grid grid-cols-1 ${cols} gap-x-3 gap-y-1.5 px-4 py-4 items-baseline transition-colors duration-300 ${
                isActive ? 'bg-[#0E0E0E]/[0.03]' : ''
              }`}
            >
              <span className={`text-[11px] tabular-nums font-semibold ${isActive ? 'text-accent' : 'text-[#0E0E0E]/40'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-wider text-[#0E0E0E]/45">{row.label[currentLang]}</span>
                <span className="block text-[13px] text-[#0E0E0E] mt-0.5">{row.condition[currentLang]}</span>
              </span>
              <Arrow />
              <span className="text-[13px] font-semibold text-[#0E0E0E]">{row.decision[currentLang]}</span>
              <Arrow />
              <span className="text-[13px] text-[#0E0E0E]/80">{row.consequence[currentLang]}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
