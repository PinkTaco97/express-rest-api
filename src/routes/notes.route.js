import express from "express";

// Controllers.
import * as notesController from "../controllers/notes.controller.js";

// Initialise Express router.
const notesRouter = express.Router();

// Retrieve all notes.
notesRouter.get("/", notesController.getNotes);

// Retrieve specific note by ID.
notesRouter.get("/:id", notesController.getNote);

// Create a new note.
notesRouter.post("/", notesController.createNote);

// Update an existing note.
notesRouter.put("/:id", notesController.updateNote);

// Delete a new note.
notesRouter.delete("/:id", notesController.deleteNote);

export default notesRouter;
