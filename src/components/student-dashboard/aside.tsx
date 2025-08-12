import { Grid, LogOut, Pen, Settings, UserPlus } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa";

import { DashboardActionButtons } from "../dashboard-action-btns";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Aside() {
  const topSectionBtn = [
    { label: "Overview", href: "/user", icon: Grid },
    { label: "Submit Complaint", href: "/user/new-complain", icon: Pen },
    { label: "Request Role", href: "/user/request-role", icon: UserPlus },
  ];
  const bottomSectionBtn = [
    { label: "Setting", href: "/user/setting", icon: Settings },
    { label: "Logout", href: "/auth/logout", icon: LogOut },
  ];

  return (
    <>
      <aside className="flex flex-col gap-5 justify-start items-start h-screen max-h-screen overflow-x-hidden shadow-sm w-20 md:w-72 md:max-w-72">
        {/* Header / Brand */}
        <div className="mb-6 px-3 bg-accent w-full p-3 shadow-sm rounded-t-md">
          <Link href="/user" className="flex items-center gap-3">
            <Button
              title="CampusResolve"
              variant="secondary"
              className="rounded-md cursor-pointer shadow-sm md:shadow-none gradient"
            >
              <span className="rounded-lg text-white">
                <FaGraduationCap className="text-2xl" />
              </span>
            </Button>

            <span className="font-serif hidden md:block">
              <h1 className="text-xl font-bold ">CampusResolve</h1>
            </span>
          </Link>
        </div>
        {/* Action Buttons */}
        <div className="w-full h-full flex flex-col justify-between items-start pb-5">
          <div className="flex flex-col gap-2 px-3 md:px-5">
            <DashboardActionButtons actions={topSectionBtn} />
          </div>
          <div className="flex flex-col gap-2 px-3 md:px-5">
            <DashboardActionButtons actions={bottomSectionBtn} />
          </div>
        </div>
      </aside>
    </>
  );
}
