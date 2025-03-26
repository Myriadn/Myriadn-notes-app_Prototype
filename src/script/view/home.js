import { NotesData } from '../data/api/notes-data.js';
import Swal from 'sweetalert2';

export async function initializeApp() {
  const notesList = document.getElementById('notes-list');
  const archivedList = document.getElementById('archived-list');

  if (!notesList || !archivedList) {
    console.error('Elemen container tidak ditemukan!');
    return;
  }

  async function renderNotes() {
    try {
      const activeNotes = await NotesData.getAllNotes();
      renderNoteList('#notes-list', activeNotes);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan',
      });
    }
  }

  async function renderArchivedNotes() {
    try {
      const archivedNotes = await NotesData.getArchivedNotes();
      renderNoteList('#archived-list', archivedNotes, true);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Terjadi kesalahan',
      });
    }
  }

  function renderNoteList(selector, notes, isArchived = false) {
    const container = document.querySelector(selector);
    container.innerHTML = '';

    notes.forEach((note) => {
      const noteCard = document.createElement('note-card');
      noteCard.setAttribute('id', note.id);
      noteCard.setAttribute('title', note.title);
      noteCard.setAttribute('body', note.body);
      noteCard.setAttribute('created-at', note.createdAt);
      noteCard.setAttribute('archived', isArchived.toString()); // <- Ini yang penting
      container.appendChild(noteCard);
    });
  }

  // Panggil kedua fungsi saat halaman dimuat
  document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
    renderArchivedNotes();
  });

  document.addEventListener('note-updated', () => {
    renderNotes();
    renderArchivedNotes();
  });

  document
    .querySelector('add-note-form')
    .addEventListener('add-note', async (e) => {
      const newNote = { title: e.detail.title, body: e.detail.body };
      try {
        await NotesData.addNote(newNote);
        await renderNotes();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Terjadi kesalahan',
        });
      }
    });

  await renderNotes();
}
