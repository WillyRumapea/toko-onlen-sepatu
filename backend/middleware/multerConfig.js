const multer = require("multer");

// Konfigurasi storage Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/gambarBarang"); // Folder tujuan untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Nama file unik
  },
});

// Filter untuk file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // File diterima
  } else {
    cb(new Error("Format file tidak didukung, hanya jpg atau png!"), false); // File ditolak
  }
};

// Buat instance Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Maksimal 5MB
});

module.exports = upload;
