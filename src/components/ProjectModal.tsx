import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, Language, content } from '../content';
import { ConditionLog } from './ConditionLog';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentLang: Language;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  currentLang,
}) => {
  const w = content.work;

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0E0E0E]/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.4, ease: smoothEase }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#F5F5F2] border border-[#0E0E0E] shadow-2xl flex flex-col"
        >
          {/* Modal Header Bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-[#F5F5F2] border-b border-hairline font-mono text-xs text-[#0E0E0E]">
            <div className="flex items-center gap-3">
              <span className="text-[#FF4D00] font-bold">{w.modalSpecTitle[currentLang]}</span>
              <span className="text-[#0E0E0E]/40">·</span>
              <span>NO. {project.number}</span>
            </div>

            <div className="flex items-center gap-4">
              {onPrev && onNext && (
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#0E0E0E]/60">
                  <button
                    onClick={onPrev}
                    className="hover:text-[#FF4D00] transition-colors p-1"
                    title={content.aria.prevProject[currentLang]}
                  >
                    [{content.aria.prevProject[currentLang]} ←]
                  </button>
                  <button
                    onClick={onNext}
                    className="hover:text-[#FF4D00] transition-colors p-1"
                    title={content.aria.nextProject[currentLang]}
                  >
                    [{content.aria.nextProject[currentLang]} →]
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-2 py-1 bg-[#0E0E0E] text-[#F5F5F2] hover:bg-[#FF4D00] transition-colors text-[11px] uppercase tracking-wider font-semibold"
                aria-label={content.aria.closeModal[currentLang]}
              >
                {w.closeSpec[currentLang]}
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Metadata Header */}
            <div className="space-y-3 pb-6 border-b border-hairline">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#0E0E0E]/60">
                <span className="text-[#0E0E0E] font-medium">{project.location}</span>
                <span>/</span>
                <span>{project.year}</span>
                <span>/</span>
                <span className="text-[#FF4D00]">{project.category[currentLang]}</span>
              </div>

              <h2
                id="modal-project-title"
                className="text-3xl sm:text-4xl md:text-5xl font-mono font-medium tracking-[-0.04em] text-[#0E0E0E]"
              >
                {project.title}
              </h2>
            </div>

            {/* Project image, full colour in the modal */}
            <div className="relative border border-hairline bg-[#0E0E0E]/5 overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title}, design concept image`}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[540px] object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#0E0E0E]/80 backdrop-blur-xs font-mono text-[10px] text-[#F5F5F2]">
                {project.location}
              </div>
            </div>

            {/* Condition log is the primary reading */}
            <ConditionLog project={project} currentLang={currentLang} />

            {/* Summary, condition, decision and project data */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="font-mono text-xs uppercase text-[#0E0E0E]/40 mb-2">
                    {w.modalOverview[currentLang]}
                  </h3>
                  <p className="text-base sm:text-lg text-[#0E0E0E] leading-relaxed font-mono">
                    {project.summary[currentLang]}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-hairline-subtle font-mono text-[13px] text-[#0E0E0E]/80 leading-relaxed">
                  <div>
                    <h4 className="text-xs uppercase text-[#0E0E0E] font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
                      <span>{w.modalCondition[currentLang]}</span>
                    </h4>
                    <p>{project.details[currentLang].condition}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase text-[#0E0E0E] font-semibold mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#0E0E0E]" />
                      <span>{w.modalDecision[currentLang]}</span>
                    </h4>
                    <p>{project.details[currentLang].decision}</p>
                  </div>
                </div>
              </div>

              {/* Project data: facts only */}
              <div className="md:col-span-5">
                <div className="border border-hairline bg-[#F5F5F2] p-5 space-y-4">
                  <div className="font-mono text-xs font-bold uppercase text-[#0E0E0E] pb-2 border-b border-hairline flex items-center justify-between">
                    <span>{w.modalData[currentLang]}</span>
                    <span className="text-[#FF4D00]">{w.conceptTag[currentLang]}</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs divide-y divide-hairline-subtle">
                    {[
                      { label: w.dataSite[currentLang], value: project.location },
                      { label: w.dataYear[currentLang], value: project.year },
                      { label: w.dataType[currentLang], value: project.category[currentLang] },
                      { label: w.primaryPalette[currentLang], value: project.materials },
                    ].map((row) => (
                      <div key={row.label} className="pt-2 flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#0E0E0E]/50 uppercase">{row.label}</span>
                        <span className="text-[#0E0E0E] font-medium leading-snug">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-hairline">
                    <a
                      href="#contact"
                      onClick={() => onClose()}
                      className="w-full py-2.5 bg-[#0E0E0E] text-[#F5F5F2] hover:bg-[#FF4D00] transition-colors font-mono text-xs uppercase tracking-wider text-center block"
                    >
                      {w.inquireSimilar[currentLang]}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
