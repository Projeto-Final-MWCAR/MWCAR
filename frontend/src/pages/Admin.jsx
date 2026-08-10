import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import "./Admin.css";

const MOCK_VEHICLES = [
  { id: 1, name: "BMW Série 3 330i", brand: "BMW", year: 2023, price: 289900, status: "reservado", image: "" },
  { id: 2, name: "Mercedes-Benz C 200", brand: "Mercedes-Benz", year: 2022, price: 315000, status: "disponivel", image: "" },
  { id: 3, name: "Audi A4 Prestige Plus", brand: "Audi", year: 2023, price: 295000, status: "reservado", image: "" },
  { id: 4, name: "Volkswagen Tiguan R-Line", brand: "Volkswagen", year: 2023, price: 198900, status: "disponivel", image: "" },
  { id: 5, name: "Land Rover Defender 110", brand: "Land Rover", year: 2022, price: 520000, status: "disponivel", image: "" },
  { id: 6, name: "Hyundai Ioniq 5 Limited", brand: "Hyundai", year: 2024, price: 239900, status: "disponivel", image: "" },
];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const STATUS_LABELS = {
  disponivel: "DISPONÍVEL",
  reservado: "RESERVADO",
};

export function Admin() {
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
      // Codigo provisório, depois trocar quando conectar com a API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setVehicles(MOCK_VEHICLES);

      //  // Quando a API estiver pronta, troque o bloco acima por:
      // const response = await fetch("/api/veiculos");
      // if (!response.ok) throw new Error("Falha ao buscar veículos");
      // const data = await response.json();
      // setVehicles(data);
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

  function confirmDelete() {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((v) => v.id !== vehicleToDelete.id)
    );
    setVehicleToDelete(null);
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
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
          <a className="admin-nav-item" href="/admin/add-car">
            Adicionar Carro
          </a>
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
          <button
            type="button"
            className="admin-add-button"
            onClick={() => navigate("/admin/add-car")}
          >
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
                      <div className="admin-vehicle-thumb" />
                      <span>{vehicle.name}</span>
                    </div>
                  </td>
                  <td className="admin-cell-muted">{vehicle.brand}</td>
                  <td className="admin-cell-muted">{vehicle.year}</td>
                  <td className="admin-cell-strong">{formatPrice(vehicle.price)}</td>
                  <td>
                    <span className={`admin-status admin-status-${vehicle.status}`}>
                      {STATUS_LABELS[vehicle.status]}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn-edit">Editar</button>
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
              <strong>{vehicleToDelete.name}</strong>? Esta ação não pode ser
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
