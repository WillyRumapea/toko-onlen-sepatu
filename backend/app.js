const express = require("express");
const app = express();
const database = require("./controller/conn");
const response = require("./controller/response");
const port = 3000;
const upload = require("./middleware/multerConfig");
const cors = require("cors");

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data-produk", (req, res) => {
  const query = "SELECT name, price, image_url FROM products";
  database.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }

    // Perbaiki data di backend
    const users = result.map((user) => ({
      ...user,
      image_url: user.image_url.trim() || "default.jpg", // Gunakan gambar default jika kosong
    }));

    console.log("Data dari database:", users); // Pastikan data yang dikirim ke EJS sudah benar
    res.render("index", { users: users, title: "produk" }); // Kirim data yang sudah dimodifikasi
  });
});

app.get("/tabel-barang", (req, res) => {
  const sql = "SELECT * FROM products";
  database.query(sql, (err, result) => {
    const mssg = ["Success get all data", "failed get data, something wrong"];
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, mssg[0], res);
    } else {
      response(404, result, mssg[1], res);
    }
  });
});

app.post("/upload-barang", upload.single("image_url"), (req, res) => {
  const { name, description, price, category, created_at } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "File tidak ditemukan!" });
  }

  const image_url = req.file.filename;

  console.log(req.body);
  console.log(req.file);

  const query = `INSERT INTO products (name, description, price, category, image_url, created_at) VALUES ('${name}', '${description}', '${price}', '${category}', '${image_url}', '${created_at}')`;

  database.query(query, (err, result) => {
    const mssg = ["Success input data barang", "sorry failed to input data"];
    if (err) throw err;
    if (result.affectedRows > 0) {
      const condition = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, condition, mssg[0], res);
    } else {
      response(404, condition, mssg[1], res);
    }
  });
});

app.put("/update-barang", upload.single("image_url"), (req, res) => {
  const { product_id, name, description, price, category, created_at } =
    req.body;
  const image_url = req.file.filename;
  const sql = `UPDATE products SET name = '${name}', description = '${description}', price = '${price}', category = '${category}', image_url = '${image_url}' ,created_at = '${created_at}' WHERE product_id = '${product_id}'`;

  database.query(sql, (err, result) => {
    const mssg = ["Success update data barang", "sorry failed to update data"];
    if (err) throw err;
    const condition = {
      isSuccess: result.affectedRows,
      id: result.insertId,
    };
    if (result?.affectedRows > 0) {
      response(200, condition, mssg[0], res);
    } else {
      response(404, condition, mssg[1], res);
    }
  });
});

app.delete("/hapus-barang", (req, res) => {
  const product_id = req.body;
  const sql = `DELETE FROM products WHERE product_id = ${product_id}`;

  database.query(sql, (err, result) => {
    const mssg = ["Success delete data barang", "sorry failed to update data"];
    if (err) throw err;
    if (result.affectedRows > 0) {
      const condition = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, condition, mssg[0], res);
    } else {
      response(404, condition, mssg[1], res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
