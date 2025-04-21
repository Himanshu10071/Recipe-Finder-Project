import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Recipe Finder</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Recipe Finder is a web application designed to help you discover delicious recipes based on your preferences.
          Whether you're looking for quick meals, vegan options, or just browsing for inspiration, our app makes
          it easy to find and save your favorite recipes.
        </p>
        <p className="text-gray-700">
          Use the search function to find recipes, filter by dietary preferences, and save your favorites for easy access later.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Search for recipes by keyword</li>
          <li>Filter recipes by dietary preferences</li>
          <li>View detailed recipe information including ingredients and instructions</li>
          <li>Save favorite recipes for easy access</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Technologies</h2>
        <p className="text-gray-700 mb-4">
          This application was built using:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>React.js for the frontend</li>
          <li>React Router for navigation</li>
          <li>Context API for state management</li>
          <li>Tailwind CSS for styling</li>
          <li>Recipe API for data</li>
        </ul>
      </div>
    </div>
  );
};

export default About; 