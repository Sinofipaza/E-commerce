import pkg from "pg";
import dotenv from "dotenv"; //import dotenv package to load environment variables



const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool
    .connect()
    .then(() => console.log('Connected to the PostgreSQL database.'))
    .catch(err => console.error('Connection to the PostgreSQL database failed.', err.stack));

export {pool};
