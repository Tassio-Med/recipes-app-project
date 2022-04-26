import React from 'react';
import MyContext from '../context/MyContext';

class Profile extends React.Component {
  render() {
    return <h1>Profile</h1>;
  }
}

Profile.contextType = MyContext;

export default Profile;
