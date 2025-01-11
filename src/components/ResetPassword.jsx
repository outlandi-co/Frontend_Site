// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();

    // Extract the token from the URL
    const token = new URLSearchParams(location.search).get('token');

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            setError('Password is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/users/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => window.location.href = '/login', 5000); // Optionally navigate to login after reset
            } else {
                setError(data.message || 'Failed to reset password');
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('An error occurred while resetting the password');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <form onSubmit={handlePasswordReset}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
