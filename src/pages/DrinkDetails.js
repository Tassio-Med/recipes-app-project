import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardRecipeFoods from '../components/CardRecipeFoods';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      objRecipeDrink: '',
      objRecipeFoods: '',
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idDrinkRecipe = params.idDrink;

    this.fetchRecipeById(idDrinkRecipe);
  }

  fetchRecipeById = async (idDrinkRecipe) => {
    const urlById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinkRecipe}`;
    const response = await fetch(urlById);
    const data = await response.json();
    const objRecipeDrink = data.drinks[0];

    const urlFoodsRecipe = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const responseFoods = await fetch(urlFoodsRecipe);
    const dataFoods = await responseFoods.json();
    const objRecipeFoods = dataFoods.meals;

    this.setState({
      objRecipeDrink,
      objRecipeFoods,
    });
  }

  render() {
    const { objRecipeDrink, objRecipeFoods } = this.state;
    // console.log(Object.entries(objRecipeDrink));

    // number index vai de 1 a 15;
    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;

    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeDrink)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeDrink[strIngredient]);
        arrayMeasures.push(objRecipeDrink[`strMeasure${index}`]);
      }
    }

    // console.log(arrayIngredients, arrayMeasures);

    const arrayIngredientAndMeasure = arrayIngredients
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));

    // console.log(arrayIngredientAndMeasure);

    const SIX = 6;

    return (
      <>
        <header className="headerDetails">
          <img
            className="imgRecipeDetail"
            data-testid="recipe-photo"
            src={ objRecipeDrink.strDrinkThumb }
            alt="Imagem da receita"
          />
          <h3
            data-testid="recipe-title"
          >
            { objRecipeDrink.strDrink }
          </h3>
          <input
            type="image"
            className="shareIcon"
            data-testid="share-btn"
            src={ shareIcon }
            alt="Ícone que para compartilhar a receita"
            onClick={ this.handleShareRecipe }
          />
          <input
            type="image"
            className="favoriteIcon"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="Ícone que para favoritar a receita"
            onClick={ this.handleFavoriteRecipe }
          />
          <p
            data-testid="recipe-category"
            className="categoryRecipe"
          >
            { objRecipeDrink.strAlcoholic }
          </p>
        </header>
        <section
          className="boxIngredients"
        >
          <h4>Ingredientes</h4>
          <div>
            {
              arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {ingredientAndMeasure}
                </p>
              ))
            }
          </div>
        </section>
        <section
          className="boxInstructions"
        >
          <h4>Instruções</h4>
          <p data-testid="instructions">
            { objRecipeDrink.strInstructions }
          </p>
        </section>
        <section
          className="boxRecomendations"
        >
          <h4>Recommended</h4>
          <div data-testid="0-recomendation-card">
            { objRecipeFoods && objRecipeFoods.map((foodRecipe, index) => (
              <CardRecipeFoods
                data-testid={ `${index}-recomendation-card` }
                dataTestINDEX={ index }
                source={ foodRecipe.strMealThumb }
                recipeCardName={ foodRecipe.strMeal }
                key={ foodRecipe.idMeal }
                idRecipe={ foodRecipe.idMeal }
              />
            )).slice(0, SIX)}
          </div>
        </section>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </>
    );
  }
}

DrinkDetails.contextType = MyContext;

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetails;
