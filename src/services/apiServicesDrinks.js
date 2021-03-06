export const setFilterIngredientDrink = async (ingredient) => {
  const urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(urlIngredient);
  const data = await response.json();
  // console.log('ingrediente', data);
  return data;
};

export const setFilterNameDrink = async (name) => {
  const urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('name', data);
  return data;
};

export const setFilterFirstLetterDrink = async (firstLetter) => {
  const urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(urlFirstLetter);
  const data = await response.json();
  // console.log('FL', data);
  return data;
};

export const setDefaultNameDrink = async () => {
  const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('name', data);
  return data;
};

export const fetchAPIRandomDrink = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  );
  const data = await response.json();
  return data.drinks[0].idDrink;
};

export const fetchCategoryListDrink = async () => {
  const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('list', data);
  return data;
};

export const fetchIdDrinkRecipe = async (idDrinkRecipe) => {
  const urlById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinkRecipe}`;
  const response = await fetch(urlById);
  const data = await response.json();
  const objRecipeDrink = data.drinks[0];
  return objRecipeDrink;
};

// recomendations de Foods para o drink
export const fetchFoodsRecipes = async () => {
  const urlFoodsRecipe = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const responseFoods = await fetch(urlFoodsRecipe);
  const dataFoods = await responseFoods.json();
  const objRecipeFoods = dataFoods.meals;
  return objRecipeFoods;
};

export const fetchIngredientsDrink = async () => {
  const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(urlName);
  const data = await response.json();
  // console.log('blalba', data);
  return data;
};
