import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { ProjectReasoning } from './ProjectReasoning';
import { ProjectSection, hasProjectSection } from './ProjectSection';
import { projectHref } from './useHashRoute';

interface ProjectPageProps {
  projectId: string;
  currentLang: Language;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const Block: React.FC<{ n: string; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-14 border-t border-hairline">
    <div className="lg:col-span-4 flex items-baseline gap-3">
      <span className="text-[11px] text-[#FF4D00] tabular-nums">{n}</span>
      <h2 className="text-[11px] sm:text-xs uppercase tracking-widest text-[#0E0E0E]/60">{title}</h2>
    </div>
    <div className="lg:col-span-8">{children}</div>
  </section>
);

export const ProjectPage: React.FC<ProjectPageProps> = ({ projectId, currentLang }) => {
  const w = content.work;
  const projects = w.projects;
  const idx = projects.findIndex((p) => p.id === projectId);
  const project = projects[idx];
  const [activeRow, setActiveRow] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveRow(null);
  }, [projectId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.location.hash = '#work';
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!project) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24 font-mono text-sm">
        <a href="#work" className="hover:text-[#FF4D00]">{w.backToProjects[currentLang]}</a>
      </div>
    );
  }

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const L = currentLang;

  const meta = [
    { label: w.dataLocation[L], value: project.location },
    { label: w.dataType[L], value: project.category[L] },
    { label: w.statusLabel[L], value: w.statusValue[L], accent: true },
    { label: w.dataYear[L], value: project.year },
    { label: w.areaLabel[L], value: `${project.area[L]} · ${w.areaNote[L]}` },
  ];

  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-mono"
      aria-labelledby="project-title"
    >
      <div className="flex items-center justify-between text-[11px] text-[#0E0E0E]/60">
        <a href="#work" className="hover:text-[#FF4D00] transition-colors">{w.backToProjects[L]}</a>
        <span className="tabular-nums">{String(Number(project.number)).padStart(3, '0')} / {String(projects.length).padStart(3, '0')}</span>
      </div>

      <h1 id="project-title" className="mt-10 sm:mt-16 text-[40px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-[-0.05em] font-medium text-[#0E0E0E]">
        {project.title}
      </h1>
      <p className="mt-6 sm:mt-8 text-xl sm:text-3xl tracking-[-0.03em] text-[#0E0E0E] flex items-start gap-3 max-w-[28ch]">
        <span aria-hidden className="mt-[0.5em] w-2 h-2 shrink-0 bg-[#FF4D00]" />
        <span>{project.thesis[L]}</span>
      </p>

      <dl className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-5 border-t border-hairline pt-5 text-xs">
        {meta.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <dt className="text-[10px] uppercase text-[#0E0E0E]/50">{m.label}</dt>
            <dd className={`font-medium leading-snug ${m.accent ? 'text-[#FF4D00]' : 'text-[#0E0E0E]'}`}>{m.value}</dd>
          </div>
        ))}
      </dl>

      <figure className="mt-10 border border-hairline bg-[#0E0E0E]/5">
        <img src={project.image} alt={`${project.title}, ${w.imageCaption[L].toLowerCase()}`} referrerPolicy="no-referrer" className="w-full max-h-[78vh] object-cover" />
        <figcaption className="px-3 py-2 border-t border-hairline text-[10px] text-[#0E0E0E]/60 flex justify-between">
          <span>{w.imageCaption[L]}</span>
          <span>{project.location}</span>
        </figcaption>
      </figure>

      <div className="mt-10">
        <Block n="01" title={w.pageBrief[L]}>
          <p className="text-[15px] sm:text-lg leading-[1.55] text-[#0E0E0E] max-w-[52ch]">{project.brief[L]}</p>
          <p className="mt-4 text-[13px] leading-[1.65] text-[#0E0E0E]/65 max-w-[56ch]">{project.position[L]}</p>
        </Block>

        <Block n="02" title={w.pageConditions[L]}>
          <ul className="divide-y divide-hairline-subtle border-y border-hairline-subtle">
            {project.siteConditions[L].map((c) => (
              <li key={c} className="py-3 text-[13px] sm:text-sm text-[#0E0E0E]">{c}</li>
            ))}
          </ul>
        </Block>

        <Block n="03" title={w.pageDecisions[L]}>
          <ol className="space-y-4">
            {project.decisions[L].map((d, i) => (
              <li key={d} className="grid grid-cols-[2rem_1fr] text-[13px] sm:text-sm text-[#0E0E0E]">
                <span className="text-[11px] text-[#0E0E0E]/40 tabular-nums pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block n="04" title={w.pageMaterials[L]}>
          <ul className="divide-y divide-hairline-subtle border-y border-hairline-subtle">
            {project.materialsDetail.map((m) => (
              <li key={m.name.en} className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-6 gap-y-1 py-3.5 text-[13px]">
                <span className="font-medium text-[#0E0E0E]">{m.name[L]}</span>
                <span className="text-[#0E0E0E]/70">{m.does[L]}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block n="05" title={w.pageLog[L]}>
          <ProjectReasoning project={project} currentLang={L} active={activeRow} onActive={setActiveRow} />
        </Block>

        <Block n="06" title={w.pageDrawings[L]}>
          <div className="space-y-6">
            {hasProjectSection(project.id) && <ProjectSection projectId={project.id} currentLang={L} active={activeRow} />}
            <img src={project.image} alt="" referrerPolicy="no-referrer" className="w-full aspect-[16/9] object-cover border border-hairline" />
          </div>
        </Block>
      </div>

      <nav className="grid grid-cols-2 border-t border-hairline text-xs" aria-label="Projects">
        <a href={projectHref(prev.id)} className="py-8 pr-4 hover:text-[#FF4D00] transition-colors">
          <span className="block text-[10px] text-[#0E0E0E]/50">{w.prevProject[L]}</span>
          <span className="block mt-2 text-lg sm:text-2xl tracking-[-0.03em]">{prev.title}</span>
        </a>
        <a href={projectHref(next.id)} className="py-8 pl-4 text-right border-l border-hairline hover:text-[#FF4D00] transition-colors">
          <span className="block text-[10px] text-[#0E0E0E]/50">{w.nextProject[L]}</span>
          <span className="block mt-2 text-lg sm:text-2xl tracking-[-0.03em]">{next.title}</span>
        </a>
      </nav>

      <a href="#contact" className="mt-6 block py-3 bg-[#0E0E0E] text-[#F5F5F2] hover:bg-[#FF4D00] transition-colors text-xs uppercase tracking-wider text-center">
        {w.inquireSimilar[L]}
      </a>
    </motion.article>
  );
};
