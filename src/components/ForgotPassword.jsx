/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../services/userService'; // ✅ Import API functions

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');
    
        console.log("🔍 Extracted Token:", token);
        console.log("🔍 Extracted UserId:", userId);
    
        if (token && userId) {
            setIsResetMode(true);
        }
    }, [location.search]);
    
    const handleForgotPassword = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setMessage('');
  
      console.log("📨 Calling Forgot Password API with:", email);
  
      try {
          const response = await forgotPassword(email);
          console.log("✅ Forgot Password Response:", response);
  
          // ✅ Corrected handling: Only show message, don't throw an error
          if (response.message === "Reset email sent") {
              setMessage('✅ Password reset email sent. Please check your inbox.');
          } else {
              setError(response.message || 'Something went wrong.');
          }
      } catch (err) {
          console.error("❌ Forgot Password Error:", err);
          setError(err.message || 'Failed to request password reset.');
      } finally {
          setLoading(false);
      }
  };
  
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userId = params.get('userId');

        if (!token || !userId) {
            setError("❌ Invalid or missing reset link. Please request a new reset email.");
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError("❌ Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        console.log("🔑 Resetting Password for User:", userId);
        console.log("🔐 Token:", token);

        try {
            const response = await resetPassword(userId, token, newPassword); // ✅ Use API function
            console.log("✅ Reset Password Response:", response);

            if (response.success) {
                setMessage("✅ Password reset successful! Redirecting to login...");
                setTimeout(() => navigate('/login'), 3000);
            } else {
                throw new Error(response.message || "Failed to reset password.");
            }
        } catch (err) {
            console.error("❌ Reset Password Error:", err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>{isResetMode ? 'Reset Password' : 'Forgot Password'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            {/* Forgot Password Form */}
            {!isResetMode && (
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
            {isResetMode && (
                <form onSubmit={handleResetPassword}>
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
        </div>
    );
};

export default ForgotPassword;
