import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';

class MyProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      isBtnDisable: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validatedLogin());
  };

  validatedLogin = () => {
    const { emailInput, passwordInput } = this.state;

    const regexEmail = (/^[^@]+@[^@]+\.[^@]+$/i);
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
  }

  handleBtnLogin = () => {
    const { emailInput } = this.state;

    const userEmail = emailInput;
    const userLogin = { email: `${userEmail}` };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(userLogin));
  }

  render() {
    const { Provider } = MyContext;
    const { children } = this.props;
    return (
      <Provider
        value={ { ...this.state,
          handleChange: this.handleChange,
          handleBtnLogin: this.handleBtnLogin } }
      >
        { children }
      </Provider>);
  }
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
