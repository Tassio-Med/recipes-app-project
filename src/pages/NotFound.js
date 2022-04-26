import React from 'react';
import MyContext from '../context/MyContext';

class NotFound extends React.Component {
  render() {
    return <h1>NotFound</h1>;
  }
}

NotFound.contextType = MyContext;

export default NotFound;
