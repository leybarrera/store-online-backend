const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: "tu_usuario",
  host: "localhost",
  database: "tu_base_de_datos",
  password: "tu_contraseña",
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Rutas CRUD para productos
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4)",
      [nombre, descripcion, precio, stock]
    );
    res.status(201).send("Producto creado");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5",
      [nombre, descripcion, precio, stock, id]
    );
    res.send("Producto actualizado");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
    res.send("Producto eliminado");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Servidor backend ejecutándose en el puerto 3001");
});
