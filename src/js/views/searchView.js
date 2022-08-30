import View from "./view.js";

class SearchView extends View {
  _parentElement = document.querySelector(".header__search");

  getQuery() {
    const query = this._parentElement.querySelector("input").value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector("input").value = "";
  }
}

export default new SearchView();
