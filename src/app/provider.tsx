// src/app/providers.tsx
"use client";
import { AxiosResponseInterceptor } from "@/lib/api/axios-config";
import { AuthProvider, useAuth } from "@/lib/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  function AxiosInterceptorSetup() {
    const { fetchUser } = useAuth();
    useEffect(() => {
      AxiosResponseInterceptor(fetchUser);
    }, [fetchUser]);
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosInterceptorSetup />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
// This file sets up the React Query client provider for the application,
// allowing the use of React Query hooks throughout the app.
