## 👥 Team Roles & Responsibilities

### 👤 Role 1 – Core Infrastructure (Project Lead)
**Responsibility:**
- Project folder structure design
- Express server setup (`server.js`)
- Route wiring and app configuration (`app.js`)
- API contract definition
- Environment variable template (`.env.example`)
- Git branch control & pull request review

**Files handled:**
- src/server.js
- src/app.js
- .env.example
- package.json
- .gitignore
now all are okay

---

### 👤 Role 2 – Authentication & Security
**Responsibility:**
- User authentication logic
- JWT token generation & verification
- Firebase Authentication integration
- Protected route middleware

**Files handled:**
- src/routes/auth.routes.js
- src/controllers/auth.controller.js
- src/middleware/auth.middleware.js

---

### 👤 Role 3 – Database & Data APIs (MySQL)
**Responsibility:**
- MySQL database connection setup
- CRUD operations for application data
- Dynamic table/collection handling
- Data validation & query logic

**Files handled:**
- src/config/db.js
- src/routes/data.routes.js
- src/controllers/data.controller.js

---

### 👤 Role 4 – Cloud Storage & Documentation
**Responsibility:**
- Firebase Admin SDK setup
- File upload & retrieval APIs
- Firebase Storage integration
- README documentation & API usage guide

**Files handled:**
- src/config/firebase.js
- src/routes/storage.routes.js
- src/controllers/storage.controller.js
- README.md






## 👥 Team Roles & Responsibilities

### 👤 Role 1 – Authentication (Firebase)

* Firebase Auth setup
* Token verification middleware
* Secure protected routes

---

### 👤 Role 2 – Backend Core (Server & Security)

* Express server setup
* Firebase Admin integration
* MySQL connection setup
* Auth-protected base APIs

---

### 👤 Role 3 – Database & Data APIs (MySQL)

**Responsibility:**

* Use the **existing MySQL database** (DO NOT create a new database)
* Implement CRUD APIs using the shared DB connection
* Handle application data logic only (NOT auth)
* Ensure queries work with Firebase-authenticated users

**Important Rules (Must Follow):**

* ❌ Do NOT create a new database
* ❌ Do NOT create new users table
* ✅ Use the existing database: `student`
* ✅ Use the existing `users` table
* ❌ Do NOT modify Firebase/Auth logic

**Existing Database Structure:**

```sql
Database: student
Table: users
Columns:
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- firebase_uid (VARCHAR, UNIQUE)
- email (VARCHAR)
- name (VARCHAR)
- created_at (TIMESTAMP)
```

**Files to Work On:**

```text
src/config/db.js
src/routes/data.routes.js
src/controllers/data.controller.js
```

**How to Use Existing DB Connection:**

```js
import db from "../config/db.js";

const [rows] = await db.execute(
  "SELECT * FROM users WHERE firebase_uid = ?",
  [req.user.uid]
);
```

**Auth Context Available:**
All data APIs are already protected using Firebase Auth middleware.
You can access the authenticated user like this:

```js
req.user.uid
req.user.email
```

**Testing Requirement:**

* Test all APIs using Thunder Client
* Always include Firebase token:

```http
Authorization: Bearer <Firebase_ID_Token>
```

---

### 👤 Role 4 – Cloud Storage & Documentation

* Firebase Admin SDK setup
* File upload & retrieval APIs
* Firebase Storage integration
