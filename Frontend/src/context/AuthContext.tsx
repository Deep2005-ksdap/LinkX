import { createContext, useContext, useState, useEffect } from "react";
import type {
  AuthContextType,
  registerationDataTypes,
  User,
  validatingErrorType,
} from "../types/auth";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const API = import.meta.env.VITE_BACKEND_API;

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [error, setError] = useState<
    string | Partial<validatingErrorType>[] | null
  >(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        {
          withCredentials: true,
        },
      );

      if (res.data.success === false) {
        setLoading(false);
        setError(res.data.message);
      } else {
        setLoading(false);
        setUser(res.data.user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Login failed");
    }
  };
  const register = async ({
    fullname,
    email,
    password,
  }: registerationDataTypes) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`${API}/auth/register`, {
        fullname,
        email,
        password,
      });
      console.log(res.data);
      if (res.data.success === false) {
        setLoading(false);
        setError(res.data.message);
      } else {
        setLoading(false);
        // Auto-login after registration
        await login(email, password);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API}/auth/logout`,
        { withCredentials: true },
      );
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await axios.get(`${API}/auth/me`, {
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
    error,
    loading,
    setError,
    register,
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
