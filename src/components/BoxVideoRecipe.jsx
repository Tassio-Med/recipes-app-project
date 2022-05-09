import PropTypes from 'prop-types';
import React from 'react';
import '../pages/FoodDetails.css';
import '../pages/Recomendation.css';

class BoxVideoRecipe extends React.Component {
  render() {
    const { objRecipeFood } = this.props;
    const keyUrlYoutube = objRecipeFood.strYoutube?.split('=')[1];
    return (
      <section className="boxVideo">
        <h3 className="titleBoxVideo">Video</h3>
        <iframe
          data-testid="video"
          src={ `https://www.youtube.com/embed/${keyUrlYoutube}` }
          width="350px"
          height="250px"
          title="YouTube video player"
        />
      </section>
    );
  }
}

BoxVideoRecipe.propTypes = {
  objRecipeFood: PropTypes.shape({
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default BoxVideoRecipe;
