import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// Auth related routes
// This will map to:
// /api/dev/auth/register
// /api/dev/auth/login
// /api/dev/auth/me
router.use("/auth", authRoutes);

export default router;
