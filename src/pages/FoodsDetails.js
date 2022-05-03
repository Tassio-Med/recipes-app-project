import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CardRecipeDrinks from '../components/CardRecipeDrinks';
import './FoodDetails.css';

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      objRecipeFood: '',
      objRecipeDrinks: '',
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idFoodRecipe = params.idFood;

    this.fetchRecipeById(idFoodRecipe);
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
    });
  }

  render() {
    const { objRecipeFood, objRecipeDrinks } = this.state;

    const keyUrlYoutube = objRecipeFood.strYoutube?.split('=')[1];
    // const teste = keyUrlYoutube?.split('=')[1];

    const SIX = 6;

    return (
      <>
        <header className="headerDetails">
          <img
            className="imgRecipeDetail"
            data-testid="recipe-photo"
            src={ objRecipeFood.strMealThumb }
            alt="Imagem da receita"
          />
          <h3
            data-testid="recipe-title"
          >
            { objRecipeFood.strMeal }
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
            { objRecipeFood.strCategory }
          </p>
        </header>
        <section
          className="boxIngredients"
        >
          <h4>Ingredientes</h4>
          <p data-testid="0-ingredient-name-and-measure">
            Lista de Ingredientes
          </p>
        </section>
        <section
          className="boxInstructions"
        >
          <h4>Instruções</h4>
          <p data-testid="instructions">
            { objRecipeFood.strInstructions }
          </p>
        </section>
        <section
          className="boxVideo"
        >
          <h4>Video</h4>
          <iframe
            data-testid="video"
            src={ `https://www.youtube.com/embed/${keyUrlYoutube}` }
            width="320"
            height="290"
            title="YouTube video player"
          />
        </section>
        <section
          className="boxRecomendations"
        >
          <h4>Recommended</h4>
          <div data-testid="0-recomendation-card">
            { objRecipeDrinks && objRecipeDrinks.map((drinkRecipe, index) => (
              <CardRecipeDrinks
                dataTestINDEX={ index }
                source={ drinkRecipe.strMealThumb }
                recipeCardName={ drinkRecipe.strMeal }
                key={ drinkRecipe.idMeal }
                idRecipe={ drinkRecipe.idMeal }
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

FoodsDetails.contextType = MyContext;

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodsDetails;
