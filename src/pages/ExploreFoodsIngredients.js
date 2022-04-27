import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class ExploreFoodsIngredients extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFoodsIngred: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/foods/ingredients') {
      titleName = 'Explore Ingredients';
      this.setState({
        titleFoodsIngred: titleName,
      });
    }
  }

  render() {
    const { titleFoodsIngred } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleFoodsIngred } />
        <p>teste</p>
      </>
    );
  }
}

ExploreFoodsIngredients.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoodsIngredients.contextType = MyContext;

export default ExploreFoodsIngredients;
