import { Router } from "express";
import { db } from "../config/firebase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("cars").get();
    const cars = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carros" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("cars").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Carro não encontrado" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carro" });
  }
});

const VALID_STATUS = ["disponivel", "reservado"];

router.post("/", requireAuth, async (req, res) => {
  try {
    const {
      marca,
      modelo,
      ano,
      preco,
      images,
      descricao,
      status,
      placa,
      combustivel,
      tipoVeiculo,
      potencia,
      direcao,
      cor,
      aceitaTrocas,
      itensSerie,
      informacoesAdicionais,
    } = req.body;

    if (!marca || !modelo || !ano || !preco) {
      return res.status(400).json({ error: "Campos obrigatórios: marca, modelo, ano, preco" });
    }
    const now = new Date().toISOString();
    const docRef = await db.collection("cars").add({
      marca,
      modelo,
      ano: Number(ano),
      preco: Number(preco),
      images: Array.isArray(images) ? images : [],
      descricao: descricao || "",
      status: VALID_STATUS.includes(status) ? status : "disponivel",
      placa: placa || "",
      combustivel: combustivel || "",
      tipoVeiculo: tipoVeiculo || "",
      potencia: potencia || "",
      direcao: direcao || "",
      cor: cor || "",
      aceitaTrocas: Boolean(aceitaTrocas),
      itensSerie: Array.isArray(itensSerie) ? itensSerie : [],
      informacoesAdicionais: Array.isArray(informacoesAdicionais) ? informacoesAdicionais : [],
      createdAt: now,
      updatedAt: now,
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar carro" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date().toISOString() };
    await db.collection("cars").doc(id).update(updates);
    res.json({ message: "Carro atualizado" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar carro" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await db.collection("cars").doc(req.params.id).delete();
    res.json({ message: "Carro removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover carro" });
  }
});

export default router;
