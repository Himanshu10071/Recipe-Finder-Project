import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import FiltersBar from '../components/FiltersBar';
import { useRecipes } from '../context/RecipeContext';
import { searchRecipes, DEFAULT_RECIPES } from '../services/api';
import React from 'react';

const Home = () => {
  const { 
    recipes, 
    setRecipes, 
    loading, 
    setLoading, 
    error, 
    setError,
    filters
  } = useRecipes();

  // Load default recipes if no recipes are loaded yet
  useEffect(() => {
    if (recipes.length === 0) {
      // Check if we have any saved searches in localStorage
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        try {
          const parsedSearches = JSON.parse(savedSearches);
          if (parsedSearches.length > 0) {
            setRecipes(parsedSearches[0].results);
            return;
          }
        } catch (err) {
          console.error('Error parsing saved searches:', err);
        }
      }
      
      // If no saved searches, use default recipes
      setRecipes(DEFAULT_RECIPES);
    }
  }, []);

  // Handler for search
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the real API
      const results = await searchRecipes(query, filters);
      setRecipes(results);
      
      // Save search to localStorage
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const newSearch = {
        query,
        timestamp: new Date().toISOString(),
        results
      };
      
      // Add to beginning of array and limit to 5 recent searches
      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.query !== query)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Sorry, we couldn\'t find any recipes. Please try again later.');
      
      // If API fails, use default recipes
      setRecipes(DEFAULT_RECIPES);
    } finally {
      setLoading(false);
    }
  };

  // Effect to re-search when filters change
  useEffect(() => {
    // Only re-search if we already have non-default recipes (meaning a search was already performed)
    if (recipes.length > 0 && !recipes.some(r => DEFAULT_RECIPES.map(d => d.id).includes(r.id))) {
      const searchInput = document.getElementById('search');
      if (searchInput && searchInput.value) {
        handleSearch(searchInput.value);
      }
    }
  }, [filters]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Next Delicious Meal</h1>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <FiltersBar />
      
      <RecipeList 
        recipes={recipes} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
};

export default Home; 