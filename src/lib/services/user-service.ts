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

  login: (credentials: LoginType): Promise<ApiResponse<AuthResponse>> =>
    ApiClient.post("/auth/login", credentials),
  refresh: (): Promise<ApiResponse<AuthResponse>> =>
    ApiClient.post("/auth/refreshToken"),
  me: (): Promise<ApiResponse<User>> => ApiClient.get("/auth/me"),
  logout: () => ApiClient.post("/auth/logout"),

  // User management endpoints
  getUsers: (): Promise<ApiResponse<User>> => ApiClient.get("/auth/get-users"),
  getUserById: (userId: string): Promise<ApiResponse<User>> =>
    ApiClient.get(`/auth/get-user/${userId}`),

  // Role management
  requestRole: (roleData: RequestedRoleType) =>
    ApiClient.patch("/auth/request-role", roleData),
};
