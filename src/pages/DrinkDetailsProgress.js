import React from 'react';
import MyContext from '../context/MyContext';

class DrinkDetailsProgress extends React.Component {
  render() {
    return <h1>DrinkDetailsProgress</h1>;
  }
}

DrinkDetailsProgress.contextType = MyContext;

export default DrinkDetailsProgress;
