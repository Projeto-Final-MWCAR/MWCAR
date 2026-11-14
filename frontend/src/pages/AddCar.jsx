import { useNavigate } from "react-router-dom";
import CarForm from "../components/CarForm";
import "./AddCar.css";

export default function AddCar() {
  const navigate = useNavigate();

  function handleCancel() {
    navigate("/admin");
  }

  return (
    <div className="addcar-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img className="admin-brand-logo" src="/logo.png" alt="MWW Logo" />
          <span className="admin-brand-label">PAINEL ADMIN</span>
        </div>

        <nav className="admin-nav">
          <button
            type="button"
            className="admin-nav-item"
            onClick={() => navigate("/admin")}
          >
            Veículos
          </button>
        </nav>

        <button type="button" className="admin-logout" onClick={handleCancel}>
          ← Sair
        </button>
      </aside>

      <main className="addcar-main">
        <button type="button" className="addcar-back" onClick={handleCancel}>
          ← Voltar para veículos
        </button>

        <h1 className="addcar-title">ADICIONAR VEÍCULO</h1>

        <CarForm />
      </main>
    </div>
  );
}