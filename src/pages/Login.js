import React from 'react';
import MyContext from '../context/MyContext';

class Login extends React.Component {
  render() {
    return <h1>Login</h1>;
  }
}

Login.contextType = MyContext;

export default Login;
