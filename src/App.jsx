// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';  // Explicitly import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

function App() {
    const [userId, setUserId] = useState(null); // State to store the user ID
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchUserId = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserId(data.id); // Set user ID from API response
                } else if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    localStorage.removeItem('token'); // Clear invalid token
                } else {
                    setError('Failed to fetch user ID. Please try again later.');
                }
            } catch (err) {
                console.error('Error fetching user ID:', err.message);
                setError('An unexpected error occurred. Please try again later.');
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchUserId();
    }, []);

    // Render loading screen while fetching user data
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Loading...</h2>
                <p>Please wait while we authenticate your account.</p>
            </div>
        );
    }

    // Render error message if fetching user data fails
    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login'; // Redirect to login page
                    }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <Router>
            <div>
                <header
                    style={{
                        textAlign: 'center',
                        padding: '20px',
                        background: '#1a1a1a',
                        color: 'white',
                    }}
                >
                    <h1>Welcome to Outlandico</h1>
                </header>
                <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    <Routes>
                        <Route path="/products" element={<Products userId={userId} />} />
                        <Route path="/cart" element={<CartPage userId={userId} />} />
                        <Route path="/checkout" element={<CheckoutPage userId={userId} />} />
                        <Route path="/" element={<h2>Welcome to Outlandico</h2>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
