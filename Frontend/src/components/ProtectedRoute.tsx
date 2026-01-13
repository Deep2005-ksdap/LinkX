import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: AuthProviderProps) {
  const { user, loading } = useAuthContext();

  if (loading) return null; // or spinner

  if (!user) return <Navigate to="/login" />;

  return children;
}
