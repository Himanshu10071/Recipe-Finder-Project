import { useState } from 'react';
import React from 'react';
import { useRecipes } from '../context/RecipeContext';
import { DEFAULT_RECIPES } from '../services/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [error, setError] = useState('');
  const { setRecipes } = useRecipes();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input (not empty)
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    // Clear error and call search function
    setError('');
    onSearch(query);
    localStorage.setItem('searchQuery', query);
  };
  
  const handleClear = () => {
    // Clear search input
    setQuery('');
    setError('');
    
    // Clear localStorage
    localStorage.removeItem('searchQuery');
    
    // Reset to default recipes
    setRecipes(DEFAULT_RECIPES);
    
    // Focus the search input
    document.getElementById('search')?.focus();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
        <div className="flex-grow relative">
          <label htmlFor="search" className="sr-only">Search recipes</label>
          <input
            type="text"
            id="search"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 