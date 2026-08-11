import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AddCar.css";

const SERIES_ITEMS = [
  "Airbag",
  "Ar Condicionado",
  "Alarme",
  "Bancos de Couro",
  "Blindado",
  "Câmera de ré",
  "Com Kit GNV",
  "Computador de bordo",
  "Conexão USB",
  "Controle automático de velocidade",
  "Interface Bluetooth",
  "Navegador GPS",
  "Rodas de liga leve",
  "Sensor de ré",
  "Som",
  "Teto Solar",
  "Tração 4x4",
  "Trava elétrica",
  "Vidro elétrico",
  "Volante multifuncional",
];

const ADDITIONAL_INFO_ITEMS = [
  "Carro de leilão",
  "Com chave reserva",
  "Com garantia de fábrica",
  "Com manual",
  "Com multas",
  "IPVA pago",
  "Revisões em concessionária",
  "Único dono",
  "Veículo em financiamento",
  "Veículo quitado",
];

const INITIAL_FORM_DATA = {
  placa: "",
  marca: "",
  modelo: "",
  ano: "",
  combustivel: "",
  tipoVeiculo: "",
  potencia: "",
  direcao: "",
  cor: "",
  preco: "",
  status: "disponivel",
  aceitaTrocas: false,
  descricao: "",
};

export default function AddCar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedSeriesItems, setSelectedSeriesItems] = useState(new Set());
  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState(new Set());
  const [photos, setPhotos] = useState([]);
  const [searchingPlate, setSearchingPlate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function toggleTag(item, selectedSet, setSelectedSet) {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }

  async function handleSearchPlate() {
    if (!formData.placa.trim()) return;
    setSearchingPlate(true);
    setError("");
    try {
      // Codigo provisório, depois trocar quando conectar com a API de consulta de placas
      await new Promise((resolve) => setTimeout(resolve, 800));
      // const response = await fetch(`/api/placas/${formData.placa}`);
      // if (!response.ok) throw new Error("Não foi possível consultar a placa");
      // const data = await response.json();
      // setFormData((prev) => ({ ...prev, ...data }));
    } catch (err) {
      setError("Não foi possível consultar a placa. Preencha os dados manualmente.");
    } finally {
      setSearchingPlate(false);
    }
  }

  function handlePhotoSelect(e) {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${file.lastModified}`,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  }

  function removePhoto(id) {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleCancel() {
    navigate("/admin");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...formData,
      itensSerie: Array.from(selectedSeriesItems),
      informacoesAdicionais: Array.from(selectedAdditionalItems),
      fotos: photos.map((photo) => photo.file),
    };

    try {
      // Codigo provisório, depois trocar quando conectar com a API
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Veículo a ser cadastrado:", payload);

      // Quando a API estiver pronta, troque o bloco acima por:
      // const response = await fetch("/api/veiculos", {
      //   method: "POST",
      //   body: buildFormData(payload),
      // });
      // if (!response.ok) throw new Error("Falha ao cadastrar veículo");

      navigate("/admin");
    } catch (err) {
      setError("Não foi possível cadastrar o veículo. Tente novamente.");
    } finally {
      setSaving(false);
    }
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

        {error && (
          <div className="admin-error-box" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form className="addcar-form" onSubmit={handleSubmit}>
          <section className="addcar-section">
            <h2 className="addcar-section-title">BUSCA POR PLACA</h2>
            <div className="addcar-plate-row">
              <input
                type="text"
                name="placa"
                className="addcar-input"
                placeholder="Digite a placa do veículo"
                value={formData.placa}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="addcar-search-button"
                onClick={handleSearchPlate}
                disabled={searchingPlate}
              >
                {searchingPlate ? "BUSCANDO..." : "🔍 BUSCAR"}
              </button>
            </div>
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">DADOS DO VEÍCULO</h2>
            <div className="addcar-grid">
              <div className="addcar-field">
                <label className="addcar-label" htmlFor="marca">
                  MARCA
                </label>
                <input
                  id="marca"
                  name="marca"
                  className="addcar-input"
                  placeholder="Ex: BMW"
                  value={formData.marca}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="modelo">
                  MODELO
                </label>
                <input
                  id="modelo"
                  name="modelo"
                  className="addcar-input"
                  placeholder="Ex: Série 3 330i"
                  value={formData.modelo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="ano">
                  ANO
                </label>
                <input
                  id="ano"
                  name="ano"
                  type="number"
                  className="addcar-input"
                  placeholder="Ex: 2023"
                  value={formData.ano}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="combustivel">
                  COMBUSTÍVEL
                </label>
                <input
                  id="combustivel"
                  name="combustivel"
                  className="addcar-input"
                  placeholder="Ex: Gasolina"
                  value={formData.combustivel}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="tipoVeiculo">
                  TIPO DE VEÍCULO
                </label>
                <input
                  id="tipoVeiculo"
                  name="tipoVeiculo"
                  className="addcar-input"
                  placeholder="Ex: Sedan"
                  value={formData.tipoVeiculo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="potencia">
                  POTÊNCIA DO MOTOR
                </label>
                <input
                  id="potencia"
                  name="potencia"
                  className="addcar-input"
                  placeholder="Ex: 258 cv"
                  value={formData.potencia}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="direcao">
                  DIREÇÃO
                </label>
                <input
                  id="direcao"
                  name="direcao"
                  className="addcar-input"
                  placeholder="Ex: Elétrica"
                  value={formData.direcao}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="cor">
                  COR
                </label>
                <input
                  id="cor"
                  name="cor"
                  className="addcar-input"
                  placeholder="Ex: Branco"
                  value={formData.cor}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">VALOR E STATUS</h2>
            <div className="addcar-grid">
              <div className="addcar-field">
                <label className="addcar-label" htmlFor="preco">
                  PREÇO (R$)
                </label>
                <input
                  id="preco"
                  name="preco"
                  type="number"
                  className="addcar-input"
                  placeholder="289900"
                  value={formData.preco}
                  onChange={handleInputChange}
                />
              </div>

              <div className="addcar-field">
                <label className="addcar-label" htmlFor="status">
                  STATUS
                </label>
                <select
                  id="status"
                  name="status"
                  className="addcar-select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="disponivel">Disponível</option>
                  <option value="reservado">Reservado</option>
                </select>
              </div>
            </div>

            <div className="addcar-divider" />

            <label className="addcar-checkbox-row">
              <input
                type="checkbox"
                name="aceitaTrocas"
                checked={formData.aceitaTrocas}
                onChange={handleInputChange}
              />
              Aceita trocas
            </label>
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">FOTOS DO VEÍCULO</h2>
            <label className="addcar-upload-box">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="addcar-upload-input"
                onChange={handlePhotoSelect}
              />
              <span className="addcar-upload-icon">⬆</span>
              <span className="addcar-upload-text">Clique para selecionar fotos</span>
              <span className="addcar-upload-hint">
                JPG, PNG, WEBP — múltiplos arquivos permitidos
              </span>
            </label>

            {photos.length > 0 && (
              <div className="addcar-photo-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="addcar-photo-thumb">
                    <img src={photo.preview} alt="Prévia do veículo" />
                    <button
                      type="button"
                      className="addcar-photo-remove"
                      onClick={() => removePhoto(photo.id)}
                      aria-label="Remover foto"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">ITENS DE SÉRIE E OPCIONAIS</h2>
            <p className="addcar-section-subtitle">
              Selecione os itens presentes no veículo
            </p>
            <div className="addcar-tag-list">
              {SERIES_ITEMS.map((item) => {
                const isSelected = selectedSeriesItems.has(item);
                return (
                  <button
                    type="button"
                    key={item}
                    className={`addcar-tag${isSelected ? " addcar-tag-selected" : ""}`}
                    onClick={() =>
                      toggleTag(item, selectedSeriesItems, setSelectedSeriesItems)
                    }
                  >
                    {item} {isSelected ? "✓" : "+"}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">INFORMAÇÕES ADICIONAIS</h2>
            <p className="addcar-section-subtitle">
              Condições e características do veículo
            </p>
            <div className="addcar-tag-list">
              {ADDITIONAL_INFO_ITEMS.map((item) => {
                const isSelected = selectedAdditionalItems.has(item);
                return (
                  <button
                    type="button"
                    key={item}
                    className={`addcar-tag${isSelected ? " addcar-tag-selected" : ""}`}
                    onClick={() =>
                      toggleTag(item, selectedAdditionalItems, setSelectedAdditionalItems)
                    }
                  >
                    {item} {isSelected ? "✓" : "+"}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="addcar-section">
            <h2 className="addcar-section-title">DESCRIÇÃO</h2>
            <textarea
              name="descricao"
              className="addcar-textarea"
              placeholder="Descreva o veículo com detalhes relevantes..."
              value={formData.descricao}
              onChange={handleInputChange}
            />
          </section>

          <div className="addcar-actions">
            <button
              type="button"
              className="addcar-btn-cancel"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancelar
            </button>
            <button type="submit" className="addcar-btn-submit" disabled={saving}>
              {saving ? "SALVANDO..." : "ADICIONAR VEÍCULO"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
