import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './Recomendation.css';
import './FoodDetails.css';

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      idFoodRecipe: '',
      objRecipeFood: '',
      objRecipeDrinks: '',
      btnStartIsOn: true,
      recipeIsDone: false,
      progressRepiceIsOn: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idFoodRecipe = params.idFood;
    this.fetchRecipeById(idFoodRecipe);
    this.handleStorageDoneRecipes(idFoodRecipe);
  }

  fetchRecipeById = async (idFoodRecipe) => {
    const urlById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodRecipe}`;
    const response = await fetch(urlById);
    const data = await response.json();
    const objRecipeFood = data.meals[0];
    const urlDrinksRecipe = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const responseDrinks = await fetch(urlDrinksRecipe);
    const dataDrinks = await responseDrinks.json();
    const objRecipeDrinks = dataDrinks.drinks;

    this.setState({
      objRecipeFood,
      objRecipeDrinks,
      idFoodRecipe,
    });
  }

  handleStorageDoneRecipes = (idFoodRecipe) => {
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const storageInProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'));

    if (storageInProgressRecipes !== null) {
      const arrayFoodsInProgress = Array.from(Object.keys(
        storageInProgressRecipes.meals,
      ));

      const filterInProgressRecipes = arrayFoodsInProgress?.some(
        (progressRecipes) => progressRecipes.includes(idFoodRecipe),
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
        .id.includes(idFoodRecipe));

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
    const { objRecipeFood, objRecipeDrinks, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idFoodRecipe } = this.state;
    const keyUrlYoutube = objRecipeFood.strYoutube?.split('=')[1];
    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;
    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeFood)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeFood[strIngredient]);
        arrayMeasures.push(objRecipeFood[`strMeasure${index}`]);
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
      <Link to={ `/foods/${idFoodRecipe}/in-progress` }>
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
        <header className="headerDetailsFood">
          <img
            className="imgRecipeDetailFood"
            data-testid="recipe-photo"
            src={ objRecipeFood.strMealThumb }
            alt="Imagem da receita"
          />
          <section className="subBoxHeader">
            <div className="boxTitlesFood">
              <h2
                className="titleDetailFood"
                data-testid="recipe-title"
              >
                { objRecipeFood.strMeal }
              </h2>
              <h3
                data-testid="recipe-category"
                className="categoryRecipeFood"
              >
                { objRecipeFood.strCategory }
              </h3>
            </div>
            <div className="boxMediaIcons">
              <input
                type="image"
                className="shareIconFood"
                data-testid="share-btn"
                src={ shareIcon }
                alt="Ícone que para compartilhar a receita"
                onClick={ this.handleShareRecipe }
              />
              <input
                type="image"
                className="favoriteIconFood"
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="Ícone que para favoritar a receita"
                onClick={ this.handleFavoriteRecipe }
              />
            </div>
          </section>
        </header>
        <section className="boxIngredientsFood">
          <h3 className="titleIngredientsFood">Ingredientes</h3>
          <div className="boxListIngredientsFood">
            {
              arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
                <p
                  className="ingredientLineFood"
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
            { objRecipeFood.strInstructions }
          </p>
        </section>
        <section className="boxVideo">
          <h3 className="titleBoxVideo">Video</h3>
          <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${keyUrlYoutube}` }
            width="350px"
            height="250px"
            title="YouTube video player"
          />
        </section>
        <section className="boxRecomendations">
          <h3 className="titleRecomendationDrink">Recomendation</h3>
          <section className="boxRecomendation">
            { objRecipeDrinks && objRecipeDrinks.map((drinkRecipe, index) => (
              <span
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <Link to={ `/drinks/${drinkRecipe.idDrink}` }>
                  <input
                    className="imgRecipeDetailRec"
                    src={ drinkRecipe.strDrinkThumb }
                    type="image"
                    alt="Imagem da bebida recomendada"
                  />
                  <p>
                    { drinkRecipe.strAlcoholic}
                  </p>
                  <h5 data-testid={ `${index}-recomendation-title` }>
                    { drinkRecipe.strDrink }
                  </h5>
                </Link>
              </span>
            )).slice(0, SIX)}
          </section>
        </section>
        { conditinalBtnStartFinish }
      </>
    );
  }
}

FoodsDetails.contextType = MyContext;

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default FoodsDetails;
