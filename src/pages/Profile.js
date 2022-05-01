import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      titleProfile: '',
      // userEmail: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    // this.handleUserEmail();
  }

  // handleUserEmail = () => {
  //   const userLocalStorage = localStorage.getItem('user');
  //   const userEmail = JSON.parse(userLocalStorage);
  //   console.log(userEmail.email);

  //   this.setState({
  //     userEmail: userEmail.email,
  //   });
  // }

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
    const { titleProfile } = this.state;

    // const comparSearch = (!userEmail !== false) && userEmail;

    // console.log(!userEmail === false);

    return (
      <>
        <HeaderNoSearch titlePage={ titleProfile } />
        <main>
          <div className="boxProfile">
            {/* <span data-testid="profile-email">{ comparSearch }</span> */}
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
