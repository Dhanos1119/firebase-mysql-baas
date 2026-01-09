import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

console.log("DB_USER =", process.env.DB_USER);
console.log(
  "DB_PASSWORD =",
  process.env.DB_PASSWORD ? "LOADED" : "NOT LOADED"
);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test DB connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL connected successfully");
    conn.release();
  } catch (err) {
    console.error("❌ DB error:", err.message);
  }
})();

export default db;
