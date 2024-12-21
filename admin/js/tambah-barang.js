const formuploadbarang = document.querySelector("#uploadBarang");

formuploadbarang.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formuploadbarang);

  try {
    await fetch("http://localhost:3000/upload-barang", {
      method: "POST",
      body: formData,
    });
    alert("data berhasil di upload");
  } catch (err) {
    console.log("error", err);
    alert("terjadi sesuatu, gagal upload barang");
  }
});
