import React from 'react';
import MyContext from '../context/MyContext';

class ExploreDrinksIngredients extends React.Component {
  render() {
    return <h1>ExploreDrinksIngredients</h1>;
  }
}

ExploreDrinksIngredients.contextType = MyContext;

export default ExploreDrinksIngredients;
