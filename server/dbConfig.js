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
