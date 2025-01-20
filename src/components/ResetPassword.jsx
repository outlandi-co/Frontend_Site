// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token'); // Get the token from query parameters
    const userId = searchParams.get('userId'); // Get the userId from query parameters
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    console.log('Using API URL:', import.meta.env.VITE_API_URL); // Debugging API URL

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!token || !userId) {
            setError('Invalid or missing token and user ID.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password has been successfully reset.');
                setError('');
                setNewPassword(''); // Clear input field
                setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.error('Error occurred while resetting the password:', err);
            setError('An error occurred while resetting the password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handleResetPassword}>
                <label htmlFor="new-password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    New Password:
                </label>
                <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '5px',
                        backgroundColor: loading ? '#ccc' : '#007BFF',
                        color: 'white',
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
