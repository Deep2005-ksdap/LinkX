import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import type { AuthContextType, User } from "../types/auth";
import type { ReactNode } from "react"; 
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setUser(res.data.user);
        return { success: true, message: res.data.message };
      } else {
        return {
          success: false,
          message: "Login failed",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ❌ DO NOT export context directly
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
