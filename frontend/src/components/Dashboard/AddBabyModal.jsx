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
      alert('Failed to add baby');
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
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
        direction: isHebrew ? 'rtl' : 'ltr'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#333', margin: '0 0 24px 0' }}>
          👶 {t('modal.title', language)}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('modal.name', language)}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #eee',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#667eea'; e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('modal.dob', language)}
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #eee',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#667eea'; e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('modal.gender', language)}
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { value: 'girl', label: t('modal.gender_girl', language), emoji: '👧' },
                { value: 'boy', label: t('modal.gender_boy', language), emoji: '👦' }
              ].map((opt) => (
                <label key={opt.value} style={{
                  flex: 1,
                  padding: '12px',
                  border: `2px solid ${gender === opt.value ? '#667eea' : '#eee'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  background: gender === opt.value ? 'rgba(102, 126, 234, 0.05)' : 'transparent'
                }}>
                  <input type="radio" name="gender" value={opt.value} checked={gender === opt.value} onChange={(e) => setGender(e.target.value)} style={{ display: 'none' }} />
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{opt.emoji}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{opt.label}</div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('modal.weight', language)}
            </label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #eee',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#667eea'; e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #eee',
                background: 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s',
                fontFamily: 'inherit',
                fontSize: '15px'
              }}
              onMouseEnter={(e) => { e.target.style.background = '#f9f9f9'; e.target.style.borderColor = '#ddd'; }}
              onMouseLeave={(e) => { e.target.style.background = 'white'; e.target.style.borderColor = '#eee'; }}
            >
              {t('modal.cancel', language)}
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s',
                fontFamily: 'inherit',
                fontSize: '15px',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)'; } }}
              onMouseLeave={(e) => { if (!loading) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; } }}
            >
              {loading ? t('modal.submitting', language) : t('modal.submit', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
