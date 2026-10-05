import React, { useState } from 'react';
import { motion } from 'motion/react';
import { content, Language } from '../content';
import { ScrambleHeadline } from './ScrambleHeadline';
import { useColourOnView } from './useColourOnView';

interface ContactProps {
  currentLang: Language;
}

export const Contact: React.FC<ContactProps> = ({ currentLang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'new_build',
    locationScale: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const t = content.contact;
  const f = t.form;
  const [portraitRef, portraitInColour] = useColourOnView<HTMLImageElement>();
  const smoothEase = [0.16, 1, 0.3, 1] as const;

  const contactLabels: Record<Language, {
    intakeStatus: string;
    directInquiries: string;
    partnerResponse: string;
    studioPhone: string;
    registeredOffice: string;
    projectBrief: string;
    commissionIntake: string;
    senderRouted: (name: string) => string;
    namePlaceholder: string;
    scalePlaceholder: string;
    messagePlaceholder: string;
  }> = {
    en: {
      intakeStatus: 'CALENDAR 2027: INTAKE OPEN',
      directInquiries: 'DIRECT INQUIRIES',
      partnerResponse: 'DIRECT PARTNER RESPONSE < 24H',
      studioPhone: 'PALMA STUDIO PHONE',
      registeredOffice: 'REGISTERED OFFICE',
      projectBrief: 'PROJECT BRIEF',
      commissionIntake: 'COMMISSION INTAKE',
      senderRouted: (name) => `SENDER: ${name} · ROUTED TO PARTNER LEAD`,
      namePlaceholder: 'e.g. Marcella Von Berg',
      scalePlaceholder: 'e.g. Deià, 650 m²',
      messagePlaceholder: 'Terrain characteristics, program intent, schedule...',
    },
    de: {
      intakeStatus: 'KALENDER 2027: ANFRAGEN GEÖFFNET',
      directInquiries: 'DIREKTE ANFRAGEN',
      partnerResponse: 'PARTNERANTWORT BINNEN 24 STD.',
      studioPhone: 'TELEFON STUDIO PALMA',
      registeredOffice: 'SITZ DER GESELLSCHAFT',
      projectBrief: 'PROJEKTBRIEFING',
      commissionIntake: 'AUFTRAGSAUFNAHME',
      senderRouted: (name) => `ABSENDER: ${name} · AN PARTNER WEITERGELEITET`,
      namePlaceholder: 'z. B. Marcella Von Berg',
      scalePlaceholder: 'z. B. Deià, 650 m²',
      messagePlaceholder: 'Grundstückseigenschaften, Bauvorhaben, Zeitrahmen...',
    },
    es: {
      intakeStatus: 'CALENDARIO 2027: ENCARGOS ABIERTOS',
      directInquiries: 'CONSULTAS DIRECTAS',
      partnerResponse: 'RESPUESTA DIRECTA DEL SOCIO < 24H',
      studioPhone: 'TELÉFONO ESTUDIO PALMA',
      registeredOffice: 'DOMICILIO SOCIAL',
      projectBrief: 'MEMORIA DE ENCARGO',
      commissionIntake: 'RECEPCIÓN DE PROYECTO',
      senderRouted: (name) => `REMITENTE: ${name} · ASIGNADO AL SOCIO DIRECTOR`,
      namePlaceholder: 'p. ej. Marcella Von Berg',
      scalePlaceholder: 'p. ej. Deià, 650 m²',
      messagePlaceholder: 'Características del terreno, programa deseado, plazos...',
    },
    ca: {
      intakeStatus: 'CALENDARI 2027: ENCARRECS OBERTS',
      directInquiries: 'CONSULTES DIRECTES',
      partnerResponse: 'RESPOSTA DIRECTA DEL SOCI < 24H',
      studioPhone: 'TELÈFON ESTUDI PALMA',
      registeredOffice: 'DOMICILI SOCIAL',
      projectBrief: "MEMÒRIA D'ENCÀRREC",
      commissionIntake: 'RECEPCIÓ DE PROJECTE',
      senderRouted: (name) => `REMITENT: ${name} · ASSIGNAT AL SOCI DIRECTOR`,
      namePlaceholder: 'p. ex. Marcella Von Berg',
      scalePlaceholder: 'p. ex. Deià, 650 m²',
      messagePlaceholder: 'Característiques del terreny, programa desitjat, terminis...',
    },
    ru: {
      intakeStatus: 'СЕЗОН 2027: ПРИЕМ ПРОЕКТОВ',
      directInquiries: 'ПРЯМАЯ СВЯЗЬ',
      partnerResponse: 'ОТВЕТ ПАРТНЕРА В ТЕЧЕНИЕ 24Ч',
      studioPhone: 'ТЕЛЕФОН БЮРО В ПАЛЬМЕ',
      registeredOffice: 'ЮРИДИЧЕСКИЙ АДРЕС',
      projectBrief: 'БРИФ ПРОЕКТА',
      commissionIntake: 'ПРИЕМ ЗАЯВКИ',
      senderRouted: (name) => `ОТПРАВИТЕЛЬ: ${name} · ПЕРЕДАНО ВЕДУЩЕМУ ПАРТНЕРУ`,
      namePlaceholder: 'напр. Марселла фон Берг',
      scalePlaceholder: 'напр. Дейя, 650 м²',
      messagePlaceholder: 'Характеристики участка, пожелания, сроки...',
    },
  };

  const cl = contactLabels[currentLang];

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setErrorMessage(f.validation.nameRequired[currentLang]);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage(f.validation.emailRequired[currentLang]);
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage(f.validation.messageRequired[currentLang]);
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `NOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceCode(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'new_build',
      locationScale: '',
      message: '',
    });
    setIsSubmitted(false);
    setReferenceCode('');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 border-b border-hairline bg-[#F5F5F2]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-hairline">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs font-mono text-[#0E0E0E]/60 uppercase tracking-widest">
              <span className="text-[#FF4D00] font-bold">{t.sectionNumber}</span>
              <span className="h-[1px] w-6 bg-[#0E0E0E]/20" />
              <span>{t.kicker[currentLang]}</span>
            </div>
            <ScrambleHeadline
              as="h2"
              text={t.headline[currentLang]}
              className="text-3xl sm:text-4xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E]"
            />
          </div>

          <div className="font-mono text-xs text-[#0E0E0E]/60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
            <span>{cl.intakeStatus}</span>
          </div>
        </div>

        {/* Contact Layout: Left Direct Channels & Right Technical Brief */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#0E0E0E]/40 uppercase tracking-wider block">
                {cl.directInquiries}
              </span>
              <a
                href={`mailto:${t.email}`}
                className="text-2xl sm:text-3xl font-mono font-medium tracking-[-0.03em] text-[#0E0E0E] hover:text-[#FF4D00] transition-colors break-all"
              >
                {t.email}
              </a>
              <div className="pt-1 text-xs font-mono text-[#0E0E0E]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
                <span>{cl.partnerResponse}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-hairline space-y-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#0E0E0E]/40 uppercase block mb-0.5">
                  {cl.studioPhone}
                </span>
                <a
                  href={`tel:${t.phone.replace(/\s+/g, '')}`}
                  className="text-base font-semibold text-[#0E0E0E] hover:text-[#FF4D00] transition-colors"
                >
                  {t.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] text-[#0E0E0E]/40 uppercase block mb-0.5">
                  {cl.registeredOffice}
                </span>
                <div className="text-[#0E0E0E]">{t.address}</div>
                <div className="text-[10px] text-[#0E0E0E]/50 mt-0.5">
                  39°34'11"N · 02°39'01"E
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct contact line + Project Brief (No <form> tag) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="group flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-hairline bg-[#0E0E0E]/10">
                <img
                  ref={portraitRef}
                  src={t.portrait.src}
                  alt={t.portrait.alt[currentLang]}
                  loading="lazy"
                  className={`w-full h-full object-cover filter contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out ${
                    portraitInColour ? 'grayscale-0' : 'grayscale'
                  }`}
                />
              </div>
              <p className="font-mono text-sm text-[#0E0E0E]">{t.portrait.line[currentLang]}</p>
            </div>

            <div className="border border-hairline bg-[#F5F5F2] p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-hairline font-mono text-xs text-[#0E0E0E]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF4D00]">■</span>
                  <span className="font-semibold uppercase">{cl.projectBrief}</span>
                </div>
                <span className="text-[#0E0E0E]/40 text-[10px]">{cl.commissionIntake}</span>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="space-y-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#0E0E0E] text-[#F5F5F2] flex items-center justify-center font-mono font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-mono font-medium text-[#0E0E0E]">
                        {f.successTitle[currentLang]}
                      </h3>
                      <p className="font-mono text-xs text-[#0E0E0E]/60">
                        REF: <span className="font-bold text-[#0E0E0E]">{referenceCode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border border-hairline bg-[#0E0E0E]/[0.02] font-mono text-xs space-y-2">
                    <div className="text-[#0E0E0E]/70 font-mono text-xs">
                      {f.successDesc[currentLang]}
                    </div>
                    <div className="pt-2 border-t border-hairline-subtle text-[10px] text-[#0E0E0E]/60">
                      {cl.senderRouted(formData.name)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 border border-hairline hover:border-[#0E0E0E] font-mono text-xs uppercase tracking-wider text-[#0E0E0E] transition-colors"
                  >
                    {f.resetBtn[currentLang]}
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {errorMessage && (
                    <div className="p-2.5 border border-[#FF4D00] bg-[#FF4D00]/5 font-mono text-xs text-[#0E0E0E] flex items-center gap-2">
                      <span className="text-[#FF4D00] font-bold">!</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1 font-mono text-xs">
                      <label htmlFor="contact-name" className="text-[10px] text-[#0E0E0E]/60 uppercase">
                        {f.nameLabel[currentLang]} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={cl.namePlaceholder}
                        className="w-full px-3 py-2 bg-[#F5F5F2] border border-hairline font-mono text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:border-[#0E0E0E] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1 font-mono text-xs">
                      <label htmlFor="contact-email" className="text-[10px] text-[#0E0E0E]/60 uppercase">
                        {f.emailLabel[currentLang]} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3 py-2 bg-[#F5F5F2] border border-hairline font-mono text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:border-[#0E0E0E] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Type */}
                    <div className="space-y-1 font-mono text-xs">
                      <label htmlFor="contact-type" className="text-[10px] text-[#0E0E0E]/60 uppercase">
                        {f.projectTypeLabel[currentLang]}
                      </label>
                      <select
                        id="contact-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F5F5F2] border border-hairline font-mono text-sm text-[#0E0E0E] focus:border-[#0E0E0E] focus:outline-none transition-colors"
                      >
                        {f.projectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label[currentLang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location & Scale */}
                    <div className="space-y-1 font-mono text-xs">
                      <label htmlFor="contact-scale" className="text-[10px] text-[#0E0E0E]/60 uppercase">
                        {f.locationScaleLabel[currentLang]}
                      </label>
                      <input
                        id="contact-scale"
                        type="text"
                        value={formData.locationScale}
                        onChange={(e) => setFormData({ ...formData, locationScale: e.target.value })}
                        placeholder={cl.scalePlaceholder}
                        className="w-full px-3 py-2 bg-[#F5F5F2] border border-hairline font-mono text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:border-[#0E0E0E] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Scope */}
                  <div className="space-y-1 font-mono text-xs">
                    <label htmlFor="contact-message" className="text-[10px] text-[#0E0E0E]/60 uppercase">
                      {f.messageLabel[currentLang]} *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={cl.messagePlaceholder}
                      className="w-full px-3 py-2 bg-[#F5F5F2] border border-hairline font-mono text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:border-[#0E0E0E] focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-[#0E0E0E] text-[#F5F5F2] hover:bg-[#FF4D00] disabled:bg-[#0E0E0E]/50 transition-colors font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping" />
                          <span>{f.submitting[currentLang]}</span>
                        </>
                      ) : (
                        <>
                          <span>{f.submitBtn[currentLang]}</span>
                          <span>[→]</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
