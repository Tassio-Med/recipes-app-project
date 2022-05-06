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
      categoryRecipes: '',
      btnCategoryIsON: false,
      updateBtnName: '',
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

  filterByCategory = async (btnName) => {
    const { btnCategoryIsON, updateBtnName } = this.state;

    if (btnName === 'All' && btnName !== updateBtnName) {
      const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(urlName);
      const data = await response.json();

      this.setState({
        categoryRecipes: data.meals,
        btnCategoryIsON: false,
        updateBtnName: '',
      });
    }

    if (btnName !== 'All') {
      if (btnCategoryIsON === true && updateBtnName === btnName) {
        const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(urlName);
        const data = await response.json();

        this.setState({
          categoryRecipes: data.meals,
          btnCategoryIsON: false,
          updateBtnName: '',
        });
      } else {
        const urlName = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${btnName}`;
        const response = await fetch(urlName);
        const data = await response.json();

        this.setState({
          categoryRecipes: data.meals,
          btnCategoryIsON: true,
          updateBtnName: btnName,
        });
      }
    }
  }

  filterArraySearch = () => {
    const { dataName, dataIngredient, filterRadios, dataFirstLetter } = this.context;

    if (filterRadios === 'firstLetter') {
      return dataFirstLetter.meals;
    }
    if (filterRadios === 'name') {
      return dataName.meals;
    }
    if (filterRadios === 'ingredient') {
      return dataIngredient.meals;
    }
  };

  render() {
    const { titleFood, categoryRecipes } = this.state;
    const { pathRec, dataName, searchValue, searchOn, defaultDataFood } = this.context;

    const TWELVE = 12;
    const sectionCardsFood = (
      <section className="boxCards">
        {
          this.filterArraySearch()?.map((recipe, index) => (
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

    const comparCategory = (categoryRecipes === null
      || categoryRecipes.length === 0)
      ? defaultDataFood.meals : categoryRecipes;

    const defaultCardFood = (
      <section className="boxCards">
        {
          comparCategory?.map((item, index) => (
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

        <FiltersCategoryFood filterByCategory={ this.filterByCategory } />

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
