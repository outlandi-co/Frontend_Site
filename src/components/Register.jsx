/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8; // Minimum 8 characters
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        setMessage('');
        setLoading(true);

        try {
            console.log("Submitting registration form..."); // Debugging log
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Registration API Error:", data.message); // Debugging log
                throw new Error(data.message || 'Something went wrong');
            }

            setMessage('Registration successful!');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error during registration:", error); // Debugging log
            setError(error.message);
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
