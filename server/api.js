import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from './auth.js';
import { pool } from "./database/databaseConnection.js";
import {app} from "./routes/expressApp.js"
import { jwtDecode } from "jwt-decode";




//login endpoint
app.post('/login', async (req, res) => {
    const email = req.body.email;
  const password = req.body.password;
  try {
      
    const saltRounds = 10;
    const myPlaintextPassword = password;

    const encryptedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        const results = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
    if (results.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } 
    const user = results.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h'}
        );

        res.status(200).json({ message: "Login successful", token});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
});

//when user registers on the platform
app.post('/register', async (req, res) => {
  
  const { name, surname, phone_number, email, password } = req.body;

  // const saltRounds = 10; //move this to env file
  const myPlaintextPassword = password;
  const encryptedPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);

  
    try {
//checks duplicate users
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
        // saves user's details into the database
        const result = await pool.query('INSERT INTO users (name, surname, phone_number, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *', 
            [name, surname, phone_number, email, encryptedPassword]
        );

        const token = jwt.sign(
          { id: result.rows[0].id, email: result.rows[0].email },
          process.env.JWT_SECRET,
          { expiresIn: '1h'}
        );

        res.status(201).json({ message: "User registered successfully", token});
        // res.json(result.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});
//email update
app.patch('/update-email/:id', verifyToken, async (req, res) => {
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
app.patch('/update-name/:id', verifyToken, async (req, res) => {
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
  app.delete("/delete-user/:id", verifyToken, async (req, res) => {
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

app.get("/products", async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT id, name, price, short_description, thumbnail_url FROM products;"
    );
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  try {
    const results = await pool.query("SELECT * FROM products WHERE id=$1;", [
      productId,
    ]);
    res.json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});


export {app};
