import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", verifyToken, getCurrentUser);

export default router;
