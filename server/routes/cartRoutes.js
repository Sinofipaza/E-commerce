import bodyParser from "body-parser";
import { pool } from "../database/databaseConnection.js";
import { app } from "./expressApp.js";
import { verifyToken } from "../auth.js";
import { jwtDecode } from "jwt-decode";

app.use(bodyParser.json());

var tableName = process.argv[2] || "myCartTable";

/**
 * Handles the retrieval of cart items for a specific user.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.post("/cartItems", verifyToken, async (req, res) => { ... });
 */
app.post("/cartItems", verifyToken, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwtDecode(token);
    const { email } = decoded;
    const result = await pool.query(
      `SELECT * FROM ${tableName} WHERE softDelete=false AND ordered=false AND quantity>0 AND username=\'${email}\' ORDER BY price ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * Handles the retrieval of ordered cart items for a specific user.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.post("/ordered", verifyToken, async (req, res) => { ... });
 */
app.post("/ordered", verifyToken, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwtDecode(token);
    const { email } = decoded;
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

/**
 * Handles the saving of a new cart item for a specific user.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.post("/saveCartItem", verifyToken, async (req, res) => { ... });
 */
app.post("/saveCartItem", verifyToken, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwtDecode(token);
    const { email } = decoded;
    const username = email;
    const {
      name,
      description,
      price,
      quantity,
      imageurl,
      softdelete,
      ordered,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO ${tableName}( username, name, description, price, quantity, imageurl, softdelete, ordered ) VALUES( '${username}', '${name}', '${description}','${price}', '${quantity}', '${imageurl}','${softdelete}', '${ordered}')`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

/**
 * Handles the updating of a cart item for a specific user.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.put("/updateCartITem", verifyToken, async (req, res) => { ... });
 */
/**
 * Handles the updating of a cart item for a specific user.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.put("/updateCartITem", verifyToken, async (req, res) => { ... });
 */
app.put("/updateCartITem", verifyToken, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwtDecode(token);
    const { email } = decoded;
    const username = email;
    const {
      id,
      name,
      description,
      price,
      quantity,
      imageurl,
      softdelete,
      ordered,
      address,
    } = req.body;

    const result = await pool.query(
      `UPDATE ${tableName} SET username='${username}', name='${name}', description='${description}',price='${price}', quantity='${quantity}', imageurl='${imageurl}', softdelete='${softdelete}', ordered='${ordered}', address='${address}' WHERE id='${id}'`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.put("/deleteCartItem", verifyToken, async (req, res) => {
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

/**
 * Deletes all records from the specified table.
 *
 * @param {Request} req - The request object containing headers and body.
 * @param {Response} res - The response object to send back to the client.
 *
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 *
 * @throws {Error} - If there is an error processing the request.
 *
 * @example
 * app.delete("/deleteAll", verifyToken, async (req, res) => { ... });
 */
app.delete("/deleteAll", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`DELETE FROM ${tableName}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export { app };
