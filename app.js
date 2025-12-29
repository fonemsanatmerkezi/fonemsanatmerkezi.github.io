/* ==============================
   GLOBAL DEĞİŞKENLER
================================ */
let aktifSanatcilar = [];

/* ==============================
   YARDIMCI FONKSİYON
================================ */
function el(id) {
  return document.getElementById(id);
}

/* ==============================
   KATEGORİ YÜKLE
================================ */
function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifSanatcilar = data.sanatcilar;
      sanatcilariGoster(aktifSanatcilar);

      if (el("geriBtn")) el("geriBtn").style.display = "none";
      if (el("sozAlani")) el("sozAlani").style.display = "none";
    })
    .catch(err => console.error("Kategori yüklenemedi:", err));
}

/* ==============================
   SANATÇI LİSTESİ
================================ */
function sanatcilariGoster(sanatcilar) {
  const liste = el("liste");
  if (!liste) return;

  liste.innerHTML = "";
  if (el("sozAlani")) el("sozAlani").style.display = "none";

  sanatcilar.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => sarkilariGoster(sanatci.sarkilar);
    liste.appendChild(li);
  });
}

/* ==============================
   ŞARKI LİSTESİ
================================ */
function sarkilariGoster(sarkilar) {
  const liste = el("liste");
  if (!liste) return;

  liste.innerHTML = "";

  sarkilar.forEach(sarki => {
    const li = document.createElement("li");
    li.textContent = sarki.ad;
    li.onclick = () => sarkiSozuGoster(sarki);
    liste.appendChild(li);
  });

  if (el("geriBtn")) el("geriBtn").style.display = "inline-block";
}

/* ==============================
   ŞARKI SÖZÜ GÖSTER
================================ */
function sarkiSozuGoster(sarki) {
  const soz = el("sozAlani");
  if (!soz) return;

  soz.innerHTML = `
    <h3>${sarki.ad}</h3>
    <pre>${sarki.soz && sarki.soz.trim()
      ? sarki.soz
      : "Bu şarkının sözleri henüz eklenmedi."}</pre>
  `;

  soz.style.display = "block";
  soz.style.position = "relative";
  soz.style.zIndex = "999";

  // Ekrana otomatik kaydır
  soz.scrollIntoView({ behavior: "smooth" });
}

/* ==============================
   GERİ BUTONU
================================ */
function geri() {
  sanatcilariGoster(aktifSanatcilar);
  if (el("geriBtn")) el("geriBtn").style.display = "none";
}
