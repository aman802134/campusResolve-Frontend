import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "./axios-config";

// --- General API response structure ---
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// --- Error shape from backend ---
interface ServerErrorResponse {
  message?: string;
  errors?: unknown;
}

// --- Custom Error class ---
export class ApiError<T = unknown> extends Error {
  status: number;
  errors: T;
  originalError: AxiosError<ServerErrorResponse> | null;
  response: AxiosResponse | undefined;

  constructor(
    status: number,
    message: string,
    errors: T,
    originalError: AxiosError<ServerErrorResponse> | null = null
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.originalError = originalError;
    this.response = originalError?.response;
  }
}

// --- Auth error handler ---
const handleAuthFailure = (error: AxiosError<ServerErrorResponse>) => {
  console.error("Authentication failed:", error);
};

export class ApiClient {
  static async request<T>(
    method: AxiosRequestConfig["method"],
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      let response: AxiosResponse<T>;

      // If data is FormData, use a different axios instance without default headers
      if (data instanceof FormData) {
        // Create a temporary axios instance without default headers for FormData
        const tempAxios = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
          timeout: 30000,
          withCredentials: true,
          // Don't set default Content-Type for FormData
        });
        
        response = await tempAxios.request<T>({
          method,
          url,
          data,
          ...config,
        });
      } else {
        // Use the regular axios instance for JSON requests
        response = await axiosInstance.request<T>({
          method,
          url,
          data,
          ...config,
        });
      }

      return {
        data: response.data,
        status: response.status,
        message: response.statusText,
      };
    } catch (err: unknown) {
      if (axios.isAxiosError<ServerErrorResponse>(err)) {
        const errorData = err.response?.data;

        if (err.response?.status === 401) {
          handleAuthFailure(err);
        }

        throw new ApiError(
          err.response?.status || 500,
          errorData?.message || "Request failed",
          errorData?.errors || errorData,
          err
        );
      }
      throw err;
    }
  }

  static get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("GET", url, undefined, config);
  }

  static post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>("POST", url, data, config);
  }

  static put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>("PUT", url, data, config);
  }

  static patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>("PATCH", url, data, config);
  }

  static delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("DELETE", url, undefined, config);
  }
}
