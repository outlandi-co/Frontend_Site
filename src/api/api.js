import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // This should be set via environment variables
    headers: {
        'Content-Type': 'application/json', // Default Content-Type
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token if available
        }
        return config; // Return the modified request config
    },
    (error) => {
        console.error('[API] Request error:', error); // Log request errors
        return Promise.reject(error); // Propagate the error
    }
);

// Add a response interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                console.warn('[API] Unauthorized - redirecting to login.');
                localStorage.removeItem('token'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login page
            } else {
                console.error(`[API] Error (${status}):`, data?.message || error.message);
            }
        } else if (error.request) {
            // Handle cases where the request was made but no response was received
            console.error('[API] No response received:', error.request);
        } else {
            // General errors during setting up the request
            console.error('[API] Error during setup:', error.message);
        }

        // Reject the promise to allow individual handlers to catch the error
        return Promise.reject(error);
    }
);

// Utility function to set the token dynamically
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        api.defaults.headers.Authorization = `Bearer ${token}`; // Set token in Axios instance
    } else {
        localStorage.removeItem('token'); // Clear token from localStorage
        delete api.defaults.headers.Authorization; // Remove token from Axios instance
    }
};

export default api;
