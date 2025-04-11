import { DB } from '../database.js';

export async function createNote(email, password) {
    console.log("Creating User...");
    const [result] = await DB.query(`
        INSERT INTO user (email, password)
        VALUES (?, ?)`, [email, password]);
    const user =  await getUser(result.insertId)
    console.log("Created User", user);
    return user;
}

export async function getUser(id) {
    console.log("Retrieving User...");
    const [user] = await DB.query(`
        SELECT * FROM users
        WHERE id = ?`, [id]);
    console.log("Retrieved User", user[0]);
    return user[0];
}

export async function updateUser(id, email, password) {
    console.log("Updating User...");
    const [result] = await DB.query(`
        UPDATE users set
        email = ?,
        password = ?
        WHERE id = ?`, [email, password, id]);
    const user =  await getUser(id)
    console.log("Updated User", user);
    return user;
}

export async function deleteUser(id) {
    console.log("Deleting note...");
    const [user] = await DB.query(`
        DELETE FROM users
        WHERE id = ?`, [id]);
    console.log("Deleted note");
    return;
}