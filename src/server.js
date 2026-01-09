// server.js
import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import admin from "firebase-admin";
import serviceAccount from "./config/firebase-key.json" assert { type: "json" };


dotenv.config();

const app = express();
app.use(express.json());

/* =========================
   🔥 FIREBASE INITIALIZE
========================= */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* =========================
   🔥 MYSQL CONNECTION
========================= */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// DB test on startup
(async () => {
  try {
const [rows] = await db.query("SELECT 1 + 1 AS result");
console.log("✅ MySQL query test result:", rows[0].result);

  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

/* =========================
   🔐 AUTH MIDDLEWARE
========================= */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded; // uid, email, name
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Firebase token" });
  }
}

/* =========================
   🚀 TEST API (MAIN)
========================= */
app.get("/auth-test", authMiddleware, async (req, res) => {
  try {
    const { uid, email, name } = req.user;

    // 1️⃣ Check if user exists
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE firebase_uid = ?",
      [uid]
    );

    // 2️⃣ Insert if new user
    if (rows.length === 0) {
      await db.execute(
        "INSERT INTO users (firebase_uid, email, name) VALUES (?, ?, ?)",
        [uid, email, name || null]
      );
    }

    // 3️⃣ Success response
    res.json({
      status: "AUTH_OK",
      uid,
      email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ▶️ SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
