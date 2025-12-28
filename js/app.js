function loadCategory(category) {
  fetch(`data/${category}.json`)
    .then(res => res.json())
    .then(data => {

      const listArea = document.getElementById("list-area");
      const lyricsArea = document.getElementById("lyrics-area");

      lyricsArea.innerHTML = "";

      if (data.mode === "artist") {
        let html = `<h2>${data.category}</h2><ul>`;
        data.artists.forEach(artist => {
          html += `<li>${artist}</li>`;
        });
        html += "</ul>";
        listArea.innerHTML = html;
        return;
      }

      if (data.mode === "song") {
        let html = `<h2>${data.category}</h2><ul>`;
        data.songs.forEach(song => {
          html += `
            <li onclick="loadLyrics('${song.lyricsFile}')">
              ${song.artist} – ${song.title}
            </li>`;
        });
        html += "</ul>";
        listArea.innerHTML = html;
      }
    });
}

function loadLyrics(file) {
  fetch(`lyrics/${file}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("lyrics-area").innerHTML = `
        <h3>${data.artist} – ${data.title}</h3>
        <pre>${data.lyrics}</pre>
      `;
    });
}
