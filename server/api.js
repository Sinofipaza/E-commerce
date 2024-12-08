import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from './dbConfig.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//login endpoint
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

        //this comparess the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h'}
        )
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//when user registers on the platform
app.post('/register', async (req, res) => {
    const { name, surname, phone_number, email, password } = req.body;

    try {

      const hashedPassword = await bcrypt.hash(password, 10);
      
        // saves user's details into the database
        const result = await pool.query('INSERT INTO users (name, surname, phone_number, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *', 
            [name, surname, phone_number, email, password]
        );

        const token = jwt.sign(
          { id: result.rows[0].id, email:result.rows[0].id },
          process.env.JWT_SECRET,
          { expiresIn: '1h'}
        );

        req.status(201).json({ message: "User registered successfully", token});
        // res.json(result.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});
//email update
app.patch('/update-email/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body; 
    
    try {
      const result = await pool.query(
        `UPDATE users SET email = $1 WHERE id = $2 RETURNING *`,
        [email, id]
      );
      if (result.rows.length > 0) {
        res.json({ message: 'Email updated successfully', user: result.rows[0] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  //update user name
app.patch('/update-name/:id', async (req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body; // New name and surname to update
    
    try {
      const result = await pool.query(
        `UPDATE users SET name = $1, surname = $2 WHERE id = $3 RETURNING *`,
        [name, surname, id]
      );
      if (result.rows.length > 0) {
        res.json({ message: 'Name updated successfully', user: result.rows[0] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  //for deleting user 
  app.delete("/delete-user/:id", async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

export {app};