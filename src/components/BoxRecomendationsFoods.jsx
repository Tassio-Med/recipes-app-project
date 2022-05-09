import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BoxRecomendationsFoods extends React.Component {
  render() {
    const { objRecipeFoods } = this.props;

    const SIX = 6;

    return (
      <section className="boxRecomendations">
        <h3 className="titleRecomendationDrink">Recomendation</h3>
        <section className="boxRecomendation">
          {objRecipeFoods && objRecipeFoods.map((foodRecipe, index) => (
            <span
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <Link to={ `/foods/${foodRecipe.idMeal}` }>
                <input
                  className="imgRecipeDetailRec"
                  src={ foodRecipe.strMealThumb }
                  type="image"
                  alt="Imagem da comida recomendada"
                />
                <p>
                  {foodRecipe.strCategory}
                </p>
                <h5 data-testid={ `${index}-recomendation-title` }>
                  { foodRecipe.strMeal }
                </h5>
              </Link>
            </span>
          )).slice(0, SIX)}
        </section>
      </section>
    );
  }
}

BoxRecomendationsFoods.propTypes = {
  objRecipeFoods: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BoxRecomendationsFoods;
