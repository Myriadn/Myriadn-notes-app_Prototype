import AppHeader from './script/components/app-header.js';
import NoteCard from './script/components/note-card.js';
import AddNoteForm from './script/components/add-note-form.js';
import LoadingIndicator from './script/components/loading-indicator.js';
import { initializeApp } from './script/view/home.js';
import './styles/style.css';

// Registrasi Custom Elements
customElements.define('app-header', AppHeader);
customElements.define('note-card', NoteCard);
customElements.define('add-note-form', AddNoteForm);
customElements.define('loading-indicator', LoadingIndicator);

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', initializeApp);
