import { RegisterType, LoginType } from "@/types/auth.payload";
import { ApiClient } from "../api/api-client";

export const userService = {
  // Authentication endpoints
  register: (userData: RegisterType) => ApiClient.post("/auth/register", userData),
  login: (credentials: LoginType) => ApiClient.post("/auth/login", credentials),
  logout: () => ApiClient.post("/auth/logout"),
  
  // User management endpoints
  getUsers: () => ApiClient.get("/auth/get-users"),
  getUserById: (userId: string) => ApiClient.get(`/auth/get-user/${userId}`),
  
  // Role management
  requestRole: (roleData: any) => ApiClient.patch("/auth/request-role", roleData),
};