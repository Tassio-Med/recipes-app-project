export const setFilterIngredientFood = async (ingredient) => {
  const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(urlIngredient);
  const data = await response.json();
  console.log('ingrediente', data);
  return data;
};

export const setFilterNameFood = async (name) => {
  const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(urlName);
  const data = await response.json();
  console.log('name', data);
  return data;
};

export const setFilterFirstLetterFood = async (firstLetter) => {
  const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(urlFirstLetter);
  const data = await response.json();
  console.log('FL', data);
  return data;
};
