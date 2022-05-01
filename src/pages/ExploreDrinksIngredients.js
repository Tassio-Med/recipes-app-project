import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

class ExploreDrinksIngredients extends React.Component {
  constructor() {
    super();
    this.state = {
      titleDrinksIngred: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/drinks/ingredients') {
      titleName = 'Explore Ingredients';
      this.setState({
        titleDrinksIngred: titleName,
      });
    }
  };

  render() {
    const { titleDrinksIngred } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleDrinksIngred } />
        <Footer />
      </>
    );
  }
}

ExploreDrinksIngredients.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreDrinksIngredients.contextType = MyContext;

export default ExploreDrinksIngredients;
