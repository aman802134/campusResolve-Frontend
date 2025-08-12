import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function RoleRequestHistory() {
  const roleRequestHistory = [
    {
      id: "REQ-001",
      requestedRole: "Department Admin",
      department: "Computer Science",
      campus: "Main Campus",
      status: "APPROVED",
      requestDate: "2024-01-10",
      processedDate: "2024-01-12",
    },
    {
      id: "REQ-002",
      requestedRole: "Campus Admin",
      department: "",
      campus: "North Campus",
      status: "PENDING",
      requestDate: "2024-01-14",
      processedDate: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      APPROVED: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
      PENDING: "bg-amber-100 text-amber-700 hover:bg-amber-100",
      REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
    };

    return (
      <Badge
        className={variants[status as keyof typeof variants] || "bg-slate-200"}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 w-full">
      <h3 className="text-lg font-semibold text-slate-800">Request History</h3>

      <div className="space-y-4">
        {roleRequestHistory.map((request) => (
          <Card
            key={request.id}
            className="p-4 border border-slate-200 w-full overflow-x-auto"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 gap-3">
              <div className="min-w-0">
                <h4 className="font-medium text-slate-800 break-words">
                  {request.requestedRole}
                </h4>
                <p className="text-sm text-slate-600 break-words">
                  {request.department ? `${request.department} • ` : ""}
                  {request.campus}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {getStatusIcon(request.status)}
                {getStatusBadge(request.status)}
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p className="break-words">Request ID: {request.id}</p>
              <p>Submitted: {request.requestDate}</p>
              {request.processedDate && (
                <p>Processed: {request.processedDate}</p>
              )}
            </div>
          </Card>
        ))}

        {roleRequestHistory.length === 0 && (
          <Card className="p-6 text-center border-dashed border-2 border-slate-200">
            <div className="text-slate-400">
              <AlertCircle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No role requests found</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
