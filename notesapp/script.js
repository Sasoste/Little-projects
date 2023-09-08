// Application Notes faite grâce au tuto de GreatStack : https://www.youtube.com/watch?v=n3U4jFbp05M

// On selectionne les élément HTML utiles
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// Fonction pour récupérer les notes présentes dans le localStorage
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

// Fonction pour mettre à jour la note dans le localStorage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// On ajoute un écouteur de click sur le bouton, qui va permettre de rajouter de créer la note dans l'HTML
createBtn.addEventListener("click", () => {
  let noteDiv = document.createElement("div"); // Créer une div, puis un p et enfin un i
  let inputBox = document.createElement("p");
  let icons = document.createElement("i");
  noteDiv.className = "noteDiv"; // On rajoute les class
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true"); // On ajoute l'attribut au p pour qu'il soit éditable
  icons.className = "fa-solid fa-trash";
  noteDiv.appendChild(inputBox); // On imbrique l'input et l'icone dans la div puis la div dans le container
  noteDiv.appendChild(icons);
  notesContainer.appendChild(noteDiv);
});

// On ajoute un écouteur de click sur l'icone, pour supprimer la note, ou pour mettre à jour le localStorage lors d'une modification de note
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    notes = document.querySelectorAll(".input-box");
    notes.forEach((note) => {
      note.onkeyup = function () {
        updateStorage();
      };
    });
  }
});
