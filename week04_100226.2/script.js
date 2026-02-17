const nameInput = document.getElementById("name");
const ingredientsInput = document.getElementById("ingredients");
const stepsInput = document.getElementById("steps");
const addBtn = document.getElementById("addRecipe");
const recipeList = document.getElementById("recipeList");
const stats = document.getElementById("stats");

class Recipe {
  constructor(name, ingredients, steps) {
    this.name = name;
    this.ingredients = ingredients;
    this.steps = steps;
    this.favorite = false;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }
}

let recipes = [];

const updateStats = () => {
  let favCount = 0;

  for (let recipe of recipes) {
    if (recipe.favorite) favCount++;
  }

  stats.textContent =
    `🍪 Total: ${recipes.length} | ⭐ Favorites: ${favCount}`;
};

function renderRecipes() {
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.className = "recipe-card";

    li.innerHTML = `
      <h5>🍓 ${recipe.name}</h5>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Steps:</strong> ${recipe.steps}</p>
      <small>Tap card to ⭐ favorite</small>
    `;

    if (recipe.favorite) {
      li.classList.add("favorite");
    }

    li.addEventListener("click", () => {
      recipe.toggleFavorite();
      renderRecipes();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      recipes.splice(index, 1);
      renderRecipes();
    });

    li.appendChild(delBtn);
    recipeList.appendChild(li);
  });

  updateStats();
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const steps = stepsInput.value.trim();

  if (name !== "" && ingredients !== "" && steps !== "") {
    const newRecipe = new Recipe(name, ingredients, steps);
    recipes.push(newRecipe);

    nameInput.value = "";
    ingredientsInput.value = "";
    stepsInput.value = "";

    renderRecipes();
  } else {
    alert("Fill all fields 🥺");
  }
});
