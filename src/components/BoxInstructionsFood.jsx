import PropTypes from 'prop-types';
import React from 'react';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BoxInstructionsFood extends React.Component {
  render() {
    const { objRecipeFood } = this.props;
    return (
      <section className="boxInstructions">
        <h3 className="titleBoxInstructions">Instruções</h3>
        <p data-testid="instructions" className="textOfInstructions">
          { objRecipeFood.strInstructions }
        </p>
      </section>
    );
  }
}

BoxInstructionsFood.propTypes = {
  objRecipeFood: PropTypes.shape({
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default BoxInstructionsFood;
