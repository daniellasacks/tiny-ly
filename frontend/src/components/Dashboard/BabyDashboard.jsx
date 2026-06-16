import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import api from '../../services/api';
import { t } from '../../translations';
import BabyCard from './BabyCard';
import AddBabyModal from './AddBabyModal';
import LanguageSwitcher from '../Common/LanguageSwitcher';

export default function BabyDashboard() {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const isHebrew = language === 'he';

  useEffect(() => {
    fetchBabies();
  }, []);

  const fetchBabies = async () => {
    try {
      const response = await api.get('/babies');
      setBabies(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBabyAdded = (newBaby) => {
    setBabies([...babies, newBaby]);
    setShowAddModal(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%'
          }} />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px 20px',
        direction: isHebrew ? 'rtl' : 'ltr',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto 40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '40px', fontWeight: '800' }}>
            👶 {t('dashboard.title', language)}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0', fontSize: '16px' }}>
            {t('dashboard.welcome', language)}, {user?.fullName}!
          </p>
        </motion.div>

        <motion.div style={{ display: 'flex', gap: '12px' }} variants={itemVariants}>
          <LanguageSwitcher />
          <motion.button
            onClick={logout}
            style={{
              padding: '10px 24px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            whileHover={{ background: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('nav.logout', language)}
          </motion.button>
        </motion.div>
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {babies.length === 0 ? (
          <motion.div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '24px',
              padding: '80px 40px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '32px', color: '#333', margin: '0 0 16px 0' }}>
              {t('dashboard.empty', language)}
            </h2>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '16px' }}>
              {t('dashboard.empty_subtitle', language)}
            </p>
            <motion.button
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '14px 40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('dashboard.add_baby', language)}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '30px'
              }}
            >
              {babies.map((baby) => (
                <motion.div key={baby._id} variants={itemVariants}>
                  <BabyCard baby={baby} />
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              onClick={() => setShowAddModal(true)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px dashed rgba(255, 255, 255, 0.3)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              whileHover={{ background: 'rgba(255, 255, 255, 0.25)', borderColor: 'rgba(255, 255, 255, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              {t('dashboard.add_another', language)}
            </motion.button>
          </motion.div>
        )}
      </div>

      {showAddModal && <AddBabyModal onClose={() => setShowAddModal(false)} onBabyAdded={handleBabyAdded} />}
    </motion.div>
  );
}
