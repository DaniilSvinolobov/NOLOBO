import React from 'react';

interface DayRuleProps {
  /** "HH:MM" times to mark on a 24 h rule. */
  times: string[];
  className?: string;
}

const toFraction = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return (h * 60 + m) / (24 * 60);
};

/** A 24 hour hairline with a tick at every logged time. Drawn from the log, nothing else. */
export const DayRule: React.FC<DayRuleProps> = ({ times, className = '' }) => (
  <div className={`font-mono text-[9px] text-[#0E0E0E]/50 ${className}`} aria-hidden>
    <div className="relative h-3 border-b border-[#0E0E0E]/30">
      {[0, 6, 12, 18, 24].map((h) => (
        <span
          key={h}
          className="absolute bottom-0 w-px h-1.5 bg-[#0E0E0E]/30"
          style={{ left: `${(h / 24) * 100}%` }}
        />
      ))}
      {times.map((time) => (
        <span
          key={time}
          className="absolute bottom-0 w-px h-3 bg-[#FF4D00]"
          style={{ left: `${toFraction(time) * 100}%` }}
        />
      ))}
    </div>
    <div className="relative h-3 mt-0.5 tabular-nums">
      {[0, 6, 12, 18, 24].map((h) => (
        <span
          key={h}
          className="absolute -translate-x-1/2"
          style={{ left: `${(h / 24) * 100}%`, ...(h === 0 ? { transform: 'none' } : h === 24 ? { transform: 'translateX(-100%)' } : {}) }}
        >
          {String(h).padStart(2, '0')}
        </span>
      ))}
    </div>
  </div>
);
