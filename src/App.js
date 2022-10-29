import React, {useEffect, useState} from 'react';

import Recipe from './components/Recipe';
import './App.css';

function App() {

  const APP_ID = "952ab1b9";
  const APP_KEY = "cf97744fba91384e3b4f11b1ba6b187e";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
  }

  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type = "text" value={search} onChange={updateSearch} />
        <button className='search-btn' type = "submit">Search</button>
      </form>
      {recipes.map(recipe => (
          <Recipe 
          key = {recipe.recipe.label}
          title = {recipe.recipe.label} 
          calories = {recipe.recipe.calories} 
          image = {recipe.recipe.image}/>
        ))}
    </div>
  );
}

export default App;
