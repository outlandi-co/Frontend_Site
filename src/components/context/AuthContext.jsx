/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log("📡 Fetching user profile...");
                const response = await api.get('/users/profile', { withCredentials: true }); // ✅ Ensure cookies are sent
                setUser(response.data);
                console.log("✅ User profile loaded:", response.data);
            } catch (error) {
                console.warn("⚠️ Not authenticated. Clearing user state.");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // ✅ Logout Function (Clears Cookies + Resets User State)
    const logoutUser = async () => {
        try {
            await api.post('/users/logout', {}, { withCredentials: true }); // ✅ Ensure cookies are cleared
            setUser(null);

            // ✅ Clear JWT Cookie
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log("🚪 User logged out successfully");

            // ✅ Redirect to login after logout
            setTimeout(() => {
                window.location.href = "/login";
            }, 500);
        } catch (error) {
            console.error("❌ Logout Failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
