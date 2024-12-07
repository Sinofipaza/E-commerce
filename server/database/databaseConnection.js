import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => {
    console.log("Database is connected.");
  })
  .catch((err) => {
    console.error("Error connecting to the database.");
  });

export { pool };