// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        // Log the password value to debug
        console.log('Password value before sending the request:', password);

        // Ensure password is a valid string
        if (typeof password !== 'string' || password.trim() === '') {
            setError('Password must be a valid string.');
            setLoading(false);
            return;
        }

        try {
            console.log('Sending login request:', { email, password });

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // Ensure password is passed correctly
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                setMessage('Login successful!');
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data));
                setTimeout(() => navigate('/profile'), 1000);
            } else {
                console.error('Login failed:', data.message);
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            console.error('Error occurred during login:', err);
            setError('A network error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
