import express from "express";

const router = express.Router();

router.get("/exercises", (req, res) => {

  const exercises = [
    {
      name: "4-7-8 Breathing",
      steps: [
        "Inhale for 4 seconds",
        "Hold breath for 7 seconds",
        "Exhale slowly for 8 seconds"
      ]
    },
    {
      name: "Box Breathing",
      steps: [
        "Inhale 4 seconds",
        "Hold 4 seconds",
        "Exhale 4 seconds",
        "Hold 4 seconds"
      ]
    }
  ];

  res.json(exercises);
});

export default router;