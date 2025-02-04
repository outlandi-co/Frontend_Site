import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // ✅ Ensures cookies (JWT) are sent with requests
});

// ✅ Log every request
api.interceptors.request.use((config) => {
    console.log(`📡 Sending request to: ${config.url}`, config);

    // ✅ Add Authorization header if JWT exists in cookies
    const jwtToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1];

    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
});

// ✅ Handle 401 errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Unauthorized! Clearing cookies and redirecting to login.");
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

// ✅ Logout function to clear cookies and redirect
export const logoutUser = async () => {
    try {
        await api.post('/users/logout', {}, { withCredentials: true });
        
        // ✅ Clear authentication state
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('user'); 
        sessionStorage.clear(); 
        
        window.location.href = "/login"; // ✅ Redirect to login page
    } catch (error) {
        console.error("❌ Logout Error:", error);
    }
};

export default api;
