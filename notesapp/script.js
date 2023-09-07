// Application Notes faite grâce au tuto de GreatStack : https://www.youtube.com/watch?v=n3U4jFbp05M

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes");
}

showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let noteDiv = document.createElement("div");
  let inputBox = document.createElement("p");
  let icons = document.createElement("i");
  noteDiv.className = "noteDiv";
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  icons.className = "fa-solid fa-trash";
  noteDiv.appendChild(inputBox);
  noteDiv.appendChild(icons);
  notesContainer.appendChild(noteDiv);
});

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
