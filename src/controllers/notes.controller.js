import { DB } from '../database.js';

export async function getNotes() {
    const [rows] = await DB.query('SELECT * FROM notes');
    return rows;
}

export async function getNote(id) {
    const [note] = await DB.query(`
        SELECT * FROM notes
        WHERE id = ?`, [id]);
    return note[0];
}

export async function createNote(title, contents) {
    const [result] = await DB.query(`
        INSERT INTO notes (title, contents)
        VALUES (?, ?)`, [title, contents]);
    return getNote(result.insertId);
}