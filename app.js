let aktifKategoriData = {};
let aktifSanatci = "";
let aktifGorunum = "sanatci"; // sanatci | sarki

function el(id) {
  return document.getElementById(id);
}

// ================= KATEGORİ YÜKLE =================
function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifKategoriData = data;
      sanatcilariGoster();
      el("geriBtn").style.display = "none";
      el("sozAlani").style.display = "none";
    })
    .catch(() => {
      el("liste").innerHTML = "<li>Veri yüklenemedi</li>";
    });
}

// ================= SANATÇILAR =================
function sanatcilariGoster() {
  aktifGorunum = "sanatci";
  const liste = el("liste");
  liste.innerHTML = "";
  el("sozAlani").style.display = "none";

  Object.keys(aktifKategoriData)
    .sort((a, b) => a.localeCompare(b, "tr"))
    .forEach(sanatci => {
      const li = document.createElement("li");
      li.textContent = sanatci;
      li.onclick = () => sarkilariGoster(sanatci);
      liste.appendChild(li);
    });
}

// ================= ŞARKILAR =================
function sarkilariGoster(sanatci) {
  aktifGorunum = "sarki";
  aktifSanatci = sanatci;
  const liste = el("liste");
  liste.innerHTML = "";

  aktifKategoriData[sanatci].forEach(sarki => {
    const li = document.createElement("li");
    li.textContent = sarki;
    li.onclick = () => sarkiSozuGoster(sarki);
    liste.appendChild(li);
  });

  el("geriBtn").style.display = "inline-block";
}

// ================= ŞARKI SÖZÜ =================
function sarkiSozuGoster(sarki) {
  const soz = el("sozAlani");
  soz.innerHTML = `
    <h3>${aktifSanatci} – ${sarki}</h3>
    <pre>Şarkı sözleri eklenecek.</pre>
  `;
  soz.style.display = "block";
  soz.scrollIntoView({ behavior: "smooth" });
}

// ================= GERİ =================
function geri() {
  if (aktifGorunum === "sarki") {
    sanatcilariGoster();
    el("geriBtn").style.display = "none";
  }
}
