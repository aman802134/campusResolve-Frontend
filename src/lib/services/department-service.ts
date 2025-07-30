import { ApiClient } from "../api/api-client";
import { CreateDepartmentPayload, UpdateDepartmentPayload } from "@/types/department.types";

export const departmentService = {
  // Create a new department (Super Admin only)
  createDepartment: (departmentData: CreateDepartmentPayload) => 
    ApiClient.post("/departments/create-department", departmentData),

  // Get all departments
  getDepartments: () => ApiClient.get("/departments/get-departments"),

  // Update department domain (Super Admin or Campus Admin only)
  updateDomain: (departmentId: string, domainData: { domain: string[] }) => 
    ApiClient.patch(`/departments/${departmentId}/domain`, domainData),
};
