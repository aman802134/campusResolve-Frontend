// src/lib/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user-service";
import { ticketService } from "../services/ticket-service";
import {
  TicketResponse,
  UpdateTicketArgs,
  UpdateTicketPayload,
} from "@/types/ticket.types";
import { departmentService } from "../services/department-service";
import { updateDomainPayload } from "@/types/department.types";
import { campusService } from "../services/campus-service";
import { CreateCampusPayload } from "@/types/campus.types";
import { User, ApiResponse } from "@/types/auth.payload";

export const queryKeys = {
  users: {
    list: () => ["users", "list"],
    detail: (id: string) => ["users", "detail", id],
    me: () => ["me", "detail"],
  },
  tickets: {
    list: () => ["tickets", "list"],
    detail: (id: string) => ["tickets", "detail", id],
  },
  department: {
    list: () => ["departments", "list"],
    detail: (id: string) => ["department", "detail", id],
  },
  campus: {
    list: () => ["campuses", "list"],
    detail: (id: string) => ["campus", "detail", id],
  },
};
// --- Custom hooks for user-related queries and mutations ---
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () => userService.getUsers(),
  });
};
export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, Error, FormData>({
    mutationFn: userService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
    onError: (error) => {
      console.error("Failed to create user:", error.message);
    },
  });
};
export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
  });
};
export const useRefresh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.refresh,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
  });
};
export const useMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.me,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
  });
};
export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
    },
  });
};
export const useRequestRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.requestRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });
    },
  });
};
// --- Custom hooks for user-related queries and mutations ---
// --- Custome hooks for ticket-related queries and mutations ---
export const useTickets = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.list(),
    queryFn: () => ticketService.getUserTickets(userId),
    enabled: !!userId,
  });
};
export const useTicket = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(ticketId),
    queryFn: () => ticketService.getTicketById(ticketId),
    enabled: !!ticketId,
  });
};
export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.list() });
    },
  });
};
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<UpdateTicketPayload>, Error, UpdateTicketArgs>(
    {
      mutationFn: ({ ticketId, updateData }) =>
        ticketService.updateTicket(ticketId, updateData),
      onSuccess: () => {
        // Invalidate list of tickets so it gets refetched
        queryClient.invalidateQueries({ queryKey: queryKeys.tickets.list() });
      },
      onError: (error) => {
        console.error("Failed to update ticket:", error.message);
      },
    }
  );
};
export const useEscalateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketService.escalateTicket,
    onSuccess: () => {
      // Invalidate list of tickets so it gets refetched
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.list() });
    },
    onError: (error) => {
      console.error("Failed to escalate ticket:", error.message);
    },
  });
};
// --- Custome hooks for ticket-related queries and mutations ---
// --- Custom hooks for Depart management ---
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentService.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.department.list() });
    },
  });
};
export const useDepartments = () => {
  return useQuery({
    queryKey: queryKeys.department.list(),
    queryFn: departmentService.getDepartments,
  });
};

export const useDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: queryKeys.department.detail(departmentId),
    queryFn: () => departmentService.getDepartmentById(departmentId),
    enabled: !!departmentId,
  });
};
export const useUpdateDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ departmentId, domain }: updateDomainPayload) =>
      departmentService.updateDomain(departmentId, domain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.department.list() });
    },
  });
};
// --- Custom hooks for Depart management ---
// --- Custom hooks for Campus management ---
export const useCreateCampus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: campusService.createCampus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campus.list() });
    },
  });
};
export const useCampuses = () => {
  return useQuery({
    queryKey: queryKeys.campus.list(),
    queryFn: campusService.getAllCampuses,
  });
};

export const useCampus = (campusId: string) => {
  return useQuery({
    queryKey: queryKeys.campus.detail(campusId),
    queryFn: () => campusService.getCampusById(campusId),
    enabled: !!campusId,
  });
};
export const useUpdateCampus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      campusId,
      campusData,
    }: {
      campusId: string;
      campusData: CreateCampusPayload;
    }) => campusService.updateCampus(campusId, campusData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.campus.list() });
    },
  });
};
// --- Custom hooks for Campus management ---
