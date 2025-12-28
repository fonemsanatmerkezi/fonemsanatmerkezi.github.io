console.log("app.js çalışıyor");

document.addEventListener("DOMContentLoaded", function () {
  // Sayfa açılınca otomatik Pop yükle
  loadCategory("pop");
});

function loadCategory(category) {
  fetch("./data/" + category + ".json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("JSON bulunamadı");
      }
      return response.json();
    })
    .then(function (data) {
      var liste = document.getElementById("liste");
      liste.innerHTML = "";

      if (!data.songs || data.songs.length === 0) {
        liste.innerHTML = "<p>Bu kategoride şarkı yok</p>";
        return;
      }

      var ul = document.createElement("ul");

      data.songs.forEach(function (song) {
        var li = document.createElement("li");
        li.textContent = song.artist + " - " + song.title;
        ul.appendChild(li);
      });

      liste.appendChild(ul);
    })
    .catch(function (error) {
      var liste = document.getElementById("liste");
      liste.innerHTML = "<p>Liste yüklenemedi</p>";
      console.error(error);
    });
}
