import express from "express";
import cors from "cors";

import { pool } from './dbConfig.js'

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })


app.get('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const results = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (results.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res .status(200).json({message: "Login succssful", user: results.rows[0]})
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export {app};