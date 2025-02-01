/* eslint-disable no-unused-vars */

import React from 'react';
import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }
    
            localStorage.setItem("token", data.token); // Store token
            console.log("✅ Login successful, token stored:", data.token);
            window.location.href = "/dashboard"; // Redirect to dashboard
        } catch (error) {
            console.error("🔴 Login failed:", error);
        }
    };
    
    return (
        <form onSubmit={handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
