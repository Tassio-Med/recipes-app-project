import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import CardRecipeFoods from '../components/CardRecipeFoods';
import '../components/CardRecipes.css';
import FiltersCategoryFood from '../components/FiltersCategoryFood';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFood: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;
    const { handleDefaultDataFood } = this.context;

    let titleName;

    if (match.path === '/foods') {
      titleName = 'Foods';
      this.setState({
        titleFood: titleName,
      });
    }
    handleDefaultDataFood();
  };

  render() {
    const { titleFood } = this.state;
    const { pathRec, dataName, searchValue, searchOn, defaultDataFood } = this.context;

    const TWELVE = 12;

    const sectionCardsFood = (
      <section className="boxCards">
        {
          dataName.meals?.map((recipe, index) => (
            <CardRecipeFoods
              dataTestINDEX={ index }
              source={ recipe.strMealThumb }
              recipeCardName={ recipe.strMeal }
              key={ recipe.idMeal }
              idRecipe={ recipe.idMeal }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    const defaultCardFood = (
      <section className="boxCards">
        {
          defaultDataFood && defaultDataFood.meals?.map((item, index) => (
            <CardRecipeFoods
              dataTestINDEX={ index }
              source={ item.strMealThumb }
              recipeCardName={ item.strMeal }
              key={ item.idMeal }
              idRecipe={ item.idMeal }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    const comparSearchON = searchOn ? sectionCardsFood : defaultCardFood;
    const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

    return (
      <>
        <Header titlePage={ titleFood } />
        { pathRec && <Redirect to={ pathRec } /> }
        { (dataName.meals === null && searchValue !== '')
          && global.alert(alertNoRecipes) }

        <FiltersCategoryFood />

        <section id="boxRecipes">
          { comparSearchON }
        </section>
        <Footer />
      </>
    );
  }
}

Foods.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Foods.contextType = MyContext;

export default Foods;
