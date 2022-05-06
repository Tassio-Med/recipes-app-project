export const setFilterIngredientFood = async (ingredient) => {
  const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(urlIngredient);
  const data = await response.json();
  // console.log('ingrediente', data);
  return data;
};

export const setFilterNameFood = async (name) => {
  const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('name', data);
  return data;
};

export const setFilterFirstLetterFood = async (firstLetter) => {
  const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(urlFirstLetter);
  const data = await response.json();
  // console.log('FL', data);
  return data;
};

export const setDefaultNameFood = async () => {
  const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('name lista geral', data);
  return data;
};

export const fetchAPIRandom = async () => {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
  );
  const data = await response.json();
  return data.meals[0].idMeal;
};

export const fetchCategoryListFood = async () => {
  const urlName = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('list', data);
  return data;
};

export const fetchIdFoodRecipe = async (idFoodRecipe) => {
  const urlById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodRecipe}`;
  const response = await fetch(urlById);
  const data = await response.json();
  const objRecipeFood = data.meals[0];
  return objRecipeFood;
};

// recomendations de Drinks para o foods
export const fetchDrinksRecipes = async () => {
  const urlDrinksRecipe = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const responseDrinks = await fetch(urlDrinksRecipe);
  const dataDrinks = await responseDrinks.json();
  const objRecipeDrinks = dataDrinks.drinks;
  return objRecipeDrinks;
};

export const fetchIngredientsFood = async () => {
  const urlName = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('blalba', data);
  return data;
};
