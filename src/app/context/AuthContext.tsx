import type { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  entering: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (user: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
