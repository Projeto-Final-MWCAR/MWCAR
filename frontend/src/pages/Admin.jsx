import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div>
      <h1>Painel Admin</h1>
      <p>Logado como: {user?.email}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
