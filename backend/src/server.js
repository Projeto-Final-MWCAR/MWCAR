import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import carsRouter from "./routes/cars.js";
import uploadRouter from "./routes/upload.js";
import usersRouter from "./routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "MWCar API rodando" });
});

app.use("/api/cars", carsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
