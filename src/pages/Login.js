import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

class Login extends React.Component {
  render() {
    const { handleChange, isBtnDisable, handleBtnLogin } = this.context;
    return (
      <>
        <h1>Login</h1>
        <section className="boxLogin">
          <label htmlFor="emailInput">
            Email:
            {' '}
            <input
              type="text"
              name="emailInput"
              data-testid="email-input"
              onChange={ handleChange }
              placeholder="usuario@apprecipe.com"
            />
          </label>
          <label htmlFor="passwordInput">
            Password:
            {' '}
            <input
              type="password"
              name="passwordInput"
              data-testid="password-input"
              onChange={ handleChange }
              placeholder="xxxxxx"
            />
          </label>
          <br />
          <Link to="/foods">
            <button
              type="button"
              data-testid="login-submit-btn"
              onClick={ handleBtnLogin }
              disabled={ isBtnDisable }
            >
              Enter
            </button>
          </Link>
        </section>
      </>
    );
  }
}

Login.contextType = MyContext;

export default Login;
