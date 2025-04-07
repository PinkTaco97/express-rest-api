import express from 'express';

import NotesRouter from './routes/notes.route.js';

const app = express();

app.use(express.json());
app.use('/notes', NotesRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});