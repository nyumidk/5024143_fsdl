const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const scene = document.getElementById("scene");
const message = document.getElementById("message");

candle.addEventListener("click", () => {
  flame.classList.add("out");
  scene.classList.remove("dark");
  scene.classList.add("light");
  message.classList.add("show");
});
