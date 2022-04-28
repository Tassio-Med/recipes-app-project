import React from 'react';
import MyContext from '../context/MyContext';

class SearchBarDrinks extends React.Component {
  render() {
    const { handleChangeRadios, handleChange, handleSearchDrink } = this.context;
    return (
      <form>
        <input
          type="search"
          data-testid="search-input"
          onChange={ handleChange }
          name="searchValue"
        />
        <br />
        <label htmlFor="filterRadios">
          <input
            type="radio"
            name="filterRadios"
            id="ingredient"
            onChange={ handleChangeRadios }
            data-testid="ingredient-search-radio"
          />
          {' '}
          Ingredient
          {' '}
          <input
            type="radio"
            name="filterRadios"
            id="name"
            onChange={ handleChangeRadios }
            data-testid="name-search-radio"
          />
          {' '}
          Name
          {' '}
          <input
            type="radio"
            name="filterRadios"
            id="firstLetter"
            onChange={ handleChangeRadios }
            data-testid="first-letter-search-radio"
          />
          {' '}
          First letter
          {' '}
        </label>
        {' '}
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchDrink }
        >
          Search
        </button>
      </form>
    );
  }
}

SearchBarDrinks.contextType = MyContext;

export default SearchBarDrinks;
