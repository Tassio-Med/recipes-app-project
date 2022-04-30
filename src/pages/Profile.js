import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      titleProfile: '',
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
    localStorage.clear();
  };

  render() {
    const userLocalStorage = localStorage.getItem('user');
    const userEmail = JSON.parse(userLocalStorage);
    const { titleProfile } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleProfile } />
        <main>
          <div className="boxProfile">
            <span data-testid="profile-email">{userEmail.email}</span>
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
      </>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Profile.contextType = MyContext;

export default Profile;
