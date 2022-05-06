import React from 'react';
import PropTypes from 'prop-types';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class HeaderDetailsFood extends React.Component {
  render() {
    const { shareIcon, whiteHeartIcon, objRecipeFood } = this.props;
    // console.log(objRecipeFood);

    return (
      <header className="headerDetailsFood">
        <img
          className="imgRecipeDetailFood"
          data-testid="recipe-photo"
          src={ objRecipeFood?.strMealThumb }
          alt="Imagem da receita"
        />
        <section className="subBoxHeader">
          <div className="boxTitlesFood">
            <h2
              className="titleDetailFood"
              data-testid="recipe-title"
            >
              {objRecipeFood?.strMeal}
            </h2>
            <h3
              data-testid="recipe-category"
              className="categoryRecipeFood"
            >
              {objRecipeFood?.strCategory}
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
    );
  }
}

HeaderDetailsFood.propTypes = {
  objRecipeFood: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
  shareIcon: PropTypes.string.isRequired,
  whiteHeartIcon: PropTypes.string.isRequired,
};

export default HeaderDetailsFood;
