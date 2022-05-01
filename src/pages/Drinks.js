import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import CardRecipeDrinks from '../components/CardRecipeDrinks';
// import { setDefaultNameDrink } from '../services/apiServicesDrinks';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
      titleDrinks: '',
      // defaultData: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
    // this.handleDefaultData();
  }

  // handleDefaultData = async () => {
  //   const responseDefault = await setDefaultNameDrink();
  //   this.setState({
  //     defaultData: responseDefault,
  //   });
  // }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/drinks') {
      titleName = 'Drinks';
      this.setState({
        titleDrinks: titleName,
      });
    }
  };

  render() {
    const { titleDrinks } = this.state;
    const { pathRec, dataName, searchValue } = this.context;

    const TWELVE = 12;
    const sectionCardsDrinks = (
      <section className="boxCardsDrinks">
        {
          dataName.drinks?.map((recipe, index) => (
            <CardRecipeDrinks
              dataTestINDEX={ index }
              source={ recipe.strDrinkThumb }
              recipeCardName={ recipe.strDrink }
              key={ recipe.idDrink }
              idRecipe={ recipe.idDrink }
            />
          )).slice(0, TWELVE)
        }
      </section>
    );

    // const defaultCardsDrinks = (
    //   <section className="boxDefaultCardsDrinks">
    //     {
    //       defaultData && defaultData.drinks?.map((item, index) => (
    //         <CardRecipeDrinks
    //           dataTestINDEX={ index }
    //           source={ item.strDrinkThumb }
    //           recipeCardName={ item.strDrink }
    //           key={ item.idDrink }
    //           idRecipe={ item.idDrink }
    //         />
    //       )).slice(0, TWELVE)
    //     }
    //   </section>
    // );

    const alertNoRecipes = 'Sorry, we haven\'t found any recipes for these filters.';

    return (
      <>
        <Header titlePage={ titleDrinks } />
        { pathRec && <Redirect to={ pathRec } /> }

        { (dataName.drinks === null && searchValue !== '')
          && global.alert(alertNoRecipes) }

        {/* { defaultCardsDrinks } */}
        { sectionCardsDrinks }
        <Footer />
      </>
    );
  }
}

Drinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Drinks.contextType = MyContext;

export default Drinks;
