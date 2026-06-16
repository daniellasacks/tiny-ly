import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../translations';
import LanguageSwitcher from '../Common/LanguageSwitcher';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isHebrew = language === 'he';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError(t('register.error', language));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      direction: isHebrew ? 'rtl' : 'ltr',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>👶 {t('app.title', language)}</h1>
          <LanguageSwitcher />
        </div>
        <h2 style={{ marginBottom: '6px' }}>{t('register.title', language)}</h2>
        <p style={{ marginTop: 0, marginBottom: '20px', color: '#666' }}>{t('app.subtitle', language)}</p>
        {error && <p style={{ color: '#dc3545', marginBottom: '12px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('register.name', language)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '2px solid #e8e8e8',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('register.email', language)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '2px solid #e8e8e8',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('register.password', language)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '2px solid #e8e8e8',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              color: 'white',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {loading ? t('register.submitting', language) : t('register.submit', language)}
          </button>
        </form>
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          {t('register.login', language)} <Link to="/login">{t('register.login_link', language)}</Link>
        </p>
      </div>
    </div>
  );
}
