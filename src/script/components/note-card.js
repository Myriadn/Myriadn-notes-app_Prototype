// Web Component: Note Card
export default class NoteCard extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body", "created-at"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const date = new Date(this.getAttribute("created-at"));

    this.innerHTML = `
            <div class="note-card">
                <h3>${title}</h3>
                <p>${body}</p>
                <small>${date.toLocaleDateString()}</small>
            </div>
        `;
  }
}
