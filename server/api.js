import express from "express";
import cors from "cors";
import { pool } from "./dbConfig.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

export { app };
