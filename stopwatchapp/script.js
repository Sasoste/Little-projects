// Stopwatch fait à l'aide du tutoriel de Bro Code : https://www.youtube.com/watch?v=8Nsb9cjmOVA
// Modification du tutoriel : 1 seul bouton pour play/pause, un bouton tour pour mettre en mémoire un temps, rajout des icones fontawesome

// On récupère les éléments présents dans l'index.html
const timeDisplay = document.querySelector("#timeDisplay");
const toggleBtn = document.querySelector("#toggleBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapBtn = document.querySelector("#lapBtn");
const lapsDiv = document.querySelector("#laps");

// On initialise les différentes variables qui vont nous servir
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

// On ajoute un écouteur de click sur le bouton, qui permet de lancer le chronomètre, et le mettre en pause s'il est lancé.
toggleBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    paused = true;
    elapsedTime = Date.now() - startTime; // mise à jour pour permettre de reprendre au bon moment quand c'est paused
    clearInterval(intervalId);
    toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

// On ajoute un écouteur de click sur le bouton, qui permet de rajouter un tour si le temps est pas le même qu'avant
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

// On ajoute un écouteur au click du bouton, qui remet à zéro le chronomètre
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

// Fonction pour mettre à jour l'affichage du temps écoulé
function updateTime() {
  elapsedTime = Date.now() - startTime; // Calcul du temps écoulé

  // Math.floor pour arrondir, ce qui permet d'avoir les heures, puis le calcul pour les minutes, on arrondi pour laisser la place aux secondes etc
  ms = Math.floor((elapsedTime % 1000) / 10); // On calcule le nombre de ms mais /10 parce que l'affichage même des millisecondes est inutile
  secs = Math.floor((elapsedTime / 1000) % 60); // On calcule le nombre de secondes
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor(elapsedTime / (1000 * 60 * 60));

  ms = pad(ms);
  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  timeDisplay.textContent = `${hrs}:${mins}:${secs}:${ms}`;

  // Permet d'ajuster les affichages pour avoir toujours un affichage à 2 chiffres partout
  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}
