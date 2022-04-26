import React from 'react';
import MyContext from '../context/MyContext';

class FoodsDetails extends React.Component {
  render() {
    return <h1>FoodsDetails</h1>;
  }
}

FoodsDetails.contextType = MyContext;

export default FoodsDetails;
