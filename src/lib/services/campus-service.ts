import { ApiClient } from "../api/api-client";
import { CreateCampusPayload, UpdateCampusPayload } from "@/types/campus.types";

export const campusService = {
  // Create a new campus (Super Admin only)
  createCampus: (campusData: CreateCampusPayload) => 
    ApiClient.post("/campus/create-campus", campusData),

  // Get all campuses
  getAllCampuses: () => ApiClient.get("/campus/all-campus"),

  // Update campus (Super Admin or Campus Admin only)
  updateCampus: (campusId: string, campusData: UpdateCampusPayload) => 
    ApiClient.patch(`/campus/update-campus/${campusId}`, campusData),
};
