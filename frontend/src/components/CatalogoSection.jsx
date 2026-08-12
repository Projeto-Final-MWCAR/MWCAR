import { useEffect, useMemo, useState } from "react";
import { Car as CarIcon, X } from "lucide-react";
import "./CatalogoSection.css";

// const API_URL = import.meta.env.VITE_API_URL;

const MOCK_CARS = [
  {
    id: 1,
    marca: "Chevrolet",
    modelo: "Onix",
    ano: 2023,
    preco: 78900,
    descricao: "Hatch compacto, econômico e com ótimo custo-benefício para o dia a dia na cidade.",
    status: "disponivel",
    combustivel: "Flex",
    tipoVeiculo: "Hatch",
    potencia: "116 cv",
    direcao: "Elétrica",
    cor: "Prata",
    aceitaTrocas: true,
    itensSerie: ["Ar-condicionado", "Vidros elétricos", "Central multimídia"],
    informacoesAdicionais: ["Único dono", "IPVA pago"],
    images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800"],
    createdAt: "2026-08-01",
  },
  {
    id: 2,
    marca: "Jeep",
    modelo: "Compass",
    ano: 2022,
    preco: 165000,
    descricao: "SUV robusto, com bom espaço interno e ótima estabilidade em estrada e cidade.",
    status: "reservado",
    combustivel: "Diesel",
    tipoVeiculo: "SUV",
    potencia: "170 cv",
    direcao: "Elétrica",
    cor: "Preto",
    aceitaTrocas: false,
    itensSerie: ["Câmera de ré", "Teto solar", "Bancos em couro"],
    informacoesAdicionais: ["Revisões em concessionária"],
    images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"],
    createdAt: "2026-07-20",
  },
  {
    id: 3,
    marca: "Honda",
    modelo: "Civic",
    ano: 2021,
    preco: 132000,
    descricao: "Sedã esportivo com excelente acabamento e consumo equilibrado.",
    status: "disponivel",
    combustivel: "Flex",
    tipoVeiculo: "Sedã",
    potencia: "155 cv",
    direcao: "Elétrica",
    cor: "Branco",
    aceitaTrocas: true,
    itensSerie: ["Piloto automático", "Sensor de estacionamento"],
    informacoesAdicionais: [],
    images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800"],
    createdAt: "2026-07-15",
  },
  {
    id: 4,
    marca: "Toyota",
    modelo: "Hilux",
    ano: 2020,
    preco: 210000,
    descricao: "Picape robusta, ideal para trabalho pesado e uso off-road.",
    status: "disponivel",
    combustivel: "Diesel",
    tipoVeiculo: "Picape",
    potencia: "204 cv",
    direcao: "Hidráulica",
    cor: "Cinza",
    aceitaTrocas: true,
    itensSerie: ["Tração 4x4", "Engate para reboque"],
    informacoesAdicionais: ["Pneus novos"],
    images: ["https://images.unsplash.com/photo-1601929387185-e0e2c1b6b5b0?w=800"],
    createdAt: "2026-06-30",
  },
  {
    id: 5,
    marca: "Fiat",
    modelo: "Argo",
    ano: 2023,
    preco: 69900,
    descricao: "Hatch moderno com design arrojado e ótimo espaço para bagagem.",
    status: "disponivel",
    combustivel: "Flex",
    tipoVeiculo: "Hatch",
    potencia: "109 cv",
    direcao: "Elétrica",
    cor: "Vermelho",
    aceitaTrocas: false,
    itensSerie: ["Central multimídia", "Ar-condicionado digital"],
    informacoesAdicionais: ["Garantia de fábrica"],
    images: [],
    createdAt: "2026-06-10",
  },
  {
    id: 6,
    marca: "Volkswagen",
    modelo: "T-Cross",
    ano: 2022,
    preco: 118000,
    descricao: "SUV compacto com ótimo custo-benefício e tecnologia embarcada.",
    status: "reservado",
    combustivel: "Flex",
    tipoVeiculo: "SUV",
    potencia: "128 cv",
    direcao: "Elétrica",
    cor: "Azul",
    aceitaTrocas: true,
    itensSerie: ["Controle de estabilidade", "Câmera 360°"],
    informacoesAdicionais: ["Segundo dono"],
    images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800"],
    createdAt: "2026-05-28",
  },
];

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

export default function CatalogoSection() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [marcaFilter, setMarcaFilter] = useState("todas");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [priceCeiling, setPriceCeiling] = useState(DEFAULT_MAX_PRICE);

  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  // somente para teste, excluir depois
  async function fetchCars() {
  setLoading(true);
  setError("");
  try {
    // Simula o delay de uma requisição real
    await new Promise((resolve) => setTimeout(resolve, 400));

    const sorted = [...MOCK_CARS].sort(
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

  // async function fetchCars() {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const response = await fetch(`${API_URL}/api/cars`);
  //     if (!response.ok) throw new Error("Falha ao buscar veículos");
  //     const data = await response.json();

  //     const sorted = [...data].sort(
  //       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  //     );

  //     setCars(sorted);

  //     const highestPrice = sorted.reduce(
  //       (max, car) => Math.max(max, Number(car.preco) || 0),
  //       0
  //     );
  //     const ceiling = Math.max(DEFAULT_MAX_PRICE, Math.ceil(highestPrice / 50000) * 50000);
  //     setPriceCeiling(ceiling);
  //     setMaxPrice(ceiling);
  //   } catch (err) {
  //     setError("Não foi possível carregar o catálogo. Verifique sua conexão e tente novamente.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
    setSelectedCar(car);
  }

  function closeDetails() {
    setSelectedCar(null);
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
                    {car.marca?.toUpperCase()} · {car.ano}
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

      {selectedCar && (
        <div className="catalogo-modal-overlay" onClick={closeDetails}>
          <div className="catalogo-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="catalogo-modal-close"
              onClick={closeDetails}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className="catalogo-modal-media">
              {selectedCar.images?.[0] ? (
                <img
                  src={selectedCar.images[0]}
                  alt={`${selectedCar.marca} ${selectedCar.modelo}`}
                />
              ) : (
                <div className="catalogo-card-placeholder">
                  <CarIcon size={56} strokeWidth={1.2} />
                </div>
              )}
              <span className={`catalogo-status catalogo-status-${selectedCar.status}`}>
                {STATUS_LABELS[selectedCar.status] || selectedCar.status}
              </span>
            </div>

            <div className="catalogo-modal-content">
              <span className="catalogo-card-meta">
                {selectedCar.marca?.toUpperCase()} · {selectedCar.ano}
              </span>
              <h2 className="catalogo-modal-title">
                {selectedCar.marca?.toUpperCase()} {selectedCar.modelo?.toUpperCase()}
              </h2>
              <span className="catalogo-modal-price">{formatPrice(selectedCar.preco)}</span>

              {selectedCar.descricao && (
                <p className="catalogo-modal-desc">{selectedCar.descricao}</p>
              )}

              <div className="catalogo-modal-specs">
                {selectedCar.combustivel && (
                  <div className="catalogo-modal-spec">
                    <span>Combustível</span>
                    <strong>{selectedCar.combustivel}</strong>
                  </div>
                )}
                {selectedCar.tipoVeiculo && (
                  <div className="catalogo-modal-spec">
                    <span>Tipo</span>
                    <strong>{selectedCar.tipoVeiculo}</strong>
                  </div>
                )}
                {selectedCar.potencia && (
                  <div className="catalogo-modal-spec">
                    <span>Potência</span>
                    <strong>{selectedCar.potencia}</strong>
                  </div>
                )}
                {selectedCar.direcao && (
                  <div className="catalogo-modal-spec">
                    <span>Direção</span>
                    <strong>{selectedCar.direcao}</strong>
                  </div>
                )}
                {selectedCar.cor && (
                  <div className="catalogo-modal-spec">
                    <span>Cor</span>
                    <strong>{selectedCar.cor}</strong>
                  </div>
                )}
                <div className="catalogo-modal-spec">
                  <span>Aceita trocas</span>
                  <strong>{selectedCar.aceitaTrocas ? "Sim" : "Não"}</strong>
                </div>
              </div>

              {selectedCar.itensSerie?.length > 0 && (
                <div className="catalogo-modal-tags-block">
                  <h4>Itens de série</h4>
                  <div className="catalogo-modal-tags">
                    {selectedCar.itensSerie.map((item) => (
                      <span key={item} className="catalogo-modal-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCar.informacoesAdicionais?.length > 0 && (
                <div className="catalogo-modal-tags-block">
                  <h4>Informações adicionais</h4>
                  <div className="catalogo-modal-tags">
                    {selectedCar.informacoesAdicionais.map((item) => (
                      <span key={item} className="catalogo-modal-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a href="#contato" className="catalogo-modal-cta" onClick={closeDetails}>
                Tenho interesse
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
