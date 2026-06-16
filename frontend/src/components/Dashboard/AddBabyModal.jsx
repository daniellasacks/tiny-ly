import React, { useState } from 'react';
import api from '../../services/api';

export default function AddBabyModal({ onClose, onBabyAdded }) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/babies', {
        name,
        dateOfBirth,
        gender,
        currentWeight: currentWeight ? parseFloat(currentWeight) : null
      });
      onBabyAdded(response.data);
    } catch (err) {
      alert('Failed to add baby');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Register Your Baby</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Baby's Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Date of Birth *</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Gender *</label>
            <div style={{ marginTop: '5px' }}>
              <label>
                <input type="radio" name="gender" value="girl" checked={gender === 'girl'} onChange={(e) => setGender(e.target.value)} />
                👧 Girl
              </label>
              <label style={{ marginLeft: '15px' }}>
                <input type="radio" name="gender" value="boy" checked={gender === 'boy'} onChange={(e) => setGender(e.target.value)} />
                👦 Boy
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '10px', cursor: 'pointer' }}>
              {loading ? 'Adding...' : 'Add Baby'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
