import express from "express";
import { protectRoute } from "../middlewares/authMiddlewave.js";
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.post("/create", protectRoute, createNote);

router.get("/", protectRoute, getAllNotes);
router.get("/:id", protectRoute, getNoteById);

router.put("/update/:id", protectRoute, updateNote);

router.delete("/delete/:id", protectRoute, deleteNote);

export default router;
