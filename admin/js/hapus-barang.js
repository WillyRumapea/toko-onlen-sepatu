// const hapuBarang = async (product_id) => {
//   try {
//     const response = await fetch("http://localhost:3000/hapus-barang", {
//       method: "DELETE",
//     });

//     if (!data.ok) {
//       throw new Error("gagal hapus barang");
//     }

//     const result = await response.json();
//     if (result.success) {
//       alert("Barang berhasil dihapus");
//       // Setelah berhasil dihapus, reload tabel barang
//       getTabelBarang();
//     } else {
//       alert("Gagal menghapus barang");
//     }
//   } catch (err) {
//     console.log(err);
//     alert("gagal menghapus terjadi kesalahan");
//   }
// };

// module.exports = hapuBarang;
