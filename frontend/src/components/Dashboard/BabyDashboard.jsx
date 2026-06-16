import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import BabyCard from './BabyCard';
import AddBabyModal from './AddBabyModal';

export default function BabyDashboard() {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, logout } = useContext(AuthContext);

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

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>My Babies</h1>
          <p>Welcome, {user?.fullName}!</p>
        </div>
        <button onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {babies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>No babies yet</h2>
          <p>Start tracking your baby's care!</p>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}
          >
            + Add Baby
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {babies.map((baby) => (
              <BabyCard key={baby._id} baby={baby} />
            ))}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', width: '100%' }}
          >
            + Add Another Baby
          </button>
        </div>
      )}

      {showAddModal && <AddBabyModal onClose={() => setShowAddModal(false)} onBabyAdded={handleBabyAdded} />}
    </div>
  );
}
