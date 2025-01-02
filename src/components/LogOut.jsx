// LogOut.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Redirect user to the login page
        navigate('/login');
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Logging out...</h2>
            <p>You will be redirected to the login page shortly.</p>
        </div>
    );
};

export default LogOut;
