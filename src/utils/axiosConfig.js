// src/utils/axiosConfig.js
import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // Required for cookies, authorization headers, and cross-origin requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout for requests
  xsrfCookieName: 'csrftoken', // Name of the CSRF token cookie on the backend
  xsrfHeaderName: 'X-CSRFToken' // Name of the CSRF token header for requests
});

// Add a request interceptor to include the access token in the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    // Get the current access token from localStorage
    const token = localStorage.getItem('token');
    // If a token exists and the request is not to the refresh endpoint itself (to avoid infinite loops)
    // and it's not the login/register endpoint (where a token isn't expected yet)
    if (token && !config.url.endsWith('/auth/refresh') && !config.url.endsWith('/auth/login') && !config.url.endsWith('/auth/register')) {
      // Set the Authorization header for protected routes
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh and common errors
apiClient.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;
    
    // If there's no response (e.g., network error)
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject(error);
    }
    
    const { status } = error.response;
    
    // Handle 401 Unauthorized (token expired or invalid)
    // originalRequest._retry prevents infinite loops if refresh also returns 401
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // --- FIX APPLIED HERE ---
          // Send the refresh token in the Authorization header, as expected by Flask-JWT-Extended
          const response = await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/refresh`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` // <--- CORRECT WAY TO SEND REFRESH TOKEN
            },
            withCredentials: true, // Crucial for sending cookies with the refresh request
          });
          
          const { access_token, refresh_token } = response.data;
          if (access_token) {
            localStorage.setItem('token', access_token);
            if (refresh_token) { // Update refresh token if a new one is provided
              localStorage.setItem('refreshToken', refresh_token);
            }
            
            // Update the Authorization header for the original failed request
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            // Retry the original request with the new access token
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // If refresh fails, clear authentication data and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Consider a small delay or a notification before redirecting
        window.location.href = '/login';
        return Promise.reject(refreshError); // Propagate the refresh error
      }
    }
    
    // Handle other common HTTP error statuses
    switch (status) {
      case 403:
        console.error('Forbidden: You do not have permission to access this resource.');
        break;
      case 404:
        console.error('Not Found: The requested resource was not found.');
        break;
      case 500:
        console.error('Server Error: An internal error occurred on the server.');
        break;
      default:
        console.error(`Request Failed: Status ${status}, Message: ${error.response?.data?.message || error.message}`);
    }
    
    // Re-throw the error for component-specific error handling
    return Promise.reject(error);
  }
);

export default apiClient;