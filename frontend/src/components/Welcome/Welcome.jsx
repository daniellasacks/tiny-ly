import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageContext } from '../../context/LanguageContext';
import LanguageSwitcher from '../Common/LanguageSwitcher';

export default function Welcome() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const isHebrew = language === 'he';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' }
    },
    hover: {
      scale: 1.1,
      y: -10,
      boxShadow: '0 30px 80px rgba(245, 87, 108, 0.5)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.6 + i * 0.1, duration: 0.5 }
    })
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      direction: isHebrew ? 'rtl' : 'ltr',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <motion.div style={{ position: 'absolute', top: '30px', right: isHebrew ? 'auto' : '30px', left: isHebrew ? '30px' : 'auto', zIndex: '10' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <LanguageSwitcher />
      </motion.div>

      <motion.div
        style={{ textAlign: 'center', maxWidth: '700px', position: 'relative', zIndex: '5' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div style={{ marginBottom: '80px' }} variants={itemVariants}>
          <motion.h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '12px',
            marginTop: '0',
            letterSpacing: '-2px'
          }} animate={floatingAnimation}>
            👶 tiny.ly
          </motion.h1>

          <motion.p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0',
            marginTop: '0',
            fontWeight: '300',
            letterSpacing: '0.5px'
          }}>
            {language === 'en' ? 'Tiny moments, big memories' : 'רגעים קטנים, זיכרונות גדולים'}
          </motion.p>
        </motion.div>

        <motion.button
          onClick={() => navigate('/login')}
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 20px 60px rgba(245, 87, 108, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '120px',
            margin: '0 auto 80px',
            position: 'relative',
            outline: 'none'
          }}
          variants={circleVariants}
          whileHover="hover"
          whileTap="tap"
        >
          👶
        </motion.button>

        <motion.p style={{
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.95)',
          fontWeight: '600',
          marginTop: '-40px',
          marginBottom: '60px',
          letterSpacing: '0.3px'
        }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
          {language === 'en' ? 'Tap to begin' : 'הקש כדי להתחיל'}
        </motion.p>

        <motion.div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginTop: '40px',
          marginBottom: '60px'
        }}>
          {[
            { icon: '🎯', title: language === 'en' ? 'Quick Log' : 'רישום מהיר', desc: language === 'en' ? 'One tap' : 'הקש אחד' },
            { icon: '📊', title: language === 'en' ? 'Timeline' : 'ציר זמן', desc: language === 'en' ? 'Track all' : 'עקוב הכל' },
            { icon: '🌍', title: language === 'en' ? 'Bilingual' : 'דו-לשוני', desc: language === 'en' ? 'EN & HE' : 'EN & HE' },
            { icon: '👥', title: language === 'en' ? 'Share' : 'שתף', desc: language === 'en' ? 'With partner' : 'עם בן/בת זוג' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'default'
              }}
              whileHover={{ y: -5, background: 'rgba(255, 255, 255, 0.25)' }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{feature.icon}</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                {feature.title}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                {feature.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={() => navigate('/login')}
          style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '700',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.5px'
          }}
          variants={itemVariants}
          whileHover={{ y: -2, boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'en' ? 'Get Started Now' : 'התחל עכשיו'}
        </motion.button>
      </motion.div>
    </div>
  );
}
