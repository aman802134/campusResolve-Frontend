import { ApiResponse } from "@/types/auth.payload";
import { ApiClient } from "../api/api-client";
import {
  // CreateTicketPayload,
  // TicketResponse,
  UpdateTicketPayload,
} from "@/types/ticket.types";

export const ticketService = {
  // Create a new ticket
  createTicket: async (ticketData: FormData) => {
    const res = await ApiClient.post("/ticket/create-ticket", ticketData);
    return res.data;
  },

  // Get all tickets for a specific user
  getUserTickets: (userId: string) => ApiClient.get(`/ticket/all/${userId}`),

  // Get a specific ticket by ID
  getTicketById: (ticketId: string) => ApiClient.get(`/ticket/${ticketId}`),

  // Update ticket (admin only)
  updateTicket: (
    ticketId: string,
    updateData: UpdateTicketPayload
  ): Promise<ApiResponse<UpdateTicketPayload>> =>
    ApiClient.patch(`/ticket/update/${ticketId}`, updateData),

  // Escalate ticket (admin only)
  escalateTicket: (ticketId: string) =>
    ApiClient.patch(`/ticket/escalate/${ticketId}`),
};
