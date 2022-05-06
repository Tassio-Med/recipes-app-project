import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './Recomendation.css';
import './FoodDetails.css';
import { fetchIdFoodRecipe, fetchDrinksRecipes } from '../services/apiServicesFoods';
import HeaderDetailsFood from '../components/HeaderDetailsFood';
import BoxIngredientsFood from '../components/BoxIngredientsFood';
import MsgRecipeFiniched from '../components/MsgRecipeFinished';
import BtnContinueRecipe from '../components/BtnContinueRecipe';
import BtnStartRecipe from '../components/BtnStartRecipe';
import BoxInstructionsFood from '../components/BoxInstructions';
import BoxVideoRecipe from '../components/BoxVideoRecipe';
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
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const idFoodRecipe = params.idFood;
    this.fetchRecipeById(idFoodRecipe);
    this.handleStorageDoneRecipes(idFoodRecipe);
  }

  fetchRecipeById = async (idFoodRecipe) => {
    const objRecipeFood = await fetchIdFoodRecipe(idFoodRecipe);
    const objRecipeDrinks = await fetchDrinksRecipes();

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
    }
  };

  render() {
    const { objRecipeFood, objRecipeDrinks, recipeIsDone,
      progressRepiceIsOn, btnStartIsOn, idFoodRecipe } = this.state;

    const comparContinueRecipe = (!btnStartIsOn && !recipeIsDone && progressRepiceIsOn)
      ? (<BtnContinueRecipe idFoodRecipe={ idFoodRecipe } />)
      : (<BtnStartRecipe idFoodRecipe={ idFoodRecipe } />);

    const conditinalBtnStartFinish = (!btnStartIsOn
      && !progressRepiceIsOn && recipeIsDone)
      ? (<MsgRecipeFiniched />) : comparContinueRecipe;

    return (
      <>
        <HeaderDetailsFood
          shareIcon={ shareIcon }
          whiteHeartIcon={ whiteHeartIcon }
          objRecipeFood={ objRecipeFood }
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
