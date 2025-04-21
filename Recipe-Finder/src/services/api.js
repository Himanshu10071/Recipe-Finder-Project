import axios from 'axios';

// Spoonacular API (you need to get your own API key)
// Sign up at https://spoonacular.com/food-api to get a free API key
const API_KEY = '3beba7dca3f643b2a948efd8072a3934';
const BASE_URL = 'https://api.spoonacular.com/recipes';



// Default recipes in case API fails or no search is performed
export const DEFAULT_RECIPES = [
  {
    id: 1,
    title: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    readyInMinutes: 25,
    vegan: true,
  },
  {
    id: 2,
    title: 'Chicken Parmesan',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    readyInMinutes: 45,
    vegan: false,
  },
  {
    id: 3,
    title: 'Quick Pasta Salad',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    readyInMinutes: 15,
    vegan: false,
  },
  {
    id: 4,
    title: 'Vegan Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    readyInMinutes: 60,
    vegan: true,
  },
];


// Search recipes with optional filters
export const searchRecipes = async (query, filters = {}) => {
  try {
    let params = {
      apiKey: API_KEY,
      query,
      number: 12,
      addRecipeInformation: true, // This includes vegetarian, vegan info, etc.
      fillIngredients: true
    };

    // Add diet filter if vegan is true
    if (filters.vegan) {
      params.diet = 'vegan';
    }

    // Add maxReadyTime if quick filter is true (under 30 mins)
    if (filters.quick) {
      params.maxReadyTime = 30;
    }

    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params,
    });

    // Transform API response to match our app's format
    return response.data.results.map(item => ({
      id: item.id,
      title: item.title,
      image: item.image,
      readyInMinutes: item.readyInMinutes,
      vegan: item.vegan,
      vegetarian: item.vegetarian,
      glutenFree: item.glutenFree,
      dairyFree: item.dairyFree,
      servings: item.servings
    }));
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Get detailed recipe information by ID
export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw error;
  }
};

