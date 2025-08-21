// types/admin.types.ts

// import { USER_ROLES } from "./enums";
import { User } from "./auth.payload";

// Response when assigning/rejecting role
export interface RoleUpdateResponse {
  success: boolean;
  message: string;
  updatedUser: User;
}

// List of users with pending roles
export interface PendingRoleRequestsResponse {
  success: boolean;
  users: User[];
}
