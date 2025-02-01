import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // ✅ Ensure cookies are sent
});

// ✅ Log every request
api.interceptors.request.use((config) => {
    console.log(`📡 Sending request to: ${config.url}`, config);
    return config;
});

// ✅ Handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Unauthorized! Redirecting to login.");
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
