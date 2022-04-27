import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodsDetails';
import DrinkDetails from './pages/DrinkDetails';
import Drinks from './pages/Drinks';
import FoodsDetailsProgress from './pages/FoodsDetailsProgress';
import DrinkDetailsProgress from './pages/DrinkDetailsProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';
import MyProvider from './context/MyProvider';

class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <Switch>
          <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/foods/{id-da-receita}" component={ FoodsDetails } />
          <Route path="/drinks/{id-da-receita}" component={ DrinkDetails } />
          <Route
            path="/foods/{id-da-receita}/in-progress"
            component={ FoodsDetailsProgress }
          />
          <Route
            path=" /drinks/{id-da-receita}/in-progress"
            component={ DrinkDetailsProgress }
          />
          <Route path="/explore" component={ Explore } />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route path="/not-found" component={ NotFound } />
        </Switch>
      </MyProvider>
    );
  }
}

export default App;
