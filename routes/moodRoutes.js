import express from "express";
import { addMood, getMoods, deleteMood } from "../controllers/moodController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add mood
router.post("/moods", authMiddleware, addMood);

// Get all moods
router.get("/moods", authMiddleware, getMoods);

// Delete mood
router.delete("/moods/:id", authMiddleware, deleteMood);

export default router;