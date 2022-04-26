import React from 'react';
import MyContext from '../context/MyContext';

class Explore extends React.Component {
  render() {
    return <h1>Explore</h1>;
  }
}

Explore.contextType = MyContext;

export default Explore;
