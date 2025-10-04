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

  const loginWithEmail = async (
    email: string,
    password: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        setEntering(true);
        signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
            const docRef = doc(db, "users", user?.uid ?? "");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const userData = docSnap.data();
              localStorage.setItem("displayName", userData.displayName);
              if (location.hostname === "localhost") {
                location.href = "http://localhost:5173/perfil";
              } else {
                console.log("aconteceu um erro");
                location.href = `http://localhost:5173/`;
              }
              resolve();
            } else {
              console.log("USER: ", user);
              reject();
            }
          })
          .catch(reject)
          .finally(() => setEntering(false));
      } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
        reject(error);
      }
    });
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
      alert("Método de autenticação desativado no Firebase Console!");
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
    window.location.href = `${window.location.origin}/perfil`;
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
