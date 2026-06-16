import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      style={{
        padding: '10px 20px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        borderRadius: '25px',
        transition: 'all 0.3s',
        fontFamily: 'inherit'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
      }}
      title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
    >
      {language === 'en' ? '🇮🇱 עברית' : '🇬🇧 English'}
    </button>
  );
}
