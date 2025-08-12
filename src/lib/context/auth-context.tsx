// context/AuthContext.tsx
import {
  ApiResponse,
  AuthContextType,
  AuthResponse,
  User,
} from "@/types/auth.payload";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { userService } from "../services/user-service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: AuthResponse) => {
    console.log("this is from the authContext -->", userData.user);
    setUser(userData.user);
    setLoading(false);
  };
  const fetchUser: () => Promise<void> = useCallback(async () => {
    console.log("running from the auth context");
    try {
      setLoading(true);
      const res = await userService.me();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // // ✅ Call once on mount to try auto-login
  // useEffect(() => {
  //   fetchUser();
  // }, [fetchUser]);

  const logout = () => {
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        fetchUser,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
