// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'; // ✅ Ensure React import
import PropTypes from 'prop-types';
import api from '../../api/api';
import AuthContext from './AuthContext'; // ✅ Ensure correct import

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async (retryCount = 0) => {
            try {
                const response = await api.get('/users/profile', { withCredentials: true }); // ✅ Ensures cookies are sent
                setUser(response.data);
                console.log("✅ User profile loaded:", response.data);
            } catch (error) {
                if (error.response) {
                    console.warn(`⚠️ Error ${error.response.status}: ${error.response.statusText}`);

                    if (error.response.status === 401) {
                        console.warn("🔴 Unauthorized: Clearing user state.");
                        setUser(null);
                    }

                    if (error.response.status >= 500 && retryCount < 3) {
                        console.warn(`🔄 Retrying request (Attempt ${retryCount + 1})...`);
                        setTimeout(() => fetchProfile(retryCount + 1), 1000);
                    }
                } else {
                    console.error('⚠️ Network Error:', error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ PropTypes Validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
