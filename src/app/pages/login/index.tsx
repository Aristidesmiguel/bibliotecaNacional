import React, { useState } from "react";

export const Login: React.FC = () => {
  // parte para saber o email senha e feedback
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // função de submissão de formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      // chamada da api substituir pela biblioteca
      const response = await fetch("http://api.bibliotecanacional.gov/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("token", data.token);
        // mudar depois rota
        window.location.href = "/profile";
      } else {
        setErro("Erro de conexão com o servidor");
      }
    } catch (error) {
      setErro("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Aqui são elementos JSX ou seja, elementos HTML dentro do JavaScript
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
          Bem-vindo de volta <br />
          <span style={{ fontSize: "14px" }}>
            Entre na sua conta para continuar
          </span>
        </p>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Email</label>
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

          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Senha</label>
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

          {/* Mensagem de erro */}
          {erro && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              {erro}
            </p>
          )}

          {/* Botão principal */}
          <button
            type="submit"
            disabled={loading}
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
          </button>

          {/* Botão de login com Google (ainda não funcional) */}
          <button
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
  );
};
