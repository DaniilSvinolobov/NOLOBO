import React, { useState } from 'react';
import { content, Language } from '../content';
import { LegalModal } from './LegalModal';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const [legalType, setLegalType] = useState<'impressum' | 'privacy' | null>(null);
  const f = content.footer;
  const meta = content.meta;

  const fl = f.labels;
  const nav = content.nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F5F5F2] border-t border-hairline py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Footer Row: Wordmark & Core Coordinates */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-hairline">
          <div>
            <span className="text-2xl font-sans font-bold tracking-tight text-[#0E0E0E]">
              NOLOBO
            </span>
            <div className="mt-1 font-mono text-xs text-[#0E0E0E]/60">
              {meta.tagline[currentLang]}
            </div>
          </div>

          <div className="font-mono text-xs text-[#0E0E0E]/70 space-y-1 md:text-right">
            <div>{fl.coordinates[currentLang]}: {meta.coordinates}</div>
            <div>{fl.datum[currentLang]}: WGS 84 · EPSG:4326 · ELEVATION: 14M</div>
          </div>
        </div>

        {/* Middle Footer Navigation / Fast Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 font-mono text-xs">
          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.studioTitle[currentLang]}
            </span>
            <ul className="space-y-1.5 text-[#0E0E0E]/80">
              <li>
                <a href="#work" className="hover:text-[#FF4D00] transition-colors">
                  01. {nav.work[currentLang]}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#FF4D00] transition-colors">
                  02. {nav.studio[currentLang]}
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-[#FF4D00] transition-colors">
                  03. {nav.approach[currentLang]}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF4D00] transition-colors">
                  04. {nav.services[currentLang]}
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#FF4D00] transition-colors">
                  05. {nav.materials[currentLang]}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.hubsTitle[currentLang]}
            </span>
            <ul className="space-y-1.5 text-[#0E0E0E]/70">
              <li>{fl.basedIn[currentLang]}</li>
              <li>{fl.specialists[currentLang]}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.inquiriesTitle[currentLang]}
            </span>
            <ul className="space-y-1.5 text-[#0E0E0E]/80">
              <li>
                <a href={`mailto:${content.contact.email}`} className="hover:text-[#FF4D00] transition-colors">
                  {content.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`} className="hover:text-[#FF4D00] transition-colors">
                  {content.contact.phone}
                </a>
              </li>
              <li className="text-[#0E0E0E]/50">{fl.accepting[currentLang]}</li>
            </ul>
          </div>

          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
                {fl.legalTitle[currentLang]}
              </span>
              <p className="text-[#0E0E0E]/60 text-[11px] font-mono leading-relaxed">
                {fl.legalDesc[currentLang]}
              </p>
            </div>

            {/* Back to top button */}
            <div>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 py-1 text-xs font-mono text-[#0E0E0E] hover:text-[#FF4D00] transition-colors"
                aria-label={content.aria.backToTop[currentLang]}
              >
                <span>{f.backToTop[currentLang]}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Modal Triggers */}
        <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#0E0E0E]/50">
          <div>{f.rights}</div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLegalType('impressum')}
              className="hover:text-[#0E0E0E] transition-colors underline-offset-4 hover:underline"
            >
              {f.impressum[currentLang]}
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => setLegalType('privacy')}
              className="hover:text-[#0E0E0E] transition-colors underline-offset-4 hover:underline"
            >
              {f.privacy[currentLang]}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
        currentLang={currentLang}
      />
    </footer>
  );
};
