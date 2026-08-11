import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../pages/Login.css";
import logo from "/logo.png";

const ERROR_MESSAGES = {
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/user-disabled": "Este usuário foi desativado.",
  "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
  "auth/network-request-failed": "Falha de conexão. Verifique sua internet.",
};

function getErrorMessage(code) {
  return ERROR_MESSAGES[code] || "Erro ao fazer login. Tente novamente.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldError(false);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(getErrorMessage(err.code));
      setFieldError(true);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (fieldError) setFieldError(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (fieldError) setFieldError(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* <div className="login-logo">
          <span className="login-logo-mark">MWW</span>
          <span className="login-logo-sub">CAR</span>
        </div> */}

        <img className="login-logo" src={logo} alt="MWCAR" />

        <div className="login-divider" />

        <h1 className="login-title">ACESSO RESTRITO</h1>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">
            E-MAIL
          </label>
          <input
            id="email"
            className="login-input"
            type="email"
            placeholder="E-MAIL"
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
  );
}
