import { performLogout } from "../context/auth-utils";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { userService } from "../services/user-service";

export const API_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
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
export const AxiosResponseInterceptor = (fetchUser: () => Promise<void>) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };
      try {
        // If it's a 401 error and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          // For now, just retry the request once
          // Your backend should handle token validation using the httpOnly cookies
          // If the refreshToken is valid, it should set a new accessToken cookie
          await userService.refresh();
          if (!originalRequest.url?.includes("/me")) {
            await fetchUser();
          }
          return axiosInstance(originalRequest);
        }
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        // If it's still 401 after retry, or any other error, handle logout
        if (axiosErr.response?.status === 401) {
          performLogout();
          // triggerLoginPopup();
          window.location.href = "/auth/login";
        }
        return Promise.reject(axiosErr);
      }

      return Promise.reject(error);
    }
  );
};
