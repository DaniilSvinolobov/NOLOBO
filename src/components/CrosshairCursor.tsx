import React, { useEffect, useState } from 'react';

export const CrosshairCursor: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

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
        } else {
          setIsInteractive(false);
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
              isInteractive ? 'w-1 h-1 bg-accent' : 'w-1 h-1 bg-[#0E0E0E]'
            }`}
          />

          {/* Precision Bracket Frame [ ] appearing over links, buttons and images */}
          {isInteractive && (
            <div className="absolute inset-0 flex items-center justify-between text-accent font-mono text-sm leading-none font-bold select-none px-0.5 animate-in fade-in zoom-in-95 duration-150">
              <span className="transform -translate-x-1">[</span>
              <span className="transform translate-x-1">]</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
