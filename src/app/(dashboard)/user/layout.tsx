import { ProtectedRoute } from "@/app/protected-route";
import Aside from "@/components/student-dashboard/aside";
import { USER_ROLES } from "@/types/enums";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function StudentDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProtectedRoute
        allowedRoles={[
          USER_ROLES.STUDENT,
          USER_ROLES.FACULTY_ACADEMIC,
          USER_ROLES.FACULTY_NON_ACADEMIC,
        ]}
      >
        <main className="w-full h-full flex gap-1">
          <Aside />
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex-1`}
          >
            {children}
          </div>
        </main>
      </ProtectedRoute>
    </>
  );
}
