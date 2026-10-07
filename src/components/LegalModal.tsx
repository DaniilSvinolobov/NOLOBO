import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { content, Language } from '../content';

interface LegalModalProps {
  type: 'impressum' | 'privacy' | null;
  onClose: () => void;
  currentLang: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, currentLang }) => {
  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const f = content.footer;
  const isImpressum = type === 'impressum';
  const title = isImpressum ? f.impressum[currentLang] : f.privacy[currentLang];
  const bodyText = isImpressum
    ? f.impressumContent[currentLang]
    : f.privacyContent[currentLang];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E0E]/70 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-xl bg-[#F5F5F2] border border-[#0E0E0E] p-6 space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-hairline font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-accent">■</span>
              <span className="font-bold uppercase">{title}</span>
            </div>
            <button
              onClick={onClose}
              className="text-[#0E0E0E]/60 hover:text-[#0E0E0E] uppercase text-[11px]"
            >
              [ESC ✕]
            </button>
          </div>

          <div className="font-mono text-sm text-[#0E0E0E]/80 leading-relaxed space-y-4">
            <p>{bodyText}</p>
          </div>

          <div className="pt-4 border-t border-hairline flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0E0E0E] text-[#F5F5F2] hover:bg-accent transition-colors font-mono text-xs uppercase"
            >
              {currentLang === 'de'
                ? 'Verstanden & Schließen'
                : currentLang === 'es'
                ? 'Entendido y cerrar'
                : currentLang === 'ca'
                ? 'Entès i tancar'
                : currentLang === 'ru'
                ? 'Понятно, закрыть'
                : 'Acknowledge & Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
