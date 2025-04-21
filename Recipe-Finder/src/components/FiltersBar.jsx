import { useRecipes } from '../context/RecipeContext';
import React from 'react';

const FiltersBar = () => {
  const { filters, updateFilters } = useRecipes();

  // const handleFilterChange = (filterName) => {
  //   updateFilters({ [filterName]: !filters[filterName] });
  // };
  function handleFilterChange(filterName){
    updateFilters({ [filterName]: !filters[filterName] });
  }

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <h3 className="text-gray-700 font-medium mr-2">Filters:</h3>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="vegan-filter"
          checked={filters.vegan}
          onChange={() => handleFilterChange('vegan')}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="vegan-filter" className="ml-2 text-sm text-gray-700">
          Vegan
        </label>
      </div>
      
      <div className="flex items-center ml-4">
        <input
          type="checkbox"
          id="quick-filter"
          checked={filters.quick}
          onChange={() => handleFilterChange('quick')}
          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="quick-filter" className="ml-2 text-sm text-gray-700">
          Quick Recipes (under 30 mins)
        </label>
      </div>
    </div>
  );
};

export default FiltersBar; 