import React from 'react';
import MyContext from '../context/MyContext';

class Drinks extends React.Component {
  render() {
    return <h1>Drinks</h1>;
  }
}

Drinks.contextType = MyContext;

export default Drinks;
