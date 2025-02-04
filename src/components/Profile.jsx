// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (!user) {
          console.warn("🔴 No user detected! Redirecting...");
          navigate('/login');
      }
  }, [user, navigate]);

  return (
      <div>
          <h1>Welcome, {user?.name}!</h1>
          <button onClick={() => {
              logoutUser();
              navigate('/login'); // ✅ Ensure redirect
          }}>Logout</button>
      </div>
  );
};
export default Profile;
