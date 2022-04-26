import React from 'react';
import MyContext from '../context/MyContext';

class FoodsDetailsProgress extends React.Component {
  render() {
    return <h1>FoodsDetailsProgress</h1>;
  }
}

FoodsDetailsProgress.contextType = MyContext;

export default FoodsDetailsProgress;
