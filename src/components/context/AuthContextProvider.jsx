/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import api from '../../api/api';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Get JWT Token from Cookie or LocalStorage
    const getToken = useCallback(() => {
        const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
        return cookieToken || localStorage.getItem("jwt") || null;
    }, []);

    // 🔴 Handle Unauthorized Logout (401 Error)
    const handle401Logout = useCallback(() => {
        console.warn("🔴 Unauthorized: Clearing user state and cookies.");
        setUser(null);
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("jwt");
    }, []);

    // ✅ Fetch Profile Function (with retries)
    const fetchProfile = useCallback(async (retryCount = 0) => {
        try {
            console.log(`📡 Fetching user profile... Attempt ${retryCount + 1}`);

            const token = getToken();
            if (!token) {
                console.warn("🚨 No token found, logging out user.");
                handle401Logout();
                return;
            }

            const response = await api.get('/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            setUser(response.data);
            console.log("✅ User profile loaded:", response.data);
        } catch (error) {
            console.warn(`⚠️ Error ${error.response?.status || ''}: ${error.response?.statusText || error.message}`);

            if (error.response?.status === 401) {
                handle401Logout();
            }

            if (error.response?.status >= 500 && retryCount < 3) {
                const delay = Math.pow(2, retryCount) * 1000;
                console.warn(`🔄 Retrying request in ${delay / 1000} seconds (Attempt ${retryCount + 1})...`);

                setTimeout(() => fetchProfile(retryCount + 1), delay);
            }
        } finally {
            setLoading(false);
        }
    }, [getToken, handle401Logout]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // ✅ Login function
    const loginUser = useCallback(async (username, password) => {
      try {
          const response = await api.post('/users/login', { username, password });
  
          const token = response.data.token;
          if (token) {
              document.cookie = `jwt=${token}; path=/; Secure; SameSite=None;`;
              localStorage.setItem("jwt", token);
          }
  
          setUser(response.data.user);
          console.log("✅ Login Successful:", response.data.user);
      } catch (error) {
          console.error("❌ Login Failed:", error.response?.data?.message || "Unknown error");
      }
  }, []);
  
    // ✅ Logout function
    const logoutUser = useCallback(async () => {
        try {
            await api.post('/users/logout', {}, { withCredentials: true });
            handle401Logout();
            console.log("✅ Successfully logged out!");
        } catch (error) {
            console.error("❌ Logout Error:", error);
        }
    }, [handle401Logout]);

    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ PropTypes Validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
