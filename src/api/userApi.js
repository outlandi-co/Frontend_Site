import api from './api';

// Login API
export const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};

// Register API
export const register = async (name, email, password) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
};

// Get user profile
export const getUserProfile = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

// Forgot Password API
export const forgotPassword = async (email) => {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
};

// Reset Password API
export const resetPassword = async (token, newPassword) => {
    const response = await api.post('/users/reset-password', { token, newPassword });
    return response.data;
};
