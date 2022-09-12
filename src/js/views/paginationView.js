import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".search-results__pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".fa-solid");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numberOfPages > 1) {
      return `
      <button  class="search-results__pagination--btn hidden">
            <i data-goto="${
              curPage - 1
            }" class="fa-solid fa-circle-chevron-left"></i>
          </button>
          <span>${curPage} / ${numberOfPages}</span>
      <button  class="search-results__pagination--btn">
            <i data-goto="${
              curPage + 1
            }" class="fa-solid fa-circle-chevron-right"></i>
          </button>
      `;
    }

    // Last page
    if (curPage === numberOfPages && numberOfPages > 1) {
      return `
      <button  class="search-results__pagination--btn">
            <i data-goto="${
              curPage - 1
            }" class="fa-solid fa-circle-chevron-left"></i>
          </button>
          <span>${curPage} / ${numberOfPages}</span>
          <button  class="search-results__pagination--btn hidden">
            <i data-goto="${
              curPage + 1
            }" class="fa-solid fa-circle-chevron-right"></i>
          </button>
      `;
    }

    // Other page
    if (curPage < numberOfPages) {
      return `
      <button  class="search-results__pagination--btn">
            <i data-goto="${
              curPage - 1
            }" class="fa-solid fa-circle-chevron-left "></i>
          </button>
          <span>${curPage} / ${numberOfPages}</span>
          <button  class="search-results__pagination--btn">
            <i data-goto="${
              curPage + 1
            }" class="fa-solid fa-circle-chevron-right"></i>
          </button>
      `;
    }

    // Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();
