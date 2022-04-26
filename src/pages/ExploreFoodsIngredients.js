import React from 'react';
import MyContext from '../context/MyContext';

class ExploreFoodsIngredients extends React.Component {
  render() {
    return <h1>ExploreFoodsIngredients</h1>;
  }
}

ExploreFoodsIngredients.contextType = MyContext;

export default ExploreFoodsIngredients;
