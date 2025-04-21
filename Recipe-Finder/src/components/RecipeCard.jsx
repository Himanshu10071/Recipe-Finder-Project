import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import React from 'react';

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useRecipes();
  const favorite = isFavorite(recipe.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link to={`/recipe?id=${recipe.id}`} className="block">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
          }}
        />
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{recipe.title}</h3>
          <div className="flex justify-between items-center">
            {recipe.readyInMinutes && (
              <span className="text-sm text-gray-600">
                Ready in {recipe.readyInMinutes} min
              </span>
            )}
            {recipe.vegan && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Vegan
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 flex justify-end">
        <button
          onClick={() => toggleFavorite(recipe)}
          className="text-gray-400 hover:text-red-500 focus:outline-none"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg 
            className={`h-6 w-6 ${favorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            fill={favorite ? "currentColor" : "none"}
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
    </div>
  );
};

export default RecipeCard; 