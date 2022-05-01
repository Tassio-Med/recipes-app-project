import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer" className="boxFooter">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="Ícone que redireciona para página Drinks"
          />
        </Link>
        <Link to="/explore">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="Ícone que redireciona para página Explore"
          />
        </Link>

        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="Ícone que redireciona para página Foods"
          />
        </Link>
      </footer>
    );
  }
}

export default Footer;
