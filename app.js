const clickSound = new Audio("assets/click.mp3");
clickSound.volume = 0.6;

document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    const link = btn.dataset.link;
    setTimeout(() => {
      window.location.href = link;
    }, 150);
  });
});

/* HOŞ GELDİNİZ SADECE 1 KEZ */
if (localStorage.getItem("welcomeShown")) {
  const w = document.getElementById("welcome");
  if (w) w.remove();
} else {
  localStorage.setItem("welcomeShown", "true");
}
