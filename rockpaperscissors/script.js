// Pierre feuille ciseaux fait grâce au tutoriel de Bro Code : https://www.youtube.com/watch?v=n1_vHArDBRA

// On récupère les éléments HTML
const playerText = document.getElementById("playerText");
const computerText = document.getElementById("computerText");
const resultText = document.getElementById("resultText");
const choiceBtns = document.querySelectorAll(".choiceBtn");

// Variables pour stocker les choix et le résultat
let player;
let computer;
let result;

// Variables pour le score
let wins = 0;
let losses = 0;
let draws = 0;

/* On ajoute un écouteur de click sur chaque bouton, puis on appelle la fonction qui va déterminer le choix de l'ordinateur.
Ensuite, on affiche le choix des 2 à l'écran, le résultat, et le score */
choiceBtns.forEach((button) =>
  button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `Player: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = checkWinner();
  })
);

// Fonction qui va déterminer un chiffre aléatoire entre 1 et 3, et l'assimile à un des trois choix.
function computerTurn() {
  const randNum = Math.floor(Math.random() * 3) + 1;
  switch (randNum) {
    case 1:
      computer = "ROCK";
      break;
    case 2:
      computer = "PAPER";
      break;
    case 3:
      computer = "SCISSORS";
      break;
  }
}

/* Fonction qui va vérifier qui gagne, et qui va mettre le score à jour. Si les choix sont identiques c'est égalité, 
sinon ça respecte les règles du jeu et calcule qui est gagnant. */
function checkWinner() {
  let outcome;
  if (player == computer) {
    outcome = "Draw!";
    draws++;
  } else if (computer == "ROCK") {
    outcome = player == "PAPER" ? "You Win!" : "You Lose!";
    player == "PAPER" ? wins++ : losses++;
  } else if (computer == "PAPER") {
    outcome = player == "SCISSORS" ? "You Win!" : "You Lose!";
    player == "SCISSORS" ? wins++ : losses++;
  } else if (computer == "SCISSORS") {
    outcome = player == "ROCK" ? "You Win!" : "You Lose!";
    player == "ROCK" ? wins++ : losses++;
  }
  const scoreText = document.getElementById("scoreText");
  scoreText.textContent = `Score: ${wins}/${draws}/${losses}`;
  return outcome;
}
