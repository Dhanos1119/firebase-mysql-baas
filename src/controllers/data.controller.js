import db from "../config/db.js";

// ===============================
// SHOW TABLE NAMES (HTML)
// ===============================
export const showTablesHTML = async (req, res) => {
  try {
    const [tables] = await db.query("SHOW TABLES");

    let html = `
      <html>
      <head>
        <title>Database Tables</title>
        <style>
          body {
            font-family: Arial;
            background: #111;
            color: #fff;
            padding: 20px;
          }
          h1 { color: #00ffcc; }
          table {
            border-collapse: collapse;
            margin-top: 20px;
            width: 300px;
          }
          th, td {
            border: 1px solid #555;
            padding: 10px;
            text-align: left;
          }
          th { background: #222; }
          tr:hover { background: #333; }
        </style>
      </head>
      <body>
        <h1>📊 Database Tables</h1>
        <table>
          <tr><th>Table Name</th></tr>
    `;

    tables.forEach((row) => {
      const tableName = Object.values(row)[0];
      html += `<tr><td>${tableName}</td></tr>`;
    });

    html += `
        </table>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ===============================
// SHOW USERS TABLE (HTML)
// ===============================
export const showUsersHTML = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");

    let html = `
      <html>
      <head>
        <title>Users Table</title>
        <style>
          body {
            font-family: Arial;
            background: #111;
            color: #fff;
            padding: 20px;
          }
          h1 { color: #00ffcc; }
          table {
            border-collapse: collapse;
            margin-top: 20px;
            width: 100%;
          }
          th, td {
            border: 1px solid #555;
            padding: 10px;
            text-align: left;
          }
          th { background: #222; }
          tr:nth-child(even) { background: #1a1a1a; }
          tr:hover { background: #333; }
        </style>
      </head>
      <body>
        <h1>👤 Users Table</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Firebase UID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Created At</th>
          </tr>
    `;

    rows.forEach((user) => {
      html += `
        <tr>
          <td>${user.id}</td>
          <td>${user.firebase_uid}</td>
          <td>${user.email}</td>
          <td>${user.name ?? ""}</td>
          <td>${user.created_at}</td>
        </tr>
      `;
    });

    html += `
        </table>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
