import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BoxRecomendationsDrinks extends React.Component {
  render() {
    const { objRecipeDrinks } = this.props;

    const SIX = 6;

    return (
      <section className="boxRecomendations">
        <h3 className="titleRecomendationDrink">Recomendation</h3>
        <section className="boxRecomendation">
          {objRecipeDrinks && objRecipeDrinks.map((drinkRecipe, index) => (
            <span
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <Link to={ `/drinks/${drinkRecipe.idDrink}` }>
                <input
                  className="imgRecipeDetailRec"
                  src={ drinkRecipe.strDrinkThumb }
                  type="image"
                  alt="Imagem da bebida recomendada"
                />
                <p>
                  {drinkRecipe.strAlcoholic}
                </p>
                <h5 data-testid={ `${index}-recomendation-title` }>
                  {drinkRecipe.strDrink}
                </h5>
              </Link>
            </span>
          )).slice(0, SIX)}
        </section>
      </section>
    );
  }
}

BoxRecomendationsDrinks.propTypes = {
  objRecipeDrinks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BoxRecomendationsDrinks;
