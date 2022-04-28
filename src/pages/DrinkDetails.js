import React from 'react';
import MyContext from '../context/MyContext';

class DrinkDetails extends React.Component {
  render() {
    return <h1>DrinkDetails</h1>;
  }
}

DrinkDetails.contextType = MyContext;

export default DrinkDetails;
