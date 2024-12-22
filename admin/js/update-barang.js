const formUpdateBarang = document.querySelector("#updateBarang");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product_id");
const inputProductId = document.querySelector('input[type="hidden"]');
inputProductId.value = productId;
console.log(productId);

formUpdateBarang.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formUpdateBarang);

  try {
    await fetch("http://localhost:3000/update-barang", {
      method: "PUT",
      body: formData,
    });
    alert("data berhasil di upload");
  } catch (err) {
    console.log("error", err);
    alert("terjadi sesuatu, gagal upload barang");
  }
});
