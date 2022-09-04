import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((eventType) =>
      addEventListener(eventType, handler)
    );
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".servings");
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".fa-bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
<figure class="recipe__fig">
      <img 
        src="${this._data.image}"
        alt="${this._data.title}"
      />
      <h1 class="recipe__fig--title">
        ${this._data.title}
      </h1>
      <h3>${this._data.publisher}</h3>
    </figure>

    <div class="recipe__details">
      <p>
        <i class="fa-regular fa-clock"></i>
        ${this._data.cookingTime}
      </p>

      <p>
        <i class="fa-solid fa-people-group"></i>
        ${this._data.servings}

        <button>
        <i class="fa-solid fa-plus servings" data-update-to="${
          this._data.servings + 1
        }"></i>
        </button>

        <button>
        <i class="fa-solid fa-minus servings" data-update-to="${
          this._data.servings - 1
        }"></i>
        </button>
      
        </p>

      <button>
        <i class="${
          this._data.isBookmarked
            ? `fa-solid fa-bookmark bookmarked`
            : `fa-regular fa-bookmark `
        }"></i>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h4>Recipe ingredients</h4>
      <ul>
      ${this._data.ingredients
        .map((ingredient) => {
          return `
        <li>
        <span>${ingredient.quantity}</span>
        <span>${ingredient.unit}</span>
        <span>${ingredient.description}</span></li>
        `;
        })
        .join("")}
      </ul>
    </div>
`;
  }
}

export default new RecipeView();
