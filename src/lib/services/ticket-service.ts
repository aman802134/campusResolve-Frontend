import { ApiClient } from "../api/api-client";
import { CreateTicketPayload, UpdateTicketPayload } from "@/types/ticket.types";

export const ticketService = {
  // Create a new ticket
  createTicket: (ticketData: CreateTicketPayload) => {
    const formData = new FormData();
    
    // Add ticket data
    formData.append('title', ticketData.title);
    formData.append('description', ticketData.description);
    formData.append('campus', ticketData.campus);
    formData.append('department', ticketData.department);
    
    if (ticketData.domain) {
      formData.append('domain', ticketData.domain);
    }
    if (ticketData.priority) {
      formData.append('priority', ticketData.priority);
    }
    if (ticketData.isSensitive !== undefined) {
      formData.append('isSensitive', ticketData.isSensitive.toString());
    }
    if (ticketData.attachments) {
      ticketData.attachments.forEach(attachment => {
        formData.append('attachments', attachment);
      });
    }
    
    return ApiClient.post("/tickets/create-ticket", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get all tickets for a specific user
  getUserTickets: (userId: string) => ApiClient.get(`/tickets/all/${userId}`),

  // Get a specific ticket by ID
  getTicketById: (ticketId: string) => ApiClient.get(`/tickets/${ticketId}`),

  // Update ticket (admin only)
  updateTicket: (ticketId: string, updateData: UpdateTicketPayload) => 
    ApiClient.patch(`/tickets/update/${ticketId}`, updateData),

  // Escalate ticket (admin only)
  escalateTicket: (ticketId: string) => ApiClient.patch(`/tickets/escalate/${ticketId}`),
};
