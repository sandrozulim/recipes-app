import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //Rendering spinner
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch (error) {
    alert(error.message);
  }
};

["hashchange", "load"].forEach((eventType) =>
  addEventListener(eventType, controlRecipes)
);
