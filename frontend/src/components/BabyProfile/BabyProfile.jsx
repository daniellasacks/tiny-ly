import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { LanguageContext } from '../../context/LanguageContext';
import { t } from '../../translations';

export default function BabyProfile() {
  const { babyId } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [baby, setBaby] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const isHebrew = language === 'he';

  const fetchBaby = useCallback(async () => {
    try {
      const response = await api.get(`/babies/${babyId}`);
      setBaby(response.data);
    } catch (error) {
      alert(t('message.error', language));
      navigate('/dashboard');
    }
  }, [babyId, navigate, language]);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await api.get(`/activities/${babyId}`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [babyId]);

  useEffect(() => {
    fetchBaby();
    fetchActivities();
  }, [fetchBaby, fetchActivities]);

  const logActivity = async (type) => {
    try {
      const response = await api.post('/activities', {
        babyId,
        type,
        timestamp: new Date()
      });
      setActivities([response.data, ...activities]);
    } catch (error) {
      alert(t('message.failed', language));
    }
  };

  const calculateAge = (dob) => {
    const days = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24));
    if (days < 7) return `${days}${t('baby.age_days', language)}`;
    if (days < 30) return `${Math.floor(days / 7)}${t('baby.age_weeks', language)}`;
    const months = Math.floor(days / 30.44);
    return `${months}${t('baby.age_months', language)}`;
  };

  if (loading || !baby) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>{t('message.loading', language)}</div>;
  }

  const getActivityIcon = (type) => {
    const icons = { feed: '🍼', diaper: '🧷', medicine: '💊', sleep: '😴', play: '🎾' };
    return icons[type] || '✅';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '30px 20px',
      direction: isHebrew ? 'rtl' : 'ltr',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginBottom: '30px',
            padding: '10px 24px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ← {t('nav.back', language)}
        </button>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: baby.gender === 'girl' ? 'linear-gradient(135deg, #ffc0d0 0%, #ffb3d9 100%)' :
                        baby.gender === 'boy' ? 'linear-gradient(135deg, #b3d9ff 0%, #87ceeb 100%)' :
                        'linear-gradient(135deg, #ffd4a3 0%, #ffb366 100%)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)'
          }}>
            {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#333', margin: '0 0 12px 0' }}>
            {baby.name}
          </h1>
          <p style={{ fontSize: '20px', color: '#667eea', fontWeight: '600', margin: '0' }}>
            {calculateAge(baby.dateOfBirth)}
          </p>
          {baby.currentWeight && (
            <p style={{ fontSize: '16px', color: '#666', margin: '12px 0 0 0' }}>
              ⚖️ {t('baby.weight', language)}: {baby.currentWeight} kg
            </p>
          )}
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{ color: '#333', fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0' }}>
            {t('baby.log_activity', language)}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px'
          }}>
            {['feed', 'diaper', 'medicine', 'sleep', 'play'].map((activity) => (
              <button
                key={activity}
                onClick={() => logActivity(activity)}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s',
                  fontSize: '32px',
                  marginBottom: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div>{getActivityIcon(activity)}</div>
                <div style={{ fontSize: '12px', marginTop: '8px', fontWeight: '600' }}>
                  {t(`activity.${activity}`, language)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '30px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{ color: '#333', fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0' }}>
            {t('baby.timeline', language)}
          </h3>
          {activities.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0', margin: '0' }}>
              {t('baby.no_activities', language)}
            </p>
          ) : (
            <div>
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '24px' }}>{getActivityIcon(activity.type)}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0', fontWeight: '600', color: '#333' }}>
                      {t(`activity.${activity.type}`, language)}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#999' }}>
                      {new Date(activity.timestamp).toLocaleString(language === 'he' ? 'he-IL' : 'en-US')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
