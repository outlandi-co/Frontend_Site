import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,  // ✅ Ensures cookies are sent
    headers: { "Content-Type": "application/json" }
});

// ✅ Interceptor to handle Unauthorized Responses (401)
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
