import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface MaskRevealHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
  delay?: number;
}

export const MaskRevealHeadline: React.FC<MaskRevealHeadlineProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // If text contains newlines, or split into logical lines if needed
  const lines = text.split('\n');

  return (
    <Component className={className}>
      <span ref={ref} className="block space-y-1">
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-1 -mb-1">
            <motion.span
              className="block will-change-transform"
              initial={{ y: '115%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
              transition={{
                duration: 0.95,
                delay: delay + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  );
};
