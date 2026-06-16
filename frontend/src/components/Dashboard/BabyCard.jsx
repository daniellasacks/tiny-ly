import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../translations';

export default function BabyCard({ baby }) {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const isHebrew = language === 'he';

  const calculateAge = (dob) => {
    const days = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24));
    if (days < 7) return isHebrew ? `${days} ${t('baby.age_days', language)}` : `${days}${t('baby.age_days', language)}`;
    if (days < 30) return isHebrew ? `${Math.floor(days / 7)} ${t('baby.age_weeks', language)}` : `${Math.floor(days / 7)}${t('baby.age_weeks', language)}`;
    const months = Math.floor(days / 30.44);
    return isHebrew ? `${months} ${t('baby.age_months', language)}` : `${months}${t('baby.age_months', language)}`;
  };

  return (
    <div
      onClick={() => navigate(`/baby/${baby._id}`)}
      style={{
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '15px',
        cursor: 'pointer',
        background: '#f9f9f9',
        textAlign: 'center',
        marginBottom: '20px'
      }}
    >
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>
        {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
      </div>
      <h3>{baby.name}</h3>
      <p>{calculateAge(baby.dateOfBirth)}</p>
      {baby.currentWeight && <p>{t('baby.weight', language)}: {baby.currentWeight} kg</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>{t('baby.click_to_view', language)}</p>
    </div>
  );
}
