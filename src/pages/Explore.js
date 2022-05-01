import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  };

  render() {
    const { titleExplore } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleExplore } />
        <main>
          <div>
            <Link to="/explore/foods">
              <button type="button" data-testid="explore-foods">
                Explore Foods
              </button>
            </Link>
            <Link to="/explore/drinks">
              <button type="button" data-testid="explore-drinks">
                Explore Drinks
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  }
}

Explore.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Explore.contextType = MyContext;

export default Explore;
