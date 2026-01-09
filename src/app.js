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
