import React from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import { fetchIngredientsFood } from '../services/apiServicesFoods';
import '../components/CardRecipes.css';

class ExploreFoodsIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleFoodsIngred: '',
      ingredientsFoodList: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    this.callIngredientsFood();
  }

  callIngredientsFood = async () => {
    const ingredientsFoodList = await fetchIngredientsFood();
    this.setState({
      ingredientsFoodList,
    });
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/explore/foods/ingredients') {
      titleName = 'Explore Ingredients';
      this.setState({
        titleFoodsIngred: titleName,
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
    history.push('/foods/');
  }

  render() {
    const { titleFoodsIngred, ingredientsFoodList } = this.state;
    const TWELVE = 12;
    const arrIngredientsFood = ingredientsFoodList.meals?.slice(0, TWELVE);
    return (
      <>
        <HeaderNoSearch titlePage={ titleFoodsIngred } />
        <main className="boxCards">
          { arrIngredientsFood && arrIngredientsFood.map((ingredient, index) => {
            const { strIngredient } = ingredient;
            return (
              <div
                key={ index }
                className="eachCardIngredient"
                data-testid={ `${index}-ingredient-card` }
              >
                <input
                  className="imgCard"
                  type="image"
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                  data-testid={ `${index}-card-img` }
                  onClick={ this.handleClickLink }
                />
                <p
                  className="titleCard"
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient }
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

ExploreFoodsIngredients.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExploreFoodsIngredients.contextType = MyContext;

export default ExploreFoodsIngredients;
