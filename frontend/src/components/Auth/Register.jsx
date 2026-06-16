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
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial', direction: isHebrew ? 'rtl' : 'ltr' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>👶 {t('app.title', language)}</h1>
        <LanguageSwitcher />
      </div>
      <h2>{t('register.title', language)}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('register.name', language)}
            required
            style={{ padding: '10px', width: '200px', marginBottom: '10px', display: 'block' }}
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('register.email', language)}
            required
            style={{ padding: '10px', width: '200px', marginBottom: '10px', display: 'block' }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('register.password', language)}
            required
            style={{ padding: '10px', width: '200px', marginBottom: '10px', display: 'block' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? t('register.submitting', language) : t('register.submit', language)}
        </button>
      </form>
      <p>
        {t('register.login', language)} <Link to="/login">{t('register.login_link', language)}</Link>
      </p>
    </div>
  );
}
