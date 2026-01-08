// src/app.js
import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import dataRoutes from "./routes/data.routes.js";
import storageRoutes from "./routes/storage.routes.js";
import devRoutes from "./routes/dev.routes.js";
import "./config/firebase.js";


const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use("/api/dev", devRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "firebase-mysql-baas API running",
  });
});

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/storage", storageRoutes);

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
