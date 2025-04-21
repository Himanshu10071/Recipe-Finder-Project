import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchRecipes } from '../services/api';
import { useRecipes } from '../context/RecipeContext';
import React from 'react';

const RecipeDetail = () => {
  const location = useLocation();
  const recipeId = new URLSearchParams(location.search).get('id');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, recipes, favorites } = useRecipes();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      
      try {
        // First check if recipe exists in context or favorites
        const existingRecipe = [...recipes, ...favorites].find(
          r => r.id.toString() === recipeId?.toString()
        );
        
        if (existingRecipe) {
          // If we found the recipe, use it
          setRecipe(existingRecipe);
          
          // Store recently viewed recipe in localStorage
          const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const updatedRecents = [existingRecipe, ...recentlyViewed.filter(r => r.id !== existingRecipe.id)].slice(0, 5);
          localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecents));
        } else {
          // If not found, use a sample recipe
          // In a real app we would fetch from API here
          const sampleRecipe = {
            id: parseInt(recipeId),
            title: 'Delicious Pasta Recipe',
            image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
            readyInMinutes: 30,
            servings: 4,
            vegan: false,
            vegetarian: true,
            glutenFree: false,
            dairyFree: false,
            instructions: `
              1. Bring a large pot of salted water to a boil.
              2. Add pasta and cook according to package directions until al dente.
              3. Meanwhile, heat olive oil in a large skillet over medium heat.
              4. Add garlic and sauté until fragrant, about 1 minute.
              5. Add cherry tomatoes and cook until they begin to burst, about 5 minutes.
              6. Drain pasta, reserving 1/2 cup pasta water.
              7. Add pasta to the skillet with tomatoes, along with basil and grated cheese.
              8. Toss to combine, adding pasta water as needed to create a sauce.
              9. Season with salt and pepper to taste.
              10. Serve immediately with additional grated cheese.
            `,
            summary: "A simple, delicious pasta recipe that's perfect for weeknight dinners. Ready in just 30 minutes!",
            extendedIngredients: [
              { id: 1, name: 'Pasta', amount: 12, unit: 'oz' },
              { id: 2, name: 'Olive Oil', amount: 2, unit: 'tbsp' },
              { id: 3, name: 'Garlic', amount: 3, unit: 'cloves' },
              { id: 4, name: 'Cherry Tomatoes', amount: 2, unit: 'cups' },
              { id: 5, name: 'Fresh Basil', amount: 1/4, unit: 'cup' },
              { id: 6, name: 'Parmesan Cheese', amount: 1/2, unit: 'cup' },
              { id: 7, name: 'Salt', amount: 1, unit: 'tsp' },
              { id: 8, name: 'Black Pepper', amount: 1/2, unit: 'tsp' },
            ]
          };
          setRecipe(sampleRecipe);
          
          // Store in recently viewed
          const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
          const updatedRecents = [sampleRecipe, ...recentlyViewed.filter(r => r.id !== sampleRecipe.id)].slice(0, 5);
          localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecents));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching recipe details:', err);
        setError('Sorry, we couldn\'t load this recipe. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipeDetails();
    } else {
      setError('Recipe not found. Please go back and select a recipe.');
      setLoading(false);
    }
  }, [recipeId, recipes, favorites]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Handle error state
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

  // Handle no recipe found
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

  // Function to format instructions for better display
  const formatInstructions = (instructions) => {
    if (!instructions) return null;
    
    // Check if instructions are already in a list format
    if (instructions.trim().startsWith('1.')) {
      return (
        <ol className="list-decimal list-inside space-y-2">
          {instructions.split(/\d+\./).filter(step => step.trim()).map((step, index) => (
            <li key={index} className="pl-2">{step.trim()}</li>
          ))}
        </ol>
      );
    }
    
    // Otherwise just return as paragraphs
    return instructions.split('\n').map((paragraph, index) => (
      paragraph.trim() && <p key={index} className="mb-2">{paragraph.trim()}</p>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-emerald-600 hover:text-emerald-700 mb-4 inline-flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to recipes
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
            }}
          />
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

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
          
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
            {recipe.vegan && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Vegan
              </span>
            )}
            {recipe.vegetarian && !recipe.vegan && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Vegetarian
              </span>
            )}
            {recipe.glutenFree && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                Gluten Free
              </span>
            )}
            {recipe.dairyFree && (
              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                Dairy Free
              </span>
            )}
          </div>

          {recipe.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{recipe.summary}</p>
            </div>
          )}

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

          {recipe.instructions && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <div className="text-gray-700">
                {formatInstructions(recipe.instructions)}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => toggleFavorite(recipe)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
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