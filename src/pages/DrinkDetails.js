import PropTypes from 'prop-types';
import React from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
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
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idDrinkRecipe = params.idDrink;
    this.fetchRecipeById(idDrinkRecipe);
    this.handleStorageDoneRecipes(idDrinkRecipe);
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

  render() {
    const { objRecipeDrink, objRecipeFoods, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idDrinkRecipe, linkCopy } = this.state;

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
          whiteHeartIcon={ whiteHeartIcon }
          objRecipeDrink={ objRecipeDrink }
          handleShareRecipe={ this.handleShareRecipe }
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
