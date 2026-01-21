let csvData = [];

// GANTI nama file jika perlu
fetch("datamobil.csv")
  .then(res => res.text())
  .then(text => {

    // pecah baris & buang baris kosong
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");

    // AUTO DETEKSI delimiter
    const delimiter = lines[0].includes(";") ? ";" : ",";

    const headers = lines[0].split(delimiter).map(h => h.trim());

    csvData = lines.slice(1).map(line => {
      const values = line.split(delimiter);
      let obj = {};

      headers.forEach((h, i) => {
        obj[h] = values[i] ? values[i].trim() : "";
      });

      return obj;
    });

    tampilkanTabel(csvData);
  })
  .catch(err => console.error("CSV ERROR:", err));

// PENCARIAN
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const hasil = csvData.filter(row =>
    Object.values(row).some(val =>
      val.toLowerCase().includes(keyword)
    )
  );
  tampilkanTabel(hasil);
});

// TAMPILKAN TABEL
function tampilkanTabel(data) {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");

  head.innerHTML = "";
  body.innerHTML = "";

  if (!data.length) {
    body.innerHTML = `<tr><td colspan="99">Data tidak ditemukan</td></tr>`;
    return;
  }

  // HEADER
  data[0] && Object.keys(data[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    head.appendChild(th);
  });

  // ISI
  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}
