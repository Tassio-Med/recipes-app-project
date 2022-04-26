import React from 'react';
import MyContext from '../context/MyContext';

class ExploreDrinks extends React.Component {
  render() {
    return <h1>ExploreDrinks</h1>;
  }
}

ExploreDrinks.contextType = MyContext;

export default ExploreDrinks;
