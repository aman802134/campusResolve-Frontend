import { z } from "zod";
import { PRIORITY, TICKET_STATUS } from "../types/enums";

export const ISSUE_PRIORITY = z.enum(PRIORITY);

export const createTicketSchema = z.object({
  title: z.string({ message: "Title is required" }).trim().min(1),
  description: z.string({ message: "Description is required" }).min(1),

  department: z.string({ message: "Department is required" }).min(1),
  campus: z.string({ message: "Campus is required" }).min(1),
  domain: z.string().min(1).optional(),

  // priority is optional, defaults to 'low' server-side
  priority: ISSUE_PRIORITY.optional(),

  isSensitive: z.string().optional(),
  attachments: z.array(z.instanceof(File).optional()),

  escalated: z.boolean().optional(),
  escalationLevel: z.number().int().min(0).max(4).optional(),

  // ⛔️ Fields NOT allowed in user-submitted payloads:
  // assignedTo, createdBy, status will be handled by backend
});

/**
 * Schema for updating ticket status (admin or dept admin side)
 */
export const updateTicketStatusSchema = z.object({
  status: z.enum([
    TICKET_STATUS.Assigned,
    TICKET_STATUS.In_progress,
    TICKET_STATUS.Resolved,
    TICKET_STATUS.Rejected,
    TICKET_STATUS.Escalated,
  ]),

  assignedToId: z.string().optional(), // Only used if status is being set to 'Assigned'
});
