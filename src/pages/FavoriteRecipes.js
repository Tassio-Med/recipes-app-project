import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class FavoriteRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFavoriteRecipes: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/favorite-recipes') {
      titleName = 'Favorite Recipes';
      this.setState({
        titleFavoriteRecipes: titleName,
      });
    }
  }

  render() {
    const { titleFavoriteRecipes } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleFavoriteRecipes } />
        <p>teste</p>
      </>
    );
  }
}

FavoriteRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

FavoriteRecipes.contextType = MyContext;

export default FavoriteRecipes;
