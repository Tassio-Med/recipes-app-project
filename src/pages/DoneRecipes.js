import React from 'react';
import MyContext from '../context/MyContext';

class DoneRecipes extends React.Component {
  render() {
    return <h1>DoneRecipes</h1>;
  }
}

DoneRecipes.contextType = MyContext;

export default DoneRecipes;
