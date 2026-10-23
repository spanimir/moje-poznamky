const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const notes = document.querySelector("#notes");
const storageKey = "moje-poznamky";
let savedNotes = JSON.parse(localStorage.getItem(storageKey) || "[]");

if (!Array.isArray(savedNotes)) savedNotes = [];
savedNotes = savedNotes.filter((note) => typeof note === "string");

function saveNotes() {
  localStorage.setItem(storageKey, JSON.stringify(savedNotes));
}

function addNoteToPage(text) {
  const item = document.createElement("li");
  const content = document.createElement("span");
  content.textContent = text;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Smazat";
  remove.setAttribute("aria-label", `Smazat poznámku: ${text}`);
  remove.addEventListener("click", () => {
    item.remove();
    const index = savedNotes.indexOf(text);
    if (index !== -1) savedNotes.splice(index, 1);
    saveNotes();
  });

  item.append(content, remove);
  notes.append(item);
}

savedNotes.forEach(addNoteToPage);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  savedNotes.push(text);
  addNoteToPage(text);
  saveNotes();
  form.reset();
  input.focus();
});
