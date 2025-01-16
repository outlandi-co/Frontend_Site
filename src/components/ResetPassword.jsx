// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the token from the URL
    const token = new URLSearchParams(location.search).get('token');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
    
        if (!newPassword || !confirmPassword) {
            setError('Both password fields are required.');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        setLoading(true);
    
        try {
            // Log the API URL and request payload
            console.log('Reset Password Request URL:', `${import.meta.env.VITE_API_URL}/api/users/reset-password`);
            console.log('Reset Password Request Payload:', { token, newPassword });
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });
    
            // Log the raw response object for debugging
            console.log('Reset Password Response Object:', response);
    
            const data = await response.json();
    
            // Log the parsed response data
            console.log('Reset Password Response Data:', data);
    
            if (response.ok) {
                setMessage('Password reset successful! Redirecting to login...');
                setError('');
                setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
                setMessage('');
            }
        } catch (err) {
            // Log any errors that occurred during the fetch
            console.error('Error occurred while resetting password:', err);
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handlePasswordReset}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="new-password" style={{ display: 'block', marginBottom: '5px' }}>
                        New Password:
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="confirm-password" style={{ display: 'block', marginBottom: '5px' }}>
                        Confirm Password:
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
