import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import CardRecipeFoods from '../components/CardRecipeFoods';
import '../components/CardRecipes.css';
import FiltersCategoryFood from '../components/FiltersCategoryFood';
import { setFilterIngredientFood } from '../services/apiServicesFoods';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFood: '',
      categoryRecipes: '',
      btnCategoryIsON: false,
      updateBtnName: '',
      dataIngredient: '',
      exploreIngredient: false,
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { handleDefaultDataFood, filterExploreIngredient } = this.context;
    const { match } = this.props;

    let titleName;

    if (match.path === '/foods') {
      titleName = 'Foods';
      this.setState({
        titleFood: titleName,
      });
    }
    if (filterExploreIngredient) {
      this.handleExploreRecipesByIngredient();
    } else {
      handleDefaultDataFood();
    }
  };

  async handleExploreRecipesByIngredient() {
    const { filterExploreIngredient, searchValue, resetFilters } = this.context;
    if (filterExploreIngredient) {
      const data = await setFilterIngredientFood(searchValue);
      this.setState({
        dataIngredient: data,
        exploreIngredient: true,
      }, () => resetFilters());
    }
    console.log('ta chegando aqui');
  }

  filterByCategory = async (btnName) => {
    const { filterExploreIngredient } = this.context;
    if (filterExploreIngredient) {
      this.setState({
        exploreIngredient: false,
      });
    }
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
    const { titleFood, categoryRecipes, dataIngredient,
      exploreIngredient } = this.state;
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

    const resultExploreByIngredient = (
      <section className="boxCards">
        {
          dataIngredient.meals?.map((elemento, index) => (
            <CardRecipeFoods
              dataTestINDEX={ index }
              source={ elemento.strMealThumb }
              recipeCardName={ elemento.strMeal }
              key={ elemento.idMeal }
              idRecipe={ elemento.idMeal }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    const comparSearchON = searchOn ? sectionCardsFood : defaultCardFood;
    const comparExplore = (exploreIngredient)
      ? resultExploreByIngredient : comparSearchON;

    const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

    return (
      <>
        <Header titlePage={ titleFood } />
        { pathRec && <Redirect to={ pathRec } /> }
        { (dataName.meals === null && searchValue !== '')
          && global.alert(alertNoRecipes) }

        <FiltersCategoryFood filterByCategory={ this.filterByCategory } />

        <section id="boxRecipes">
          { comparExplore }
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
