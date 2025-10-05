import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, db, googleProvider } from "../dataBase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const unsubscrible = onAuthStateChanged(auth, (userCurrent) => {
      setUser(userCurrent);
      setLoading(false);
      setEntering(false);
    });
    return () => unsubscrible();
  });

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      throw error;
    }
  };

const loginWithEmail = async (email: string, password: string): Promise<void> => {
  try {
    setEntering(true);

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // usa o user.uid do resultado da autenticação
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem("displayName", userData.displayName || "");

      // redirecionamento (sem erro)
      window.location.href = `${window.location.origin}/catalog`;
      console.log("USER:", user);
    } else {
      console.warn("Usuário não encontrado no Firestore.");
      throw new Error("Usuário não encontrado no Firestore.");
    }
  } catch (error) {
    console.error("Erro ao fazer login com e-mail:", error);
    throw error;
  } finally {
    setEntering(false);
  }
};


 const signUpWithEmailAndPassword = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    setEntering(true);

    // Cria o usuário no Firebase Auth
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    // Cria o documento do usuário no Firestore
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: userData.name,
      createdAt: new Date(),
    };

    await createUser(newUser);

  } catch (error: any) {
    console.error("Erro ao criar conta:", error.message);
    if (error.code === "auth/operation-not-allowed") {
      toast.info("Método de autenticação desativado no Firebase Console!");
    }
  } finally {
    setEntering(false);
  }
};


 const createUser = async (user: any) => {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);

    localStorage.setItem("displayName", user.displayName);

    // Redireciona de forma dinâmica
    window.location.href = `${window.location.origin}/catalog`;
  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        entering,
        logout,
        loginWithGoogle,
        signUpWithEmailAndPassword,
        loginWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
