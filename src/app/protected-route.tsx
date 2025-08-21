"use client";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

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

  useEffect(() => {
    if (loading) return; // ✅ Wait until loading completes
    if (!user) {
      router.replace("/login");
    } else if (!allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [loading, user, allowedRoles, router]);

  // ✅ While loading OR user is not yet fetched, show loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ Prevent flashing unauthorized content
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
