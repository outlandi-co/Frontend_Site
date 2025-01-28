/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

        console.log("Extracted Token:", token);
        console.log("Extracted UserId:", userId);

        if (token && userId) {
            setIsResetMode(true);
        }
    }, [location.search]);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        console.log("Calling Forgot Password API with:", email);
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log("Forgot Password Response:", data);

            if (response.ok) {
                setMessage('Password reset email sent. Please check your inbox.');
            } else {
                throw new Error(data.message || 'Failed to send reset email. Please try again.');
            }
        } catch (err) {
            console.error('Error while sending the reset email:', err);
            setError(err.message);
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
            setError('Invalid or missing reset link. Please request a new reset email.');
            setLoading(false);
            return;
        }

        console.log("Resetting Password for User:", userId);
        console.log("Token:", token);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/reset-password/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();
            console.log("Reset Password Response:", data);

            if (response.ok) {
                setMessage('Password has been successfully reset. Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                throw new Error(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.error('Error while resetting the password:', err);
            setError(err.message);
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
