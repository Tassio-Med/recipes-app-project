import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFood: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/foods') {
      titleName = 'Foods';
      this.setState({
        titleFood: titleName,
      });
    }
  };

  render() {
    const { titleFood } = this.state;
    return <Header titlePage={ titleFood } />;
  }
}

Foods.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Foods.contextType = MyContext;

export default Foods;
