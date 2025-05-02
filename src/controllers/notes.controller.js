import DB from "../database.js";

// Constants.
import {
  HTTP_RESPONSE,
  ERROR_MESSAGES,
} from "../constants/common.constants.js";

export async function getNotes(req, res) {
  console.log("Retrieving notes...");
  try {
    // Get all notes from the database
    const [notes] = await DB.query("SELECT * FROM notes");

    // If no notes are found, return a 404 error
    if (notes.length === 0) {
      return res.status(HTTP_RESPONSE.NOT_FOUND).json({
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }

    // Respond with the notes data
    console.log("Retrieved notes", notes);
    res.status(HTTP_RESPONSE.OK).json(notes);

    // Catch any unexpected errors
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function getNote(req, res) {
  console.log("Retrieving note...");

  try {
    // Destructure id from the request parameters
    const { id } = req.params;

    // Get the note from the database by ID
    const [note] = await DB.query(
      `
        SELECT * FROM notes
        WHERE id = ?`,
      [id]
    );

    // If no note is found, return a 404 error
    if (note.length === 0) {
      return res.status(HTTP_RESPONSE.NOT_FOUND).json({
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }

    // Respond with the note data
    console.log("Retrieved note", note[0]);
    res.status(HTTP_RESPONSE.OK).json(note[0]);

    // Catch any unexpected errors
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function createNote(req, res) {
  console.log("Creating note...");

  // Destructure title and contents from the request body
  const { title, contents } = req.body;

  try {
    // Insert the new note into the database
    const [result] = await DB.query(
      `
        INSERT INTO notes (title, contents)
        VALUES (?, ?)`,
      [title, contents]
    );

    // Get the newly created note by ID
    const note = await getNote(result.insertId);

    // Respond with the created note data
    console.log("Created note", note);
    res.status(HTTP_RESPONSE.CREATED).json(note);

    // Catch any unexpected errors
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function updateNote(req, res) {
  console.log("Updating note...");

  // Destructure id from the request parameters
  const { id } = req.params;

  // Destructure title and contents from the request body
  const { title, contents } = req.body;

  try {
    // Update the note in the database by ID
    const [result] = await DB.query(
      `
        UPDATE notes
        SET title = ?, contents = ?
        WHERE id = ?`,
      [title, contents, id]
    );

    // If no rows were affected, return a 404 error
    if (result.affectedRows === 0) {
      return res.status(HTTP_RESPONSE.NOT_FOUND).json({
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }

    // Get the updated note by ID
    const note = await getNote(id);

    // Respond with the updated note data
    console.log("Updated note", note);
    res.status(HTTP_RESPONSE.OK).json(note);

    // Catch any unexpected errors
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function deleteNote(req, res) {
  console.log("Deleting note...");

  // Destructure id from the request parameters
  const { id } = req.params;

  try {
    // Delete the note from the database by ID
    const [result] = await DB.query(
      `
        DELETE FROM notes
        WHERE id = ?`,
      [id]
    );

    // If no rows were affected, return a 404 error
    if (result.affectedRows === 0) {
      return res.status(HTTP_RESPONSE.NOT_FOUND).json({
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }

    // Respond with a success message
    console.log("Deleted note", id);
    res.status(HTTP_RESPONSE.OK).json({
      message: "Note deleted successfully",
    });

    // Catch any unexpected errors
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}
