import React from 'react';
import MyContext from '../context/MyContext';

class ExploreFoods extends React.Component {
  render() {
    return <h1>ExploreFoods</h1>;
  }
}

ExploreFoods.contextType = MyContext;

export default ExploreFoods;
