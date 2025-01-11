// src/components/ForgotPassword.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

    // Email validation (using a simple regex for basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent. Please check your inbox.');
        setError('');
        setTimeout(() => navigate('/login'), 5000); // Redirect to login after 5 seconds
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
        setMessage('');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error occurred while sending the reset email.');
      setMessage('');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Navigate back to Login page
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
      <button onClick={handleBackToLogin}>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
