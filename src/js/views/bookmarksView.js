import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".header__bookmarks--results");
  _errorMessage = "No bookmarks yet!";

  _generateMarkup() {
    return this._data.map(this._generateMarkupResults).join("");
  }

  _generateMarkupResults(result) {
    return `
         <li>
                 <a href="#${result.id}">
                 <h4>${result.title}</h4>
                 <p>${result.publisher}</p> 
                 </a>
         </li>
        `;
  }
}

export default new BookmarksView();
