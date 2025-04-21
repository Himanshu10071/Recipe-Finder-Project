import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import React from 'react';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/recipe" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
