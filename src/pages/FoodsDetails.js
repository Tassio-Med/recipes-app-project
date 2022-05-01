import React from 'react';
import MyContext from '../context/MyContext';

class FoodsDetails extends React.Component {
  render() {
    return <>teste</>;
  }
}

FoodsDetails.contextType = MyContext;

export default FoodsDetails;
