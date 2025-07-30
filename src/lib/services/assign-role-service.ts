// services/adminService.ts

import { ApiClient } from "../api/api-client";
import type {
  RoleUpdateResponse,
  PendingRoleRequestsResponse
} from "@/types/admin.types";

export const adminService = {
  // Assign requested role to a user
  assignRequestedRole: (userId: string) =>
    ApiClient.patch<RoleUpdateResponse>(`/users/assign-role/${userId}`),

  // Reject a user's requested role
  rejectRequestedRole: (userId: string) =>
    ApiClient.patch<RoleUpdateResponse>(`/users/reject-role/${userId}`),

  // Get all users who requested a role change and are pending
  getPendingRoleRequests: () =>
    ApiClient.get<PendingRoleRequestsResponse>(`/users/pending-role-requests`),
};
