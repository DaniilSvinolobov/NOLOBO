import React, { useState } from 'react';
import { content, Language } from '../content';
import { SectionHead } from './SectionHead';
import { projectHref } from './useHashRoute';

interface WorkProps {
  currentLang: Language;
}

/** Numbered text index. Hovering a row shows its image beside the list. */
export const Work: React.FC<WorkProps> = ({ currentLang }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const t = content.work;
  const projects = t.projects;
  const shown = hovered ?? projects[0].id;

  return (
    <section id="work" className="relative py-16 sm:py-28 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          number={t.sectionNumber}
          kicker={t.kicker[currentLang]}
          headline={t.headline[currentLang]}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 font-mono">
          <ol className="lg:col-span-7 border-t border-hairline" onMouseLeave={() => setHovered(null)}>
            {projects.map((p) => {
              const place = p.location.split(',')[0];
              return (
                <li key={p.id} className="border-b border-hairline">
                  <a
                    href={projectHref(p.id)}
                    onMouseEnter={() => setHovered(p.id)}
                    onFocus={() => setHovered(p.id)}
                    onBlur={() => setHovered(null)}
                    aria-label={`${content.aria.inspectSpec[currentLang]}: ${p.title}`}
                    className="group block py-5 sm:py-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
                  >
                    <div className="grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-x-3 items-baseline">
                      <span className={`text-[11px] tabular-nums transition-colors duration-500 ${hovered === p.id ? 'text-accent' : 'text-[#0E0E0E]/40'}`}>
                        {String(Number(p.number)).padStart(3, '0')}
                      </span>
                      <span className="text-[20px] sm:text-[28px] leading-tight tracking-[-0.03em] font-medium text-[#0E0E0E] transition-transform duration-700 group-hover:translate-x-2" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>
                        {p.title}
                      </span>
                      <span className="text-[11px] text-[#0E0E0E]/50 tabular-nums">{p.year}</span>
                    </div>
                    <div className="mt-1.5 pl-[3rem] sm:pl-[4rem] text-[11px] sm:text-[12px] text-[#0E0E0E]/60">
                      {place} — {p.category[currentLang]}
                    </div>
                    <div className="mt-3 pl-[3rem] sm:pl-[4rem] lg:hidden">
                      <img src={p.image} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full aspect-[16/9] object-cover grayscale" />
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>

          {/* Image panel, desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-36 border border-hairline bg-[#0E0E0E]/5 aspect-[4/5] overflow-hidden" aria-hidden>
              {projects.map((p) => (
                <img
                  key={p.id}
                  src={p.image}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: shown === p.id ? 1 : 0, filter: hovered === p.id ? 'none' : 'grayscale(1)' }}
                />
              ))}
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#F5F5F2]/95 border border-hairline text-[10px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span>{t.indexLabel[currentLang]}</span>
                <span className="text-[#0E0E0E]/40">·</span>
                <span>{t.conceptTag[currentLang]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
