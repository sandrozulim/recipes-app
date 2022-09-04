import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results__results");
  _errorMessage = "No recipes found for your query! Please try again!";

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

export default new ResultsView();
