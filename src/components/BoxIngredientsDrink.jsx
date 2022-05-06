import React from 'react';
import PropTypes from 'prop-types';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BoxIngredientsDrink extends React.Component {
  render() {
    const { objRecipeDrink } = this.props;

    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;
    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeDrink)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeDrink[strIngredient]);
        arrayMeasures.push(objRecipeDrink[`strMeasure${index}`]);
      }
    }
    // console.log(arrayIngredients);
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    // console.log(arrayIngredientAndMeasure);

    return (
      <section className="boxIngredientsDrink">
        <h3 className="titleIngredientsDrink">Ingredientes</h3>
        <div className="boxListIngredientsDrink">
          {
            arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
              <p
                className="ingredientLineDrink"
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                { ingredientAndMeasure }
              </p>
            ))
          }
        </div>
      </section>
    );
  }
}

BoxIngredientsDrink.propTypes = {
  objRecipeDrink: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BoxIngredientsDrink;
