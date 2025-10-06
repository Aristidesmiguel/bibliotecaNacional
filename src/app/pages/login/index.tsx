import { Header } from "@/app/components";
import { useAuth } from "@/app/hooks/useAurh";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

export const Login: React.FC = () => {
  const { loginWithEmail, entering, loginWithGoogle } = useAuth();
  // parte para saber o email senha e feedback
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para lidar com o envio do formulário

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginWithEmail(email, senha);
    } catch (error: any) {
      console.error("Erro no login:", error);
      if (error.code === "auth/invalid-email") {
        toast("E-mail inválido.");
      } else if (error.code === "auth/user-not-found") {
        toast("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        toast("Senha incorreta.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    // Implementar login com Google
    try {
      await loginWithGoogle();
      window.location.href = "/catalog"; // Redireciona para a página do catálogo após login
    } catch {
      toast("Erro ao entrar com Google. Tente novamente.");
    }
  };

  return (
    // Aqui são elementos JSX ou seja, elementos HTML dentro do JavaScript
   <main className="h-screen overflow-hidden">
     <Header type="minimal" />
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f9fa",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Cabeçalho */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Biblioteca Nacional
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "14px" }}>
            Entre na sua conta para continuar
          </span>
        </p>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          />

          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="********"
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "15px",
            }}
          />

          {/* Botão principal */}
          <Button
            type="submit"
            disabled={loading}
            isLoading={entering}
            style={{
              background: "#1f2937",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          {/* Botão de login com Google (ainda não funcional) */}
          <button
            onClick={signInWithGoogle}
            type="button"
            style={{
              background: "#fff",
              color: "#444",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google Logo"
              style={{ width: "24px", height: "24px" }}
            />
            Entrar com Google
          </button>
        </form>

        {/* Rodapé */}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Não tem uma conta?{" "}
          <a href="/Sign-in" style={{ color: "#1f2937", fontWeight: "bold" }}>
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
   </main>
  );
};
