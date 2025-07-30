import axios from "axios";
import { axiosInstance } from "./axios-config";

// Type definitions for Axios v1.11.0
type AxiosRequestConfig = any;
type AxiosError = any;
type AxiosResponse = any;

const handleAuthFailure = (error: any) => {
  // Handle auth failure - you can implement this based on your needs
  console.error("Authentication failed:", error);
};

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export class ApiError<T = any> extends Error {
  status: number;
  errors: T;
  originalError: AxiosError | null;
  response: AxiosResponse | undefined;

  constructor(
    status: number,
    message: string,
    errors: T,
    originalError: AxiosError | null = null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.originalError = originalError;
    this.response = originalError?.response;
  }
}

export class ApiClient {
  static async request<T>(
    method: AxiosRequestConfig["method"],
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
        ...config,
      });

      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (error: any) {
      if (error.response) {
        if (error.response?.status === 401) {
          handleAuthFailure(error); // Custom auth handler (popup/logout)
        }

        throw new ApiError(
          error.response?.status || 500,
          error.response?.data?.message || "Request failed",
          error.response?.data?.errors || error.response?.data,
          error
        );
      }

      throw error;
    }
  }

  static get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("GET", url, undefined, config);
  }

  static post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("POST", url, data, config);
  }

  static put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("PUT", url, data, config);
  }

  static patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("PATCH", url, data, config);
  }

  static delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("DELETE", url, undefined, config);
  }
}
