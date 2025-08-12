import { GENDER, USER_ROLES } from "@/types/enums";
import { z } from "zod";

// Unified role enum for consistency
export const RoleEnum = z.enum(USER_ROLES);
export type Role = z.infer<typeof RoleEnum>;

export const GenderEnum = z.enum(GENDER);

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  // Removed requestedRole – role is now inferred from verification
  externalId: z.string().min(1, "Verification ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  campus: z.string().min(1, "Campus is required"), // should be an ObjectId string
  department: z.string().optional(), // required conditionally

  phone: z.string().optional(),
  gender: GenderEnum.optional(),
  avatarUrl: z.instanceof(File).optional(), // Accept File objects for upload
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is required"),
});
