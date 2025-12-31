const sound = document.getElementById("clickSound");

document.querySelectorAll(".slice").forEach(btn=>{
  btn.addEventListener("click",()=>{
    sound.currentTime = 0;
    sound.play();
  });
});
