import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFood: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/foods') {
      titleName = 'Foods';
      this.setState({
        titleFood: titleName,
      });
    }
  };

  render() {
    const { dataName } = this.context;
    // console.log(dataName.meals[0].idMeal);
    const { titleFood } = this.state;
    const firstID = dataName.meals.idMeal;
    const pathRec = `/foods/${firstID}`;
    const compareDataName = dataName.length <= 1 ? <Redirect to={ pathRec } /> : dataName;
    return (
      <>
        <Header titlePage={ titleFood } />
        <main>{compareDataName}</main>
      </>
    );
  }
}

Foods.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Foods.contextType = MyContext;

export default Foods;
