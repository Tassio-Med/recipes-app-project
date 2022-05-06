import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import { fetchIngredientsDrink } from '../services/apiServicesDrinks';

class ExploreDrinksIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleDrinksIngred: '',
      ingredientsDrinkList: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    this.callIngredientsDrink();
  }

  callIngredientsDrink = async () => {
    const ingredientsDrinkList = await fetchIngredientsDrink();
    this.setState({
      ingredientsDrinkList,
    });
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/drinks/ingredients') {
      titleName = 'Explore Ingredients';
      this.setState({
        titleDrinksIngred: titleName,
      });
    }
  };

  handleClickLink = ({ target }) => {
    const { history } = this.props;
    const { handleClickIngredient } = this.context;
    const teste = target.src;
    const urlSplited = teste.split('/')[5].split('-')[0];
    console.log(urlSplited);

    handleClickIngredient(urlSplited);
    history.push('/drinks/');
  }

  render() {
    const { titleDrinksIngred, ingredientsDrinkList } = this.state;
    const TWELVE = 12;
    const arrIngredientsDrink = ingredientsDrinkList.drinks?.slice(0, TWELVE);
    return (
      <>
        <HeaderNoSearch titlePage={ titleDrinksIngred } />
        <main className="boxCards">
          { arrIngredientsDrink && arrIngredientsDrink.map((ingredient, index) => {
            const { strIngredient1: ingre } = ingredient;
            return (
              <div
                key={ index }
                className="eachCardIngredient"
                data-testid={ `${index}-ingredient-card` }
              >
                <input
                  className="imgCard"
                  type="image"
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingre}-Small.png` }
                  alt={ ingre }
                  data-testid={ `${index}-card-img` }
                  onClick={ this.handleClickLink }
                />
                <p
                  className="titleCard"
                  data-testid={ `${index}-card-name` }
                >
                  { ingre }
                </p>
              </div>
            );
          })}
        </main>
        <Footer />
      </>
    );
  }
}

ExploreDrinksIngredients.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreDrinksIngredients.contextType = MyContext;

export default ExploreDrinksIngredients;
