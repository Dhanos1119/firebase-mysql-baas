import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// ---------------- REGISTER ----------------
export const registerUser = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ message: "Firebase token required" });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email, name } = decodedToken;

    // Check user in DB
    const [rows] = await db.query(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      // Insert new user
      await db.query(
        "INSERT INTO users (firebase_uid, email, name) VALUES (?, ?, ?)",
        [uid, email, name || null]
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({ message: "Firebase token required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email } = decodedToken;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not registered" });
    }

    const token = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

// ---------------- CURRENT USER ----------------
export const getCurrentUser = async (req, res) => {
  try {
    const uid = req.user.uid;

    const [rows] = await db.query(
      "SELECT id, email, name FROM users WHERE firebase_uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
