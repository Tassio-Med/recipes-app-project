// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

class Footer extends React.Component {
  render() {
    const { resetFilters } = this.context;
    return (
      <footer data-testid="footer" className="boxFooter">
        <Link to="/drinks">
          <input
            type="image"
            className="drinksIcon"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Ícone que redireciona para página Drinks"
            onClick={ () => {
              resetFilters();
            } }
          />
        </Link>
        <Link to="/explore">
          <img
            className="exploreIcon"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone que redireciona para página Explore"
          />
        </Link>

        <Link to="/foods">
          <input
            type="image"
            className="foodsIcon"
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Ícone que redireciona para página Foods"
            onClick={ () => {
              resetFilters();
            } }
          />
        </Link>
      </footer>
    );
  }
}

Footer.contextType = MyContext;

export default Footer;
