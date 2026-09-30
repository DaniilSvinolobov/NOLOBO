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

  const footerLabels: Record<Language, {
    studioTitle: string;
    hubsTitle: string;
    inquiriesTitle: string;
    legalTitle: string;
    coaibDesc: string;
    accepting: string;
    coordinates: string;
    datum: string;
    palmaHq: string;
    zurichEng: string;
    berlinMep: string;
    barcelonaComp: string;
  }> = {
    en: {
      studioTitle: 'STUDIO',
      hubsTitle: 'COLLABORATION HUBS',
      inquiriesTitle: 'INQUIRIES',
      legalTitle: 'LEGAL REGISTRATION',
      coaibDesc: 'COAIB Registered Architectural Consultancy. Mallorca, Spain.',
      accepting: 'Accepting Commissions 2027',
      coordinates: 'COORDINATES',
      datum: 'DATUM',
      palmaHq: 'Palma de Mallorca [HQ]',
      zurichEng: 'Zürich [Engineering]',
      berlinMep: 'Berlin [Physics & MEP]',
      barcelonaComp: 'Barcelona [Compliance]',
    },
    de: {
      studioTitle: 'STUDIO',
      hubsTitle: 'PARTNERSTANDORTE',
      inquiriesTitle: 'ANFRAGEN',
      legalTitle: 'KAMMEREINTRAGUNG',
      coaibDesc: 'Eingetragene Architekturgesellschaft (COAIB). Mallorca, Spanien.',
      accepting: 'Aufnahme Projekte 2027',
      coordinates: 'KOORDINATEN',
      datum: 'BEZUGSPUNKT',
      palmaHq: 'Palma de Mallorca [HQ]',
      zurichEng: 'Zürich [Tragwerk & Statik]',
      berlinMep: 'Berlin [Bauphysik & TGA]',
      barcelonaComp: 'Barcelona [Bauordnung]',
    },
    es: {
      studioTitle: 'ESTUDIO',
      hubsTitle: 'SEDES DE COLABORACIÓN',
      inquiriesTitle: 'CONTACTO',
      legalTitle: 'REGISTRO PROFESIONAL',
      coaibDesc: 'Consultoría de arquitectura colegiada en el COAIB. Mallorca, España.',
      accepting: 'Encargos abiertos 2027',
      coordinates: 'COORDENADAS',
      datum: 'DATUM',
      palmaHq: 'Palma de Mallorca [Sede]',
      zurichEng: 'Zúrich [Estructuras]',
      berlinMep: 'Berlín [Física constructiva]',
      barcelonaComp: 'Barcelona [Normativa]',
    },
    ca: {
      studioTitle: 'ESTUDI',
      hubsTitle: 'XARXA DE COL·LABORACIÓ',
      inquiriesTitle: 'CONTACTE',
      legalTitle: 'REGISTRE PROFESSIONAL',
      coaibDesc: "Consultoria d'arquitectura col·legiada al COAIB. Mallorca, Espanya.",
      accepting: 'Encàrrecs oberts 2027',
      coordinates: 'COORDENADES',
      datum: 'DATUM',
      palmaHq: 'Palma de Mallorca [Seu]',
      zurichEng: 'Zúric [Estructures]',
      berlinMep: 'Berlín [Física constructiva]',
      barcelonaComp: 'Barcelona [Normativa]',
    },
    ru: {
      studioTitle: 'СТУДИЯ',
      hubsTitle: 'СЕТЬ ПАРТНЕРОВ',
      inquiriesTitle: 'КОНТАКТЫ',
      legalTitle: 'РЕГИСТРАЦИЯ',
      coaibDesc: 'Лицензированное архитектурное бюро (COAIB). Майорка, Испания.',
      accepting: 'Прием проектов на 2027',
      coordinates: 'КООРДИНАТЫ',
      datum: 'ДАТУМ',
      palmaHq: 'Пальма-де-Майорка [Штаб-квартира]',
      zurichEng: 'Цюрих [Конструкции]',
      berlinMep: 'Берлин [Инженерия и физика]',
      barcelonaComp: 'Барселона [Согласования]',
    },
  };

  const fl = footerLabels[currentLang];
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
            <div>{fl.coordinates}: {meta.coordinates}</div>
            <div>{fl.datum}: WGS 84 · EPSG:4326 · ELEVATION: 14M</div>
          </div>
        </div>

        {/* Middle Footer Navigation / Fast Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 font-mono text-xs">
          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.studioTitle}
            </span>
            <ul className="space-y-1.5 text-[#0E0E0E]/80">
              <li>
                <a href="#approach" className="hover:text-[#FF4D00] transition-colors">
                  01. {nav.approach[currentLang]}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF4D00] transition-colors">
                  02. {nav.services[currentLang]}
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#FF4D00] transition-colors">
                  03. {nav.materials[currentLang]}
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#FF4D00] transition-colors">
                  04. {nav.work[currentLang]}
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#FF4D00] transition-colors">
                  05. {nav.studio[currentLang]}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.hubsTitle}
            </span>
            <ul className="space-y-1.5 text-[#0E0E0E]/70">
              <li>{fl.palmaHq}</li>
              <li>{fl.zurichEng}</li>
              <li>{fl.berlinMep}</li>
              <li>{fl.barcelonaComp}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
              {fl.inquiriesTitle}
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
              <li className="text-[#0E0E0E]/50">{fl.accepting}</li>
            </ul>
          </div>

          <div className="space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#0E0E0E]/40 uppercase tracking-wider block">
                {fl.legalTitle}
              </span>
              <p className="text-[#0E0E0E]/60 text-[11px] font-sans leading-relaxed">
                {fl.coaibDesc}
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
