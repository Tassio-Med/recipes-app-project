import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

class Header extends React.Component {
  render() {
    const { titlePage } = this.props;

    return (
      <nav className="boxHeader">
        <img
          src={ profileIcon }
          alt="Ícone que redireciona para a página de perfil."
          data-testid="profile-top-btn"
        />
        <p
          data-testid="page-title"
        >
          { titlePage }
        </p>
        <img
          src={ searchIcon }
          alt="Ícone que habilita a pesquisa na página."
          data-testid="search-top-btn"
        />
      </nav>
    );
  }
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
};

export default Header;
