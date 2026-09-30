import React from 'react';

export const BackgroundGrid: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {/* 80px background drafting grid */}
      <div className="absolute inset-0 drawing-grid-pattern opacity-60" />

      {/* 12-column structural guides container matching max-w */}
      <div className="max-w-[1440px] h-full mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full border-r border-hairline-subtle relative ${
                i === 0 ? 'border-l' : ''
              }`}
            >
              {/* Top and bottom subtle column index in mono */}
              <span className="hidden xl:block absolute top-2 left-1 text-[9px] font-mono text-[#0E0E0E]/20 select-none">
                COL.{String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        {/* Technical corner alignment crosshairs */}
        <div className="absolute top-24 left-2 text-[#0E0E0E]/30 font-mono text-xs select-none">+</div>
        <div className="absolute top-24 right-2 text-[#0E0E0E]/30 font-mono text-xs select-none">+</div>
        <div className="absolute bottom-24 left-2 text-[#0E0E0E]/30 font-mono text-xs select-none">+</div>
        <div className="absolute bottom-24 right-2 text-[#0E0E0E]/30 font-mono text-xs select-none">+</div>
      </div>
    </div>
  );
};
