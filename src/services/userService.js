import api from './api';

/**
 * ✅ Forgot Password API
 * Sends a request to initiate a password reset.
 * @param {string} email - The email of the user requesting a password reset.
 */
export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/users/forgot-password', { email });
        console.log("📨 Forgot Password API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Forgot Password API Error:", error.response?.data?.message || error.message);
        throw error.response?.data || { message: "Failed to request password reset. Please try again." };
    }
};

/**
 * ✅ Reset Password API
 * Submits the new password along with the reset token.
 * @param {string} userId - The ID of the user resetting the password.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password to be set.
 */
export const resetPassword = async (userId, token, newPassword) => {
    try {
        const response = await api.post(`/users/reset-password/${userId}`, { token, newPassword });
        console.log("🔑 Password Reset API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Reset Password API Error:", error.response?.data?.message || error.message);
        throw error.response?.data || { message: "Password reset failed. Please try again." };
    }
};

/**
 * ✅ Get User Profile API
 * Fetches the authenticated user's profile data.
 */
export const getUserProfile = async () => {
    try {
        const response = await api.get('/users/profile');
        console.log("👤 User Profile Fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Get User Profile API Error:", error.response?.data?.message || error.message);
        throw error.response?.data || { message: "Failed to fetch user profile." };
    }
};
