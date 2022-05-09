import PropTypes from 'prop-types';
import React from 'react';
import MyContext from '../context/MyContext';
import './BoxFilters.css';

class FiltersCategoryDrink extends React.Component {
  componentDidMount() {
    const { handleCategoryListDrink } = this.context;
    handleCategoryListDrink();
  }

  handleClickBtnCategory = (event) => {
    const btnName = event.target.innerHTML;

    // console.log(btnName);
    this.handleCallFilterByCategory(btnName);
  }

  handleCallFilterByCategory = (btnName) => {
    const { filterByCategory } = this.props;

    // console.log(filterByCategory(btnName));
    return filterByCategory(btnName);
  }

  render() {
    const { categoryListDrink } = this.context;

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
          categoryListDrink && categoryListDrink.map((item) => (
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

FiltersCategoryDrink.propTypes = {
  filterByCategory: PropTypes.func.isRequired,
};

FiltersCategoryDrink.contextType = MyContext;

export default FiltersCategoryDrink;
