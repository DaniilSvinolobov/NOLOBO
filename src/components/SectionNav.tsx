import React, { useEffect, useState } from 'react';
import { content, Language } from '../content';

interface SectionNavProps {
  currentLang: Language;
}

/** Slim anchor nav under the header. The active section follows the scroll. */
export const SectionNav: React.FC<SectionNavProps> = ({ currentLang }) => {
  const t = content.nav;
  const items = [
    { id: 'work', label: t.work[currentLang] },
    { id: 'studio', label: t.studio[currentLang] },
    { id: 'approach', label: t.approach[currentLang] },
    { id: 'services', label: t.services[currentLang] },
    { id: 'materials', label: t.materials[currentLang] },
    { id: 'contact', label: t.contact[currentLang] },
  ];
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    // A section is active while it covers the line just below the two sticky bars.
    const onScroll = () => {
      const line = 120;
      let current: string | null = null;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label={content.aria.mainNav[currentLang]}
      className="sticky top-14 z-30 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-hairline"
    >
      <ul className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center gap-6 overflow-x-auto whitespace-nowrap font-mono text-[11px] tracking-wider">
        {items.map((item, i) => {
          const on = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                aria-current={on ? 'true' : undefined}
                className={`relative inline-flex items-center gap-1.5 py-2.5 transition-colors duration-500 ${on ? 'text-[#0E0E0E]' : 'text-[#0E0E0E]/50 hover:text-[#0E0E0E]'}`}
              >
                <span className={`tabular-nums ${on ? 'text-accent' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-px bg-accent origin-left transition-transform duration-700"
                  style={{ transform: `scaleX(${on ? 1 : 0})`, transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
