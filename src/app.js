import AppHeader from "./script/components/app-header.js";
import NoteCard from "./script/components/note-card.js";
import AddNoteForm from "./script/components/add-note-form.js";
import { initializeApp } from "./script/view/home.js";

// Registrasi Custom Elements
customElements.define("app-header", AppHeader);
customElements.define("note-card", NoteCard);
customElements.define("add-note-form", AddNoteForm);

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", initializeApp);
