import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      style={{
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        background: '#e0e0e0',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
      title="Switch language"
    >
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
}
