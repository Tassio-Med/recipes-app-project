import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';
import {
  setFilterIngredientFood,
  setFilterNameFood,
  setFilterFirstLetterFood,
} from '../services/apiServicesFoods';
import {
  setFilterIngredientDrink,
  setFilterNameDrink,
  setFilterFirstLetterDrink,
} from '../services/apiServicesDrinks';

class MyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      isBtnDisable: true,
      filterRadios: '',
      searchValue: '',
      dataIngredient: '',
      dataName: '',
      dataFirstLetter: '',
    };
  }

  handleSearchFood = () => {
    this.conditionalApiCallFood();
    this.alertConditional();
  };

  handleSearchDrink = () => {
    this.conditionalApiCallDrink();
    this.alertConditional();
  };

  alertConditional = () => {
    const { searchValue, filterRadios } = this.state;
    if (filterRadios === 'firstLetter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  conditionalApiCallFood = () => {
    const { searchValue, filterRadios } = this.state;
    let data;
    if (filterRadios === 'ingredient') {
      data = setFilterIngredientFood(searchValue);
      this.setState({
        dataIngredient: data,
      });
    }
    if (filterRadios === 'name') {
      data = setFilterNameFood(searchValue);
      this.setState({
        dataName: data,
      });
    }
    if (filterRadios === 'firstLetter') {
      data = setFilterFirstLetterFood(searchValue);
      this.setState({
        dataFirstLetter: data,
      });
    }
  };

  conditionalApiCallDrink = () => {
    const { searchValue, filterRadios } = this.state;
    let data;
    if (filterRadios === 'ingredient') {
      data = setFilterIngredientDrink(searchValue);
      this.setState({
        dataIngredient: data,
      });
    }
    if (filterRadios === 'name') {
      data = setFilterNameDrink(searchValue);
      this.setState({
        dataName: data,
      });
    }
    if (filterRadios === 'firstLetter') {
      data = setFilterFirstLetterDrink(searchValue);
      this.setState({
        dataFirstLetter: data,
      });
    }
  };

  handleChangeRadios = ({ target: { id, name } }) => {
    this.setState({
      [name]: id,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => this.validatedLogin(),
    );
  };

  validatedLogin = () => {
    const { emailInput, passwordInput } = this.state;

    const regexEmail = /^[^@]+@[^@]+\.[^@]+$/i;
    const validEmail = regexEmail.test(emailInput);

    const SIX = 6;
    const validPassWord = passwordInput.length > SIX;

    const validLogin = validEmail && validPassWord;
    // console.log(validEmail, validPassWord);

    if (validLogin) {
      this.setState({
        isBtnDisable: false,
      });
    } else {
      this.setState({
        isBtnDisable: true,
      });
    }
  };

  handleBtnLogin = () => {
    const { emailInput } = this.state;

    const userEmail = emailInput;
    const userLogin = { email: `${userEmail}` };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(userLogin));
  };

  render() {
    const { Provider } = MyContext;
    const { children } = this.props;
    return (
      <Provider
        value={ {
          ...this.state,
          handleChange: this.handleChange,
          handleBtnLogin: this.handleBtnLogin,
          handleChangeRadios: this.handleChangeRadios,
          handleSearchFood: this.handleSearchFood,
          handleSearchDrink: this.handleSearchDrink,
        } }
      >
        {children}
      </Provider>
    );
  }
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
