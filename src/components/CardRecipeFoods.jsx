import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class CardRecipeFoods extends React.Component {
  render() {
    const { dataTestINDEX, source, recipeCardName, idRecipe } = this.props;
    return (
      <Link to={ `/foods/${idRecipe}` }>
        <div
          className="eachCard"
          data-testid={ `${dataTestINDEX}-recipe-card` }
        >
          <img
            className="imgCard"
            src={ source }
            alt="Imagem da Receita"
            data-testid={ `${dataTestINDEX}-card-img` }
          />
          <p
            data-testid={ `${dataTestINDEX}-card-name` }
            className="titleCard"
          >
            { recipeCardName }
          </p>
        </div>
      </Link>
    );
  }
}

CardRecipeFoods.propTypes = {
  dataTestINDEX: PropTypes.number.isRequired,
  recipeCardName: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default CardRecipeFoods;
