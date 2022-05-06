import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BtnStartRecipe extends React.Component {
  render() {
    const { idFoodRecipe } = this.props;
    return (
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
  }
}

BtnStartRecipe.propTypes = {
  idFoodRecipe: PropTypes.string.isRequired,
};

export default BtnStartRecipe;
