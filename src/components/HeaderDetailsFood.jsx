import React from 'react';
import PropTypes from 'prop-types';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class HeaderDetailsFood extends React.Component {
  handleClickShare = () => {
    const { handleShareRecipe } = this.props;
    handleShareRecipe();
  }

  handleClickFavorite = () => {
    const { handleFavoriteBtn } = this.props;
    handleFavoriteBtn();
  }

  render() {
    const { shareIcon, favoriteIcon, objRecipeFood, linkCopy } = this.props;

    const comparFavorite = (favoriteIcon) ? blackHeartIcon : whiteHeartIcon;

    const comparCopy = (linkCopy)
      ? (<span className="msgLinkCopy">Link copied!</span>) : '';

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
              onClick={ this.handleClickShare }
            />
            <input
              type="image"
              className="favoriteIconFood"
              data-testid="favorite-btn"
              src={ comparFavorite }
              alt="Ícone que para favoritar a receita"
              onClick={ this.handleClickFavorite }
            />
            { comparCopy }
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
  handleShareRecipe: PropTypes.func.isRequired,
  favoriteIcon: PropTypes.bool.isRequired,
  handleFavoriteBtn: PropTypes.func.isRequired,
  linkCopy: PropTypes.bool.isRequired,
};

export default HeaderDetailsFood;
