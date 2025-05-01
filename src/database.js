// Import the mysql2 library to create a connection pool for MySQL database
import mysql from "mysql2";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the MySQL database using environment variables
export default DB = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();
