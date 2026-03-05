import Mood from "../models/Mood.js";

// Add mood
export const addMood = async (req, res) => {
  try {
    const { moodType, note } = req.body;

    const newMood = new Mood({
      moodType,
      note,
      userId: req.user.id,
    });

    const savedMood = await newMood.save();

    res.status(201).json(savedMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all moods of logged-in user
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id });

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete mood
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({ message: "Mood not found" });
    }

    await mood.deleteOne();

    res.json({ message: "Mood deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};