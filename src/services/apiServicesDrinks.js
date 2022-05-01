export const setFilterIngredientDrink = async (ingredient) => {
  const urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(urlIngredient);
  const data = await response.json();
  console.log('ingrediente', data);
  return data;
};

export const setFilterNameDrink = async (name) => {
  const urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(urlName);
  const data = await response.json();
  console.log('name', data);
  return data;
};

export const setFilterFirstLetterDrink = async (firstLetter) => {
  const urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(urlFirstLetter);
  const data = await response.json();
  console.log('FL', data);
  return data;
};

export const fetchAPIRandomDrink = async () => {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  );
  const data = await response.json();
  return data.drinks[0].idDrink;
};
