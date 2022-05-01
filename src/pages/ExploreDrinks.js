import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import { fetchAPIRandomDrink } from '../services/apiServicesDrinks';
import Footer from '../components/Footer';


class ExploreDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      titleExploreDrinks: '',
      idDrink: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    this.randomDrink();
  }

  randomDrink = async () => {
    this.setState({
      idDrink: await fetchAPIRandomDrink(),
    });
  };

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/drinks') {
      titleName = 'Explore Drinks';
      this.setState({
        titleExploreDrinks: titleName,
      });
    }
  };

  render() {
    const { titleExploreDrinks, idDrink } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExploreDrinks } />
        <main>
          <div>
            <Link to="/explore/drinks/ingredients">
              <button type="button" data-testid="explore-by-ingredient">
                By Ingredient
              </button>
            </Link>
            <Link to={ `/drinks/${idDrink}` }>
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

ExploreDrinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreDrinks.contextType = MyContext;

export default ExploreDrinks;
