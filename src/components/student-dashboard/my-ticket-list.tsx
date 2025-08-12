import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Clock, AlertTriangle, FileText } from "lucide-react";

const mockTickets = [
  {
    id: "TCK-001",
    title: "Library AC not working",
    status: "IN_PROGRESS",
    priority: "medium",
    department: "Facilities",
    campus: "Main Campus",
    createdAt: "2024-01-15",
    escalated: false,
    escalationLevel: 0,
    isSensitive: false,
  },
  {
    id: "TCK-002",
    title: "Hostel WiFi connectivity issues",
    status: "PENDING",
    priority: "high",
    department: "IT Services",
    campus: "North Campus",
    createdAt: "2024-01-14",
    escalated: true,
    escalationLevel: 1,
    isSensitive: false,
  },
  {
    id: "TCK-003",
    title: "Fee payment portal error",
    status: "RESOLVED",
    priority: "high",
    department: "Accounts",
    campus: "Main Campus",
    createdAt: "2024-01-12",
    escalated: false,
    escalationLevel: 0,
    isSensitive: true,
  },
  {
    id: "TCK-004",
    title: "Canteen food quality complaint",
    status: "REJECTED",
    priority: "low",
    department: "Administration",
    campus: "South Campus",
    createdAt: "2024-01-10",
    escalated: false,
    escalationLevel: 0,
    isSensitive: false,
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    PENDING: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    IN_PROGRESS: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    RESOLVED: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
    ESCALATED: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  };

  return (
    <Badge
      className={variants[status as keyof typeof variants] || variants.PENDING}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    low: "bg-green-100 text-green-700 hover:bg-green-100",
    medium: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    high: "bg-red-100 text-red-700 hover:bg-red-100",
  };

  return (
    <Badge
      className={variants[priority as keyof typeof variants] || variants.low}
    >
      {priority.toUpperCase()}
    </Badge>
  );
};

export const TicketList = () => {
  return (
    <>
      <div className="space-y-4">
        {mockTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="p-4 border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-800 break-words line-clamp-2">
                    {ticket.title}
                  </h3>
                  {ticket.isSensitive && (
                    <div className="flex items-center gap-1 text-xs text-orange-600">
                      <AlertTriangle className="h-3 w-3 shrink-0" />
                      <span>Sensitive</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                  <span>ID: {ticket.id}</span>
                  <span>•</span>
                  <span>{ticket.department}</span>
                  <span>•</span>
                  <span>{ticket.campus}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>{ticket.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {getStatusBadge(ticket.status)}
                  {getPriorityBadge(ticket.priority)}
                  {ticket.escalated && (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      Escalated (Level {ticket.escalationLevel})
                    </Badge>
                  )}
                </div>
              </div>

              <div className="shrink-0 self-start">
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {mockTickets.length === 0 && (
          <Card className="p-8 text-center border-dashed border-2 border-slate-200">
            <div className="text-slate-400">
              <FileText className="h-12 w-12 mx-auto mb-3" />
              <p className="text-lg font-medium mb-1">No tickets found</p>
              <p className="text-sm">
                Submit your first complaint to get started
              </p>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};
