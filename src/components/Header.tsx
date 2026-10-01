import React, { useState } from 'react';
import { content, Language, ENABLED_LANGUAGES } from '../content';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content.nav;

  const navItems = [
    { label: t.work[currentLang], href: '#work' },
    { label: t.materials[currentLang], href: '#materials' },
    { label: t.studio[currentLang], href: '#studio' },
    { label: t.approach[currentLang], href: '#approach' },
    { label: t.services[currentLang], href: '#services' },
    { label: t.contact[currentLang], href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: Language[] = (['en', 'es', 'ca', 'de', 'ru'] as Language[]).filter((lang) =>
    ENABLED_LANGUAGES.includes(lang)
  );

  return (
    <header className="sticky top-0 z-40 bg-[#F5F5F2]/90 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-[#0E0E0E] hover:text-[#FF4D00] transition-colors font-sans whitespace-nowrap"
          aria-label={content.aria.homeLink[currentLang]}
        >
          NOLOBO
        </a>

        {/* Zone 2: Minimal desktop nav links */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-mono tracking-wider text-[#0E0E0E]/80"
          aria-label={content.aria.mainNav[currentLang]}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-[#FF4D00] transition-colors relative py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

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
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-[#F5F5F2] transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 bg-[#FF4D00] inline-block" />
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
              <div key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block py-1 text-sm font-sans font-semibold text-[#0E0E0E] hover:text-[#FF4D00]"
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
