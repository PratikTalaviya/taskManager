import Note from "../models/note.js";

export const createNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, content, tag } = req.body;

    const note = new Note({ userId, title, content, tag });
    const savedNote = await note.save();
    res.status(201).json({ status: true, note: savedNote, message: "Note created successfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const notes = await Note.find({ userId });
    res.json({ status: true, notes, message: "All notes fetched successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { userId } = req.user;
    const note = await Note.findOne({ _id: req.params.id, userId });
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }
    res.json({ status: true, note, message: "Note fetched successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content, tag } = req.body;
    const { userId } = req.user;
    const note = await Note.findOneAndUpdate({ _id: req.params.id, userId }, { title, content, tag }, { new: true });
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }
    res.json({ status: true, note, message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { userId } = req.user;
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId });
    if (!note) {
      return res.status(404).json({ status: false, message: "Note not found" });
    }
    res.json({ status: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
