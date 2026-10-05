import React from 'react';
import { content, Language, Project } from '../content';
import { DayRule } from './DayRule';

interface ConditionLogProps {
  project: Project;
  currentLang: Language;
}

/** Condition log: an instrument-style table whose subject is daily life. */
export const ConditionLog: React.FC<ConditionLogProps> = ({ project, currentLang }) => {
  const w = content.work;
  const log = project.conditionLog;
  const labelFor = (id: string) => content.conditions.find((c) => c.id === id)?.label[currentLang] ?? id;

  return (
    <div className="border border-hairline bg-[#F5F5F2]">
      <div className="px-4 py-2.5 border-b border-hairline flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="flex items-center gap-2 font-semibold text-[#0E0E0E]">
          <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
          <span>{w.modalLog[currentLang]}</span>
        </span>
        <span className="text-[#0E0E0E]/60">
          {log.season[currentLang]} · {project.location}
        </span>
      </div>

      <ol className="divide-y divide-hairline-subtle font-mono text-[12px] sm:text-[13px]">
        {log.entries.map((entry) => (
          <li
            key={entry.time}
            className="grid grid-cols-[3.25rem_4.5rem_1fr] sm:grid-cols-[4rem_5.5rem_1fr] gap-x-3 px-4 py-2.5 items-baseline"
          >
            <span className="tabular-nums text-[#FF4D00] font-semibold">{entry.time}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#0E0E0E]/45">{labelFor(entry.condition)}</span>
            <span className="text-[#0E0E0E]">{entry.text[currentLang]}</span>
          </li>
        ))}
      </ol>

      <div className="px-4 py-3 border-t border-hairline">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-[#0E0E0E]/50 shrink-0">{w.dayRuleLabel[currentLang]}</span>
          <DayRule times={log.entries.map((e) => e.time)} className="flex-1" />
        </div>
      </div>
    </div>
  );
};

