"use client";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  console.log("user from protected route -->", user);
  useEffect(() => {
    if (loading) return; // 🚀 Wait until AuthContext finishes

    if (!user) {
      // No user even after loading → logout scenario
      router.replace("/login");
    } else if (!allowedRoles.includes(user.role as string)) {
      router.replace("/unauthorized");
    } else {
      setChecked(true);
    }
  }, [loading, user, allowedRoles, router]);

  if (loading || !checked) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
