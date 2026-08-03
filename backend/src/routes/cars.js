import { Router } from "express";
import { db } from "../config/firebase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/cars - lista pública do catálogo
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("cars").get();
    const cars = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carros" });
  }
});

// GET /api/cars/:id
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

// POST /api/cars - admin autenticado cria carro
router.post("/", requireAuth, async (req, res) => {
  try {
    const { model, brand, year, price, images, description, status } = req.body;
    if (!model || !brand || !year || !price) {
      return res.status(400).json({ error: "Campos obrigatórios: model, brand, year, price" });
    }
    const now = new Date().toISOString();
    const docRef = await db.collection("cars").add({
      model,
      brand,
      year,
      price,
      images: Array.isArray(images) ? images : [],
      description: description || "",
      status: status === "inativo" ? "inativo" : "ativo",
      createdAt: now,
      updatedAt: now,
    });
    res.status(201).json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar carro" });
  }
});

// PUT /api/cars/:id - admin autenticado edita carro
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

// DELETE /api/cars/:id - admin autenticado remove carro
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await db.collection("cars").doc(req.params.id).delete();
    res.json({ message: "Carro removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao remover carro" });
  }
});

export default router;
