import React from 'react';
import PropTypes from 'prop-types';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class HeaderDetailsDrink extends React.Component {
  handleClickShare = () => {
    const { handleShareRecipe } = this.props;
    handleShareRecipe();
  }

  render() {
    const { shareIcon, whiteHeartIcon, objRecipeDrink, linkCopy } = this.props;

    const comparCopy = (linkCopy)
      ? (<span className="msgLinkCopy">Link copied!</span>) : '';

    return (
      <header className="headerDetailsDrink">
        <img
          className="imgRecipeDetailDrink"
          data-testid="recipe-photo"
          src={ objRecipeDrink.strDrinkThumb }
          alt="Imagem da receita"
        />
        <section className="subBoxHeader">
          <div className="boxTitlesDrink">
            <h2
              className="titleDetailDrink"
              data-testid="recipe-title"
            >
              { objRecipeDrink.strDrink }
            </h2>
            <h3
              data-testid="recipe-category"
              className="categoryRecipeDrink"
            >
              { objRecipeDrink.strAlcoholic }
            </h3>
          </div>
          <div className="boxMediaIcons">
            <input
              type="image"
              className="shareIconDrink"
              data-testid="share-btn"
              src={ shareIcon }
              alt="Ícone que para compartilhar a receita"
              onClick={ this.handleClickShare }
            />
            <input
              type="image"
              className="favoriteIconDrink"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Ícone que para favoritar a receita"
              onClick={ this.handleFavoriteRecipe }
            />
            { comparCopy }
          </div>
        </section>
      </header>
    );
  }
}

HeaderDetailsDrink.propTypes = {
  objRecipeDrink: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  shareIcon: PropTypes.string.isRequired,
  whiteHeartIcon: PropTypes.string.isRequired,
  handleShareRecipe: PropTypes.func.isRequired,
  linkCopy: PropTypes.bool.isRequired,
};

export default HeaderDetailsDrink;
