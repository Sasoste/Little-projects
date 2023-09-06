// Quiz app faite grâce au tuto de Web Dev Simplified : https://www.youtube.com/watch?v=riDzcEQbX6k

// On récupère les éléments du DOM écrit dans l'index.html
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex; // currentQuestionIndex permet de suivre la progression dans les questions.

// On ajoute des écouteurs d'évènement au clic sur les boutons start et next
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Démarre le quiz, cache le bouton start, donne une question aléatoire
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

// Charge nouvelle question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Réinitiliaser l'état avant la nouvelle question, en supprimant les boutons de réponses précédent
function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Affiche une question et ses réponses
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/* Gère le choix de la réponse au click sur le bouton, change la couleur des boutons en fonction de la bonne réponse, 
affiche bouton next pour continuer ou restart pour recommencer s'il n'y a plus de questions */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

// Met en évidence les bonnes et mauvaises réponses
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// Retire les classes précédentes
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// Questions du quiz avec leurs réponses
const questions = [
  {
    question: "What is 2 + 2",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Are there 6 answers ?",
    answers: [
      { text: "yes", correct: true },
      { text: "no", correct: false },
      { text: "no", correct: false },
      { text: "no", correct: false },
      { text: "no", correct: false },
      { text: "no", correct: false },
    ],
  },
];
