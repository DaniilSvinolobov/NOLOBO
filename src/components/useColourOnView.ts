import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

/**
 * On devices without hover (touch), greyscale images switch to colour while
 * they are in view, standing in for the hover effect on desktop.
 */
export function useColourOnView<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [noHover, setNoHover] = useState(false);
  const inView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const update = () => setNoHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return [ref, noHover && inView] as const;
}
