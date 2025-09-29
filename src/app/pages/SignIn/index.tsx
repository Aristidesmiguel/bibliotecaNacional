import React, { useState } from "react";

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

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as keyof FormData]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErro("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Conta criada com sucesso!");
      console.log("Formulário enviado:", formData);
    } catch {
      setErro("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Cabeçalho fora do card */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "4px",
          }}
        >
          Meridian Library
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
          Criar conta
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

        {/* Card */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px 32px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Título e subtítulo alinhados à esquerda dentro do card */} 
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1f2937",
              marginBottom: "4px",
              textAlign: "left",
            }}
          >
            Cadastro
          </h3>
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            Preencha os dados abaixo para criar sua conta
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#111827" }}>
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

            <label style={{ marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#111827" }}>
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

            <label style={{ marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#111827" }}>
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

            <label style={{ marginBottom: "6px", fontWeight: 500, fontSize: "14px", color: "#111827" }}>
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

            {erro && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#374151",
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
            </button>
          </form>

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
  );
};
