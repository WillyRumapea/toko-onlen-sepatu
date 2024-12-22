const hapusBarang = async (product_id) => {
  try {
    const response = await fetch("http://localhost:3000/hapus-barang", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    if (!response.ok) {
      throw new Error("gagal hapus barang");
    }

    const result = await response.json();
    if (result.success) {
      alert("Barang berhasil dihapus");
      getTabelBarang();
    } else {
      alert("Gagal menghapus barang");
    }
  } catch (err) {
    console.log(err);
    alert("gagal menghapus terjadi kesalahan");
  }
};

export default hapusBarang;
