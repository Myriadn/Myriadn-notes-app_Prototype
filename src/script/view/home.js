import { notesData } from "../data/local/notes-data.js";

export function initializeApp() {
  const notesContainer = document.getElementById("notesContainer");

  function renderNotes() {
    notesContainer.innerHTML = "";
    notesData.forEach((note) => {
      const noteElement = document.createElement("note-card");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("created-at", note.createdAt);
      notesContainer.appendChild(noteElement);
    });
  }

  document.querySelector("add-note-form").addEventListener("add-note", (e) => {
    const newNote = {
      ...e.detail,
      id: `notes-${Date.now()}`,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    notesData.push(newNote);
    renderNotes();
  });

  renderNotes();
}
