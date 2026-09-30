import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { content, Language } from '../content';
import { ScrambleHeadline } from './ScrambleHeadline';
import { ProcessFigure } from './ProcessFigure';

interface ApproachProps {
  currentLang: Language;
}

export const Approach: React.FC<ApproachProps> = ({ currentLang }) => {
  const t = content.approach;
  const steps = t.steps;
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The active step is the last one whose top has passed a line on screen:
  // mid-screen on desktop (steps are invisible scroll spacers behind the pinned
  // figure), in the lower half on mobile, where the text scrolls below the image.
  useEffect(() => {
    if (reduceMotion) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * (desktop.matches ? 0.55 : 0.7);
      let idx = -1;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) idx = i;
      });
      setActiveStep(idx);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  const stepText = (idx: number, isActive: boolean) => (
    <>
      <div className="h-5 flex items-center gap-2 font-mono text-xs">
        <span className={isActive ? 'text-[#FF4D00] font-bold' : 'text-[#0E0E0E]/40'}>{steps[idx].step}</span>
        {isActive && <span className="w-1.5 h-1.5 bg-[#FF4D00]" />}
      </div>
      <div className="mt-1.5 font-mono text-base font-bold tracking-wider text-[#0E0E0E] uppercase">
        {steps[idx].phase[currentLang]}
      </div>
      <div className="mt-1 font-mono text-[11px] text-[#0E0E0E]/70 leading-snug">
        {steps[idx].title[currentLang]}
      </div>
    </>
  );

  const figureLabel = (
    <div className="px-4 sm:px-6 lg:px-8 py-2 border-b border-hairline flex items-center gap-2 font-mono text-[10px] text-[#0E0E0E]/70 bg-[#F5F5F2]">
      <span className="text-[#FF4D00] font-bold">FIG. {t.sectionNumber}</span>
      <span className="font-semibold text-[#0E0E0E] uppercase">{t.process.figureLabel[currentLang]}</span>
    </div>
  );

  return (
    <section id="approach" className="relative pt-14 sm:pt-20 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
              <span className="text-[#FF4D00] font-bold">{t.sectionNumber}</span>
              <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
              <span>{t.kicker[currentLang]}</span>
            </div>
            <ScrambleHeadline
              as="h2"
              text={t.headline[currentLang]}
              className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-[#0E0E0E]"
            />
          </div>

          <div className="font-mono text-xs text-[#0E0E0E]/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
            <span>{t.closeCollaboration[currentLang]}</span>
          </div>
        </div>
      </div>

      {reduceMotion ? (
        // Reduced motion: every layer at once, steps listed below, no scroll effect.
        <div className="border-t border-hairline">
          {figureLabel}
          <ProcessFigure currentLang={currentLang} activeStep={steps.length - 1} showAll className="h-[60vh] lg:h-[85vh]" />
          <ol className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-hairline">
            {steps.map((s, idx) => (
              <li key={s.step} className="px-4 sm:px-6 lg:px-8 py-5 border-b lg:border-b-0 lg:border-r last:border-r-0 border-hairline">
                {stepText(idx, true)}
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="relative border-t border-hairline">
          {/* Pinned photograph with the layers; on desktop the step captions sit below it */}
          <div className="process-pin sticky z-10 flex flex-col bg-[#F5F5F2] border-b border-hairline">
            {figureLabel}
            <ProcessFigure currentLang={currentLang} activeStep={activeStep} className="flex-1 min-h-0" />
            <div className="hidden lg:block border-t border-hairline" aria-hidden="true">
              <div className="max-w-[1440px] mx-auto grid grid-cols-5 divide-x divide-hairline">
                {steps.map((s, idx) => {
                  const isActive = idx === activeStep;
                  return (
                    <div
                      key={s.step}
                      className="px-5 py-4 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ opacity: idx <= activeStep ? (isActive ? 1 : 0.55) : 0.3 }}
                    >
                      {stepText(idx, isActive)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scroll steps: visible text on mobile, invisible spacers on desktop */}
          <ol className="process-steps relative">
            {steps.map((s, idx) => {
              const isActive = idx === activeStep;
              return (
                <li
                  key={s.step}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="process-step px-4 sm:px-6 pt-8 lg:opacity-0 lg:pointer-events-none"
                >
                  <div
                    className="max-w-md transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ opacity: isActive ? 1 : 0.4 }}
                  >
                    {stepText(idx, isActive)}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
};
