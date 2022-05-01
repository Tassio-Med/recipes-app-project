import React from 'react';
import MyContext from '../context/MyContext';
// import { fetchByCategory } from '../services/apiServicesFoods';

class FiltersCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      // category: '',
    };
  }

  componentDidMount() {
    const { handleCategoryListFood } = this.context;
    handleCategoryListFood();
  }

  filterByCategory = async () => {
    const urlName = 'www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
    const response = await fetch(urlName);
    const data = await response.json();

    // this.setState({
    //   category: data.meals,
    // });
    console.log(data);
  }

  render() {
    const { categoryListFood } = this.context;
    // const { category } = this.state;
    const FIVE = 5;

    // console.log(category);
    return (
      <section id="boxFilters">
        <button type="button">All</button>
        {
          categoryListFood && categoryListFood.map((item) => (
            <button
              key={ item.strCategory }
              type="button"
              data-testid={ `${item.strCategory}-category-filter` }
              onClick={ this.filterByCategory }
            >
              {item.strCategory}
            </button>
          )).slice(0, FIVE)
        }
      </section>
    );
  }
}

FiltersCategory.contextType = MyContext;

export default FiltersCategory;
