import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Car as CarIcon, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import "./CarDetalhes.css";

const API_URL = import.meta.env.VITE_API_URL;

const STATUS_LABELS = {
  disponivel: "DISPONÍVEL",
  reservado: "RESERVADO",
};

function formatPrice(value) {
  const number = Number(value) || 0;
  return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CarDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchCar() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_URL}/api/cars/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("Veículo não encontrado");
          throw new Error("Falha ao buscar veículo");
        }
        const data = await response.json();
        if (!cancelled) setCar(data);
      } catch (err) {
        if (!cancelled) setError("Não foi possível carregar este anúncio.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCar();
    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [id]);

  const images = car?.images?.length ? car.images : [];

  function nextImage() {
    setActiveImage((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  }

  if (loading) {
    return (
      <div className="cardetalhes-spinner-box">
        <div className="cardetalhes-spinner" />
        <span>Carregando anúncio...</span>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="cardetalhes-error-box">
        <span>{error || "Veículo não encontrado."}</span>
        <button onClick={() => navigate("/#catalogo")} className="cardetalhes-back-btn">
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="cardetalhes-container">
      <button onClick={() => navigate(-1)} className="cardetalhes-voltar">
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className="cardetalhes-layout">
        {/* Galeria */}
        <div className="cardetalhes-gallery">
          <div className="cardetalhes-main-image">
            {images.length > 0 ? (
              <img src={images[activeImage]} alt={`${car.marca} ${car.modelo}`} />
            ) : (
              <div className="cardetalhes-placeholder">
                <CarIcon size={64} strokeWidth={1.2} />
              </div>
            )}

            <span className={`cardetalhes-status cardetalhes-status-${car.status}`}>
              {STATUS_LABELS[car.status] || car.status}
            </span>

            {images.length > 1 && (
              <>
                <button className="cardetalhes-nav-btn cardetalhes-nav-prev" onClick={prevImage} aria-label="Foto anterior">
                  <ChevronLeft size={22} />
                </button>
                <button className="cardetalhes-nav-btn cardetalhes-nav-next" onClick={nextImage} aria-label="Próxima foto">
                  <ChevronRight size={22} />
                </button>
                <span className="cardetalhes-counter">
                  {activeImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="cardetalhes-thumbs">
              {images.map((img, index) => (
                <button
                  key={img + index}
                  className={`cardetalhes-thumb ${index === activeImage ? "is-active" : ""}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Foto ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Coluna lateral */}
        <aside className="cardetalhes-sidebar">
          <span className="cardetalhes-meta">
            {car.marca?.toUpperCase()} · {car.ano}
          </span>
          <h1 className="cardetalhes-title">
            {car.marca?.toUpperCase()} {car.modelo?.toUpperCase()}
          </h1>
          <span className="cardetalhes-price">{formatPrice(car.preco)}</span>

          {car.aceitaTrocas && <span className="cardetalhes-tag-trocas">Aceita trocas</span>}

          <a href="#contato" className="cardetalhes-cta">
            Tenho interesse
          </a>

          <Link to="/#catalogo" className="cardetalhes-voltar-catalogo">
            Ver outros veículos
          </Link>
        </aside>
      </div>

      <section className="cardetalhes-section">
        <h2>Detalhes</h2>
        <div className="cardetalhes-specs-grid">
          {car.tipoVeiculo && <Spec label="Tipo de veículo" value={car.tipoVeiculo} />}
          <Spec label="Marca" value={car.marca} />
          <Spec label="Modelo" value={car.modelo} />
          <Spec label="Ano" value={car.ano} />
          {car.combustivel && <Spec label="Combustível" value={car.combustivel} />}
          {car.potencia && <Spec label="Potência do motor" value={car.potencia} />}
          {car.direcao && <Spec label="Direção" value={car.direcao} />}
          {car.cor && <Spec label="Cor" value={car.cor} />}
          <Spec label="Aceita trocas" value={car.aceitaTrocas ? "Sim" : "Não"} />
        </div>
      </section>

      {car.itensSerie?.length > 0 && (
        <section className="cardetalhes-section">
          <h2>Itens de série</h2>
          <div className="cardetalhes-tags">
            {car.itensSerie.map((item) => (
              <span key={item} className="cardetalhes-tag">{item}</span>
            ))}
          </div>
        </section>
      )}

      {car.descricao && (
        <section className="cardetalhes-section">
          <h2>Descrição</h2>
          <p className="cardetalhes-descricao">{car.descricao}</p>
        </section>
      )}

      {car.informacoesAdicionais?.length > 0 && (
        <section className="cardetalhes-section">
          <h2>Informações adicionais</h2>
          <div className="cardetalhes-tags">
            {car.informacoesAdicionais.map((item) => (
              <span key={item} className="cardetalhes-tag">{item}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }) {
  if (!value) return null;
  return (
    <div className="cardetalhes-spec">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}