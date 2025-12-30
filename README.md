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
