import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import { fetchAPIRandom } from '../services/apiServicesFoods';
import Footer from '../components/Footer';

class ExploreFoods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleExploreFood: '',
      idRecipe: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    this.recipeRandom();
  }

  recipeRandom = async () => {
    this.setState({
      idRecipe: await fetchAPIRandom(),
    });
  };

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/foods') {
      titleName = 'Explore Foods';
      this.setState({
        titleExploreFood: titleName,
      });
    }
  };

  render() {
    const { titleExploreFood, idRecipe } = this.state;
    // console.log(idRecipe);

    return (
      <>
        <HeaderNoSearch titlePage={ titleExploreFood } />
        <main>
          <div>
            <Link to="/explore/foods/ingredients">
              <button type="button" data-testid="explore-by-ingredient">
                By Ingredient
              </button>
            </Link>
            <Link to="/explore/foods/nationalities">
              <button type="button" data-testid="explore-by-nationality">
                By Nationality
              </button>
            </Link>
            <Link to={ `/foods/${idRecipe}` }>
              <button type="button" data-testid="explore-surprise">
                Surprise me!
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

ExploreFoods.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoods.contextType = MyContext;

export default ExploreFoods;
