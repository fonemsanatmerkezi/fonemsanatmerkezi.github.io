const icerik = document.getElementById("icerik");
let aktifData = {};
let aktifSanatci = "";

// ================= KATEGORİLER =================
kategorileriGoster();

function kategorileriGoster(){
  icerik.innerHTML = `
    <button class="btn" onclick="kategoriAc('pop')">Pop</button>
    <button class="btn" onclick="kategoriAc('arabesk')">Arabesk</button>
    <button class="btn" onclick="kategoriAc('rock')">Rock</button>
    <button class="btn" onclick="kategoriAc('grup')">Grup</button>
    <button class="btn" onclick="kategoriAc('sanat')">Sanat Müziği</button>
    <button class="btn" onclick="kategoriAc('halk_ozgun')">Halk / Özgün</button>
    <button class="btn" onclick="kategoriAc('yabanci')">Yabancı</button>
  `;
}

// ================= KATEGORİ AÇ =================
function kategoriAc(kategori){
  fetch(`data/${kategori}.json`)
    .then(r=>r.json())
    .then(data=>{
      aktifData = data;
      sanatcilariGoster();
    });
}

// ================= SANATÇILAR =================
function sanatcilariGoster(){
  icerik.innerHTML = `
    <button class="btn" onclick="kategorileriGoster()">← Kategoriler</button>
    <input placeholder="Sanatçı ara..." oninput="sanatciAra(this.value)">
    <div class="list" id="liste"></div>
  `;

  listeyiDoldur(Object.keys(aktifData));
}

function sanatciAra(q){
  const sonuc = Object.keys(aktifData)
    .filter(s => s.toLowerCase().includes(q.toLowerCase()));
  listeyiDoldur(sonuc);
}

function listeyiDoldur(sanatcilar){
  const liste = document.getElementById("liste");
  liste.innerHTML = "";

  sanatcilar
    .sort((a,b)=>a.localeCompare(b,"tr"))
    .forEach(s=>{
      const div = document.createElement("div");
      div.className="item";
      div.innerText=s;
      div.onclick=()=>sarkilariGoster(s);
      liste.appendChild(div);
    });
}

// ================= ŞARKILAR =================
function sarkilariGoster(sanatci){
  aktifSanatci = sanatci;

  icerik.innerHTML = `
    <button class="btn" onclick="sanatcilariGoster()">← Sanatçılar</button>
    <div class="list">
      ${aktifData[sanatci].map(s=>`
        <div class="item" onclick="sozGoster('${s}')">${s}</div>
      `).join("")}
    </div>
    <div id="soz"></div>
  `;
}

// ================= ŞARKI SÖZÜ =================
function sozGoster(sarki){
  const soz = document.getElementById("soz");
  soz.innerHTML = `
    <h3>${aktifSanatci} – ${sarki}</h3>
    <pre>Şarkı sözleri eklenecek.</pre>
  `;
  soz.scrollIntoView({behavior:"smooth"});
}
