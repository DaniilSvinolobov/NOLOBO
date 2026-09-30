import React, { useEffect, useState } from 'react';

export const CrosshairCursor: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [targetType, setTargetType] = useState<'link' | 'btn' | 'img' | null>(null);

  useEffect(() => {
    // Only enable on precise pointing devices (mouse) and if user doesn't prefer reduced motion
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaQuery.matches || motionQuery.matches) {
      return;
    }

    setIsPointerDevice(true);

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveParent = target.closest('a, button, input, select, textarea, [role="button"], img, .interactive-target');
        if (interactiveParent) {
          setIsInteractive(true);
          const tagName = interactiveParent.tagName.toLowerCase();
          if (tagName === 'a') setTargetType('link');
          else if (tagName === 'img' || interactiveParent.classList.contains('glitch-image-wrap')) setTargetType('img');
          else setTargetType('btn');
        } else {
          setIsInteractive(false);
          setTargetType(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setIsInteractive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isPointerDevice || !visible || !coords) {
    return null;
  }

  const formattedX = String(Math.round(coords.x)).padStart(4, '0');
  const formattedY = String(Math.round(coords.y)).padStart(4, '0');

  return (
    <div
      className="fixed pointer-events-none z-50 select-none transition-transform duration-75 ease-out"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Precision Drafting Reticle + Bracket Frame [ ] */}
      <div className="relative flex items-center justify-center">
        {/* Reticle Crosshair */}
        <div
          className={`relative transition-all duration-200 flex items-center justify-center ${
            isInteractive ? 'w-10 h-10' : 'w-7 h-7'
          }`}
        >
          {/* Hairlines */}
          <div className="absolute w-full h-[1px] bg-[#0E0E0E]/40" />
          <div className="absolute h-full w-[1px] bg-[#0E0E0E]/40" />

          {/* Central reticle dot */}
          <div
            className={`transition-all duration-200 ${
              isInteractive ? 'w-1 h-1 bg-[#FF4D00]' : 'w-1 h-1 bg-[#0E0E0E]'
            }`}
          />

          {/* Precision Bracket Frame [ ] appearing over links, buttons and images */}
          {isInteractive && (
            <div className="absolute inset-0 flex items-center justify-between text-[#FF4D00] font-mono text-sm leading-none font-bold select-none px-0.5 animate-in fade-in zoom-in-95 duration-150">
              <span className="transform -translate-x-1">[</span>
              <span className="transform translate-x-1">]</span>
            </div>
          )}
        </div>

        {/* Live Coordinates & Interactive Target Readout */}
        <div className="absolute left-7 top-4 bg-[#F5F5F2]/95 backdrop-blur-xs px-1.5 py-0.5 border border-hairline font-mono text-[9px] text-[#0E0E0E]/80 whitespace-nowrap tabular-nums flex items-center gap-1.5 shadow-xs">
          <span>
            X:<span className="text-[#0E0E0E] font-medium">{formattedX}</span> Y:
            <span className="text-[#0E0E0E] font-medium">{formattedY}</span>
          </span>
          {isInteractive && (
            <span className="text-[#FF4D00] font-semibold uppercase text-[8px] pl-1 border-l border-hairline">
              {targetType === 'img' ? 'IMG.SPEC' : targetType === 'link' ? 'GO.TO' : 'ACT'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
