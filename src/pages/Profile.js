import React from 'react';
import PropTypes from 'prop-types';
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
  }

  render() {
    const { titleProfile } = this.state;
    return (
      <>
        <HeaderNoSearch titlePage={ titleProfile } />
        <p>teste</p>
      </>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Profile.contextType = MyContext;

export default Profile;
