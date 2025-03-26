export default class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="spinner"></div>
        <p>Memuat data...</p>
      `;
  }
}
