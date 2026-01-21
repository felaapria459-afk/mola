let csvData = [];

fetch("datamobilmola.csv")
  .then(res => res.text())
  .then(text => {

    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
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

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  tampilkanTabel(
    csvData.filter(row =>
      Object.values(row).some(v => v.toLowerCase().includes(keyword))
    )
  );
});

function tampilkanTabel(data) {
  const head = document.getElementById("tableHead");
  const body = document.getElementById("tableBody");

  head.innerHTML = "";
  body.innerHTML = "";

  if (!data.length) {
    body.innerHTML = `<tr><td colspan="99">Data tidak ditemukan</td></tr>`;
    return;
  }

  Object.keys(data[0]).forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    head.appendChild(th);
  });

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
