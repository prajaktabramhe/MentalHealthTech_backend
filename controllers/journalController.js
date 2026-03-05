import Journal from "../models/Journal.js";

// CREATE JOURNAL
export const createJournal = async (req, res) => {
  try {
    const { title, content, mood, moodContext } = req.body;

    const journal = new Journal({
      title,
      content,
      mood,
      moodContext,
      userId: req.user.id
    });

    const savedJournal = await journal.save();

    res.status(201).json(savedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL JOURNALS
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id });

    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE JOURNAL
export const updateJournal = async (req, res) => {
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE JOURNAL
export const deleteJournal = async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);

    res.json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};