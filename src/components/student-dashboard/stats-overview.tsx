import { FileText } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function StatsOverview() {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Tickets
              </p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Resolved</p>
              <p className="text-2xl font-bold text-slate-800">8</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              67%
            </Badge>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
              25%
            </Badge>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-rose-50 to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Escalated</p>
              <p className="text-2xl font-bold text-slate-800">1</p>
            </div>
            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100">
              8%
            </Badge>
          </div>
        </Card>
      </div>
    </>
  );
}
