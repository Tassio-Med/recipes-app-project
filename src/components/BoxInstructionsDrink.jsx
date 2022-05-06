import PropTypes from 'prop-types';
import React from 'react';
import '../pages/DrinkDetails.css';
import '../pages/Recomendation.css';

class BoxInstructionsDrink extends React.Component {
  render() {
    const { objRecipeDrink } = this.props;
    return (
      <section className="boxInstructions">
        <h3 className="titleBoxInstructions">Instruções</h3>
        <p data-testid="instructions" className="textOfInstructions">
          { objRecipeDrink.strInstructions }
        </p>
      </section>
    );
  }
}

BoxInstructionsDrink.propTypes = {
  objRecipeDrink: PropTypes.shape({
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default BoxInstructionsDrink;
