"use client";
import { useAuth } from "@/lib/context/auth-context";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function StudentDashboardHeader() {
  const { user } = useAuth();
  return (
    <>
      <header className="w-full flex justify-end items-center gap-4 h-16 shadow py-3 px-5 sticky top-0 z-50  bg-white/80 backdrop-blur-xs">
        <div className="relative">
          <Bell className="h-5 w-5 text-slate-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full border-[1.3px] border-black cursor-pointer">
            <Image
              src={user?.avatarUrl ?? "not available"}
              alt="profile picture"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-full"
              loading="lazy"
            />
          </div>
          <span className="text-md font-medium text-slate-700 whitespace-nowrap">
            Welcome ,{user?.name}
          </span>
        </div>
      </header>
    </>
  );
}
