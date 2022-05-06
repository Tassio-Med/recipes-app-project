import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Recomendation.css';

class BtnContinueFoodRecipe extends React.Component {
  render() {
    const { idFoodRecipe } = this.props;
    return (
      <Link to={ `/foods/${idFoodRecipe}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnInitRecipeFood"
        >
          Continue Recipe
        </button>
      </Link>
    );
  }
}

BtnContinueFoodRecipe.propTypes = {
  idFoodRecipe: PropTypes.string.isRequired,
};

export default BtnContinueFoodRecipe;
