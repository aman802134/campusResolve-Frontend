import { ApiClient } from "../api/api-client";
import { CreateDepartmentPayload } from "@/types/department.types";

export const departmentService = {
  // Create a new department (Super Admin only)
  createDepartment: (departmentData: CreateDepartmentPayload) =>
    ApiClient.post("/department/create-department", departmentData),

  // Get all departments
  getDepartments: () => ApiClient.get("/department/get-departments"),
  
  // Get a specific department by ID
  getDepartmentById: (departmentId: string) =>
    ApiClient.get(`/department/get-department/${departmentId}`),
  // Update department domain (Super Admin or Campus Admin only)
  updateDomain: (departmentId: string, domain: { domain: string[] }) =>
    ApiClient.patch(`/department/${departmentId}/domain`, domain),
};
