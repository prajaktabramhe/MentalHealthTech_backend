import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/affirmations", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");

    res.json({
      quote: response.data[0].q,
      author: response.data[0].a
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch affirmation"
    });
  }
});

export default router;