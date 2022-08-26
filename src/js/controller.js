const recipeContainer = document.querySelector(".recipe");

//REUSABLE RENDER SPINNER FUNCTION
const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
    <i class="fa-solid fa-spinner"></i>
    </div>
    `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

// FETCH AND RENDER RECIPE
const showRecipe = async function () {
  renderSpinner(recipeContainer);

  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    //Formatting defaults object keys from API
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
    // Rendering recipe
    recipeContainer.innerHTML = "";
    const markup = `
    <figure class="recipe__fig">
          <img 
            src="${recipe.image}"
            alt="${recipe.title}"
          />
          <h1 class="recipe__fig--title">
            ${recipe.title}
          </h1>
        </figure>

        <div class="recipe__details">
          <p>
            <i class="fa-regular fa-clock"></i>
            ${recipe.cookingTime}
          </p>

          <p>
            <i class="fa-solid fa-people-group"></i>
            ${recipe.servings}
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
          ${recipe.ingredients
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

    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    alert(error.message);
  }
};

showRecipe();
