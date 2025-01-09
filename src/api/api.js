import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://backend-server-nlr5.onrender.com/api', // Fallback to production URL if not set in environment
    headers: {
        'Content-Type': 'application/json', // Default Content-Type for JSON requests
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
        // Log and propagate request errors
        console.error('[API] Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor for handling errors globally
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            // Handle 401 Unauthorized errors
            if (status === 401) {
                console.warn('[API] Unauthorized - redirecting to login.');
                localStorage.removeItem('token'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login page
            } else {
                // Log other API errors
                console.error(`[API] Error (${status}):`, data?.message || error.message);
            }
        } else if (error.request) {
            // Log errors where no response was received
            console.error('[API] No response received:', error.request);
        } else {
            // Log errors during the request setup
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

// Utility function to dynamically update the base URL (optional, for flexibility)
export const updateBaseURL = (newBaseURL) => {
    api.defaults.baseURL = newBaseURL;
};

export default api;
