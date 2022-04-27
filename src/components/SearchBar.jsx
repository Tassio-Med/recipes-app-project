import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="search" data-testid="search-input" />
        <br />
        <label htmlFor="ingredient">
          <input
            type="radio"
            name=""
            id="ingredient"
            value=""
            data-testid="ingredient-search-radio"
          />
          {' '}
          Ingredient
          {' '}
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name=""
            id="name"
            value=""
            data-testid="name-search-radio"
          />
          {' '}
          Name
          {' '}
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            name=""
            id="firstLetter"
            value=""
            data-testid="first-letter-search-radio"
          />
          {' '}
          First letter
          {' '}
        </label>
        {' '}
        <button type="button" data-testid="exec-search-btn">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
