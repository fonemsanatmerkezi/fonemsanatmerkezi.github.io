let aktifSanatcilar = [];
let seviye = "kategori";

const kategoriAlan = document.getElementById("kategoriAlan");
const liste = document.getElementById("liste");
const geriBtn = document.getElementById("geriBtn");
const arama = document.getElementById("arama");
const sozAlani = document.getElementById("sozAlani");

function kategoriSec(kategori){
  fetch(`data/${kategori}.json`)
    .then(r=>r.json())
    .then(d=>{
      aktifSanatcilar = d.sanatcilar;
      seviye = "sanatci";
      kategoriAlan.style.display="none";
      geriBtn.style.display="block";
      arama.style.display="block";
      sanatcilariGoster(aktifSanatcilar);
    });
}

function sanatcilariGoster(listeData){
  liste.innerHTML="";
  sozAlani.style.display="none";

  listeData.forEach(s=>{
    const li=document.createElement("li");
    li.textContent=s.ad;
    li.onclick=()=>sarkilariGoster(s.sarkilar);
    liste.appendChild(li);
  });
}

function sarkilariGoster(sarkilar){
  seviye="sarki";
  liste.innerHTML="";
  arama.style.display="none";

  sarkilar.forEach(s=>{
    const li=document.createElement("li");
    li.textContent=s.ad;
    li.onclick=()=>sozGoster(s);
    liste.appendChild(li);
  });
}

function sozGoster(sarki){
  sozAlani.innerHTML=`<h3>${sarki.ad}</h3><pre>${sarki.soz||"Söz eklenmedi"}</pre>`;
  sozAlani.style.display="block";
  window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
}

function geri(){
  if(seviye==="sarki"){
    seviye="sanatci";
    arama.style.display="block";
    sanatcilariGoster(aktifSanatcilar);
  }else{
    seviye="kategori";
    kategoriAlan.style.display="grid";
    liste.innerHTML="";
    geriBtn.style.display="none";
    arama.style.display="none";
    sozAlani.style.display="none";
  }
}

arama.addEventListener("input",()=>{
  const q=arama.value.toLowerCase();
  sanatcilariGoster(aktifSanatcilar.filter(s=>s.ad.toLowerCase().includes(q)));
});
