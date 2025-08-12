import RoleRequestForm from "@/components/student-dashboard/role-request-form";
import { Card } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

export default function RequestRole() {
  return (
    <>
      <section>
        <div className="mt-8">
          <Card className="p-6 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Request Role Change
              </h2>
            </div>
            <RoleRequestForm />
          </Card>
        </div>
      </section>
    </>
  );
}
