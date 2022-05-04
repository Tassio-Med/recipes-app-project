import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './Recomendation.css';
import './DrinkDetails.css';

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
        <header className="headerDetailsDrink">
          <img
            className="imgRecipeDetailDrink"
            data-testid="recipe-photo"
            src={ objRecipeDrink.strDrinkThumb }
            alt="Imagem da receita"
          />
          <section className="subBoxHeader">
            <div className="boxTitlesDrink">
              <h2
                className="titleDetailDrink"
                data-testid="recipe-title"
              >
                { objRecipeDrink.strDrink }
              </h2>
              <h3
                data-testid="recipe-category"
                className="categoryRecipeDrink"
              >
                { objRecipeDrink.strAlcoholic }
              </h3>
            </div>
            <div className="boxMediaIcons">
              <input
                type="image"
                className="shareIconDrink"
                data-testid="share-btn"
                src={ shareIcon }
                alt="Ícone que para compartilhar a receita"
                onClick={ this.handleShareRecipe }
              />
              <input
                type="image"
                className="favoriteIconDrink"
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Ícone que para favoritar a receita"
                onClick={ this.handleFavoriteRecipe }
              />
            </div>
          </section>
        </header>
        <section className="boxIngredientsDrink">
          <h3 className="titleIngredientsDrink">Ingredientes</h3>
          <div className="boxListIngredientsDrink">
            {
              arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
                <p
                  className="ingredientLineDrink"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {ingredientAndMeasure}
                </p>
              ))
            }
          </div>
        </section>
        <section className="boxInstructions">
          <h3 className="titleBoxInstructions">Instruções</h3>
          <p data-testid="instructions" className="textOfInstructions">
            { objRecipeDrink.strInstructions }
          </p>
        </section>
        <section className="boxRecomendations">
          <h3 className="titleRecomendationFood">Recomendation</h3>
          <section className="boxRecomendation">
            { objRecipeFoods && objRecipeFoods.map((foodRecipe, index) => (
              <span
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <input
                  className="imgRecipeDetailRec"
                  src={ foodRecipe.strMealThumb }
                  type="image"
                  alt="Imagem da bebida recomendada"
                />
                <p>
                  { foodRecipe.strCategory}
                </p>
                <h5 data-testid={ `${index}-recomendation-title` }>
                  { foodRecipe.strMeal }
                </h5>
              </span>
            )).slice(0, SIX)}
          </section>
        </section>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeDrink"
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
