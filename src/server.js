import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`👉 View tables: http://localhost:${PORT}/api/data/tables`);
  console.log(`👉 View users: http://localhost:${PORT}/api/data/users`);
});
