import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes.
import NotesRouter from "./routes/notes.route.js";
import UserRouter from "./routes/users.route.js";

// Constants.
import { HTTP_RESPONSE } from "./constants/common.constants.js";

// Environment variables.
dotenv.config();
const { SERVER_PORT, SERVER_BASE_PATH } = process.env;

// Initialise Express server.
const app = express();
app.use(express.json());

// CROSS-ORIGIN-ALLOW-ALL
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Application routes.
app.use(`${SERVER_BASE_PATH}/notes`, NotesRouter);
app.use(`${SERVER_BASE_PATH}/users`, UserRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).send("Something broke!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}...`);
});
