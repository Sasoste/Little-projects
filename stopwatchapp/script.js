// Stopwatch fait à l'aide du tutoriel de Bro Code : https://www.youtube.com/watch?v=8Nsb9cjmOVA
// Modification du tutoriel : 1 seul bouton pour play/pause, un bouton tour pour mettre en mémoire un temps, rajout des icones fontawesome

const timeDisplay = document.querySelector("#timeDisplay");
const toggleBtn = document.querySelector("#toggleBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapsDiv = document.querySelector("#laps");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let started = false;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;
let lapCount = 0;
let lastLapTime = "";

toggleBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
    toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

lapBtn.addEventListener("click", () => {
  const lapTime = timeDisplay.textContent;

  if (lapTime !== lastLapTime) {
    lapCount++;
    const lapElement = document.createElement("div");
    lapElement.textContent = `Tour ${lapCount} : ${lapTime}`;
    lapsDiv.appendChild(lapElement);
    lastLapTime = lapTime;
  }
});

resetBtn.addEventListener("click", () => {
  paused = true;
  started = false;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = "00:00:00";
  lapsDiv.innerHTML = "";
  lapCount = 0;
});

function updateTime() {
  elapsedTime = Date.now() - startTime;

  ms = Math.floor((elapsedTime % 1000) / 10);
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  ms = pad(ms);
  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  timeDisplay.textContent = `${hrs}:${mins}:${secs}:${ms}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}
