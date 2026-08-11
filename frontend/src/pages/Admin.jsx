import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import "./Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const STATUS_LABELS = {
  disponivel: "DISPONÍVEL",
  reservado: "RESERVADO",
};

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/cars`);
      if (!response.ok) throw new Error("Falha ao buscar veículos");
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      setError("Não foi possível carregar os veículos. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(vehicle) {
    setVehicleToDelete(vehicle);
  }

  function closeDeleteModal() {
    setVehicleToDelete(null);
  }

  async function confirmDelete() {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`${API_URL}/api/cars/${vehicleToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) throw new Error("Falha ao excluir veículo");

      setVehicles((prevVehicles) =>
        prevVehicles.filter((v) => v.id !== vehicleToDelete.id)
      );
    } catch (err) {
      setError("Não foi possível excluir o veículo. Tente novamente.");
    } finally {
      setVehicleToDelete(null);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  function handleAddCar() {
    navigate("/admin/cadastrar-carro");
  }

  function handleEditarCarro(vehicle) {
    navigate(`/admin/editar-carro/${vehicle.id}`);
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
            <img className="admin-brand-logo" src="/logo.png" alt="MWW Logo" />
          <span className="admin-brand-label">PAINEL ADMIN</span>
        </div>

        <nav className="admin-nav">
          <button className="admin-nav-item admin-nav-item-active">
            Veículos
          </button>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          ← Sair
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-title">VEÍCULOS</h1>
            <p className="admin-subtitle">
              {loading ? "Carregando..." : `${vehicles.length} veículos cadastrados`}
            </p>
          </div>
          <button className="admin-add-button" onClick={handleAddCar}>
            + ADICIONAR CARRO
          </button>
        </header>

        {error && !loading && (
          <div className="admin-error-box" role="alert">
            <span>{error}</span>
            <button onClick={fetchVehicles} className="admin-retry-button">
              Tentar novamente
            </button>
          </div>
        )}

        {loading && (
          <div className="admin-spinner-box">
            <div className="admin-spinner" />
            <span>Carregando veículos...</span>
          </div>
        )}

        {!loading && !error && vehicles.length === 0 && (
          <div className="admin-empty-box">Nenhum veículo cadastrado ainda.</div>
        )}

        {!loading && !error && vehicles.length > 0 &&  (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>VEÍCULO</th>
                <th>MARCA</th>
                <th>ANO</th>
                <th>PREÇO</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="admin-vehicle-cell">
                      {vehicle.images?.[0] ? (
                        <img className="admin-vehicle-thumb" src={vehicle.images[0]} alt={vehicle.modelo} />
                      ) : (
                        <div className="admin-vehicle-thumb" />
                      )}
                      <span>{vehicle.modelo}</span>
                    </div>
                  </td>
                  <td className="admin-cell-muted">{vehicle.marca}</td>
                  <td className="admin-cell-muted">{vehicle.ano}</td>
                  <td className="admin-cell-strong">{formatPrice(vehicle.preco)}</td>
                  <td>
                    <span className={`admin-status admin-status-${vehicle.status}`}>
                      {STATUS_LABELS[vehicle.status]}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-edit" onClick={() => handleEditarCarro(vehicle)}>
                        Editar
                      </button>
                      <button className="admin-btn-delete" onClick={() => openDeleteModal(vehicle)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </main>

      {vehicleToDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">!</div>
            <h2 className="modal-title">EXCLUIR VEÍCULO</h2>
            <p className="modal-text">
              Tem certeza que deseja excluir{" "}
              <strong>{vehicleToDelete.modelo}</strong>? Esta ação não pode ser
              desfeita.
            </p>
            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={closeDeleteModal}>
                Cancelar
              </button>
              <button className="modal-btn-confirm" onClick={confirmDelete}>
                EXCLUIR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
