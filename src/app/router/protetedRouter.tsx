import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAurh";
import type React from "react";

export const ProtetedRouter: React.FC<{ children: React.ReactNode }> = (
  children
) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
