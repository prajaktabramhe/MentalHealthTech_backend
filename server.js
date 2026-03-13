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


dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mentalHealthDB")
.then(() => {
  console.log("MongoDB connected");
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


app.listen(5000, () => {
  console.log("Server running on port 5000");
});


