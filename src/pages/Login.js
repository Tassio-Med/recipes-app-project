import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import './Login.css';

class Login extends React.Component {
  render() {
    const { handleChange, isBtnDisable, handleBtnLogin } = this.context;
    return (
      <div className="boxLogin">
        <h1 className="titleApp">[App Recipe]</h1>
        <section className="boxInputsLogin">
          <h2 className="subTitleLogin">Login</h2>
          <label
            className="labelInput"
            htmlFor="emailInput"
          >
            Email:
            <input
              className="inputEmail"
              type="text"
              name="emailInput"
              data-testid="email-input"
              onChange={ handleChange }
              placeholder="usuario@apprecipe.com"
            />
          </label>
          <label
            className="labelInput"
            htmlFor="passwordInput"
          >
            Password:
            <input
              className="inputPassword"
              type="password"
              name="passwordInput"
              data-testid="password-input"
              onChange={ handleChange }
              placeholder="*******"
            />
          </label>
          <Link to="/foods">
            <button
              className="btnLogin"
              type="button"
              data-testid="login-submit-btn"
              onClick={ handleBtnLogin }
              disabled={ isBtnDisable }
            >
              Enter
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

Login.contextType = MyContext;

export default Login;
