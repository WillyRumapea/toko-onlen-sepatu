const getTabelBarang = async () => {
  try {
    const data = await fetch("http://localhost:3000/tabel-barang");

    if (!data.ok) {
      throw new Error("data tidak ditemukan");
    }

    const result = await data.json();
    console.log(result);

    const tabelBarang = document.querySelector("#table-body");

    tabelBarang.innerHTML = "";

    if (Array.isArray(result.payload)) {
      result.payload.forEach((item) => {
        const formatedPrice = Number(item.price).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        });
        const row = document.createElement("tr");
        row.innerHTML = `
                <td class="px-4 py-2">${item.product_id}</td>
                <td class="px-4 py-2">${item.name}</td>
                <td class="px-4 py-2">${item.description}</td>
                <td class="px-4 py-2">${formatedPrice}</td>
                <td class="px-4 py-2">${item.category}</td>
                <td class="px-4 py-2"><img src="../../backend/gambarBarang/${item.image_url}" alt="" class="w-80"></td>
                <td class="px-4 py-2">${item.created_at}</td>
                <td class="px-4 py-2 flex flex-col">
                  <button class="border border-slate-50 rounded-lg p-4 text-white bg-yellow-500 text-center text-xl" id="updateBarang" data-product-id="${item.product_id}">update</button>
                  <button class="border border-slate-50 rounded-lg p-4 text-white bg-red-600 text-center text-xl" id="hapusBarang">hapus</button>
                </td>
                `;
        tabelBarang.appendChild(row);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

getTabelBarang();
