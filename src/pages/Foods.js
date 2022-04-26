import React from 'react';
import MyContext from '../context/MyContext';

class Foods extends React.Component {
  render() {
    return <h1>Foods</h1>;
  }
}

Foods.contextType = MyContext;

export default Foods;
