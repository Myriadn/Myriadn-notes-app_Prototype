// Web Component: App Header
export default class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <header>
              <h1>📝 Myriadn Notes App</h1>
          </header>
      `;
  }
}
