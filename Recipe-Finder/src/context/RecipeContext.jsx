import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
// Create the recipe context
const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);


export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    vegan: false,
    quick: false
  });


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add/remove recipe to/from favorites
  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      // Check if recipe is already in favorites
      const isAlreadyFavorite = prev.some(fav => fav.id === recipe.id);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        return prev.filter(fav => fav.id !== recipe.id);
      } else {
        // Add to favorites
        return [...prev, recipe];
      }
    });
  };

  // Check if a recipe is in favorites
  const isFavorite = (recipeId) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Context value
  const value = {
    recipes,
    setRecipes,
    favorites,
    loading,
    setLoading,
    error,
    setError,
    filters,
    updateFilters,
    toggleFavorite,
    isFavorite
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext; 