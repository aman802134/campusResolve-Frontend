import {
  ApiResponse,
  AuthResponse,
  // RegisterType,
  LoginType,
  RequestedRoleType,
  User,
} from "@/types/auth.payload";
import { ApiClient } from "../api/api-client";

export const userService = {
  // Authentication endpoints
  register: async (userData: FormData): Promise<ApiResponse<User>> =>
    ApiClient.post("/auth/register", userData),

  login: async (credentials: LoginType): Promise<AuthResponse> => {
    const res = await ApiClient.post<AuthResponse>("/auth/login", credentials);
    console.log("response getting from the userService", res.data);
    return res.data; // unwrap Axios response
  },

  refresh: async (): Promise<AuthResponse> => {
    const res = await ApiClient.post<AuthResponse>("/auth/refreshToken");
    return res.data; // Direct AuthResponse
  },

  me: async (): Promise<ApiResponse<User>> => {
    const res = await ApiClient.get<ApiResponse<User>>("/auth/me");
    return res.data; // Wrapped response
  },

  logout: () => ApiClient.post("/auth/logout"),

  // User management endpoints
  getUsers: (): Promise<ApiResponse<User>> => ApiClient.get("/auth/get-users"),
  getUserById: (userId: string): Promise<ApiResponse<User>> =>
    ApiClient.get(`/auth/get-user/${userId}`),

  // Role management
  requestRole: (roleData: RequestedRoleType) =>
    ApiClient.patch("/auth/request-role", roleData),
};
