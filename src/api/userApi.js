import api from './api';

// Login API
export const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Register API
export const register = async (name, email, password) => {
    try {
        const response = await api.post('/users/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Get User Profile
export const getUserProfile = async () => {
    try {
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Forgot Password API
export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/users/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Error sending forgot password email:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Reset Password API
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post('/users/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error.response?.data?.message || error.message);
        throw error;
    }
};
