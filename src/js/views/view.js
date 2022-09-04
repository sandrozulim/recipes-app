export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <i class="fa-solid fa-spinner"></i>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="recipe__message">
      <p> ${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
