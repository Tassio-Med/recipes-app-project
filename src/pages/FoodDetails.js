import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './Recomendation.css';
import './FoodDetails.css';
import { fetchIdFoodRecipe, fetchDrinksRecipes } from '../services/apiServicesFoods';
import HeaderDetailsFood from '../components/HeaderDetailsFood';
import BoxIngredientsFood from '../components/BoxIngredientsFood';
import BoxInstructionsFood from '../components/BoxInstructionsFood';
import BoxVideoRecipe from '../components/BoxVideoRecipe';
import MsgRecipeFoodFinished from '../components/MsgRecipeFoodFinished';
import BtnContinueFoodRecipe from '../components/BtnContinueFoodRecipe';
import BtnStartFoodRecipe from '../components/BtnStartFoodRecipe';
import BoxRecomendationsDrinks from '../components/BoxRecomendationsDrinks';

class FoodsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      idFoodRecipe: '',
      objRecipeFood: {},
      objRecipeDrinks: [],
      btnStartIsOn: true,
      recipeIsDone: false,
      progressRepiceIsOn: false,
      linkCopy: false,
      favoriteIsOn: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idFoodRecipe = params.idFood;
    this.fetchRecipeById(idFoodRecipe);
    this.handleStorageDoneRecipes(idFoodRecipe);
    this.handleStorageFavoriteFood(idFoodRecipe);
  }

  fetchRecipeById = async (idFoodRecipe) => {
    const objRecipeFood = await fetchIdFoodRecipe(idFoodRecipe);
    const objRecipeDrinks = await fetchDrinksRecipes();

    this.setState({
      objRecipeFood,
      objRecipeDrinks,
      idFoodRecipe,
    });
    // this.handleStorageFavoriteFood(objRecipeFood);
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
    }
  };

  handleShareRecipe = () => {
    const { match } = this.props;
    const urlRecipeFood = match.url;

    const urlBase = `http://localhost:3000${urlRecipeFood}`;

    const copyUrlRecipe = clipboardCopy(urlBase);

    if (copyUrlRecipe) {
      this.setState({
        linkCopy: true,
      });
    }
  }

  handleStorageFavoriteFood = (idFoodRecipe) => {
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const favoriteRecipe = await objRecipeFood;

    if (storageFavoriteFood === null) {
      this.setState({
        favoriteIsOn: false,
      });
      // console.log('setou na montagem pra false, sem filtro');
    }

    if (storageFavoriteFood !== null) {
      const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));
      const filterInFavoriteRecipes = arrayFavoriteFoods?.some(
        (favoriteFood) => favoriteFood.id === idFoodRecipe
        && favoriteFood.type === 'food',
      );

      if (filterInFavoriteRecipes) {
        this.setState({
          favoriteIsOn: true,
        });
        console.log('setou pra true, depois do filtro na montagem');
      }
      if (!filterInFavoriteRecipes) {
        this.setState({
          favoriteIsOn: false,
        });
      }
      // console.log('setou pra false, depois do filtro na montagem');
      console.log(filterInFavoriteRecipes);
      console.log(idFoodRecipe);
    }
  };

  setFavoriteFalseToTrue = (objRecipeFood) => {
    // console.log('setou no click pra true');
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const favoriteRecipeFood = {
      id: objRecipeFood.idMeal,
      type: 'food',
      nationality: objRecipeFood.strArea,
      category: objRecipeFood.strCategory,
      alcoholicOrNot: '',
      name: objRecipeFood.strMeal,
      image: objRecipeFood.strMealThumb,
    };

    if (storageFavoriteFood === null) {
      // console.log('setou, de null p/ array, o primeiro obj, criando a chave');
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteRecipeFood]));
    } else {
      // console.log('setou, o array, usando prevState e incluindo mais um obj');
      const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...arrayFavoriteFoods, favoriteRecipeFood]));
    }
  }

  setFavoriteTrueToFalse = (objRecipeFood) => {
    console.log('setou no click pra false');
    const storageFavoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrayFavoriteFoods = Array.from(Object(storageFavoriteFood));

    const filterInFavoriteRecipes = arrayFavoriteFoods?.filter(
      (favoriteFood) => favoriteFood.id !== objRecipeFood.idMeal
        && favoriteFood.type === 'food',
    );
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...filterInFavoriteRecipes]));

    // console.log('oi', objRecipeFood);
    // console.log([...filterInFavoriteRecipes]);
  }

  handleFavoriteBtn = async () => {
    const { favoriteIsOn, objRecipeFood } = this.state;
    if (!favoriteIsOn) {
      this.setState({
        favoriteIsOn: true,
      }, () => this.setFavoriteFalseToTrue(objRecipeFood));
    }
    if (favoriteIsOn) {
      this.setState({
        favoriteIsOn: false,
      }, () => this.setFavoriteTrueToFalse(objRecipeFood));
    }
  }

  render() {
    const { objRecipeFood, objRecipeDrinks, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idFoodRecipe, linkCopy,
      favoriteIsOn } = this.state;

    const comparContinueRecipe = (!btnStartIsOn && !recipeIsDone && progressRepiceIsOn)
      ? (<BtnContinueFoodRecipe idFoodRecipe={ idFoodRecipe } />)
      : (<BtnStartFoodRecipe idFoodRecipe={ idFoodRecipe } />);

    const conditinalBtnStartFinish = (!btnStartIsOn
      && !progressRepiceIsOn && recipeIsDone)
      ? (<MsgRecipeFoodFinished />) : comparContinueRecipe;

    return (
      <>
        <HeaderDetailsFood
          shareIcon={ shareIcon }
          handleShareRecipe={ this.handleShareRecipe }
          favoriteIcon={ favoriteIsOn }
          handleFavoriteBtn={ this.handleFavoriteBtn }
          objRecipeFood={ objRecipeFood }
          linkCopy={ linkCopy }
        />

        <BoxIngredientsFood
          objRecipeFood={ objRecipeFood }
        />

        <BoxInstructionsFood objRecipeFood={ objRecipeFood } />

        <BoxVideoRecipe objRecipeFood={ objRecipeFood } />

        <BoxRecomendationsDrinks objRecipeDrinks={ objRecipeDrinks } />

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
