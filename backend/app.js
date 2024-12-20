const express = require("express");
const app = express();
const database = require("./controller/conn");
const response = require("./controller/response");
const port = 3000;
const path = require("path");

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
