import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff5f7 0%, #f0f4ff 100%)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '12px' }}>tiny.ly</h1>
        <p style={{ marginBottom: '28px', color: '#666' }}>Tiny moments, big memories</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ff69b4 0%, #87ceeb 100%)',
            color: '#fff',
            fontSize: '24px',
            fontWeight: '700',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
