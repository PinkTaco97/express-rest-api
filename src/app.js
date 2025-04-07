import express from 'express';
import dotenv from 'dotenv';

// Routes.
import NotesRouter from './routes/notes.route.js';

// Constants.
import { HTTP_RESPONSE } from './constants/common.constants.js';

// Environment variables.
dotenv.config();
const { SERVER_PORT, SERVER_BASE_PATH } = process.env;

// Initialise Express server.
const app = express();
app.use(express.json());

// Application routes.
app.use(`${SERVER_BASE_PATH}/notes`, NotesRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).send('Something broke!');
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}...`);
});