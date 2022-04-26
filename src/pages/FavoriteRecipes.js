import React from 'react';
import MyContext from '../context/MyContext';

class FavoriteRecipes extends React.Component {
  render() {
    return <h1>FavoriteRecipes</h1>;
  }
}

FavoriteRecipes.contextType = MyContext;

export default FavoriteRecipes;
