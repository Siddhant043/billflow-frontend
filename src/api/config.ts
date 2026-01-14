import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle common errors here if needed
    if (error.response?.status === 401) {
      // Token expired or invalid - remove token
      localStorage.removeItem("token");
      // Optionally redirect to login
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

// Export env variables
export const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/auth`;
export const USER_API_URL = `${import.meta.env.VITE_API_URL}/users`;
export const CLIENT_API_URL = `${import.meta.env.VITE_API_URL}/clients`;
export const INVOICE_API_URL = `${import.meta.env.VITE_API_URL}/invoices`;

export default api;
