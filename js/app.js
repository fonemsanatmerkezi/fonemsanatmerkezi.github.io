// JS gerçekten yükleniyor mu test
alert("JS yüklendi");

function loadPop() {
  fetch("veri/pop.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var listeDiv = document.getElementById("liste");
      var html = "<ul>";

      data.songs.forEach(function (song) {
        html += "<li>" + song.artist + " - " + song.title + "</li>";
      });

      html += "</ul>";
      listeDiv.innerHTML = html;
    })
    .catch(function (error) {
      alert("JSON okunamadı");
      console.log(error);
    });
}
