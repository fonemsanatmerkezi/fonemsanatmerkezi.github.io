let aktifSanatcilar = [];

function el(id) {
  return document.getElementById(id);
}

function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifSanatcilar = data.sanatcilar;
      sanatcilariGoster(aktifSanatcilar);
      if (el("geriBtn")) el("geriBtn").style.display = "none";
      if (el("sozAlani")) el("sozAlani").style.display = "none";
    });
}

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

function sarkiSozuGoster(sarki) {
  const soz = el("sozAlani");
  if (!soz) return;

  soz.textContent =
    sarki.soz && sarki.soz.trim()
      ? sarki.soz
      : "Bu şarkının sözleri henüz eklenmedi.";

  soz.style.display = "block";
}

function geri() {
  sanatcilariGoster(aktifSanatcilar);
  if (el("geriBtn")) el("geriBtn").style.display = "none";
}
