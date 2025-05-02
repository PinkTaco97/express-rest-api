// Import the mysql2 library to create a connection pool for MySQL database
import mysql from "mysql2";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } =
  process.env;

// Create a connection pool to the MySQL database using environment variables
const DB = mysql
  .createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
  })
  .promise();

export default DB;
