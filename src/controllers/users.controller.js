// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import jsonwebtoken for creating JWT tokens
import jwt from "jsonwebtoken";

// Import dotenv for environment variable management
import dotenv from "dotenv";

// Database connection.
import DB from "../database.js";

// Constants.
import {
  HTTP_RESPONSE,
  ERROR_MESSAGES,
} from "../constants/common.constants.js";

// Environment variables.
dotenv.config();
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

export async function createUser(req, res) {
  console.log("Creating User...");

  // Destructure email and password from the request body
  const { email, password } = req.body;

  // Validate that both email and password were provided
  if (!email || !password)
    return res
      .status(HTTP_RESPONSE.BAD_REQUEST)
      .json({ message: "Missing fields" });

  try {
    // Check if a user already exists with the same email
    const [users] = await DB.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    // If a user is found, return a 400 error
    if (users.length > 0)
      return res
        .status(HTTP_RESPONSE.BAD_REQUEST)
        .json({ message: ERROR_MESSAGES.USER_ALREADY_REGISTERED });

    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await DB.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);

    // Respond with success message
    res
      .status(HTTP_RESPONSE.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    // Catch any unexpected errors
    return res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function getUser(req, res) {
  console.log("Retrieving User...");

  // Destructure id from the request parameters
  const { id } = req.params;

  try {
    // Get the user from the database by ID
    const [user] = await DB.query(
      `
        SELECT * FROM users
        WHERE id = ?`,
      [id]
    );

    // If no user is found, return a 404 error
    if (users.length === 0)
      return res
        .status(HTTP_RESPONSE.NOT_FOUND)
        .json({ message: "User not found" });

    // Respond with the user data
    console.log("Retrieved User", user[0]);
    return res.json(user[0]);

    // Catch any unexpected errors
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function updateUser(req, res) {
  console.log("Updating User...");

  // Destructure id from the request parameters
  const { id } = req.params;

  // Destructure email and password from the request body
  const { email, password } = req.body;

  // Validate that at least one field is provided for update
  if (!email || !password || !id)
    return res
      .status(HTTP_RESPONSE.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.MISSING_FIELDS });

  try {
    // Hash the password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user in the database
    await DB.query(
      `
        UPDATE users set
        email = ?,
        password = ?
        WHERE id = ?`,
      [email, hashedPassword, id]
    );
    console.log("Updated User", id);

    // Catch any unexpected errors
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  console.log("Deleting User...");

  // Destructure id from the request parameters
  const { id } = req.params;

  // Validate that at least one field is provided for update
  if (!id)
    return res
      .status(HTTP_RESPONSE.BAD_REQUEST)
      .json({ message: "No user id provided" });

  try {
    // Delete the user from the database
    await DB.query(
      `
        DELETE FROM users
        WHERE id = ?`,
      [id]
    );
    console.log("Deleted User", id);
    // Catch any unexpected errors
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  console.log("Logging in User...");

  // Destructure email and password from the request body
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(HTTP_RESPONSE.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.MISSING_FIELDS });

  try {
    // Check if a user exists with the provided email
    const [users] = await DB.query(
      `
        SELECT * FROM users
        WHERE email = ?`,
      [email]
    );

    // If no user is found, return a 401 error
    if (users.length === 0)
      return res
        .status(HTTP_RESPONSE.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });

    // Compare the provided password with the hashed password in the database
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return a 401 error
    if (!valid)
      return res
        .status(HTTP_RESPONSE.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Respond with the token and user data
    res.status(HTTP_RESPONSE.OK).json({
      token,
      message: ERROR_MESSAGES.USER_LOGIN_SUCCESS,
      user: {
        id: user.id,
        email: user.email,
      },
    });
    console.log("Logged in User", user);

    // Catch any unexpected errors
  } catch (error) {
    res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
}
