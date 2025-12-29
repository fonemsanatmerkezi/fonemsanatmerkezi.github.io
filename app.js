let aktifSanatcilar = [];

function kategoriYukle(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      aktifSanatcilar = data.sanatcilar;
      sanatcilariGoster(aktifSanatcilar);
      document.getElementById("geriBtn").style.display = "none";
      document.getElementById("sozAlani").style.display = "none";
    });
}

function sanatcilariGoster(sanatcilar) {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  document.getElementById("sozAlani").style.display = "none";

  sanatcilar.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => sarkilariGoster(sanatci.sarkilar);
    liste.appendChild(li);
  });
}

function sarkilariGoster(sarkilar) {
  const liste = document.getElementById("liste");
  liste.innerHTML = "";
  document.getElementById("sozAlani").style.display = "none";

  sarkilar.forEach(sarki => {
    const li = document.createElement("li");
    li.textContent = sarki.ad;
    li.onclick = () => sarkiSozuGoster(sarki);
    liste.appendChild(li);
  });

  document.getElementById("geriBtn").style.display = "inline-block";
}

function sarkiSozuGoster(sarki) {
  const sozDiv = document.getElementById("sozAlani");

  if (sarki.soz && sarki.soz.trim() !== "") {
    sozDiv.textContent = sarki.soz;
  } else {
    sozDiv.textContent = "Bu şarkının sözleri henüz eklenmedi.";
  }

  sozDiv.style.display = "block";
}

function geri() {
  sanatcilariGoster(aktifSanatcilar);
  document.getElementById("geriBtn").style.display = "none";
}
