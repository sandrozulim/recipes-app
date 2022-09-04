import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";

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

    //Rendering error
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render search results
    resultsView.render(model.getSearchResultsPage());

    //Render pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.isBookmarked) {
    model.addBookmark(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    recipeView.render(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  }
  console.log(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
