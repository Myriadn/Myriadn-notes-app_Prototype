export class NotesData {
  static async getAllNotes() {
    showLoading();
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Gagal mengambil catatan');
      return data.data;
    } finally {
      hideLoading();
    }
  }

  static async addNote(note) {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Gagal menambah catatan');
    return data.data;
  }

  static async deleteNote(id) {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Gagal menghapus catatan');
    return data;
  }

  static async unarchiveNote(id) {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`,
      { method: 'POST' }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }

  static async archiveNote(id) {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || 'Gagal mengarsipkan catatan');
    return data;
  }

  static async getArchivedNotes() {
    const response = await fetch(
      'https://notes-api.dicoding.dev/v2/notes/archived'
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data; // Pastikan ini adalah array notes
  }
}

export function showLoading() {
  document.querySelector('loading-indicator').classList.remove('hidden');
}

export function hideLoading() {
  document.querySelector('loading-indicator').classList.add('hidden');
}
