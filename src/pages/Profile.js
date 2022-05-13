import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import '../components/Header.css';

// const defaultEmail = { email: 'email@mail.com' };

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      titleProfile: '',
      // email: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/profile') {
      titleName = 'Profile';
      this.setState({
        titleProfile: titleName,
      });
    }
  };

  clearLocalStorage = () => {
    localStorage.clear('user');
  };

  render() {
    const { titleProfile } = this.state;
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));

    return (
      <>
        <HeaderNoSearch titlePage={ titleProfile } />
        <main>
          <div className="boxProfile">
            <p data-testid="profile-email" className="email">
              { userLocalStorage?.email }
            </p>
            <br />
            <Link to="/done-recipes">
              <button type="button" data-testid="profile-done-btn">
                Done Recipes
              </button>
            </Link>
            <br />
            <Link to="/favorite-recipes">
              <button type="button" data-testid="profile-favorite-btn">
                Favorite Recipes
              </button>
            </Link>
            <br />
            <Link to="/">
              <button
                type="button"
                data-testid="profile-logout-btn"
                onClick={ this.clearLocalStorage }
              >
                Logout
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Profile.contextType = MyContext;

export default Profile;
