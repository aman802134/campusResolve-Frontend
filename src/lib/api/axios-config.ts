import axios from "axios";
import { performLogout, triggerLoginPopup } from "../context/auth-utils";

// Type definitions for Axios v1.11.0
type AxiosRequestConfig = any;
type AxiosError = any;
type AxiosResponse = any;

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies (important)
};

export const axiosInstance = axios.create(API_CONFIG);

// Request Interceptor - No need to manually add Authorization header since cookies are sent automatically
axiosInstance.interceptors.request.use(
  (config) => {
    // Cookies are automatically sent with withCredentials: true
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If it's a 401 error and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // For now, just retry the request once
      // Your backend should handle token validation using the httpOnly cookies
      // If the refreshToken is valid, it should set a new accessToken cookie
      return axiosInstance(originalRequest);
    }

    // If it's still 401 after retry, or any other error, handle logout
    if (error.response?.status === 401) {
      performLogout();
      triggerLoginPopup();
    }

    return Promise.reject(error);
  }
);
