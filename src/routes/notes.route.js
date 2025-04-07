import express from 'express';

// Controllers.
import * as notesController from '../controllers/notes.controller.js';

// Constants.
import { HTTP_RESPONSE } from '../constants/common.constants.js';

// Initialise Express router.
const notesRouter = express.Router();

// Retrieve all notes.
notesRouter.get('/', async (req, res) => {
    const notes = await notesController.getNotes();
    res.send(notes);
});

// Retrieve specific note by ID.
notesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await notesController.getNote(id);
    res.send(note);
});

// Create a new note.
notesRouter.post('/', async (req, res) => {
    const { title, contents } = req.body;
    const note = await notesController.createNote(title, contents);
    res.status(HTTP_RESPONSE.CREATED).send(note);
});

// Update an existing note.
notesRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const note = await notesController.updateNote(id, title, contents);
    res.status(HTTP_RESPONSE.OK).send(note);
});

// Create a new note.
notesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await notesController.deleteNote(id);
    res.status(HTTP_RESPONSE.OK).send(note);
});

export default notesRouter;