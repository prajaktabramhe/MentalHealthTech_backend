import express from "express";
import {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create journal
router.post("/journals", authMiddleware, createJournal);

// Get all journals of logged-in user
router.get("/journals", authMiddleware, getJournals);

// Update journal
router.put("/journals/:id", authMiddleware, updateJournal);

// Delete journal
router.delete("/journals/:id", authMiddleware, deleteJournal);

export default router;