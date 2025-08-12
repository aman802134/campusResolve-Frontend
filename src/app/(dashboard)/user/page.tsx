import { TicketList } from "@/components/student-dashboard/my-ticket-list";
import RoleRequestHistory from "@/components/student-dashboard/role-request-history";
import StatsOverview from "@/components/student-dashboard/stats-overview";
import StudentDashboardHeader from "@/components/student-dashboard/student-dashboard-header";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Student() {
  return (
    <>
      <section className="w-full h-screen flex flex-col overflow-x-hidden md:max-h-screen overflow-y-scroll">
        <StudentDashboardHeader />
        <div className="w-full flex flex-col py-10 px-5 gap-3">
          <h1 className="font-bold font-serif text-xl tracking-wide">
            Your Statistics
          </h1>
          <StatsOverview />
        </div>
        <div className="px-5">
          <Card className="p-6 border-0 shadow bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                My Tickets
              </h2>
            </div>
            <TicketList />
          </Card>
        </div>
        <div className="py-10 px-5">
          <RoleRequestHistory />
        </div>
      </section>
    </>
  );
}
