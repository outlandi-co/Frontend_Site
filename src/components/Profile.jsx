// src/components/Profile.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'; // Use AuthContext

const Profile = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is already authenticated via context, skip fetching
    if (user) {
      setLoading(false);
    } else {
      setError('No user data found. Please log in.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading profile...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button
          onClick={() => {
            logout(); // Log out if there's an error (clear context and localStorage)
            window.location.href = '/login'; // Redirect to login page
          }}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center' }}>User Profile</h1>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
          <button
            onClick={() => {
              logout(); // Log out the user when they click the button
              window.location.href = '/login'; // Redirect to login page after logout
            }}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p style={{ color: 'red', textAlign: 'center' }}>User data not available.</p>
      )}
    </div>
  );
};

export default Profile;
