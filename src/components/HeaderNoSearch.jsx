import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

class HeaderNoSearch extends React.Component {
  render() {
    const { titlePage } = this.props;

    return (
      <nav className="HeaderNoSearch">
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="Ícone que redireciona para a página de perfil."
            data-testid="profile-top-btn"
          />
        </Link>
        <p data-testid="page-title">{titlePage}</p>
      </nav>
    );
  }
}

HeaderNoSearch.propTypes = {
  titlePage: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
