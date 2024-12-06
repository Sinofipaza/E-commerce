<<<<<<< HEAD
import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "productsdb",
    password: "",
    port: 5432
})

export {pool}
=======
import pkg from "pg";
import dotenv from "dotenv"; //import dotenv package to load environment variables

dotenv.config();


const { Pool } = pkg;

const pool = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

})

pool
    .connect()
    .then(() => console.log('Connected to the PostgreSQL database.'))
    .catch(err => console.error('Connection to the PostgreSQL database failed.', err.stack));

export {pool};
>>>>>>> login/register
