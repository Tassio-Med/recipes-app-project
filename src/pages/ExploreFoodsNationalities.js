import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreFoodsNationalities extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFoodsNacionalite: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/foods/nationalities') {
      titleName = 'Explore Nationalities';
      this.setState({
        titleFoodsNacionalite: titleName,
      });
    }
  };

  render() {
    const { titleFoodsNacionalite } = this.state;
    return (
      <>
        <Header titlePage={ titleFoodsNacionalite } />
        <Footer />
      </>
    );
  }
}

ExploreFoodsNationalities.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoodsNationalities.contextType = MyContext;

export default ExploreFoodsNationalities;
