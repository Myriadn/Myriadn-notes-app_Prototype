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
    showLoading();
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Gagal menambah catatan');
      return data.data;
    } finally {
      hideLoading();
    }
  }

  static async deleteNote(id) {
    showLoading();
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${id}`,
        { method: 'DELETE' }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Gagal menghapus catatan');
      return data;
    } finally {
      hideLoading();
    }
  }

  static async unarchiveNote(id) {
    showLoading();
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } finally {
      hideLoading();
    }
  }

  static async archiveNote(id) {
    showLoading();
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
        { method: 'POST' }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Gagal mengarsipkan catatan');
      return data;
    } finally {
      hideLoading();
    }
  }

  static async getArchivedNotes() {
    showLoading();
    try {
      const response = await fetch(
        'https://notes-api.dicoding.dev/v2/notes/archived'
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.data;
    } finally {
      hideLoading();
    }
  }
}

export function showLoading() {
  document.querySelector('loading-indicator').classList.remove('hidden');
}

export function hideLoading() {
  document.querySelector('loading-indicator').classList.add('hidden');
}
