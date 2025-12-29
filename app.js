let aktifSanatcilar = [];

function el(id) {
  return document.getElementById(id);
}

/* KATEGORİ YÜKLE */
function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifSanatcilar = data.sanatcilar;
      sanatcilariGoster(aktifSanatcilar);
      el("geriBtn").style.display = "none";
      el("sozAlani").style.display = "none";
    })
    .catch(err => console.error("JSON yüklenemedi:", err));
}

/* SANATÇILAR */
function sanatcilariGoster(sanatcilar) {
  const liste = el("liste");
  liste.innerHTML = "";
  el("sozAlani").style.display = "none";

  sanatcilar.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => sarkilariGoster(sanatci.sarkilar);
    liste.appendChild(li);
  });
}

/* ŞARKILAR */
function sarkilariGoster(sarkilar) {
  const liste = el("liste");
  liste.innerHTML = "";

  sarkilar.forEach(sarki => {
    const li = document.createElement("li");
    li.textContent = sarki.ad;
    li.onclick = () => sarkiSozuGoster(sarki);
    liste.appendChild(li);
  });

  el("geriBtn").style.display = "inline-block";
}

/* ŞARKI SÖZÜ */
function sarkiSozuGoster(sarki) {
  const soz = el("sozAlani");

  soz.innerHTML = `
    <h3>${sarki.ad}</h3>
    <pre>${sarki.soz && sarki.soz.trim()
      ? sarki.soz
      : "Bu şarkının sözleri henüz eklenmedi."}</pre>
  `;

  soz.style.display = "block";
  soz.scrollIntoView({ behavior: "smooth" });
}

/* SANATÇILARA GERİ */
function geri() {
  sanatcilariGoster(aktifSanatcilar);
  el("geriBtn").style.display = "none";
}
