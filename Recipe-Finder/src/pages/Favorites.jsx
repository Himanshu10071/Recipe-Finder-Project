import RecipeList from '../components/RecipeList';
import { useRecipes } from '../context/RecipeContext';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, clearFavorites } = useRecipes();
  const [displayedFavorites, setDisplayedFavorites] = useState([]);
  const [filterOption, setFilterOption] = useState('all'); // 'all', 'vegan', 'quick'
  
  // Apply sorting and filtering to favorites
  useEffect(() => {
    let processed = [...favorites];
    
    // Apply filtering
    if (filterOption === 'vegan') {
      processed = processed.filter(recipe => recipe.vegan);
    } else if (filterOption === 'quick') {
      processed = processed.filter(recipe => recipe.readyInMinutes <= 30);
    }

    setDisplayedFavorites(processed);

    fetch("www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }, [favorites,  filterOption]);
  
  // Handle clearing all favorites with confirmation
 

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Favorite Recipes</h1>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          {favorites.length > 0 && (
            <>

              <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option value="all">All Recipes</option>
                <option value="vegan">Vegan Only</option>
                <option value="quick">Quick Meals (≤30 min)</option>
              </select>
              
              
            </>
          )}
        </div>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 p-8 rounded-md text-center">
          <p className="text-lg font-medium mb-2">No favorite recipes yet</p>
          <p className="text-sm mb-6">Find delicious recipes and mark them as favorites to see them here</p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Discover Recipes
          </Link>
        </div>
      ) : displayedFavorites.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 p-8 rounded-md text-center">
          <p className="text-lg font-medium mb-2">No matches found</p>
          <p className="text-sm">Try changing your filter options</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-gray-600">
            {displayedFavorites.length} {displayedFavorites.length === 1 ? 'recipe' : 'recipes'} in your favorites
          </p>
          <RecipeList 
            recipes={displayedFavorites} 
            loading={false} 
            error={null} 
          />
        </>
      )}
    </div>
  );
};

export default Favorites; 