/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { content, Language, ENABLED_LANGUAGES } from './content';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CrosshairCursor } from './components/CrosshairCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Approach } from './components/Approach';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { LandscapeSchematics } from './components/LandscapeSchematics';
import { Studio } from './components/Studio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Initialize or synchronize language with browser or user preference if available
  useEffect(() => {
    let saved: Language | null = null;
    try {
      saved = localStorage.getItem('nolobo_lang') as Language | null;
    } catch {
      // Storage unavailable, keep default language
    }
    if (saved && ENABLED_LANGUAGES.includes(saved)) {
      setCurrentLang(saved);
    }
  }, []);

  // Synchronize document <title>, <meta description>, and html lang on language change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = content.meta.documentTitle[currentLang];
      document.documentElement.lang = currentLang;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', content.meta.description[currentLang]);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', content.meta.documentTitle[currentLang]);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', content.meta.description[currentLang]);
      }
    }
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('nolobo_lang', lang);
    } catch {
      // Storage unavailable, ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0E0E0E] relative selection:bg-[#FF4D00] selection:text-white">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0E0E0E] focus:text-[#F5F5F2] font-mono text-xs"
      >
        {content.aria.skipLink[currentLang]}
      </a>

      {/* Subtle 12-Column Drafting Grid & Crosshairs */}
      <BackgroundGrid />

      {/* Custom Precision Desktop Crosshair Cursor with Live Coordinates */}
      <CrosshairCursor />

      {/* Sticky 3-Zone Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero currentLang={currentLang} />
        <Work currentLang={currentLang} />
        <Studio currentLang={currentLang} />
        <Approach currentLang={currentLang} />
        <Services currentLang={currentLang} />
        <LandscapeSchematics currentLang={currentLang} />
        <Contact currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
