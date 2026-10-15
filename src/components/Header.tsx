import React, { useState } from 'react';
import { content, Language, ENABLED_LANGUAGES } from '../content';
import { Page, pageHref } from './useHashRoute';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  page: Page;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, page }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content.nav;

  const navItems: { label: string; page: Page }[] = [
    { label: t.work[currentLang], page: 'home' },
    { label: t.studio[currentLang], page: 'studio' },
    { label: t.services[currentLang], page: 'services' },
    { label: t.research[currentLang], page: 'research' },
    { label: t.contact[currentLang], page: 'contact' },
  ];

  const languages: Language[] = (['en', 'es', 'ca', 'de', 'ru'] as Language[]).filter((lang) =>
    ENABLED_LANGUAGES.includes(lang)
  );

  return (
    <header className="sticky top-0 z-40 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-[#0E0E0E] hover:text-accent transition-colors font-sans whitespace-nowrap"
          aria-label={content.aria.homeLink[currentLang]}
        >
          NOLOBO
        </a>

        <nav aria-label={content.aria.mainNav[currentLang]} className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 font-mono text-xs tracking-wider">
            {navItems.map((item) => {
              const on = page === item.page;
              return (
                <li key={item.page}>
                  <a
                    href={pageHref(item.page)}
                    aria-current={on ? 'page' : undefined}
                    className={`relative inline-block py-2 transition-colors duration-500 ${on ? 'text-[#0E0E0E]' : 'text-[#0E0E0E]/50 hover:text-[#0E0E0E]'}`}
                  >
                    {item.label}
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
        <div className="flex-1 md:hidden" />

        {/* Zone 3: Language switcher in mono + quick CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {languages.length > 1 && (
            <div
              className="flex items-center text-xs font-mono divide-x divide-hairline border border-hairline bg-[#F5F5F2]"
              role="group"
              aria-label={content.aria.langSelect[currentLang]}
            >
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 sm:px-2 py-1 uppercase transition-colors whitespace-nowrap text-[11px] ${
                    currentLang === lang
                      ? 'bg-[#0E0E0E] text-[#F5F5F2] font-semibold'
                      : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E] hover:bg-[#0E0E0E]/5'
                  }`}
                  aria-pressed={currentLang === lang}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <a
            href={pageHref('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            <span>2027</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-[#0E0E0E] focus:outline-none"
            aria-label={mobileMenuOpen ? content.aria.closeMenu[currentLang] : content.aria.openMenu[currentLang]}
            aria-expanded={mobileMenuOpen}
          >
            <span className="font-mono text-xs uppercase">
              {mobileMenuOpen ? '[✕]' : '[MENU]'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-[#F5F5F2] px-6 py-5 space-y-4 font-mono text-xs">
          <div className="space-y-3">
            {navItems.map((item) => (
              <div key={item.page}>
                <a
                  href={pageHref(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={page === item.page ? 'page' : undefined}
                  className={`block py-1 text-sm font-mono font-medium hover:text-accent ${page === item.page ? 'text-accent' : 'text-[#0E0E0E]'}`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-hairline flex items-center justify-between text-[11px] text-[#0E0E0E]/60">
            <span>39.57°N / 2.65°E</span>
            <span>MALLORCA</span>
          </div>
        </div>
      )}
    </header>
  );
};
