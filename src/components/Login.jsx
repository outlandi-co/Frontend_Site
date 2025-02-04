/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // ✅ Prevent default form submission

        try {
            console.log("📡 Sending request to: /users/login", { email, password });
            const response = await api.post('/users/login', { email, password }, { withCredentials: true });

            if (response.data.token) {
                // ✅ Store token in Local Storage
                localStorage.setItem('token', response.data.token);

                // ✅ Store token in a cookie
                document.cookie = `jwt=${response.data.token}; path=/; Secure; SameSite=Strict;`;

                console.log("✅ Login Successful:", response.data);
                navigate('/dashboard'); // ✅ Redirect after login
            } else {
                console.warn("⚠️ No token received.");
                setError("Login failed: No token received.");
            }
        } catch (error) {
            console.error("🔴 Login failed", error.response?.data?.message || "Unknown error");
            setError(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div style={{ textAlign: 'center', maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>🔐 Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '8px 0' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
