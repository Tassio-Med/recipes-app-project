import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './Recomendation.css';
import './DrinkDetails.css';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      idDrinkRecipe: '',
      objRecipeDrink: '',
      objRecipeFoods: '',
      btnStartIsOn: true,
      recipeIsDone: false,
      progressRepiceIsOn: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idDrinkRecipe = params.idDrink;

    this.fetchRecipeById(idDrinkRecipe);
    this.handleStorageDoneRecipes(idDrinkRecipe);
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
      idDrinkRecipe,
    });
  }

  handleStorageDoneRecipes = (idDrinkRecipe) => {
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const storageInProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (storageInProgressRecipes !== null) {
      const arrayDrinksInProgress = Array.from(Object.keys(
        storageInProgressRecipes.cocktails,
      ));

      const filterInProgressRecipes = arrayDrinksInProgress?.some(
        (progressRecipes) => progressRecipes.includes(idDrinkRecipe),
      );
      if (filterInProgressRecipes) {
        this.setState({
          progressRepiceIsOn: true,
          btnStartIsOn: false,
        });
      }
    }

    if (storageDoneRecipes !== null) {
      const filterDoneRecipes = storageDoneRecipes?.map((recipeDone) => recipeDone
        .id.includes(idDrinkRecipe));

      if (filterDoneRecipes) {
        this.setState({
          recipeIsDone: true,
          btnStartIsOn: false,
        });
      }
      // console.log(filterDoneRecipes);
    }
  }

  render() {
    const { objRecipeDrink, objRecipeFoods, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idDrinkRecipe } = this.state;
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
    const arrayIngredientAndMeasure = arrayIngredients
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    const SIX = 6;
    const msgRecipeFinished = (
      <section className="boxMsgFinished">
        <h4 className="msgRecipeFinished">
          Recipe is Finished
        </h4>
        <button
          className="btnDoItAgain"
          type="button"
        >
          Do it again!?
        </button>
      </section>
    );
    const btnStart = (
      <Link to={ `/drinks/${idDrinkRecipe}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeFood"
        >
          Start Recipe
        </button>
      </Link>
    );
    const btnContinueRecipe = (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btnInitRecipeFood"
      >
        Continue Recipe
      </button>
    );
    const comparContinueRecipe = (!btnStartIsOn && !recipeIsDone && progressRepiceIsOn)
      ? btnContinueRecipe : btnStart;

    const conditinalBtnStartFinish = (!btnStartIsOn
      && !progressRepiceIsOn && recipeIsDone) ? msgRecipeFinished : comparContinueRecipe;

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
        { conditinalBtnStartFinish }
      </>
    );
  }
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default DrinkDetails;
