import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../translations';

export default function AddBabyModal({ onClose, onBabyAdded }) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const isHebrew = language === 'he';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/babies', {
        name,
        dateOfBirth,
        gender,
        currentWeight: currentWeight ? parseFloat(currentWeight) : null
      });
      onBabyAdded(response.data);
    } catch (err) {
      alert(t('message.failed_add_baby', language));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          direction: isHebrew ? 'rtl' : 'ltr'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{t('modal.title', language)}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>{t('modal.name', language)} *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>{t('modal.dob', language)} *</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>{t('modal.gender', language)} *</label>
            <div style={{ marginTop: '5px' }}>
              <label>
                <input type="radio" name="gender" value="girl" checked={gender === 'girl'} onChange={(e) => setGender(e.target.value)} />
                👧 {t('modal.gender_girl', language)}
              </label>
              <label style={{ marginLeft: '15px' }}>
                <input type="radio" name="gender" value="boy" checked={gender === 'boy'} onChange={(e) => setGender(e.target.value)} />
                👦 {t('modal.gender_boy', language)}
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>{t('modal.weight', language)}</label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', cursor: 'pointer' }}>
              {t('modal.cancel', language)}
            </button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '10px', cursor: 'pointer' }}>
              {loading ? t('modal.submitting', language) : t('modal.submit', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
