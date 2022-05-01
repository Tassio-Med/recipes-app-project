import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import CardRecipeFoods from '../components/CardRecipeFoods';
// import { setDefaultNameFood } from '../services/apiServicesFoods';

class Foods extends React.Component {
  constructor() {
    super();
    this.state = {
      titleFood: '',
      // defaultData: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    // this.handleDefaultData();
  }

  // handleDefaultData = async () => {
  //   const responseDefault = await setDefaultNameFood();
  //   this.setState({
  //     defaultData: responseDefault,
  //   });
  // }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/foods') {
      titleName = 'Foods';
      this.setState({
        titleFood: titleName,
      });
    }
  };

  render() {
    const { titleFood } = this.state;
    const { pathRec, dataName, searchValue } = this.context;

    const TWELVE = 12;
    const sectionCardsFood = (
      <section className="boxCardsFood">
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

    // const defaultCardFood = (
    //   <section className="boxDefaultCardsFood">
    //     {
    //       defaultData && defaultData.meals?.map((item, index) => (
    //         <CardRecipeFoods
    //           dataTestINDEX={ index }
    //           source={ item.strMealThumb }
    //           recipeCardName={ item.strMeal }
    //           key={ item.idMeal }
    //           idRecipe={ item.idMeal }
    //         />
    //       )).slice(0, TWELVE)
    //     }
    //   </section>
    // );

    const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

    return (
      <>
        <Header titlePage={ titleFood } />
        { pathRec && <Redirect to={ pathRec } /> }

        { (dataName.meals === null && searchValue !== '')
          && global.alert(alertNoRecipes) }

        {/* { defaultCardFood } */}
        { sectionCardsFood }
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
