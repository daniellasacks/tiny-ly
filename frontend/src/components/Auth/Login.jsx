import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../../context/LanguageContext';
import LanguageSwitcher from '../Common/LanguageSwitcher';

export default function Login() {
  const [step, setStep] = useState(1); // Step 1: Name+Phone, Step 2: Code
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isHebrew = language === 'he';

  const DEMO_CODE = '12345'; // Permanent demo code

  const handleStep1 = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setStep(2);
      setError('');
    } else {
      setError(language === 'en' ? 'Please fill all fields' : 'אנא מלא את כל השדות');
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (code !== DEMO_CODE) {
      setError(language === 'en' ? 'Invalid code' : 'קוד לא נכון');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, code: DEMO_CODE })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      window.location.href = '/tiny-ly/dashboard';
    } catch (err) {
      setError(language === 'en' ? 'Connection error' : 'שגיאת חיבור');
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    out: { opacity: 0, x: -100, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      direction: isHebrew ? 'rtl' : 'ltr',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <motion.div style={{ position: 'absolute', top: '30px', right: isHebrew ? 'auto' : '30px', left: isHebrew ? '30px' : 'auto' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}>
        <LanguageSwitcher />
      </motion.div>

      <motion.button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '30px',
          left: isHebrew ? 'auto' : '30px',
          right: isHebrew ? '30px' : 'auto',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'all 0.3s'
        }}
        whileHover={{ background: 'rgba(255, 255, 255, 0.3)' }}
      >
        ← {language === 'en' ? 'Back' : 'חזור'}
      </motion.button>

      <motion.div
        style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '50px 40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <motion.div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.h1 style={{ fontSize: '48px', margin: '0 0 16px 0' }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            👶
          </motion.h1>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            tiny.ly
          </h2>
          <p style={{ color: '#999', margin: '0', fontSize: '14px' }}>
            {step === 1
              ? (language === 'en' ? 'Step 1: Your Info' : 'שלב 1: המידע שלך')
              : (language === 'en' ? 'Step 2: Enter Code' : 'שלב 2: הזן קוד')
            }
          </p>
        </motion.div>

        <motion.div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px'
        }}>
          <motion.div
            style={{
            flex: 1,
            height: '4px',
            background: step >= 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#eee',
            borderRadius: '2px',
          }}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            style={{
            flex: 1,
            height: '4px',
            background: step >= 2 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#eee',
            borderRadius: '2px',
          }}
            animate={{ scaleX: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              style={{
            background: '#fee',
            border: '1px solid #fcc',
            color: '#c33',
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '14px',
            marginBottom: '24px'
          }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            onSubmit={handleStep1}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            style={{ marginBottom: '24px' }}
          >
            <motion.div style={{ marginBottom: '20px' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {language === 'en' ? 'Your Name' : 'שמך'}
              </label>
              <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #eee',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
                whileFocus={{ boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)', borderColor: '#667eea' }}
                placeholder={language === 'en' ? 'John Doe' : 'ג\'ון דו'}
              />
            </motion.div>

            <motion.div style={{ marginBottom: '32px' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {language === 'en' ? 'Phone Number' : 'מספר טלפון'}
              </label>
              <motion.input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #eee',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
                whileFocus={{ boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)', borderColor: '#667eea' }}
                placeholder={language === 'en' ? '+1 (555) 123-4567' : '+972 50 123 4567'}
              />
            </motion.div>

            <motion.button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                letterSpacing: '0.5px'
              }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'en' ? 'Next →' : '→ הבא'}
            </motion.button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleStep2}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            style={{ marginBottom: '24px' }}
          >
            <motion.div
              style={{
              background: '#f0f4ff',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p style={{ color: '#667eea', fontWeight: '600', margin: '0 0 8px 0', fontSize: '13px', textTransform: 'uppercase' }}>
                {language === 'en' ? 'Demo Code' : 'קוד Demo'}
              </p>
              <motion.p
                style={{ color: '#333', margin: '0', fontSize: '32px', fontWeight: '800', letterSpacing: '4px', fontFamily: 'monospace' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                {DEMO_CODE}
              </motion.p>
            </motion.div>

            <motion.div style={{ marginBottom: '32px' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {language === 'en' ? 'Enter Code' : 'הזן קוד'}
              </label>
              <motion.input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength="5"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #eee',
                  borderRadius: '12px',
                  fontSize: '24px',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                  letterSpacing: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
                whileFocus={{ boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)', borderColor: '#667eea' }}
                placeholder="12345"
                animate={code === DEMO_CODE ? { boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' } : {}}
              />
            </motion.div>

            <motion.div style={{ display: 'flex', gap: '12px' }}>
              <motion.button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError('');
                  setCode('');
                }}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  border: '2px solid #eee',
                  background: 'white',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: '#666'
                }}
                whileHover={{ background: '#f9f9f9', borderColor: '#ddd' }}
                whileTap={{ scale: 0.95 }}
              >
                ← {language === 'en' ? 'Back' : 'חזור'}
              </motion.button>
              <motion.button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  letterSpacing: '0.5px'
                }}
                whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? '⏳' : (language === 'en' ? 'Login' : 'התחבר')}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
