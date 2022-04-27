import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class ExploreFoods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleExploreFood: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/foods') {
      titleName = 'Explore Foods';
      this.setState({
        titleExploreFood: titleName,
      });
    }
  }

  render() {
    const { titleExploreFood } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExploreFood } />
        <p>teste</p>
      </>
    );
  }
}

ExploreFoods.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoods.contextType = MyContext;

export default ExploreFoods;
