import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function BabyProfile() {
  const { babyId } = useParams();
  const navigate = useNavigate();
  const [baby, setBaby] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBaby();
    fetchActivities();
  }, [babyId]);

  const fetchBaby = async () => {
    try {
      const response = await api.get(`/babies/${babyId}`);
      setBaby(response.data);
    } catch (error) {
      alert('Baby not found');
      navigate('/dashboard');
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await api.get(`/activities/${babyId}`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (type) => {
    try {
      const response = await api.post('/activities', {
        babyId,
        type,
        timestamp: new Date()
      });
      setActivities([response.data, ...activities]);
    } catch (error) {
      alert('Failed to log activity');
    }
  };

  const calculateAge = (dob) => {
    const days = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24));
    if (days < 7) return `${days}d`;
    if (days < 30) return `${Math.floor(days / 7)}w`;
    const months = Math.floor(days / 30.44);
    return `${months}mo`;
  };

  if (loading || !baby) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  const getActivityIcon = (type) => {
    const icons = { feed: '🍼', diaper: '🧷', medicine: '💊', sleep: '😴', play: '🎾' };
    return icons[type] || '✅';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        ← Back
      </button>

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '10px' }}>
          {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
        </div>
        <h1>{baby.name}</h1>
        <p>{calculateAge(baby.dateOfBirth)} old</p>
        {baby.currentWeight && <p>Weight: {baby.currentWeight} kg</p>}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Log Activity</h3>
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
              <div style={{ fontSize: '12px', marginTop: '5px' }}>{activity}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Activity Timeline</h3>
        {activities.length === 0 ? (
          <p>No activities logged yet</p>
        ) : (
          <div>
            {activities.map((activity) => (
              <div key={activity._id} style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{getActivityIcon(activity.type)}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{activity.type}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                    {new Date(activity.timestamp).toLocaleString()}
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
