import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../pages/Login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) { 
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("E-mail ou senha incorretos.");
      } else if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    }
  } 

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-mark">MWW</span>
          <span className="login-logo-sub">CAR</span>
        </div>

        <div className="login-divider" />

        <h1 className="login-title">ACESSO RESTRITO</h1>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="usuario">
            USUÁRIO
          </label>
          <input
            id="usuario"
            className="login-input"
            type="email"
            placeholder="usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="senha">
            SENHA
          </label>
          <input
            id="senha"
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">
            ENTRAR
          </button>
        </form>

      </div>

      <a className="login-back" href="/">
        ← Voltar ao site
      </a>
    </div>
  )  
}
