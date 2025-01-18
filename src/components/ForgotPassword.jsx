// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Track if the email was sent
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
        setError('');
        setEmailSent(true); // Update state to show reset password form
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error occurred while sending the reset email:', err);
      setError('Error occurred while sending the reset email. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token || !newPassword) {
      setError('Both token and new password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password has been successfully reset.');
        setError('');
        setTimeout(() => navigate('/login'), 5000);
      } else {
        setError(data.message || 'Failed to reset password. Please try again.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error occurred while resetting the password:', err);
      setError('Error occurred while resetting the password. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Forgot Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Forgot Password Form */}
      {!emailSent && (
        <form onSubmit={handleForgotPassword}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      )}

      {/* Reset Password Form */}
      {emailSent && (
        <form onSubmit={handleResetPassword}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="token">Token:</label>
            <input
              id="token"
              type="text"
              placeholder="Enter your reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="newPassword">New Password:</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      <button
        onClick={handleBackToLogin}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
