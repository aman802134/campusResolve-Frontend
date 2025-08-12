// types/auth.ts
import { USER_ROLES, GENDER, USER_STATUS } from "./enums";
/**
 * Payload for user registration
 */
export interface RegisterType {
  name: string;
  email: string;
  password: string;
  externalId: string; // required: could be studentId, facultyId, etc.
  campus: string; // ObjectId as string
  department?: string; // optional, some roles may not need it
  phone?: string;
  gender?: GENDER;
  avatarUrl?: string;
}
export interface RequestedRoleType {
  requestedRole: USER_ROLES;
  campus: string;
  department?: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface User {
  id: string | unknown;
  name: string;
  email: string;
  role: USER_ROLES;
  externalId: string;
  campus: string;
  department?: string;
  phone?: string;
  gender?: GENDER;
  avatarUrl?: string;
  status: USER_STATUS;
  verified: boolean;
  isBanned: boolean;
  requestedRole?: USER_ROLES;
}
/**
 * Auth response payload sent to frontend
 */
export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}
export type ApiResponse<T> = {
  success?: boolean; // For admin updates
  message: string;
  data: T;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: AuthResponse) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};
