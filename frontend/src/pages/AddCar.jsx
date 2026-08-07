import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;

export function AddCar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("ativo");
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFilesChange(e) {
    setFiles(Array.from(e.target.files));
  }

  // Sobe uma imagem direto para o Cloudinary usando a assinatura
  // gerada pelo backend (GET /api/upload/signature)
  async function uploadImage(file, signatureData) {
    const { timestamp, signature, folder, apiKey, cloudName } = signatureData;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) {
      throw new Error("Falha ao enviar imagem para o Cloudinary");
    }

    const data = await res.json();
    return data.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!brand || !model || !year || !price) {
      setError("Preencha marca, modelo, ano e preço.");
      return;
    }

    setLoading(true);
    try {
      const idToken = await user.getIdToken();

      // 1. Pega a assinatura do backend para poder subir imagens
      let images = [];
      if (files.length > 0) {
        const sigRes = await fetch(`${API_URL}/api/upload/signature`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (!sigRes.ok) {
          throw new Error("Não foi possível gerar a assinatura de upload");
        }
        const signatureData = await sigRes.json();

        // 2. Sobe cada imagem para o Cloudinary
        images = await Promise.all(
          files.map((file) => uploadImage(file, signatureData))
        );
      }

      // 3. Cria o carro no backend com os dados + URLs das imagens
      const carRes = await fetch(`${API_URL}/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          brand,
          model,
          year: Number(year),
          price: Number(price),
          description,
          images,
          status,
        }),
      });

      if (!carRes.ok) {
        throw new Error("Erro ao salvar o carro");
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Erro ao adicionar carro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Carro</h1>
      {error && <p role="alert">{error}</p>}

      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Modelo"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Ano"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Carro"}
      </button>
    </form>
  );
}
