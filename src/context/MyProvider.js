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
      pathRec: '',
    };
  }

  handleSearchFood = () => {
    this.conditionalApiCallFood();
    this.alertConditionalByOne();
  };

  conditionalSearchFood = () => {
    const { dataName } = this.state;
    const firstIdFood = dataName.meals && dataName.meals.map((name) => (name.idMeal));

    if (dataName.meals?.length === 1) {
      const idFood = Number(firstIdFood);
      const pathRec = `foods/${idFood}`;
      // console.log(pathRec);

      this.setState({
        pathRec,
      });
    }
  }

  conditionalSearchDrink = () => {
    const { dataName } = this.state;
    const firstIdDrink = dataName.drinks && dataName.drinks.map((name) => (name.idDrink));

    if (dataName.drinks?.length === 1) {
      const idDrink = Number(firstIdDrink);
      const pathRec = `drinks/${idDrink}`;
      // console.log(pathRec);

      this.setState({
        pathRec,
      });
    }
  }

  handleSearchDrink = () => {
    this.conditionalApiCallDrink();
    this.alertConditionalByOne();
  };

  alertConditionalByOne = () => {
    const { searchValue, filterRadios } = this.state;
    if (filterRadios === 'firstLetter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  conditionalApiCallFood = async () => {
    const { searchValue, filterRadios } = this.state;
    let data;
    if (filterRadios === 'ingredient') {
      data = await setFilterIngredientFood(searchValue);
      this.setState({
        dataIngredient: data,
      });
    }
    if (filterRadios === 'name') {
      data = await setFilterNameFood(searchValue);
      this.setState({
        dataName: data,
      }, () => this.conditionalSearchFood());
    }
    if (filterRadios === 'firstLetter') {
      data = await setFilterFirstLetterFood(searchValue);
      this.setState({
        dataFirstLetter: data,
      });
    }
  };

  conditionalApiCallDrink = async () => {
    const { searchValue, filterRadios } = this.state;
    let data;
    if (filterRadios === 'ingredient') {
      data = await setFilterIngredientDrink(searchValue);
      this.setState({
        dataIngredient: data,
      });
    }
    if (filterRadios === 'name') {
      data = await setFilterNameDrink(searchValue);
      this.setState({
        dataName: data,
      }, () => this.conditionalSearchDrink());
    }
    if (filterRadios === 'firstLetter') {
      data = await setFilterFirstLetterDrink(searchValue);
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
