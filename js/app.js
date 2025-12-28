function loadPop() {
  fetch("veri/pop.json")
    .then(res => res.json())
    .then(data => {
      const liste = document.getElementById("liste");
      let html = "<ul>";

      data.songs.forEach(song => {
        html += `<li onclick="showLyrics('${song.artist}','${song.title}','${song.lyrics}')">
          ${song.artist} – ${song.title}
        </li>`;
      });

      html += "</ul>";
      liste.innerHTML = html;
    })
    .catch(err => {
      alert("JSON okunamadı");
      console.error(err);
    });
}

function showLyrics(artist, title, lyrics) {
  document.getElementById("sozler").innerHTML = `
    <h3>${artist} – ${title}</h3>
    <pre>${lyrics}</pre>
  `;
}
