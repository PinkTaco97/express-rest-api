import express from 'express';

// Controllers.
import { getNotes, getNote, createNote } from '../controllers/notes.controller.js';

// Constants.
import { HTTP_RESPONSE } from '../constants/common.constants.js';

const notesRouter = express.Router();

notesRouter.get('/', async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
});

notesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const note = await getNote(id);
    res.send(note);
});

notesRouter.post('/', async (req, res) => {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(HTTP_RESPONSE.CREATED).send(note);
});

export default notesRouter;