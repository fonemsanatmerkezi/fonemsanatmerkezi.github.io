let tumSanatcilar = [];

function loadCategory(kategori) {
  fetch(`data/${kategori}.json`)
    .then(res => res.json())
    .then(data => {
      tumSanatcilar = data.sanatcilar;
      sanatcilariGoster(tumSanatcilar, data.kategori);
    })
    .catch(err => {
      console.error(err);
      document.getElementById("liste").innerHTML =
        "<p>Bu kategori yüklenemedi.</p>";
    });
}

function sanatcilariGoster(liste, kategoriAdi) {
  const alan = document.getElementById("liste");

  alan.innerHTML = `
    <h2>${kategoriAdi}</h2>
    <input type="text" placeholder="Sanatçı ara..." oninput="sanatciAra(this.value)">
    <ul id="sanatciListe"></ul>
  `;

  const ul = document.getElementById("sanatciListe");

  liste.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => sarkilariGoster(sanatci);
    ul.appendChild(li);
  });
}

function sanatciAra(kelime) {
  const filtre = tumSanatcilar.filter(s =>
    s.ad.toLowerCase().includes(kelime.toLowerCase())
  );

  const ul = document.getElementById("sanatciListe");
  ul.innerHTML = "";

  filtre.forEach(sanatci => {
    const li = document.createElement("li");
    li.textContent = sanatci.ad;
    li.onclick = () => sarkilariGoster(sanatci);
    ul.appendChild(li);
  });
}

function sarkilariGoster(sanatci) {
  const alan = document.getElementById("liste");

  alan.innerHTML = `
    <h2>${sanatci.ad}</h2>
    <ul>
      ${sanatci.sarkilar.map(s => `<li>${s}</li>`).join("")}
    </ul>
  `;
}
