import { NotesData } from '../data/api/notes-data.js';
import Swal from 'sweetalert2';

export default class NoteCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'body', 'created-at', 'id', 'archived'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const isArchived = this.getAttribute('archived') === 'true';

    const title = this.getAttribute('title') || '';
    const body = this.getAttribute('body') || '';
    const date = new Date(this.getAttribute('created-at'));
    const id = this.getAttribute('id');

    this.innerHTML = `
      <div class="note-card ${isArchived ? 'archived' : ''}">
        <h3>${title}</h3>
        <p>${body}</p>
        <footer>
          <small>${date.toLocaleDateString()}</small>
          <div class="action-buttons">
            <button class="delete-btn">Hapus</button>
            <button class="archive-btn">
              ${isArchived ? 'Aktifkan' : 'Arsipkan'}
            </button>
          </div>
        </footer>
      </div>
    `;

    // Event listener untuk tombol arsip
    this.querySelector('.archive-btn').addEventListener('click', async () => {
      this.dispatchEvent(
        new CustomEvent('note-updated', {
          bubbles: true, // <- Penting agar event bisa ditangkap parent
          composed: true,
        })
      );
      try {
        if (isArchived) {
          await NotesData.unarchiveNote(id);
        } else {
          await NotesData.archiveNote(id);
        }
        this.dispatchEvent(new CustomEvent('note-updated'));
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Terjadi kesalahan',
        });
      }
    });

    this.querySelector('.delete-btn').addEventListener('click', async () => {
      try {
        await NotesData.deleteNote(id);
        this.remove();
        this.dispatchEvent(new CustomEvent('note-updated'));
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Terjadi kesalahan',
        });
      }
    });
  }
}
