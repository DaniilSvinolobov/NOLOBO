import React, { useEffect, useState, useRef } from 'react';

interface ScrambleHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
  characterSet?: string;
  scrambleDuration?: number;
}

const DEFAULT_CHARS = '01#X/§_<>+-*~[]{}';

export const ScrambleHeadline: React.FC<ScrambleHeadlineProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  characterSet = DEFAULT_CHARS,
  scrambleDuration = 450,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasScrambled, setHasScrambled] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If reduced motion is requested, do not scramble
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrambled) {
          setHasScrambled(true);
          runScramble();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasScrambled]);

  // If text prop changes (e.g. language switch), run scramble
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    runScramble();
  }, [text]);

  const runScramble = () => {
    const originalText = text;
    const length = originalText.length;
    const startTime = performance.now();
    let frameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);
      const revealedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (
          i < revealedCount ||
          originalText[i] === ' ' ||
          originalText[i] === '\n' ||
          originalText[i] === '.' ||
          originalText[i] === ','
        ) {
          scrambled += originalText[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayText(originalText);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  };

  return (
    <Component
      ref={elementRef as unknown as React.Ref<never>}
      className={className}
    >
      {displayText}
    </Component>
  );
};
