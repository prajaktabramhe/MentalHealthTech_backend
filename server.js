import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import affirmationRoutes from "./routes/affirmationRoutes.js";
import exercises from "./routes/exercises.js";
import userRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import moodRoutes from "./routes/moodRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";


dotenv.config();

const app = express();
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Mental Health API is running 🚀");
});

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Atlas connected");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest"
    });

    const result = await model.generateContent(message);

    const response = result.response.text();

    res.json({ response });

  } catch (error) {

    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "AI failed"
    });

  }
});

/* ---------- Affirmations Route ---------- */


app.use("/api", affirmationRoutes);
app.use("/api", exercises);
app.use("/auth", userRoutes);
app.use("/api", moodRoutes);
app.use("/api", journalRoutes);

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

