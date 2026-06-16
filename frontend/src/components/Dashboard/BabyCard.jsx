import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BabyCard({ baby }) {
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const days = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24));
    if (days < 7) return `${days}d`;
    if (days < 30) return `${Math.floor(days / 7)}w`;
    const months = Math.floor(days / 30.44);
    if (months < 12) return `${months}mo`;
    return `${Math.floor(months / 12)}y`;
  };

  return (
    <div
      onClick={() => navigate(`/baby/${baby._id}`)}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 255, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '30px 24px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: baby.gender === 'girl' ? 'linear-gradient(135deg, #ffc0d0 0%, #ffb3d9 100%)' :
                    baby.gender === 'boy' ? 'linear-gradient(135deg, #b3d9ff 0%, #87ceeb 100%)' :
                    'linear-gradient(135deg, #ffd4a3 0%, #ffb366 100%)',
        margin: '0 auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '50px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
      }}>
        {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#333', margin: '0 0 8px 0' }}>
        {baby.name}
      </h3>
      <p style={{ fontSize: '14px', color: '#667eea', fontWeight: '600', margin: '0 0 12px 0' }}>
        {calculateAge(baby.dateOfBirth)}
      </p>
      {baby.currentWeight && (
        <p style={{ fontSize: '12px', color: '#999', margin: '0', marginBottom: '12px' }}>
          ⚖️ {baby.currentWeight} kg
        </p>
      )}
      <div style={{
        fontSize: '12px',
        color: '#667eea',
        fontWeight: '600',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        View Profile →
      </div>
    </div>
  );
}
