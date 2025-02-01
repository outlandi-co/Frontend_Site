import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // ✅ Ensures cookies (JWT) are sent with requests
});

// ✅ Add an interceptor to check response errors globally
api.interceptors.response.use(
    response => response, 
    error => {
        if (error.response && error.response.status === 401) {
            console.warn("⚠️ Unauthorized - Redirecting to Login");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
