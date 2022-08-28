class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <i class="fa-solid fa-spinner"></i>
      </div>
      `;
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup() {
    return `
<figure class="recipe__fig">
      <img 
        src="${this.#data.image}"
        alt="${this.#data.title}"
      />
      <h1 class="recipe__fig--title">
        ${this.#data.title}
      </h1>
    </figure>

    <div class="recipe__details">
      <p>
        <i class="fa-regular fa-clock"></i>
        ${this.#data.cookingTime}
      </p>

      <p>
        <i class="fa-solid fa-people-group"></i>
        ${this.#data.servings}
        <i class="fa-solid fa-plus"></i>
        <i class="fa-solid fa-minus"></i>
      </p>

      <button>
        <i class="fa-regular fa-bookmark"></i>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h4>Recipe ingredients</h4>
      <ul>
      ${this.#data.ingredients
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
