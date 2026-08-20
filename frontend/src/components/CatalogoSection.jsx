import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car as CarIcon } from "lucide-react";
import "./CatalogoSection.css";

const API_URL = import.meta.env.VITE_API_URL;

const STATUS_LABELS = {
  disponivel: "DISPONÍVEL",
  reservado: "RESERVADO",
};

const DEFAULT_MAX_PRICE = 600000;

function formatPrice(value) {
  const number = Number(value) || 0;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatPriceShort(value) {
  const number = Number(value) || 0;
  if (number >= 1000) {
    const thousands = number / 1000;
    const rounded = Number.isInteger(thousands) ? thousands : thousands.toFixed(0);
    return `R$ ${rounded}k`;
  }
  return formatPrice(number);
}

function formatKm(value) {
  const number = Number(value) || 0;
  return `${number.toLocaleString("pt-BR")} Km`;
}

export default function CatalogoSection() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [marcaFilter, setMarcaFilter] = useState("todas");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [priceCeiling, setPriceCeiling] = useState(DEFAULT_MAX_PRICE);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/cars`);
      if (!response.ok) throw new Error("Falha ao buscar veículos");
      const data = await response.json();

      const sorted = [...data].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setCars(sorted);

      const highestPrice = sorted.reduce(
        (max, car) => Math.max(max, Number(car.preco) || 0),
        0
      );
      const ceiling = Math.max(DEFAULT_MAX_PRICE, Math.ceil(highestPrice / 50000) * 50000);
      setPriceCeiling(ceiling);
      setMaxPrice(ceiling);
    } catch (err) {
      setError("Não foi possível carregar o catálogo. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const marcas = useMemo(() => {
    const unique = new Set(cars.map((car) => car.marca).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const tipos = useMemo(() => {
    const unique = new Set(cars.map((car) => car.tipoVeiculo).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesMarca = marcaFilter === "todas" || car.marca === marcaFilter;
      const matchesTipo = tipoFilter === "todos" || car.tipoVeiculo === tipoFilter;
      const matchesPrice = (Number(car.preco) || 0) <= maxPrice;
      return matchesMarca && matchesTipo && matchesPrice;
    });
  }, [cars, marcaFilter, tipoFilter, maxPrice]);

  function openDetails(car) {
    navigate(`/carro/${car.id}`);
  }

  return (
    <section id="catalogo" className="catalogo-section">
      <div className="catalogo-container">
        <header className="catalogo-header">
          <div className="catalogo-heading">
            <span className="catalogo-kicker">
              <span className="catalogo-kicker-dash" />
              NOSSA FROTA
            </span>
            <h2 className="catalogo-title">CATÁLOGO</h2>
            <p className="catalogo-subtitle">
              {loading
                ? "Carregando..."
                : `${filteredCars.length} veículo${filteredCars.length === 1 ? "" : "s"} encontrado${filteredCars.length === 1 ? "" : "s"}`}
            </p>
          </div>

          <div className="catalogo-filters">
            <div className="catalogo-filter-field">
              <select
                className="catalogo-select"
                value={marcaFilter}
                onChange={(e) => setMarcaFilter(e.target.value)}
                aria-label="Filtrar por marca"
              >
                <option value="todas">TODAS</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="catalogo-filter-field">
              <select
                className="catalogo-select"
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                aria-label="Filtrar por tipo de veículo"
              >
                <option value="todos">TODOS</option>
                {tipos.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="catalogo-filter-field catalogo-filter-price">
              <span className="catalogo-price-label">ATÉ</span>
              <input
                type="range"
                className="catalogo-range"
                min={0}
                max={priceCeiling}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Preço máximo"
              />
              <span className="catalogo-price-value">{formatPriceShort(maxPrice)}</span>
            </div>
          </div>
        </header>

        {error && !loading && (
          <div className="catalogo-error-box" role="alert">
            <span>{error}</span>
            <button onClick={fetchCars} className="catalogo-retry-button">
              Tentar novamente
            </button>
          </div>
        )}

        {loading && (
          <div className="catalogo-spinner-box">
            <div className="catalogo-spinner" />
            <span>Carregando veículos...</span>
          </div>
        )}

        {!loading && !error && filteredCars.length === 0 && (
          <div className="catalogo-empty-box">
            Nenhum veículo encontrado para os filtros selecionados.
          </div>
        )}

        {!loading && !error && filteredCars.length > 0 && (
          <div className="catalogo-grid">
            {filteredCars.map((car) => (
              <article className="catalogo-card" key={car.id}>
                <div className="catalogo-card-media">
                  {car.images?.[0] ? (
                    <img src={car.images[0]} alt={`${car.marca} ${car.modelo}`} />
                  ) : (
                    <div className="catalogo-card-placeholder">
                      <CarIcon size={40} strokeWidth={1.2} />
                    </div>
                  )}

                  <span className={`catalogo-status catalogo-status-${car.status}`}>
                    {STATUS_LABELS[car.status] || car.status}
                  </span>

                  <button
                    type="button"
                    className="catalogo-card-view"
                    onClick={() => openDetails(car)}
                  >
                    Visualizar
                  </button>
                </div>

                <div className="catalogo-card-body">
                  <span className="catalogo-card-meta">
                    {car.marca?.toUpperCase()} · {car.ano} · {formatKm(car.kilometragem)}
                  </span>
                  <h3 className="catalogo-card-title">
                    {car.marca?.toUpperCase()} {car.modelo?.toUpperCase()}
                  </h3>
                  <p className="catalogo-card-desc">{car.descricao}</p>

                  <div className="catalogo-card-footer">
                    <span className="catalogo-card-price">{formatPrice(car.preco)}</span>
                    <button
                      type="button"
                      className="catalogo-card-btn"
                      onClick={() => openDetails(car)}
                    >
                      VER DETALHES
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}