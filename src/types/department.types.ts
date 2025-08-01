export type CreateDepartmentPayload = {
  name: string;
  campus: string; // Campus._id
  adminId?: string; // User._id of the department_admin
  domain?: string[]; // e.g. ['hostel','kitchen']
};
export type UpdateDepartmentPayload = {
  name?: string;
  campusId?: string;
  adminId?: string;
  domain?: string[]; // optional and replaces the domains array if provided
};
export type updateDomainPayload = {
  departmentId: string;
  domain: { domain: string[] }; // e.g. { domain: ['hostel','kitchen'] }
};
export type DepartmentResponse = {
  id: string;
  name: string;
  campus: { id: string; name: string };
  admin?: { id: string; name: string }; // made optional in case department has no admin yet
  domain: string[];
  createdAt: string;
  updatedAt: string;
};
