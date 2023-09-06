// Calculatrice faite grâce au tuto de Web Dev Simplified : https://www.youtube.com/watch?v=j59qQ7YWLxw

// Classe pour gérer les fonctions de la calculatrice
class Calculator {
  // méthode pour créer et initialiser une nouvelle instance de classe (ça crée la calculatrice), les opérandes sont là où sont affichés les nombres
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  // Fonction pour effacer les données et réinitialiser la calculatrice pour un nouveau calcul
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // Fonction qui retire le dernier chiffre affiché à l'écran, en transformant en chaine de caractères l'opérande, puis en retirant le dernier caractère
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Fonction qui ajoute un nouveau chiffre à l'écran, avec la condition d'un seul point max
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Fonction qui permet de choisir quelle opération on va utiliser, puis ajoute la valeur de current à previous et réinitialise le current
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // Fonction qui permet de faire le calcul
  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "÷":
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // Fonction qui transforme le nombre pour qu'il soit agréable à lire
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]); // Suppression des éléments inutiles avec parseFloat
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      }); // Mise en forme anglaise, avec 0 chiffre après la virgule
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`; // Ajoute les décimales après la virgule
    } else {
      return integerDisplay;
    }
  }

  // Fonction qui met à jour l'écran en fonction de l'état actuel
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Création d'une nouvelle calculatrice
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Ajout d'un event listener au click sur un bouton chiffre
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Ajout d'un event listener au click sur un bouton opération
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Ajout d'un event listener au click sur le bouton égal
equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Ajout d'un event listener au click sur le bouton AC
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// Ajout d'un event listener au click sur le bouton égal delete
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
