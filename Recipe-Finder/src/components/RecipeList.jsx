import RecipeCard from './RecipeCard';
import React from 'react';

const RecipeList = ({ recipes, loading, error }) => {
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
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-4">
        <p>{error}</p>
      </div>
    );
  }

  // Handle empty state
  if (recipes.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-md my-4 text-center">
        <p className="text-lg font-medium">No recipes found</p>
        <p className="text-sm mt-2">Try adjusting your search term or filters</p>
      </div>
    );
  }

  // Render recipe grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList; 