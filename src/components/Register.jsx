/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import api from '../services/api'; // Import Axios API instance

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // ✅ Email Validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // ✅ Password Validation (Minimum 8 characters)
    const validatePassword = (password) => password.length >= 8;

    // ✅ Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim user inputs to prevent validation errors
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedUsername = username.trim().toLowerCase();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        // ✅ Validate Inputs
        if (!trimmedName || !trimmedEmail || !trimmedUsername || !trimmedPassword || !trimmedConfirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setError('Invalid email format.');
            return;
        }

        if (!validatePassword(trimmedPassword)) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setMessage('');
        setLoading(true);

        try {
            console.log("🔄 Submitting registration form...");

            // ✅ Use Axios instance from api.js
            const response = await api.post('/users/register', {
                name: trimmedName,
                email: trimmedEmail,
                username: trimmedUsername, // Ensure username is included
                password: trimmedPassword,
            });

            console.log("✅ Registration successful:", response.data);

            setMessage('Registration successful! Please log in.');
            setName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error("❌ Registration error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Register</h1>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-label="Enter your name"
                    style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Enter your email"
                    style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-label="Enter your username"
                    style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Enter your password"
                    style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    aria-label="Confirm your password"
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
                    fontWeight: 'bold',
                }}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default Register;
