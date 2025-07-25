import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

//get list of notes
router.get("/", getAllNotes);

//get a single note
router.get("/:id", getNoteById);

//create a new note
router.post("/", createNote);

//update a note
router.put("/:id", updateNote);

//delete a note
router.delete("/:id", deleteNote);

export default router;
