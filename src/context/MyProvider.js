import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';
import {
  setFilterIngredientFood,
  setFilterNameFood,
  setFilterFirstLetterFood,
  fetchCategoryListFood,
  setDefaultNameFood,
} from '../services/apiServicesFoods';
import {
  setFilterIngredientDrink,
  setFilterNameDrink,
  setFilterFirstLetterDrink,
  setDefaultNameDrink,
  fetchCategoryListDrink,
} from '../services/apiServicesDrinks';

class MyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordInput: '',
      emailInput: '',
      isBtnDisable: true,
      defaultDataFood: '',
      defaultDataDrink: '',
      dataName: '',
      searchValue: '',
      dataIngredient: '',
      dataFirstLetter: '',
      filterRadios: '',
      searchOn: false,
      userEmail: '',
      pathRec: '',
      categoryListFood: '',
      categoryListDrink: '',
      filterExploreIngredient: false,
    };
  }

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

  handleSearchFood = () => {
    this.conditionalApiCallFood();
    this.alertConditionalByOne();
    this.setState({
      searchOn: true,
    });
  };

  conditionalSearchFood = () => {
    const { dataName } = this.state;
    const firstIdFood = dataName.meals && dataName.meals.map((name) => (name.idMeal));
    if (dataName.meals?.length === 1) {
      const idFood = Number(firstIdFood);
      const pathRec = `foods/${idFood}`;
      this.setState({
        pathRec,
      });
    }
  }

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

  handleClickIngredient = (params) => {
    const ingredientName = params;
    this.setState({
      searchOn: true,
      filterRadios: 'ingredient',
      searchValue: ingredientName,
      filterExploreIngredient: true,
    });
  }

  handleSearchDrink = () => {
    this.conditionalApiCallDrink();
    this.alertConditionalByOne();
    this.setState({
      searchOn: true,
    });
  };

  conditionalSearchDrink = () => {
    const { dataName } = this.state;
    const firstIdDrink = dataName.drinks && dataName.drinks.map((name) => (name.idDrink));
    if (dataName.drinks?.length === 1) {
      const idDrink = Number(firstIdDrink);
      const pathRec = `drinks/${idDrink}`;
      this.setState({
        pathRec,
      });
    }
  }

  alertConditionalByOne = () => {
    const { searchValue, filterRadios } = this.state;
    if (filterRadios === 'firstLetter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  handleDefaultDataFood = async () => {
    const responseDefault = await setDefaultNameFood();
    this.setState({
      defaultDataFood: responseDefault,
    });
  }

  handleDefaultDataDrink = async () => {
    const responseDefault = await setDefaultNameDrink();
    this.setState({
      defaultDataDrink: responseDefault,
    });
  }

  handleCategoryListFood = async () => {
    const catList = await fetchCategoryListFood();
    this.setState({
      categoryListFood: catList.meals,
    });
  }

  handleCategoryListDrink = async () => {
    const catList = await fetchCategoryListDrink();
    this.setState({
      categoryListDrink: catList.drinks,
    });
  }

  handleUserEmail = () => {
    const userLocalStorage = localStorage.getItem('user');
    const userEmail = JSON.parse(userLocalStorage);
    this.setState({
      userEmail,
    });
  }

  handleChangeRadios = ({ target: { id, name } }) => {
    this.setState({
      [name]: id,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validatedLogin());
  };

  validatedLogin = () => {
    const { emailInput, passwordInput } = this.state;
    const regexEmail = /^[^@]+@[^@]+\.[^@]+$/i;
    const validEmail = regexEmail.test(emailInput);
    const SIX = 6;
    const validPassWord = passwordInput.length > SIX;
    const validLogin = validEmail && validPassWord;
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
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
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
          handleUserEmail: this.handleUserEmail,
          handleDefaultDataFood: this.handleDefaultDataFood,
          handleDefaultDataDrink: this.handleDefaultDataDrink,
          handleCategoryListFood: this.handleCategoryListFood,
          handleCategoryListDrink: this.handleCategoryListDrink,
          handleClickIngredient: this.handleClickIngredient,
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
