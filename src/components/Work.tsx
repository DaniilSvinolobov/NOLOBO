import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content, Language, Project } from '../content';
import { ProjectModal } from './ProjectModal';
import { ScrambleHeadline } from './ScrambleHeadline';
import { DayRule } from './DayRule';

interface WorkProps {
  currentLang: Language;
}

export const Work: React.FC<WorkProps> = ({ currentLang }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const t = content.work;
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const projects = t.projects;

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(
          (p) =>
            p.category.en.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.category.es.toLowerCase().includes(activeFilter.toLowerCase())
        );

  const handleNext = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  // Asymmetric column spans emphasizing larger dominant images
  const getColSpan = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'lg:col-span-7';
      case 1:
        return 'lg:col-span-5';
      case 2:
        return 'lg:col-span-5';
      case 3:
        return 'lg:col-span-7';
      default:
        return 'lg:col-span-6';
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="work" className="relative py-14 sm:py-20 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Segmented Filters */}
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
              className="text-3xl sm:text-4xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E]"
            />
          </div>

          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#0E0E0E]/5 border border-hairline font-mono text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 transition-colors uppercase whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                  : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
              }`}
            >
              {t.filterAll[currentLang]} ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('residential')}
              className={`px-3 py-1.5 transition-colors uppercase whitespace-nowrap ${
                activeFilter === 'residential'
                  ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                  : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
              }`}
            >
              {t.filterResidential[currentLang]}
            </button>
            <button
              onClick={() => setActiveFilter('interior')}
              className={`px-3 py-1.5 transition-colors uppercase whitespace-nowrap ${
                activeFilter === 'interior'
                  ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                  : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E]'
              }`}
            >
              {t.filterInterior[currentLang]}
            </button>
          </div>
        </div>

        {/* Selected Work Grid: Dominant Visuals, Only Name, Year & Type */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const colSpan = getColSpan(idx);
            const isLoaded = loadedImages[project.id];

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: smoothEase }}
                className={`${colSpan} group border border-hairline bg-[#F5F5F2] hover:border-[#0E0E0E] transition-colors`}
                onClick={() => setSelectedProject(project)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedProject(project);
                  }
                }}
                aria-label={`${content.aria.inspectSpec[currentLang]}: ${project.title}`}
              >
                {/* Dominant Image Container */}
                <div className="glitch-image-wrap relative bg-[#0E0E0E]/10 overflow-hidden">
                  <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      onLoad={() => handleImageLoad(project.id)}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out ${
                        isLoaded ? 'image-pixelated-loaded' : 'image-pixelated-loading'
                      }`}
                    />

                  </div>

                  {/* Corner Survey Reference Tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#F5F5F2]/95 backdrop-blur-xs border border-hairline font-mono text-[9px] text-[#0E0E0E] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
                    <span>REF. {project.number}</span>
                    <span className="text-[#0E0E0E]/40">·</span>
                    <span>{t.conceptTag[currentLang]}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#0E0E0E] text-[#F5F5F2] font-mono text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:block">
                    [{content.aria.inspectSpec[currentLang]} ↗]
                  </div>
                </div>

                {/* Tile metadata: name, year, type, first condition log line */}
                <div className="p-4 sm:p-5 space-y-4 font-mono">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="space-y-0.5">
                      <h3 className="text-xl sm:text-2xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E] group-hover:text-[#FF4D00] transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-[11px] text-[#0E0E0E]/60 uppercase">
                        {project.category[currentLang]}
                      </div>
                    </div>

                    <div className="text-right text-xs text-[#0E0E0E] font-semibold whitespace-nowrap">
                      {project.year}
                    </div>
                  </div>

                  {/* First line of the condition log, and the day it sits in */}
                  <div className="space-y-2.5">
                    <p className="text-[12px] text-[#0E0E0E]/80 flex gap-3">
                      <span className="tabular-nums text-[#FF4D00] font-semibold">
                        {project.conditionLog.entries[0].time}
                      </span>
                      <span>{project.conditionLog.entries[0].text[currentLang]}</span>
                    </p>
                    <DayRule times={project.conditionLog.entries.map((e) => e.time)} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Project Technical Spec Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          currentLang={currentLang}
        />
      </div>
    </section>
  );
};
