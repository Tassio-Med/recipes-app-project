import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';

class MyProvider extends React.Component {
  render() {
    const { Provider } = MyContext;
    const { children } = this.props;
    return <Provider value={ { ...this.state } }>{children}</Provider>;
  }
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
