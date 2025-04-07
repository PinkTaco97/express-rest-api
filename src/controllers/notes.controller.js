import { DB } from '../database.js';

export async function getNotes() {
    console.log("Retrieving notes...");
    const [notes] = await DB.query('SELECT * FROM notes');
    console.log("Retrieved notes", notes);
    return notes;
}

export async function getNote(id) {
    console.log("Retrieving note...");
    const [note] = await DB.query(`
        SELECT * FROM notes
        WHERE id = ?`, [id]);
    console.log("Retrieved note", note[0]);
    return note[0];
}

export async function createNote(title, contents) {
    console.log("Create note...");
    const [result] = await DB.query(`
        INSERT INTO notes (title, contents)
        VALUES (?, ?)`, [title, contents]);
    const note =  await getNote(result.insertId)
    console.log("Updated note", note);
    return note;
}

export async function updateNote(id, title, contents) {
    console.log("Updating note...");
    const [result] = await DB.query(`
        UPDATE notes set
        title = ?,
        contents = ?
        WHERE id = ?`, [title, contents, id]);
    const note =  await getNote(id)
    console.log("Updated note", note);
    return note;
}

export async function deleteNote(id) {
    console.log("Deleting note...");
    const [note] = await DB.query(`
        DELETE FROM notes
        WHERE id = ?`, [id]);
    console.log("Deleted note");
    return;
}