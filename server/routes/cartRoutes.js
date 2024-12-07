import bodyParser from "body-parser";
import { pool } from "../database/databaseConnection.js";
import { app } from "./expressApp.js";

app.use(bodyParser.json());

var tableName = process.argv[2] || "myCartTable";

app.post("/cartItems", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query(
      // `SELECT * FROM ${tableName} WHERE softDelete=false AND ordered=false AND quantity>0  ORDER BY price ASC`
      `SELECT * FROM ${tableName} WHERE softDelete=false AND ordered=false AND quantity>0 AND username=\'${email}\' ORDER BY price ASC`
    );
    console.log(result)
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/ordered", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query(
      `SELECT * FROM ${tableName} WHERE softDelete=false AND ordered=true AND quantity>0 AND username=\'${email}\' ORDER BY price ASC`
      // `SELECT * FROM ${tableName} WHERE softDelete=false AND ordered=true AND quantity>0 ORDER BY price ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.post("/saveCartItem", async (req, res) => {
  try {
    const {
      username,
      name,
      description,
      price,
      quantity,
      imageurl,
      softdelete,
      ordered,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO ${tableName}( username, name, description, price, quantity, imageurl, softdelete, ordered ) VALUES( \'${username}\', \'${name}\', \'${description}\',\'${price}\', \'${quantity}\', \'${imageurl}\',\'${softdelete}\', \'${ordered}\')`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.put("/updateCartITem", async (req, res) => {
  try {
    const {
      id,
      username,
      name,
      description,
      price,
      quantity,
      imageurl,
      softdelete,
      ordered,
    } = req.body;
    const result = await pool.query(
      `UPDATE ${tableName} SET username=\'${username}\', name=\'${name}\', description=\'${description}\',price=\'${price}\', quantity=\'${quantity}\', imageurl=\'${imageurl}\', softdelete=\'${softdelete}\', ordered=\'${ordered}\' WHERE id=\'${id}\'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.put("/deleteCartItem", async (req, res) => {
  try {
    const {
      id,
      username,
      name,
      description,
      price,
      quantity,
      imageurl,
      softdelete,
      ordered,
    } = req.body;
    const result = await pool.query(
      `UPDATE ${tableName} SET username=\'${username}\', name=\'${name}\', description=\'${description}\',price=\'${price}\', quantity=\'${quantity}\', imageurl=\'${imageurl}\', softdelete=\'${softdelete}\', ordered=\'${ordered}\' WHERE id=\'${id}\'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/deleteAll", async (req, res) => {
  try {
    const result = await pool.query(`DELETE FROM ${tableName}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export { app };
