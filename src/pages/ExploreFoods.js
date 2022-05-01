import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

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
  };

  render() {
    const { titleExploreFood } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExploreFood } />
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
