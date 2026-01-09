/*
// ================= OLD FULL APP (COMMENTED) =================

// src/app.js
import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import dataRoutes from "./routes/data.routes.js";
import storageRoutes from "./routes/storage.routes.js";
import devRoutes from "./routes/dev.routes.js";
import admin from "../src/config/firebase.js"; // 👈 THIS LINE MUST EXIST

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
/*
app.use(cors());
app.use(express.json());
app.use("/api/dev", devRoutes);

/* ---------------- HEALTH CHECK ---------------- */
/*
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "firebase-mysql-baas API running",
  });
});

/* ---------------- ROUTES ---------------- */
/*
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/storage", storageRoutes);

/* ---------------- 404 HANDLER ---------------- */
/*
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
*/

// ================= CURRENT MINIMAL APP (ACTIVE) =================


import express from "express";
import dataRoutes from "./routes/data.routes.js";

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running. Go to /api/data/tables");
});

// Data routes
app.use("/api/data", dataRoutes);

export default app;
