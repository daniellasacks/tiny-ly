import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../translations';
import LanguageSwitcher from '../Common/LanguageSwitcher';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isHebrew = language === 'he';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(t('login.error', language));
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial', direction: isHebrew ? 'rtl' : 'ltr' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>👶 {t('app.title', language)}</h1>
        <LanguageSwitcher />
      </div>
      <h2>{t('login.title', language)}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('login.email', language)}
            required
            style={{ padding: '10px', width: '200px', marginBottom: '10px', display: 'block' }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.password', language)}
            required
            style={{ padding: '10px', width: '200px', marginBottom: '10px', display: 'block' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? t('login.submitting', language) : t('login.submit', language)}
        </button>
      </form>
      <p>
        {t('login.signup', language)} <Link to="/register">{t('login.signup_link', language)}</Link>
      </p>
    </div>
  );
}
