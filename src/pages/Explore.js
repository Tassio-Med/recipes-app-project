import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      titleExplore: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore') {
      titleName = 'Explore';
      this.setState({
        titleExplore: titleName,
      });
    }
  }

  render() {
    const { titleExplore } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExplore } />
        <p>teste</p>
      </>
    );
  }
}

Explore.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Explore.contextType = MyContext;

export default Explore;
