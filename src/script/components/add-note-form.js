// Web Component: Add Note Form
export default class AddNoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
          <style>
              form {
                  max-width: 600px;
                  margin: 0 auto 2rem;
                  padding: 0 2rem;
              }
              
              .form-group {
                  margin-bottom: 1rem;
              }
              
              input, textarea {
                  width: 100%;
                  padding: 0.8rem;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 1rem;
                  margin-top: 0.3rem;
              }
              
              button {
                  background: #00b894;
                  color: white;
                  border: none;
                  padding: 1rem 2rem;
                  border-radius: 4px;
                  cursor: pointer;
                  font-weight: bold;
                  transition: opacity 0.2s;
              }
              
              button:disabled {
                  background: #b2bec3;
                  cursor: not-allowed;
              }
          </style>
          <form>
              <div class="form-group">
                  <input type="text" id="title" placeholder="Note title" required>
              </div>
              <div class="form-group">
                  <textarea id="body" rows="4" placeholder="Note content" required></textarea>
              </div>
              <button type="submit" disabled>Add Note</button>
          </form>
      `;

    this.form = this.shadowRoot.querySelector('form');
    this.titleInput = this.shadowRoot.getElementById('title');
    this.bodyInput = this.shadowRoot.getElementById('body');
    this.submitButton = this.shadowRoot.querySelector('button');

    this.setupValidation();
    this.setupEventListeners();
  }

  setupValidation() {
    const validate = () => {
      const isTitleValid = this.titleInput.value.trim().length >= 1;
      const isBodyValid = this.bodyInput.value.trim().length >= 1;
      this.submitButton.disabled = !(isTitleValid && isBodyValid);
    };

    this.titleInput.addEventListener('input', validate);
    this.bodyInput.addEventListener('input', validate);
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent('add-note', {
          detail: {
            title: this.titleInput.value,
            body: this.bodyInput.value,
          },
        })
      );
      this.form.reset();
    });
  }
}
