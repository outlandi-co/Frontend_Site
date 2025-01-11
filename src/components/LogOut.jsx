// src/components/LogOut.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import the useAuth hook

const LogOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the logout function from authContext

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Call the logout function to reset user context or state
    logout(); 

    // Redirect the user to the login page
    navigate('/login');
  }, [navigate, logout]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Logging out...</h2>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default LogOut;
