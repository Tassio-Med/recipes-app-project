import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

class ExploreDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      titleExploreDrinks: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

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
    const { titleExploreDrinks } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExploreDrinks } />
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
