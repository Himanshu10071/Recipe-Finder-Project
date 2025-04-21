import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchRecipes } from '../services/api';
import { useRecipes } from '../context/RecipeContext';
import React from 'react';

const RecipeDetail = () => {
  // Get recipe ID from URL query parameter
  const location = useLocation();
  const recipeId = new URLSearchParams(location.search).get('id');
  
  // State variables
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Context
  const { toggleFavorite, isFavorite, recipes, favorites } = useRecipes();

  // Load recipe data when component mounts
  useEffect(() => {
    // Set loading state
    setLoading(true);
    
    // Check if we have a recipe ID
    if (!recipeId) {
      setError('Recipe not found. Please go back and select a recipe.');
      setLoading(false);
      return;
    }
    
    // First check if recipe exists in already loaded recipes or favorites
    const existingRecipe = [...recipes, ...favorites].find(
      r => r.id.toString() === recipeId.toString()
    );
    
    if (existingRecipe) {
      // Use existing recipe data
      setRecipe(existingRecipe);
      setLoading(false);
      
      // Save to recently viewed
      saveToRecentlyViewed(existingRecipe);
    } else {
      // Use sample recipe data
      const sampleRecipe = {
        id: parseInt(recipeId),
        title: 'Pasta with Tomato Sauce',
        image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        readyInMinutes: 30,
        servings: 4,
        vegetarian: true,
        instructions: "1. Cook pasta according to package. 2. Heat sauce in a pan. 3. Mix pasta and sauce. 4. Serve hot.",
        summary: "A quick and easy pasta dish perfect for busy weeknights.",
        extendedIngredients: [
          { id: 1, name: 'Pasta', amount: 8, unit: 'oz' },
          { id: 2, name: 'Tomato Sauce', amount: 2, unit: 'cups' },
          { id: 3, name: 'Parmesan', amount: 2, unit: 'tbsp' }
        ]
      };
      
      setRecipe(sampleRecipe);
      setLoading(false);
      
      // Save to recently viewed
      saveToRecentlyViewed(sampleRecipe);
    }
  }, [recipeId, recipes, favorites]);
  
  // Helper function to save to recently viewed
  const saveToRecentlyViewed = (recipe) => {
    try {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const updatedRecents = [recipe, ...recentlyViewed.filter(r => r.id !== recipe.id)].slice(0, 5);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecents));
    } catch (err) {
      console.error('Error saving to recently viewed:', err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <Link to="/" className="text-red-700 underline mt-2 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  // Recipe not found
  if (!recipe) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-md">
        <p>Recipe not found.</p>
        <Link to="/" className="text-emerald-600 underline mt-2 inline-block">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link to="/" className="text-emerald-600 hover:text-emerald-700 mb-4 inline-flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to recipes
      </Link>

      {/* Recipe card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Recipe image */}
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
            }}
          />
          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(recipe)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`h-6 w-6 ${isFavorite(recipe.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill={isFavorite(recipe.id) ? "currentColor" : "none"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Recipe details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.readyInMinutes && (
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                Ready in {recipe.readyInMinutes} min
              </span>
            )}
            {recipe.servings && (
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                {recipe.servings} servings
              </span>
            )}
            {recipe.vegetarian && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Vegetarian
              </span>
            )}
          </div>

          {/* Summary */}
          {recipe.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{recipe.summary}</p>
            </div>
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={ingredient.id || index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <div className="text-gray-700">
                {recipe.instructions.split(/\d+\./).filter(step => step.trim()).map((step, index) => (
                  <p key={index} className="mb-2">{index + 1}. {step.trim()}</p>
                ))}
              </div>
            </div>
          )}

          {/* Add/remove from favorites button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => toggleFavorite(recipe)}
              className={`px-4 py-2 rounded-md ${
                isFavorite(recipe.id)
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
              }`}
            >
              {isFavorite(recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail; 