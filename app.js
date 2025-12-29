alert("app.js çalışıyor");
let sanatciListesi = [];
let aktifSanatcilar = [];

function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifSanatcilar = data.sanatcilar;
      sanatciListesi = data.sanatcilar;
      sanatcilariGoster(aktifSanatcilar);
      document.getElementById("geriBtn").style.display = "none";
    });
}

function sanatcilariGoster(sanatcilar) {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";

  sanatcilar.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => {
      sarkilariGoster(sanatci.sarkilar);
    };
    liste.appendChild(li);
  });
}

function sarkilariGoster(sarkilar) {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";

  sarkilar.forEach(sarki => {
    const li = document.createElement("li");
    li.textContent = sarki.ad;
    liste.appendChild(li);
  });

  document.getElementById("geriBtn").style.display = "inline-block";
}

function geri() {
  sanatcilariGoster(aktifSanatcilar);
  document.getElementById("geriBtn").style.display = "none";
}
