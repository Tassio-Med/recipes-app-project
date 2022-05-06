import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BtnStartDrinkRecipe extends React.Component {
  render() {
    const { idDrinkRecipe } = this.props;
    return (
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
  }
}

BtnStartDrinkRecipe.propTypes = {
  idDrinkRecipe: PropTypes.string.isRequired,
};

export default BtnStartDrinkRecipe;
