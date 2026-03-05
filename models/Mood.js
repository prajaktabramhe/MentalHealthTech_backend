import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  moodType: {
    type: String,
    enum: ["Happy", "Sad", "Stressed", "Relaxed"],
    required: true,
  },

  note: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;