import React from 'react';
import { Language } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ta', label: 'தமிழ்' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'te', label: 'తెలుగు' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-selector" data-no-translate>
      <div className="language-title">LANGUAGE</div>
      <div className="language-buttons">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={language === lang.code ? 'active' : ''}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};
