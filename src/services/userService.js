import api from './api';


// ✅ Forgot Password API
export const forgotPassword = async (email) => {
    const { data } = await api.post('/users/forgot-password', { email });
    return data; // ✅ Returns resetToken and userId
};

// ✅ Reset Password API
export const resetPassword = async (userId, token, newPassword) => {
    const { data } = await api.post(`/users/reset-password/${userId}/${token}`, { password: newPassword });
    return data; // ✅ Returns success message
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
