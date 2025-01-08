// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else if (response.status === 401) {
                    setError('Unauthorized access. Please log in again.');
                    localStorage.removeItem('token');
                } else {
                    const errData = await response.json();
                    setError(errData.message || 'Failed to fetch user profile.');
                }
            } catch (err) {
                setError(`Error fetching profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ color: 'red' }}>{error}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login'; // Redirect to login page
                    }}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>User Profile</h1>
            {user ? (
                <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
                </>
            ) : (
                <p style={{ color: 'red', textAlign: 'center' }}>User data not available.</p>
            )}
        </div>
    );
};

export default Profile;
