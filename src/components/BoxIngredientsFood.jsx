import React from 'react';
import PropTypes from 'prop-types';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BoxIngredientsFood extends React.Component {
  render() {
    const { objRecipeFood } = this.props;

    const arrayIngredients = [];
    const arrayMeasures = [];
    const FIFTEEN = 15;
    for (let index = 1; index <= FIFTEEN; index += 1) {
      const strIngredient = `strIngredient${index}`;
      if ((objRecipeFood)[strIngredient] !== null) {
        arrayIngredients.push(objRecipeFood[strIngredient]);
        arrayMeasures.push(objRecipeFood[`strMeasure${index}`]);
      }
    }
    // console.log(arrayIngredients);
    const arrayIngredientAndMeasure = arrayIngredients
      .filter((element) => element !== '' && element !== ' ')
      .map((item, index) => (arrayMeasures[index] !== undefined
        ? `${item} - ${arrayMeasures[index]}` : item));
    // console.log(arrayIngredientAndMeasure);

    return (
      <section className="boxIngredientsFood">
        <h3 className="titleIngredientsFood">Ingredientes</h3>
        <div className="boxListIngredientsFood">
          { arrayIngredientAndMeasure.map((ingredientAndMeasure, index) => (
            <p
              className="ingredientLineFood"
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredientAndMeasure}
            </p>
          ))}
        </div>
      </section>
    );
  }
}

BoxIngredientsFood.propTypes = {
  objRecipeFood: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BoxIngredientsFood;
