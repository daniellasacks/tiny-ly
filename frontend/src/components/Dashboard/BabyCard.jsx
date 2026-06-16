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
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '15px',
        cursor: 'pointer',
        background: '#f9f9f9',
        textAlign: 'center',
        marginBottom: '20px'
      }}
    >
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>
        {baby.gender === 'girl' ? '👧' : baby.gender === 'boy' ? '👦' : '👶'}
      </div>
      <h3>{baby.name}</h3>
      <p>{calculateAge(baby.dateOfBirth)} old</p>
      {baby.currentWeight && <p>Weight: {baby.currentWeight} kg</p>}
      <p style={{ fontSize: '12px', color: '#666' }}>Click to view</p>
    </div>
  );
}
