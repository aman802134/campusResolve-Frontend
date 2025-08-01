import {
  // RegisterType,
  LoginType,
  RequestedRoleType,
  User,
} from "@/types/auth.payload";
import { ApiClient } from "../api/api-client";
import { ApiResponse } from "@/types/ticket.types";

export const userService = {
  // Authentication endpoints
  register: async (userData: FormData): Promise<ApiResponse<User>> =>
    ApiClient.post("/auth/register", userData),

  login: (credentials: LoginType) => ApiClient.post("/auth/login", credentials),
  logout: () => ApiClient.post("/auth/logout"),

  // User management endpoints
  getUsers: () => ApiClient.get("/auth/get-users"),
  getUserById: (userId: string) => ApiClient.get(`/auth/get-user/${userId}`),

  // Role management
  requestRole: (roleData: RequestedRoleType) =>
    ApiClient.patch("/auth/request-role", roleData),
};
