import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Login() {
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
    <form onSubmit={handleSubmit}>
      <h1>Login Admin</h1>
      {error && <p role="alert">{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
