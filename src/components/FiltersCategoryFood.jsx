import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import './BoxFilters.css';

class FiltersCategoryFood extends React.Component {
  componentDidMount() {
    const { handleCategoryListFood } = this.context;
    handleCategoryListFood();
  }

  handleClickBtnCategory = (event) => {
    const btnName = event.target.innerHTML;

    this.handleCallFilterByCategory(btnName);
  }

  handleCallFilterByCategory = (btnName) => {
    const { filterByCategory } = this.props;

    return filterByCategory(btnName);
  }

  render() {
    const { categoryListFood } = this.context;

    const FIVE = 5;

    return (
      <section className="boxFilters">
        <button
          type="button"
          className="btnCategory"
          onClick={ this.handleClickBtnCategory }
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          categoryListFood && categoryListFood.map((item) => (
            <button
              className="btnCategory"
              key={ item.strCategory }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ this.handleClickBtnCategory }
            >
              {item.strCategory}
            </button>
          )).slice(0, FIVE)
        }
      </section>
    );
  }
}

FiltersCategoryFood.propTypes = {
  filterByCategory: PropTypes.func.isRequired,
};

FiltersCategoryFood.contextType = MyContext;

export default FiltersCategoryFood;
