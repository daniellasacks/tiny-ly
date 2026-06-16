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

  // Wrap functions with useCallback to fix useEffect dependencies
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', direction: isHebrew ? 'rtl' : 'ltr' }}>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {t('nav.back', language)}
      </button>

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '10px' }}>
          {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
        </div>
        <h1>{baby.name}</h1>
        <p>{calculateAge(baby.dateOfBirth)}</p>
        {baby.currentWeight && <p>{t('baby.weight', language)}: {baby.currentWeight} kg</p>}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>{t('baby.log_activity', language)}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {['feed', 'diaper', 'medicine', 'sleep', 'play'].map((activity) => (
            <button
              key={activity}
              onClick={() => logActivity(activity)}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                background: '#e0e0e0',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            >
              <div>{getActivityIcon(activity)}</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>{t(`activity.${activity}`, language)}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>{t('baby.timeline', language)}</h3>
        {activities.length === 0 ? (
          <p>{t('baby.no_activities', language)}</p>
        ) : (
          <div>
            {activities.map((activity) => (
              <div key={activity._id} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{getActivityIcon(activity.type)}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{t(`activity.${activity.type}`, language)}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    {new Date(activity.timestamp).toLocaleString(language === 'he' ? 'he-IL' : 'en-US')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
