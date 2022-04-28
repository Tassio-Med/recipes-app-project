import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class DoneRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      titleDoneRecipes: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/done-recipes') {
      titleName = 'Done Recipes';
      this.setState({
        titleDoneRecipes: titleName,
      });
    }
  }

  render() {
    const { titleDoneRecipes } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleDoneRecipes } />
        <p>teste</p>
      </>
    );
  }
}

DoneRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

DoneRecipes.contextType = MyContext;

export default DoneRecipes;
