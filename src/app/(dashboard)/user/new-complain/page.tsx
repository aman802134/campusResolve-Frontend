import { TicketForm } from "@/components/student-dashboard/ticket-form";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function NewComplain() {
  return (
    <>
      <section className="w-full px-4 md:px-10 py-5 h-screen overflow-x-hidden md:max-h-screen overflow-y-scroll">
        <div className="w-full max-w-xl mx-auto">
          <Card className="p-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Submit Complaint
              </h2>
            </div>
            <TicketForm />
          </Card>
        </div>
      </section>
    </>
  );
}
