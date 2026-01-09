import express from "express";
import {
  showTablesHTML,
  showUsersHTML,
} from "../controllers/data.controller.js";

const router = express.Router();

router.get("/tables", showTablesHTML);
router.get("/users", showUsersHTML);

export default router;
