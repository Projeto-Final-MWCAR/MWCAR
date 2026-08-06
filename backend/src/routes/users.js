import { Router } from "express";
import { db } from "../config/firebase.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/users/me - retorna o perfil do admin autenticado
router.get("/me", requireAuth, async (req, res) => {
  try {
    const doc = await db.collection("users").doc(req.user.uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Perfil de usuário não encontrado" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});

// POST /api/users/me - cria o perfil do admin autenticado na primeira vez
router.post("/me", requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const uid = req.user.uid;
    const now = new Date().toISOString();

    await db.collection("users").doc(uid).set({
      uid,
      email: req.user.email || null,
      name: name || "",
      role: "admin",
      createdAt: now,
    });

    res.status(201).json({ id: uid });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar perfil" });
  }
});

export default router;
