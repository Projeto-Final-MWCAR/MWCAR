import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Admin() {
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

      <nav>
        <a href="/admin/add-car">Adicionar Carro</a>
      </nav>

      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
