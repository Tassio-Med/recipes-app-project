import React from 'react';
import MyContext from '../context/MyContext';

class ExploreFoodsNationalities extends React.Component {
  render() {
    return <h1>ExploreFoodsNationalities</h1>;
  }
}

ExploreFoodsNationalities.contextType = MyContext;

export default ExploreFoodsNationalities;
