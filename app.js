const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const notes = document.querySelector("#notes");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const item = document.createElement("li");
  const content = document.createElement("span");
  content.textContent = text;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Smazat";
  remove.setAttribute("aria-label", `Smazat poznámku: ${text}`);
  remove.addEventListener("click", () => item.remove());

  item.append(content, remove);
  notes.append(item);
  form.reset();
  input.focus();
});
