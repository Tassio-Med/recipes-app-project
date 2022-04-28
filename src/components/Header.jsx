import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import SearchBarFoods from './SearchBarFoods';
import SearchBarDrinks from './SearchBarDrinks';
import MyContext from '../context/MyContext';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearchBar: '',
    };
  }

  handleSearchBar = () => {
    this.setState((prevState) => ({
      showSearchBar: !prevState.showSearchBar,
    }));
  };

  render() {
    const { titlePage } = this.props;
    const { showSearchBar } = this.state;
    const compareBarSearch = titlePage === 'Drinks'
      ? <SearchBarDrinks /> : <SearchBarFoods />;
    return (
      <>
        <nav className="boxHeader">
          <Link to="/profile">
            <img
              alt="Ícone que redireciona para a página de perfil."
              src={ profileIcon }
              data-testid="profile-top-btn"
            />
          </Link>
          <p data-testid="page-title">{titlePage}</p>
          <input
            type="image"
            src={ searchIcon }
            alt="Ícone que habilita a pesquisa na página."
            data-testid="search-top-btn"
            onClick={ this.handleSearchBar }
          />
        </nav>
        <div className="boxSearch">{showSearchBar && compareBarSearch}</div>
      </>
    );
  }
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
};

Header.contextType = MyContext;

export default Header;
