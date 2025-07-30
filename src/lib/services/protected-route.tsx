import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

/**
 * ProtectedRoute component ensures that only authenticated users
 * can access protected routes. If the user is not authenticated,
 * it redirects to the login page.
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Check if user has admin role (you can modify this based on your needs)
  const isAdmin = user?.role === 'campus_admin' || user?.role === 'super_admin' || user?.role === 'department_admin';

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
    // Show error if authenticated but not admin
    else if (!loading && isAuthenticated && !isAdmin) {
      console.error("You must be an admin to access this page");
      router.push('/');
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  // Early return for loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect via useEffect
  }

  return children;
};

export default ProtectedRoute;
