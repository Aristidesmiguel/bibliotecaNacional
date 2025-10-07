import { Header } from "@/app/components";
import { useAuth } from "@/app/hooks/useAurh";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUpWithEmailAndPassword, entering, loginWithGoogle } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as keyof FormData]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.info("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      await signUpWithEmailAndPassword(formData);
      toast("Conta criada com sucesso.");
    } catch {
      toast("Erro inesperado. Tente novamente.");
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
    <main className="h-screen overflow-hidden">
      <Header type="minimal" />
      <div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Card */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px 32px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "4px",
          }}
        >
          Biblioteca Nacional
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: "4px",
          }}
        >
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          Junte-se à nossa comunidade de leitores
        </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                marginBottom: "6px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#111827",
              }}
            >
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            />

            <label
              style={{
                marginBottom: "6px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#111827",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            />

            <label
              style={{
                marginBottom: "6px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#111827",
              }}
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            />

            <label
              style={{
                marginBottom: "6px",
                fontWeight: 500,
                fontSize: "14px",
                color: "#111827",
              }}
            >
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            />

            {/* Botão Criar conta (cor igual à página de login) */}
            <Button
              type="submit"
              disabled={loading}
              isLoading={entering}
              style={{
                backgroundColor: "#1f2937", // vermelho (igual login)
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          {/* Botão Google */}
          <div style={{ marginTop: "18px" }}>
            <button
              onClick={signInWithGoogle}
              type="button"
              style={{
                background: "#fff",
                color: "#444",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google Logo"
                style={{ width: "28px", height: "28px" }}
              />
              Entrar com Google
            </button>
          </div>

          {/* Link para login */}
          <p
            style={{
              marginTop: "18px",
              textAlign: "center",
              fontSize: "14px",
              color: "#1f2937",
            }}
          >
            Já tem uma conta?{" "}
            <a href="/login" style={{ color: "#1f2937", fontWeight: 600 }}>
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
    </main>
  );
};
