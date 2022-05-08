import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './Recomendation.css';
import './DrinkDetails.css';
import { fetchIdDrinkRecipe, fetchFoodsRecipes } from '../services/apiServicesDrinks';
import HeaderDetailsDrink from '../components/HeaderDetailsDrink';
import BoxIngredientsDrink from '../components/BoxIngredientsDrink';
import BoxInstructionsDrink from '../components/BoxInstructionsDrink';
import BoxRecomendationsFoods from '../components/BoxRecomendationsFoods';
import MsgRecipeDrinkFinished from '../components/MsgRecipeDrinkFinished';
import BtnStartDrinkRecipe from '../components/BtnStartDrinkRecipe';
import BtnContinueDrinkRecipe from '../components/BtnContinueDrinkRecipe';

class DrinkDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      idDrinkRecipe: '',
      objRecipeDrink: {},
      objRecipeFoods: [],
      btnStartIsOn: true,
      recipeIsDone: false,
      progressRepiceIsOn: false,
      linkCopy: false,
      favoriteIsOn: false,
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idDrinkRecipe = params.idDrink;
    this.fetchRecipeById(idDrinkRecipe);
    this.handleStorageDoneRecipes(idDrinkRecipe);
    this.handleStorageFavoriteDrink(idDrinkRecipe);
  }

  fetchRecipeById = async (idDrinkRecipe) => {
    const objRecipeDrink = await fetchIdDrinkRecipe(idDrinkRecipe);
    const objRecipeFoods = await fetchFoodsRecipes();

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
    }
  }

  handleShareRecipe = () => {
    const { match } = this.props;
    const urlRecipeDrink = match.url;

    const urlBase = `http://localhost:3000${urlRecipeDrink}`;

    const copyUrlRecipe = clipboardCopy(urlBase);

    if (copyUrlRecipe) {
      this.setState({
        linkCopy: true,
      });
    }
  }

  handleStorageFavoriteDrink = (idDrinkRecipe) => {
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const favoriteRecipe = await objRecipeFood;

    if (storageFavoriteDrink === null) {
      this.setState({
        favoriteIsOn: false,
      });
      // console.log('setou na montagem pra false, sem filtro');
    }

    if (storageFavoriteDrink !== null) {
      const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));
      const filterInFavoriteRecipes = arrayFavoriteDrinks?.some(
        (favoriteDrink) => favoriteDrink.id === idDrinkRecipe
        && favoriteDrink.type === 'drink',
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
      console.log('setou pra false, depois do filtro na montagem');
      console.log(filterInFavoriteRecipes);
      console.log(idDrinkRecipe);
    }
  };

  setFavoriteFalseToTrue = (objRecipeDrink) => {
    console.log('setou no click pra true');
    console.log(objRecipeDrink);
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const favoriteRecipeDrink = {
      id: objRecipeDrink.idDrink,
      type: 'drink',
      nationality: '',
      category: objRecipeDrink.strCategory,
      alcoholicOrNot: objRecipeDrink.strAlcoholic,
      name: objRecipeDrink.strDrink,
      image: objRecipeDrink.strDrinkThumb,
    };

    if (storageFavoriteDrink === null) {
      // console.log('setou, de null p/ array, o primeiro obj, criando a chave');
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteRecipeDrink]));
    } else {
      // console.log('setou, o array, usando prevState e incluindo mais um obj');
      const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...arrayFavoriteDrinks, favoriteRecipeDrink]));
    }
  }

  setFavoriteTrueToFalse = (objRecipeDrink) => {
    console.log('setou no click pra false');
    const storageFavoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const arrayFavoriteDrinks = Array.from(Object(storageFavoriteDrink));

    const filterInFavoriteRecipes = arrayFavoriteDrinks?.filter(
      (favoriteDrink) => favoriteDrink.id !== objRecipeDrink.idDrink
        && favoriteDrink.type === 'drink',
    );
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...filterInFavoriteRecipes]));

    // console.log('oi', objRecipeDrink);
    // console.log([...filterInFavoriteRecipes]);
  }

  handleFavoriteBtn = async () => {
    const { favoriteIsOn, objRecipeDrink } = this.state;
    if (!favoriteIsOn) {
      this.setState({
        favoriteIsOn: true,
      }, () => this.setFavoriteFalseToTrue(objRecipeDrink));
    }
    if (favoriteIsOn) {
      this.setState({
        favoriteIsOn: false,
      }, () => this.setFavoriteTrueToFalse(objRecipeDrink));
    }
  }

  render() {
    const { objRecipeDrink, objRecipeFoods, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idDrinkRecipe, linkCopy,
      favoriteIsOn } = this.state;

    const comparContinueRecipe = (!btnStartIsOn && !recipeIsDone && progressRepiceIsOn)
      ? (<BtnContinueDrinkRecipe idDrinkRecipe={ idDrinkRecipe } />)
      : (<BtnStartDrinkRecipe idDrinkRecipe={ idDrinkRecipe } />);

    const conditinalBtnStartFinish = (!btnStartIsOn
      && !progressRepiceIsOn && recipeIsDone)
      ? (<MsgRecipeDrinkFinished />) : comparContinueRecipe;

    return (
      <>
        <HeaderDetailsDrink
          shareIcon={ shareIcon }
          handleShareRecipe={ this.handleShareRecipe }
          favoriteIcon={ favoriteIsOn }
          handleFavoriteBtn={ this.handleFavoriteBtn }
          objRecipeDrink={ objRecipeDrink }
          linkCopy={ linkCopy }
        />

        <BoxIngredientsDrink
          objRecipeDrink={ objRecipeDrink }
        />

        <BoxInstructionsDrink
          objRecipeDrink={ objRecipeDrink }
        />

        <BoxRecomendationsFoods objRecipeFoods={ objRecipeFoods } />

        { conditinalBtnStartFinish }
      </>
    );
  }
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetails;
