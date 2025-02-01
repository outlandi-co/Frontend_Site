// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // ✅ Corrected path

import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setError("Unauthorized. Please log in again.");
      navigate('/login');
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) return <p style={{ textAlign: 'center' }}>🔄 Loading profile...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center' }}>👋 Welcome, {user?.name || 'Guest'}!</h1>
      <p style={{ textAlign: 'center' }}>Thank you for being part of our community.</p>

      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
